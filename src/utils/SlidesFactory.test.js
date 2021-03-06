import SlidesFactory from './SlidesFactory';
const { describe, it, expect } = global;

const slidesFactory = new SlidesFactory();

describe('0 item without RTL', () => {
  const slides = slidesFactory.CreateSlides([], {});
  const expectedCurIndex = undefined;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([]);
  });
  it('does not have index', () => {
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

const items = [1, 2, 3, 4, 5, 6];

describe('6 items without RTL', () => {
  const slides = slidesFactory.CreateSlides(items, {});
  const expectedCurIndex = 0;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  it('has correct index', () => {
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
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  it('has correct index', () => {
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
