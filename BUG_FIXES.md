# INTERIORA fixes

## Blank white page
The 3D scene is now isolated behind a React error boundary. If WebGL/Three.js throws during
mount or rendering, the rest of the application stays mounted instead of collapsing into a
blank page. The global error boundary also provides a recoverable reload state.

The existing WebGL capability check and image fallback remain in place.

## Light / dark mode
A persistent theme provider was added. The selected theme is stored in localStorage and applied
to the document using `data-theme="light|dark"` and `color-scheme`.

Theme controls are available in the desktop navigation and footer, with a compact icon control
on smaller screens. Existing routes and workflow are unchanged.
