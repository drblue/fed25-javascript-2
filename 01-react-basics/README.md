# 01-react-basics

Create a new Vite-app with the React TypeScript template:

```bash
npm create vite@latest 01-react-basics -- --template react-ts
```

Removed some unneccessary files like `src/assets`, `src/App.css`, `src/index.css`, `public/icons.svg` and clear out most of `App.tsx`.

Install SASS and Bootstrap:

```bash
npm install -D -E sass@1.77.6
npm install -D bootstrap
```

Import Bootstrap in `src/assets/scss/App.scss`:

```scss
@import "bootstrap/scss/bootstrap";
```

And finally import the SCSS-file in `App.tsx`:

```ts
import "./assets/scss/App.scss";
```
