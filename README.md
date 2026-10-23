# ItsChinuCr7 — Personal Portfolio

A dark, editorial-style portfolio for Chinmay Sanjay Chaudhari. Built with React + Vite, scroll-triggered Framer Motion animations, Lucide icons, and a public GitHub repository feed. Designed to deploy to Cloudflare Pages through GitHub integration.

## Features

- Sticky responsive navigation with active-section tracking and a scroll progress bar.
- Scroll-reveal sections and parallax-style hero movement, with reduced-motion support.
- Resume download (`public/resume.pdf`).
- Resume-grounded experience, project, education, skill, and certification content.
- Live public repository list fetched from `api.github.com` without a token; filtering, star/fork counts, language labels, and graceful rate-limit/error states.
- Personal travel/photography section. **Gallery imagery is sample imagery**: replace it with your own pictures before publishing.
- Responsive layout, social metadata, favicon, robots.txt, and custom SVG social card.

## Requirements

- Node.js 20.19+ or 22.12+ recommended for current Vite 7 releases.
- npm (bundled with Node.js).
- VS Code (recommended editor).

## Run locally

1. Extract/open this folder in VS Code.
2. Open **Terminal → New Terminal** from VS Code.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the local server:

   ```bash
   npm run dev
   ```

5. Open the URL Vite prints (normally `http://localhost:5173`). Changes refresh in the browser.

Create a production build with:

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Personalise it before publishing

Edit `src/data/portfolio.js`:

- Confirm all resume-derived dates, job details, certifications, project summaries and metrics.
- Set `linkedinUrl` to your exact LinkedIn URL, or leave it blank to hide that contact link.
- If you rename your GitHub handle, update `githubUsername` and `githubUrl`.
- The AI Document Intelligence and Smart Fall Detection project cards are linked to `Bot_with_validation-` and `MOE` respectively. Check those links and their repository contents before publishing. Other featured project cards open the profile's repositories list until you confirm their exact repository URLs.
- The GitHub list currently shows public, non-forked, non-archived repositories and sorts them by stars, then recent activity. The selected-project links currently open the GitHub profile repository list, rather than claiming an unverified one-to-one project/repository match. You can replace them with exact repository URLs after checking each repo.
- Replace `fieldNotes` image URLs with local paths such as `/images/my-travel-photo.jpg`. Put files under `public/images/`. Replace the sample titles, locations and captions with your own.
- Add a portrait only if you want one. The hero is intentionally built around an abstract orbit graphic so it does not invent or use a stock portrait of you.
- Review the PDF in `public/resume.pdf` before deployment. Your resume contains contact details; anyone who can access the public portfolio can download the PDF.
- Review every linked public repository for leaked credentials or private data before sharing it. In particular, the public `MOE` repository listing includes a `sec.env` file; inspect it and remove/rotate any real credentials it may contain.

### Add your own images

1. Copy image files into `public/images/`.
2. In `src/data/portfolio.js`, update each `fieldNotes` entry's `image` property, for example:

   ```js
   image: '/images/udaipur-evening.jpg'
   ```

3. Use descriptive `alt` text and compress large photos before publishing.

## Publish to GitHub

The configured GitHub handle is `ItsChinuCr7`. Create a new repository under that account, e.g. `portfolio` (or use a repository you already own). Do not initialise it with a second README if you already plan to push this folder as-is.

From the extracted project folder, run these commands after creating the empty repository on GitHub:

```bash
git init
git add .
git commit -m "Build personal portfolio"
git branch -M main
git remote add origin https://github.com/ItsChinuCr7/portfolio.git
git push -u origin main
```

If you choose a different repository name, replace `portfolio` in the remote URL. If `git remote add origin` says the remote already exists, inspect it with `git remote -v` instead of adding it again.

## Deploy to Cloudflare Pages (free static hosting)

1. Sign in to Cloudflare and open **Workers & Pages**.
2. Choose **Create application → Pages → Import an existing Git repository**.
3. Connect GitHub and select your repository.
4. Configure the build:

   | Setting | Value |
   |---|---|
   | Production branch | `main` |
   | Framework preset | `Vite` (if available) |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | leave blank for a repository whose root is this project |

5. Start the first deployment. Cloudflare provides a `*.pages.dev` address.
6. After setup, pushes to the production branch will trigger a new deployment.

No GitHub token or secret is required for reading public repository information. Do not put private API tokens in client-side source code.

Official guide: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/

## Deployment notes

- `vite.config.js` uses `base: '/'`, suitable for Cloudflare Pages at the domain root.
- This is a frontend-only static site. Cloudflare Pages serves it without a paid server.
- GitHub's unauthenticated API has rate limits. If a request is rate-limited or the username is wrong, the page displays an error state; the featured projects stay visible.
- Contact uses a `mailto:` link; it does not silently pretend there is a form backend.
- Stock image URLs in the field-notes gallery require an internet connection until replaced by local photos.

## Content notes

Resume-based details were taken from the supplied two-page resume. The page copy around personal curiosity, photography, and travel is editorial framing and should be edited to reflect what you want to share publicly.

## Troubleshooting: black screen

The first generated version contained two render-time JavaScript errors. The corrected project removes a reference to the missing `project.repoAliases` field and uses the imported `BriefcaseBusiness` icon in the timeline. `src/main.jsx` also contains a React error boundary that shows a readable message if another render error occurs.

If you already extracted the earlier ZIP, either download and extract the corrected ZIP into a fresh folder, or make these changes manually:

1. In `src/App.jsx`, remove `const matchedText = project.repoAliases.join(' ')` from `ProjectCard`; the value was unused and the field was not present in project data.
2. In `src/App.jsx`, replace `<Briefcase size={16} />` with `<BriefcaseBusiness size={16} />`.
3. Save files, stop Vite with `Ctrl+C`, then run `npm install` and `npm run dev` again.
4. In Cloudflare Pages, push the corrected source to the connected branch and confirm the latest deployment finished successfully.
5. If the screen is still blank, open browser DevTools (`F12` → **Console**) and inspect the first red error. The new error boundary should also show the rendering error on the page when a React component throws.

A production build has not been verified in this environment because the package registry timed out during `npm install`. Run `npm run build` locally before deploying.
