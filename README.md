# Ahmed Al Sunbati – Portfolio

## GitHub Pages deploy

1. **Deploy:** `npm run deploy` (builds and pushes `dist/` to the `gh-pages` branch).
2. **Turn on Pages:** In the repo on GitHub go to **Settings → Pages**. Under "Build and deployment":
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` (not main)
   - **Folder:** / (root)
   - Save
3. **URL:** After a minute or two the site is at `https://<username>.github.io/<repo-name>/`.  
   The config is set for repo **ahmed-alsunbati**: use `https://ahmedalsunbati712.github.io/ahmed-alsunbati/`.  
   If your repo is named something else (e.g. mywebsite), change `base` in `vite.config.js` to `"/your-repo-name/"` and `homepage` in `package.json` to match, then run `npm run deploy` again.

If you see 404, the usual cause is Pages still set to the **main** branch instead of **gh-pages**.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
