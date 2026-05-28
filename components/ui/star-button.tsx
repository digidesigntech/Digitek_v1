import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

type StarButtonInnerProps = {
  children: ReactNode;
};

function StarButtonInner({ children }: StarButtonInnerProps) {
  return (
    <>
      <strong className="star-btn__label">{children}</strong>
      <div className="star-btn__container-stars">
        <div className="star-btn__stars" />
      </div>
      <div className="star-btn__glow">
        <div className="star-btn__circle" />
        <div className="star-btn__circle" />
      </div>
    </>
  );
}

type LinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function StarLink({
  href,
  external,
  className,
  children,
  onClick,
}: LinkProps) {
  const merged = ["star-btn", className].filter(Boolean).join(" ");
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={merged}
        onClick={onClick}
      >
        <StarButtonInner>{children}</StarButtonInner>
      </a>
    );
  }
  return (
    <Link href={href} className={merged} onClick={onClick}>
      <StarButtonInner>{children}</StarButtonInner>
    </Link>
  );
}

type StarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function StarButton({ className, children, ...rest }: StarButtonProps) {
  const merged = ["star-btn", className].filter(Boolean).join(" ");
  return (
    <button {...rest} className={merged}>
      <StarButtonInner>{children}</StarButtonInner>
    </button>
  );
}
