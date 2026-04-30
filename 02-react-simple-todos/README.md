# React Simple Todos

## Re-create

```sh
npm create vite@latest 02-react-simple-todos -- --template react-ts
npm install -D -E sass@1.77.6
npm install -D bootstrap
rm public/favicon.svg public/icons.svg src/App.css src/index.css
rm -r src/assets
touch public/.gitkeep
```

Import Bootstrap in `src/assets/scss/App.scss`:

```scss
@import "bootstrap/scss/bootstrap";
```

And finally import the SCSS-file in `App.tsx`:

```ts
import "./assets/scss/App.scss";
```
