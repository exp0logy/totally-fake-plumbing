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
