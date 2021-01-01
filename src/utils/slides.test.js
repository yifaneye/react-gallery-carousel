import { Slides } from './slides';

test('slides with 0 items', () => {
  const slides = new Slides([], {});
  expect(slides.slides).toStrictEqual([]);
  expect(slides.curIndex).toBe(null);
});

const items = [1, 2, 3, 4, 5, 6];

test('slides with 6 items', () => {
  const slides = new Slides(items, {});
  expect(slides.slides).toStrictEqual(items);
  expect(slides.curIndex).toBe(0);
});

test('slides with 6 items, rtl', () => {
  const slides = new Slides(items, { rtl: true });
  expect(slides.slides).toStrictEqual([6, 5, 4, 3, 2, 1]);
  expect(slides.curIndex).toBe(5);
});

test('slides with 6 items, loop', () => {
  const slides = new Slides(items, { loop: true });
  expect(slides.slides).toStrictEqual([6, 1, 2, 3, 4, 5, 6, 1]);
  expect(slides.curIndex).toBe(1);
});

test('slides with 6 items, rtl, loop', () => {
  const slides = new Slides(items, { rtl: true, loop: true });
  expect(slides.slides).toStrictEqual([1, 6, 5, 4, 3, 2, 1, 6]);
  expect(slides.curIndex).toBe(6);
});
