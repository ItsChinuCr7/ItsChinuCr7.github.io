# Black screen fix

Two render-time exceptions in the earlier generated version could prevent React from rendering the page:

- `ProjectCard` accessed `project.repoAliases.join(' ')`, but project data does not define `repoAliases` and the value was unused.
- `JourneySection` rendered `<Briefcase />`, although the file imported `BriefcaseBusiness` instead.

Both issues are fixed in this folder. A React error boundary has also been added to `src/main.jsx` so a future rendering exception shows an on-screen message instead of only a blank dark page.

## Run the corrected project

```bash
npm install
npm run dev
```

Before deployment, run:

```bash
npm run build
```

Then commit and push the corrected files to the branch connected to Cloudflare Pages. Confirm that the newest deployment succeeds.

If it still fails, open browser DevTools with `F12`, select **Console**, and share the first red error message.

Note: `npm install` could not be completed in the build environment because the npm registry connection timed out, so the production build remains unverified here.
