import SlidesFactory from './SlidesFactory';
const { describe, it, expect } = global;

const slidesFactory = new SlidesFactory();

// Tests for base cases
const items = [1, 2, 3, 4, 5, 6];

describe('6 items without RTL', () => {
  const slides = slidesFactory.CreateSlides(items, {});
  const expectedCurIndex = 0;
  it('has slides in the correct order', () => {
    expect(slides.slides).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  it('has the correct current index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move left', () => {
    expect(slides.calibrateIndex(-1)).toBe(false);
    expect(slides.updateIndex(-1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('can move right', () => {
    expect(slides.calibrateIndex(+1)).toBe(false);
    expect(slides.updateIndex(+1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex + 1);
  });
});

describe('6 items with RTL', () => {
  const slides = slidesFactory.CreateSlides(items, { isRTL: true });
  const expectedCurIndex = 0;
  it('has slides in the correct order', () => {
    expect(slides.slides).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  it('has the correct current index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move right', () => {
    expect(slides.calibrateIndex(-1)).toBe(false);
    expect(slides.updateIndex(-1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('can move left', () => {
    expect(slides.calibrateIndex(+1)).toBe(false);
    expect(slides.updateIndex(+1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex + 1);
  });
});

// Test for edge case
describe('0 item without RTL', () => {
  const slides = slidesFactory.CreateSlides([], {});
  const expectedCurIndex = undefined;
  it('does not have a slide', () => {
    expect(slides.slides).toStrictEqual([]);
  });
  it('does not have current index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move left', () => {
    expect(slides.calibrateIndex(-1)).toBe(false);
    expect(slides.updateIndex(-1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move right', () => {
    expect(slides.calibrateIndex(+1)).toBe(false);
    expect(slides.updateIndex(+1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
});
