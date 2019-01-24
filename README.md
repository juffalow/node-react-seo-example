# Node React SEO Example

Example how to setup server side rendering.

## Installation

```bash
$ yarn install

# or if you use npm

$ npm i
```

## How it works

You can run the project like a regular React project with `yarn start`
and if you want to try server side rendering `yarn run server`.

This will create a server listening on `localhost:8088`.

### Routes

Root page `http://localhost:8088/` renders Home page with initial title and description.
If you go to StarWars -> Luke Skywalker ( `http://localhost:8088/star-wars/1` )
and refresh the page, node server will use `puppeteer` to get the data, render the page
and return it. And if you go to StarWars -> Darth Wader and reload the page,
node server will also return the page pre-rendered, but this time the server hase to
download all data needed to render it, inject them into the page, render it
with `React.renderToString` and then return.
