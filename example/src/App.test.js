import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import puppeteer from 'puppeteer';
const { test, it, expect } = global;

it('renders without crashing', () => {
  // since .scrollTo() isn't implemented in jsdom
  Element.prototype.scrollTo = () => {};

  global.IntersectionObserver = function () {
    return {
      observe: () => {},
      disconnect: () => {}
    };
  };

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {}
    })
  });

  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// automated browser (e2e) testing
test('Carousel can be controlled', async () => {
  const browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 100,
    // devtools: true,
    // product: 'firefox',
    // args: ['--window-size=998, 1178']
  });

  const page = await browser.newPage();
  const navigationPromise = page.waitForNavigation();
  await page.goto('http://localhost:3000');
  await page.setViewport({ width: 998, height: 1178 });
  await navigationPromise;
  await page.waitForTimeout(1000);

  // await page.waitForSelector('[aria-label="Pause Autoplay"]');
  await page.click('[aria-label="Pause Autoplay"]');

  // await page.waitForSelector('[aria-label="Go to Next Slide"]');
  await page.click('[aria-label="Go to Next Slide"]');

  // await page.waitForSelector('[aria-label="Go to Previous Slide"]');
  await page.click('[aria-label="Go to Previous Slide"]');

  // await page.waitForSelector('[aria-label="Maximize Slides"]');
  await page.click('[aria-label="Maximize Slides"]');

  // await page.waitForSelector('[aria-label="Minimize Slides"]');
  await page.click('[aria-label="Minimize Slides"]');

  // await page.waitForSelector('[aria-label="Go to Slide 3"]');
  await page.click('[aria-label="Go to Slide 3"]');

  const index = await page.$eval(
    '[aria-label="Slide 3 of 3"]',
    (el) => el.textContent
  );
  expect(index).toBe('3 / 3');

  // await page.screenshot({ path: 'record/screenshot.jpg' });
  // await page.pdf({ path: 'record/print.pdf', format: 'a4' });

  await browser.close();
});
