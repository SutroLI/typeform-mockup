# Sutro Li Survey Mockup

A static single-page Typeform-style survey mockup. No backend — for display/demo only. Hostable on GitHub Pages.

## Quick Start

1. Open `index.html` in a browser, or run a local server:
   ```bash
   cd typeform-mockup
   python3 -m http.server 8000
   ```
   Then visit http://localhost:8000

2. Edit `config.js` to change questions, theme colors, or participant count.

## Project Structure

- `index.html` — Welcome screen, survey container, thank-you screen
- `config.js` — Survey questions and theme (edit here)
- `styles.css` — Styling (#1fb8e9 accent)
- `survey.js` — Question flow, next/back, progress
- `assets/logo_animation_final_half.png` — LI logo

## Deploy to GitHub Pages

1. Create a repo and push this folder
2. Settings → Pages → Source: Deploy from a branch
3. Branch: `main`, folder: `/ (root)`
4. Site will be at `https://<username>.github.io/<repo-name>/`

## Editing the Survey

- **Questions**: Edit the `questions` array in `config.js`
- **Question types**: `short_text`, `long_text`, `multiple_choice`, `yes_no`
- **Theme**: Change `theme.accentColor` (default `#1fb8e9`)
- **Logo**: Replace `assets/logo_animation_final_half.png` with your own
