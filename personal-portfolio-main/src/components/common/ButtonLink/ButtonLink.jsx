"use client";

import TransitionLink from "@/components/layout/TransitionLink/TransitionLink";
import styles from "./ButtonLink.module.css";

export default function ButtonLink({
  href,
  children,
  className = "",
  ...props
}) {
  return (
    <TransitionLink
      href={href}
      className={`${styles.button} ${className}`}
      {...props}
    >
      {children}
    </TransitionLink>
  );
}
