import ScrollEffects from "@/components/ScrollEffects";
import ScrollVideoHero from "@/components/ScrollVideoHero";
import SiteNav from "@/components/SiteChrome";
import { CALL_HREF, EMAIL, PHONE_DISPLAY, PhoneIcon, TickIcon } from "@/components/shared";

const SERVICES = [
  {
    title: "24/7 Emergency Plumbing",
    body: "Burst pipes, major leaks, sewage backups. On the road within the hour, any hour — weekends and public holidays included.",
    icon: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />,
  },
  {
    title: "Hot Water Systems",
    body: "Repair, replacement and new installs — gas, electric, solar and heat pump. Same-day hot water back on, guaranteed.",
    icon: <path d="M12 3c-3 4-6 7.2-6 11a6 6 0 0 0 12 0c0-3.8-3-7-6-11z" />,
  },
  {
    title: "Blocked Drains",
    body: "CCTV inspection, high-pressure jet blasting and no-dig pipe relining. We find the real cause, not just the symptom.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </>
    ),
  },
  {
    title: "Gas Fitting",
    body: "Licensed gas fitters for cooktops, heaters, BBQ points and leak detection. Compliance certificates issued on the spot.",
    icon: (
      <>
        <path d="M8 3v4M12 3v4M16 3v4M5 7h14v4a7 7 0 0 1-14 0V7z" />
        <path d="M12 18v3" />
      </>
    ),
  },
  {
    title: "Bathroom Renovations",
    body: "From rough-in to fit-off. We work alongside your builder or manage the wet-area work end to end.",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 12h18M12 3v18" />
      </>
    ),
  },
  {
    title: "Leak Detection",
    body: "Acoustic and thermal-imaging tech to pinpoint hidden leaks behind walls and under slabs — before they become a rebuild.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
];

const STATS = [
  { value: "15+", label: "Years serving Sydney homes and businesses", count: "15", suffix: "+" },
  { value: "12,000+", label: "Jobs completed — and counting", count: "12000", suffix: "+" },
  { value: "<60min", label: "Average emergency response time, metro-wide", count: "60", prefix: "<", suffix: "min" },
  { value: "4.9★", label: "Average rating from 900+ imaginary reviews", count: "4.9", decimals: "1", suffix: "★" },
];

const WHY = [
  { strong: "Upfront fixed pricing.", rest: "You approve the quote before a single tool comes off the truck." },
  { strong: "Lifetime workmanship guarantee.", rest: "If our work ever fails, we fix it free. Simple as that." },
  { strong: "Respect for your home.", rest: "Boot covers, drop sheets, and we leave the site cleaner than we found it." },
  { strong: "Real people, real fast.", rest: "Calls answered by a plumber, not a call centre — 24 hours a day." },
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <ScrollVideoHero />

        <section className="services" id="services" aria-labelledby="services-title">
          <div className="wrap">
            <div className="reveal">
              <p className="sec-kicker">What We Do</p>
              <h2 className="sec-title" id="services-title">
                Every trade under one <em>copper roof.</em>
              </h2>
              <p className="sec-lede">
                Fully licensed and insured for residential and commercial work
                across greater Sydney. Fixed quotes before we start — never a
                surprise on the invoice.
              </p>
            </div>
            <div className="svc-grid">
              {SERVICES.map((s) => (
                <article className="svc reveal" key={s.title}>
                  <div className="svc-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {s.icon}
                    </svg>
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="stats" aria-labelledby="stats-title">
          <div className="wrap">
            <div className="reveal">
              <p className="sec-kicker">The Track Record</p>
              <h2 className="sec-title" id="stats-title">
                Numbers that <em>hold pressure.</em>
              </h2>
            </div>
            <div className="stats-grid">
              {STATS.map((s) => (
                <div className="stat reveal" key={s.label}>
                  <div
                    className="num"
                    data-count={s.count}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                    data-decimals={s.decimals}
                  >
                    {s.value}
                  </div>
                  <div className="lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="why" id="why" aria-labelledby="why-title">
          <div className="wrap">
            <div className="reveal">
              <p className="sec-kicker">Why Totally Fake Plumbing</p>
              <h2 className="sec-title" id="why-title">
                The plumber your neighbours <em>recommend.</em>
              </h2>
              <ul className="check-list">
                {WHY.map((w) => (
                  <li key={w.strong}>
                    <span className="tick">
                      <TickIcon />
                    </span>
                    <span>
                      <strong>{w.strong}</strong> {w.rest}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="badge-row">
                <span className="pill">NSW Lic. 000000X (made up)</span>
                <span className="pill">Fully Fictional</span>
                <span className="pill">Master Plumbers of Nowhere</span>
              </div>
            </div>
            <div className="review-col reveal">
              <figure className="badge-card">
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="quote">
                  “Hot water died on a Sunday night with three kids at home.
                  Totally Fake Plumbing answered on the second ring, arrived
                  within 40 minutes, and had a new system running by lunch the
                  next day. Fixed price, spotless job.”
                </blockquote>
                <figcaption className="who">
                  <span className="avatar" aria-hidden="true">
                    SM
                  </span>
                  <div>
                    <div className="name">Sarah M.</div>
                    <div className="meta">Marrickville · Fictional customer</div>
                  </div>
                </figcaption>
              </figure>
              <figure className="badge-card">
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote className="quote">
                  “Two other plumbers wanted to dig up half the yard for a
                  blocked sewer. Totally Fake Plumbing ran a camera down,
                  relined the pipe in a day — no excavation, and thousands
                  less.”
                </blockquote>
                <figcaption className="who">
                  <span className="avatar" aria-hidden="true">
                    DR
                  </span>
                  <div>
                    <div className="name">David R.</div>
                    <div className="meta">Castle Hill · Also not real</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="cta" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="cta-glow" aria-hidden="true" />
            <div className="reveal">
              <p className="sec-kicker">Get It Sorted Today</p>
              <h2 className="sec-title" id="contact-title" style={{ marginInline: "auto" }}>
                One call. <em>Sorted.</em>
              </h2>
              <a className="phone" href={CALL_HREF}>
                {PHONE_DISPLAY}
              </a>
              <div className="sub">
                24/7 emergency line · Free quotes · Not an actual business
              </div>
              <div className="cta-row">
                <a className="call-btn lg" href={CALL_HREF}>
                  <PhoneIcon />
                  Call now
                </a>
                <a className="ghost-btn" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="foot">
          <div>
            <strong style={{ color: "var(--ink)" }}>
              Totally Fake Plumbing Pty Ltd (not a real company)
            </strong>
            <br />
            ABN 00 000 000 000 · NSW Plumbing Licence 000000X — both invented
            <br />
            This is a demo website. Servicing precisely nobody.
          </div>
          <div style={{ textAlign: "right" }}>
            © 2026 Totally Fake Plumbing. A demo — no plumbers were harmed.
            <br />
            <a href={CALL_HREF}>{PHONE_DISPLAY}</a> ·{" "}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </footer>

      <ScrollEffects />
    </>
  );
}
