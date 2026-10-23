# Deploy checklist — signature refresh

1. Back up your working portfolio directory.
2. Extract the ZIP into `D:\itschinu-portfolio\itschinu-portfolio`, replacing matching files but preserving `.git`.
3. Use Node.js 22 or a supported Node version from `package.json`.
4. Run `npm install`.
5. Run `npm run build` and confirm success.
6. Run `npm run preview` and test desktop/mobile navigation, repository loading, résumé modal/download, field guide, both initiative visuals and photo lightbox.
7. Commit and push to `main`; do not force-push.
8. Check GitHub Actions and verify `https://itschinucr7.github.io/` after deployment.

The code atmosphere is decorative only. Check that no motion obscures text and confirm reduced-motion behavior before release.
