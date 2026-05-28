"use client";

import { useEffect } from "react";

/**
 * Defensive patch for a known race between React 18's reconciler and
 * libraries that imperatively manage their own DOM (notably
 * @splinetool/react-spline). When such a library tries to `removeChild`
 * a node that React has already removed from a higher level in the tree,
 * the throw bubbles up as a red Next.js error overlay even though the
 * page itself continues to work.
 *
 * We override `Node.prototype.removeChild` (and `insertBefore`, which has
 * the same shape of bug) to no-op when the child isn't actually a child
 * of `this`, instead of throwing. Native behaviour is preserved in every
 * other case.
 *
 * Patched once on first mount and left in place — installing it again is
 * a no-op thanks to the `__patched` flag.
 */
export function DomCleanupPatch() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const NodeProto = window.Node?.prototype as
      | (Node & {
          __removeChildPatched?: boolean;
          __insertBeforePatched?: boolean;
        })
      | undefined;
    if (!NodeProto) return;

    if (!NodeProto.__removeChildPatched) {
      const original = NodeProto.removeChild;
      NodeProto.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
          // React's reconciler is asking to remove a node that's no
          // longer a child of `this` — typically because another library
          // already detached it. Returning the child silently matches
          // React's expectations and avoids the red overlay.
          return child;
        }
        return original.call(this, child) as T;
      };
      NodeProto.__removeChildPatched = true;
    }

    if (!NodeProto.__insertBeforePatched) {
      const original = NodeProto.insertBefore;
      NodeProto.insertBefore = function <T extends Node>(
        newNode: T,
        referenceNode: Node | null
      ): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          // Same race in the other direction: insert before a reference
          // that has already been detached. Fall back to appendChild,
          // which is what React would do next anyway.
          return this.appendChild(newNode) as unknown as T;
        }
        return original.call(this, newNode, referenceNode) as T;
      };
      NodeProto.__insertBeforePatched = true;
    }
  }, []);

  return null;
}
