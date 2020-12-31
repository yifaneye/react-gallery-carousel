import { Slides } from './slides';

test('slides with 0 items', () => {
  const slides = new Slides([], {});
  expect(slides.currentIndex).toBe(null);
  expect(slides.getSlides()).toStrictEqual([]);
  expect(slides.getSlides()).not.toBe([]);
});

const items = [1, 2, 3, 4, 5, 6];

test('slides with 6 items', () => {
  const slides = new Slides(items, {});
  expect(slides.getSlides()).toStrictEqual(items);
  expect(slides.currentIndex).toBe(0);
});

test('slides with 6 items, rtl', () => {
  const slides = new Slides(items, { rtl: true });
  expect(slides.getSlides()).toStrictEqual([6, 5, 4, 3, 2, 1]);
  expect(slides.currentIndex).toBe(5);
});

test('slides with 6 items, loop', () => {
  const slides = new Slides(items, { loop: true });
  expect(slides.getSlides()).toStrictEqual([6, 1, 2, 3, 4, 5, 6, 1]);
  expect(slides.currentIndex).toBe(1);
});

test('slides with 6 items, rtl, loop', () => {
  const slides = new Slides(items, { rtl: true, loop: true });
  expect(slides.getSlides()).toStrictEqual([1, 6, 5, 4, 3, 2, 1, 6]);
  expect(slides.currentIndex).toBe(6);
});
