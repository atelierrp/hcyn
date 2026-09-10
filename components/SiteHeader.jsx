"use client";

import Link from "next/link";

export function SiteHeader({ compact = false, inline = false }) {
  if (inline) {
    return (
      <header className="site-header site-header--inline">
        <Link
          href="/"
          className="site-logo site-logo--inline"
          aria-label="Hardcore Yoga Nidra — home"
        >
          hardcore yoga nidra
        </Link>
      </header>
    );
  }

  return (
    <header
      className={
        compact ? "site-header site-header--compact" : "site-header"
      }
    >
      <Link
        href="/"
        className={compact ? "site-logo site-logo--compact" : "site-logo"}
        aria-label="Hardcore Yoga Nidra — home"
      >
        <span className="site-logo__full" aria-hidden={compact}>
          <span>hardcore</span>
          <span>yoga</span>
          <span>nidra</span>
        </span>
        <span className="site-logo__short" aria-hidden={!compact}>
          HCYN
        </span>
      </Link>
    </header>
  );
}
