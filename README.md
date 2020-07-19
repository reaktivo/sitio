### sitio

Sitio is an experimental static site building tool.

### Goals

- Distribution as a single file executable binary
- No external dependencies
- Maintaining binary file size below 1mb

### Non-goals
- Provide a Deno or NodeJS compatible API
- Client side javascript rehydration

### How to

```sh
mkdir -p my-site/pages
code my-site/pages/index.js
```

```js
// my-site/components/layout.js

export default function layout({ title, children }) {
  return html`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html>
  `;
}
```

```js
// my-site/pages/index.js

import layout from '../components/layout.js';
export default function index() {
  return layout({
    children: html`
      <h1>Hello world</h1>
    `;
  })
}
```

### Globals

Sitio exposes a few globals to the JS runtime

#### html

The html string template function not only helps by hinting to
IDEs that a string is a piece of html markup, but also helps
by allowing for promises contained within it to be resolved.

```js
export default function example() {
  return html`<h1>${Promise.resolve('Title')}</h1>`;
}
```

#### fetch

Sitio provides a `fetch`-like function that is exposed globally.
Sitio's `fetch` has a few limitations:

- Limited to `GET` requests
- At the moment there's no way of including request headers

See [`urlGet`](https://bellard.org/quickjs/quickjs.html#Global-objects)

### Usage

Go to your site folder

```sh
cd my-site
sitio
```
