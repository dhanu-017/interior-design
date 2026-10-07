# Scroll + Navigation Update

- Kept one primary hero image per cinematic page.
- Increased the single-image parallax range so the background visibly travels with scroll instead of appearing static.
- Kept transforms GPU-friendly with `translate3d`, `scale`, and `backface-visibility`.
- Added subtle grain movement tied to scroll progress.
- Removed navigation `mix-blend-mode: difference`, which could make Home / Residential / Commercial / Process / Portfolio unreadable depending on the image underneath.
- Navigation now uses theme-aware foreground/background/border colors and a translucent blurred surface, so labels remain readable in both light and dark mode.
- Existing workflow, routes, theme toggle, and one-image-per-page design are unchanged.
