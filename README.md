# Totally Fake Plumbing 🚰

A landing page for a plumbing business that does not exist — built to show off a
**scroll-scrubbed hero video**: the copper pipework assembles itself as you
scroll, with the video's playback position mapped directly to scroll progress
instead of autoplaying.

**Live demo → https://nimble-sopapillas-8c292d.netlify.app/**

## How the scroll-scrub works

- The hero video is re-encoded as **all-keyframe H.264** (`-g 1`), so every
  frame is independently seekable — that's what makes scrubbing frame-accurate
  instead of jumping between sparse keyframes.
- A sticky full-viewport stage is pinned inside a tall scroll track. Scroll
  progress through the track maps to `video.currentTime`.
- A `requestAnimationFrame` loop eases the current time toward the scroll
  target, and only issues a new seek once the previous one has decoded —
  queueing seeks every frame is what makes naive implementations stutter.
- Captions, chapter ticks on the progress rail, and an exit fade are all keyed
  to the same scroll progress value.

## Stack

- [Next.js](https://nextjs.org) (App Router, fully static output)
- No animation libraries — hand-rolled scroll mapping, IntersectionObserver
  reveals, and CSS transitions
- SEO: metadata API, Open Graph/Twitter cards, JSON-LD, sitemap, robots

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Reuse the technique with your own video

Encode your clip with a keyframe on every frame and drop it in `public/`:

```bash
ffmpeg -i input.mp4 -vf scale=1920:-2 -c:v libx264 -preset slow -crf 21 \
  -pix_fmt yuv420p -g 1 -movflags +faststart -an public/hero-scrub.mp4
```

The scrub logic lives in `components/ScrollVideoHero.tsx`; track length and
styling in `app/globals.css` (`.scrub-track`).

## Disclaimer

Totally Fake Plumbing is, as advertised, totally fake. The phone number rings
nowhere, the licence number is invented, and the glowing reviews were written
by no one. Please do not call 1300 NOT REAL with a real emergency.

## License

[MIT](LICENSE) — use it, modify it, ship it, no permission needed. Keeping the
license notice (and a mention) is all that's asked.
