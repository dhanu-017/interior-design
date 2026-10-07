# INTERIORA — Smooth single-image cinematic update

## What changed
- Each cinematic page now loads **one hero image** for its pinned scroll scene.
- Removed the multi-image crossfade stack from the cinematic stage.
- Removed the heavy live Three.js scene from the scroll-driven hero path.
- Replaced the image swapping with one continuous eased `translate3d + scale` animation.
- Shortened the pinned scene durations so the animation completes faster while scrolling.
- Kept the existing page structure, copy, routes, project sections, navigation, and lower-page galleries intact.
- Reduced-motion mode also uses one hero image.

## Hero image selection
The final/finished image in each page's state list is used as the single cinematic hero image. This gives the hero a polished finished-interior look while the text still changes through the existing scroll timeline.

## Run
```bash
npm install
npm run dev
```

For production:
```bash
npm run build
```
