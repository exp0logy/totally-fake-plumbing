"use client";

import { useEffect, useRef } from "react";
import { CALL_HREF, PHONE_DISPLAY, PhoneIcon } from "./shared";

/**
 * Pins a full-viewport video for 520vh of scroll and maps scroll progress to
 * video time (no autoplay). Captions fade in/out at progress milestones.
 * The video asset is encoded with a keyframe on every frame so seeking is
 * cheap enough to drive from scroll.
 */
// Skip the first second of footage (bare wall) so the resting hero frame
// already has pipework on screen.
const SCRUB_START = 0.3;
// Caption start points — also drawn as chapter ticks on the progress rail.
const CHAPTERS = [0, 0.28, 0.56, 0.84];

export default function ScrollVideoHero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    const fill = fillRef.current;
    if (!track || !stage || !video || !fill) return;

    const captions = Array.from(
      stage.querySelectorAll<HTMLElement>(".caption")
    );
    const railDots = Array.from(
      stage.querySelectorAll<HTMLElement>(".rail-dot")
    );
    const reducedMotion = matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let duration = 0;
    let target = 0; // desired video time from scroll
    let current = 0; // smoothed time actually applied
    let rafId = 0;

    const progress = () => {
      const scrollable = track.offsetHeight - innerHeight;
      const y = -track.getBoundingClientRect().top;
      return Math.min(1, Math.max(0, y / scrollable));
    };

    const onScroll = () => {
      const p = progress();
      if (duration) {
        target = SCRUB_START + p * (duration - SCRUB_START - 0.05);
      }
      fill.style.height = `${p * 100}%`;
      stage.classList.toggle("past-start", p > 0.02);
      // Fade the stage down over the last stretch so the exit into the page
      // below doesn't feel like a hard cut.
      if (exitRef.current) {
        exitRef.current.style.opacity = String(
          Math.min(1, Math.max(0, (p - 0.92) / 0.08))
        );
      }
      railDots.forEach((dot, i) => {
        dot.classList.toggle("active", p >= CHAPTERS[i]);
      });
      for (const cap of captions) {
        const from = Number(cap.dataset.from);
        const to = Number(cap.dataset.to);
        cap.classList.toggle("active", p >= from && p < to);
      }
    };

    const arm = () => {
      duration = video.duration || 0;
      onScroll();
      current = target; // start the smoothing from the resting frame
    };
    if (video.readyState >= 1) arm();
    else video.addEventListener("loadedmetadata", arm);

    // Nudge the decoder so the first frame paints without a play() call.
    const paintFirstFrame = () => {
      if (video.currentTime < SCRUB_START) video.currentTime = SCRUB_START;
    };
    if (video.readyState >= 2) paintFirstFrame();
    else video.addEventListener("loadeddata", paintFirstFrame, { once: true });

    const HALF_FRAME = 1 / 24 / 2; // source is 24fps
    const raf = () => {
      if (duration) {
        // Ease toward the target so fast scrolls feel fluid, not stuttery.
        current += (target - current) * (reducedMotion ? 1 : 0.14);
        // Only issue a seek once the previous one has completed — queueing
        // seeks every frame is what makes scrubbing look patchy.
        if (!video.seeking && Math.abs(video.currentTime - current) > HALF_FRAME) {
          video.currentTime = current;
        }
      }
      rafId = requestAnimationFrame(raf);
    };

    onScroll();
    rafId = requestAnimationFrame(raf);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", arm);
      video.removeEventListener("loadeddata", paintFirstFrame);
    };
  }, []);

  return (
    <div className="scrub-track" id="top" ref={trackRef}>
      <div className="scrub-stage" ref={stageRef}>
        <video
          ref={videoRef}
          src="/hero-scrub.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="stage-vignette" />
        <div className="stage-glow" aria-hidden="true" />
        <div className="stage-grain" aria-hidden="true" />
        <div className="stage-exit" ref={exitRef} aria-hidden="true" />

        <div className="caption cap-1" data-from="0" data-to="0.22">
          <p className="kicker">Sydney · 100% Fictional Demo</p>
          <h1>
            Great plumbing is <em>built</em>,<br />
            not patched.
          </h1>
          <p className="body">
            Totally Fake Plumbing — quality workmanship for Sydney homes and
            businesses since never. Keep scrolling to see how we think about
            pipework.
          </p>
        </div>

        <div className="caption cap-2" data-from="0.28" data-to="0.5">
          <p className="kicker">Craftsmanship First</p>
          <p className="h2">
            Every joint.
            <br />
            Every valve.
            <br />
            <em>Done right.</em>
          </p>
          <p className="body">
            No shortcuts, no cover-ups. Work that passes inspection the first
            time — and keeps holding for decades.
          </p>
        </div>

        <div className="caption cap-3" data-from="0.56" data-to="0.78">
          <p className="kicker">Full-Service Trade</p>
          <p className="h2">
            From a leaky tap to a <em>full repipe.</em>
          </p>
          <p className="body">
            Emergency call-outs, hot water systems, blocked drains, gas fitting
            and bathroom renovations — one licensed team for the whole system.
          </p>
        </div>

        <div className="caption cap-4" data-from="0.84" data-to="1.01">
          <p className="kicker">On Time, On Budget, Not Real</p>
          <p className="h2">
            Totally Fake. Plumbing that <em>holds.</em>
          </p>
          <p className="body">
            Upfront fixed pricing, lifetime workmanship guarantee, and a real
            plumber on the phone 24/7. Well — there would be, if we existed.
          </p>
          <div className="cta-row">
            <a className="call-btn lg" href={CALL_HREF}>
              <PhoneIcon />
              Call {PHONE_DISPLAY}
            </a>
            <a className="ghost-btn" href="#services">
              Explore services
            </a>
          </div>
        </div>

        <div className="progress-rail" aria-hidden="true">
          <div className="progress-fill" ref={fillRef} />
          {CHAPTERS.map((f) => (
            <span className="rail-dot" key={f} style={{ top: `${f * 100}%` }} />
          ))}
        </div>
        <div className="scroll-hint" aria-hidden="true">
          Scroll
        </div>
        <aside className="strip hero-strip" aria-label="Emergency call-out">
          <div className="strip-inner">
            <span className="dot" aria-hidden="true" />
            <span>
              <strong>Burst pipe? No hot water?</strong> Emergency plumbers on
              call 24/7 across Sydney —
            </span>
            <a href={CALL_HREF}>{PHONE_DISPLAY}</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
