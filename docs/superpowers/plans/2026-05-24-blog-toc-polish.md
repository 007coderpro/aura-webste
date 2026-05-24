# Blog TOC Polish Implementation Plan
> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

## Files
- `src/app/blog/[slug]/page.tsx`: Restyle the article table of contents with a lighter glass panel, clearer section hierarchy, compact rows, and Aura-aligned blue accents.
- `test/blog-toc-style.test.mjs`: Strengthen style-contract assertions for the polished TOC.

## Task 1: Blog Table Of Contents
- [x] **Step 1: Write the failing test** for the new compact premium index contract: gradient glass panel, blue accent line, lighter rows, and simplified subsection rows.
- [x] **Step 2: Verify the test fails** before production edits.
- [x] **Step 3: Write minimal implementation** in `src/app/blog/[slug]/page.tsx`.
- [x] **Step 4: Verify tests pass** with the focused TOC test.
- [x] **Step 5: Run visual verification** in a browser against the example torrenting article.
