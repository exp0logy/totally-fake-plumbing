"use client";

import { useEffect, useRef, useState } from "react";
import { CALL_HREF, PHONE_DISPLAY, PhoneIcon } from "./shared";

/** Fixed nav with a blurred background once scrolled, plus a mobile menu sheet. */
export default function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle("scrolled", scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header>
      <a
        className="gh-banner"
        href="https://github.com/exp0logy/totally-fake-plumbing"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        A demo by exp0logy — view the source on <strong>GitHub</strong>
      </a>
      <nav className="nav" ref={navRef} aria-label="Main">
        <a className="brand" href="#top" onClick={close}>
          <span className="brand-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            >
              <path d="M4 14h6a2 2 0 0 0 2-2V6" />
              <path d="M12 6h4" />
              <path d="M4 11v6" />
              <circle cx="18" cy="6" r="2" />
            </svg>
          </span>
          <span className="brand-name">
            Totally Fake <em>Plumbing</em>
          </span>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#contact">Contact</a>
          <a className="call-btn" href={CALL_HREF}>
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
          <button
            className="menu-btn"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={`mobile-menu${open ? " open" : ""}`}
        id="mobile-menu"
        aria-hidden={!open}
      >
        <a href="#services" onClick={close}>Services</a>
        <a href="#why" onClick={close}>Why Us</a>
        <a href="#contact" onClick={close}>Contact</a>
        <a className="call-btn lg" href={CALL_HREF} onClick={close}>
          <PhoneIcon />
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}
