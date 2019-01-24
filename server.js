import express from "express";
import puppeteer from 'puppeteer';
import fs from 'fs';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App';
import { StaticRouter as Router } from 'react-router-dom';

const app = express();
const port = 8088;
const readFile = (path, opts = 'utf8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) {
        reject(err);
      } else  {
        resolve(data);
      }
    });
  });
};

app.use(express.static('build'));

/*
 * This solution si using React.renderToString.
 */
app.get('/star-wars-preloaded/4', async (req, res) => {
  const data = {
    name: 'Darth Vader',
    height: 202,
    mass: 136,
    skin_color: 'white'
  };

  const markup = renderToString(<Router location="/star-wars-preloaded/4" context={data}><App /></Router>);
  const html = await readFile('build/index.html', 'utf8');

  const withData = html.replace('</title>', `</title><script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>`);
  const withMarkup = withData.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

  res.send(withMarkup);
});

/*
 * This solution is using puppeteer.
 * It renders the whole application, waits until it loads
 * everything it needs and send the html back to the client.
 */
app.get('/star-wars/:id', async (req, res) => {
  const data = await readFile('build/index.html', 'utf8');

  const browser = req.app.get('browser');
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  /*
   * Here, we "mock" requesting for any data and limit it just
   * for the basic html => it returns the index.html file for
   * page load and any other fetch / resource load will not be
   * changed.
   */
  page.on('request', request => {
    if (request.url() === `http://localhost:${port}/star-wars/${req.params.id}`) {
      request.respond({
        status: 200,
        contentType: 'text/html',
        body: data
      });
    } else {
      request.continue();
    }
  });
  /*
   * We cannot use here just page.setContent(data) because
   * it would just render the application root page.
   * Therefore we need ot let the application know, which URL
   * we want it to render.
   */
  await page.goto(`http://localhost:${port}/star-wars/${req.params.id}`, { waitUntil: 'networkidle2' });
  /*
   * In the previous call we wait for React app to download
   * everything it needs, but from time to time, you can
   * see that in the response, the detail page is not rendered.
   * This is caused (probably) by render function -> it is called
   * after the app fetches everything. If we call page.content()
   * immediately, than there is a possibility it will not be
   * rendered yet.
   */
  await page.waitFor(100);
  const content = await page.content();

  page.close();

  res.write(content);
  res.end();
});

app.get('*', (req, res) => {
  res.withFile('build/index.html');
});

async function start() {
  /*
   * Store browser in express app, so that we do not need
   * to start it again every time.
   */
  app.set('browser', await puppeteer.launch({ headless: true }));
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}

start();