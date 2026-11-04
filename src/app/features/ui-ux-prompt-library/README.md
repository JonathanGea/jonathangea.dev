# UI/UX Prompt Library

Standalone Angular feature, lazy-loaded at `/ui-ux-prompt-library`. The catalog contains 13 Layout prompts, including Bento Grid and twelve web page patterns; no external runtime, backend, iframe, or remote images are required by this feature.

- `data/prompts.json`: metadata and prompt text only. `id` and `slug` must be unique.
- `data/prompt-catalog.ts`: catalog validation and category derivation.
- `previews/`: independent standalone previews, with locally scoped styles and cleanup for observers/timers.
- `previews/preview-registry.ts`: the sole `previewId` → component mapping.
- `components/`: reusable search, filter, card, dynamic preview host, and native dialog.
- `pages/prompt-library/`: collection state and page layout.

To add a prompt, create its standalone component under `previews/`, register its key, and add the JSON entry using that key as `previewId`. Keep template markup out of JSON. Replaying remounts only the selected preview and resets its local state.

The native modal provides keyboard focus containment and Escape dismissal. Closing restores focus and body scrolling. Clipboard success is announced only after writing succeeds; denied clipboard access selects the prompt for manual copying. Motion respects `prefers-reduced-motion`. Toast auto-dismiss pauses while either pointer or keyboard focus remains inside the notification.

Validation from the repository root:

```sh
npm run build
CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=ChromeHeadless
```

Browser review should cover the desktop/mobile menu, all preview controls, combined search/category filters, empty-result reset, every modal's registry mapping, replay and copy, Tab/Shift+Tab/Escape behavior, reduced motion, and the existing `/` and `/projects/portal-berita` routes. Commerce cart, subscription, and dashboard data are local demos with explicit feedback, not backend operations.

## Web page layouts

The Layout category includes all twelve reference patterns: Single Column, Two Column, Grid Layout, F-Pattern, Z-Pattern, Split Screen, Magazine, Asymmetrical, Holy Grail, Masonry, Hero Landing, and Full-Screen. Search their names or use-case tags, open details, and copy the implementation prompt.

`layout-*` registry keys use `LayoutPreview`; `PromptPreview` passes the key suffix as its required layout input. Shared static browser chrome and per-pattern CSS keep wireframes consistent in cards and dialogs. F/Z overlays illustrate scanning paths; masonry uses varied card heights while grid uses aligned rows. These are compact structural diagrams, not full website demos; each copied prompt specifies responsive behavior for the resulting implementation. No external assets or new dependencies are needed.

## Library interface

The surrounding library UI follows the portfolio homepage: white surfaces, neutral text and borders, bold headings with an outline accent, and black primary actions. The shared navbar uses the same surface across routes; the current library link retains a neutral active indicator. Search, category filters, cards, empty state, details, and clipboard feedback use Indonesian labels; catalog names and AI prompt text remain unchanged. Demo components retain their own visual styles to illustrate different UI patterns. A skip link leads directly to the collection.
