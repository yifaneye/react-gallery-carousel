import { Slides } from './slides';

test('Instantiate slides not a clone', () => {
  const slides = new Slides([], {});
  expect(slides.getSlides()).toStrictEqual([]);
  expect(slides.getSlides()).not.toBe([]);
});

const items = [1, 2, 3, 4, 5, 6];

test('Slides', () => {
  const slides = new Slides(items, {});
  expect(slides.getSlides()).toStrictEqual(items);
});

test('Slides with rtl', () => {
  const slides = new Slides(items, { rtl: true });
  expect(slides.getSlides()).toStrictEqual([6, 5, 4, 3, 2, 1]);
});

test('Slides with loop', () => {
  const slides = new Slides(items, { loop: true });
  expect(slides.getSlides()).toStrictEqual([6, 1, 2, 3, 4, 5, 6, 1]);
});

test('Slides with rtl and loop', () => {
  const slides = new Slides(items, { rtl: true, loop: true });
  expect(slides.getSlides()).toStrictEqual([1, 6, 5, 4, 3, 2, 1, 6]);
});
