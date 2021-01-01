import Slides from './slides';

describe('0 item', () => {
  const slides = new Slides([], {});
  const expectedCurIndex = null;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([]);
  });
  it('has no index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move left', () => {
    slides.calibrateIndex(-1);
    slides.calibrateIndex(-1);
    expect(slides.updateIndex(-1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move right', () => {
    slides.calibrateIndex(+1);
    slides.calibrateIndex(+1);
    expect(slides.updateIndex(+1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
});

const items = [1, 2, 3, 4, 5, 6];

describe('6 items', () => {
  const slides = new Slides(items, {});
  const expectedCurIndex = 0;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([1, 2, 3, 4, 5, 6]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move left', () => {
    slides.calibrateIndex(-1);
    slides.calibrateIndex(-1);
    expect(slides.updateIndex(-1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('can move right', () => {
    slides.calibrateIndex(+1);
    slides.calibrateIndex(+1);
    expect(slides.updateIndex(+1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex + 1);
  });
});

describe('6 items, rtl', () => {
  const slides = new Slides(items, { rtl: true });
  const expectedCurIndex = 5;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('cannot move right', () => {
    slides.calibrateIndex(+1);
    slides.calibrateIndex(+1);
    expect(slides.updateIndex(+1)).toBe(false);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('can move left', () => {
    slides.calibrateIndex(-1);
    slides.calibrateIndex(-1);
    expect(slides.updateIndex(-1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex - 1);
  });
});

describe('6 items, loop', () => {
  const slides = new Slides(items, { loop: true });
  const expectedCurIndex = 1;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([6, 1, 2, 3, 4, 5, 6, 1]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
  it('can move left', () => {
    slides.calibrateIndex(-1);
    slides.calibrateIndex(-1);
    expect(slides.updateIndex(-1)).toBe(true);
    expect(slides.curIndex).toBe(6);
  });
  it('can move right', () => {
    slides.calibrateIndex(+1);
    slides.calibrateIndex(+1);
    expect(slides.updateIndex(+1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
});

describe('6 items, rtl, loop', () => {
  const slides = new Slides(items, { rtl: true, loop: true });
  const expectedCurIndex = 6;
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([1, 6, 5, 4, 3, 2, 1, 6]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(6);
  });
  it('can move left', () => {
    slides.calibrateIndex(-1);
    slides.calibrateIndex(-1);
    expect(slides.updateIndex(-1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex - 1);
  });
  it('can move right', () => {
    slides.calibrateIndex(+1);
    slides.calibrateIndex(+1);
    expect(slides.updateIndex(+1)).toBe(true);
    expect(slides.curIndex).toBe(expectedCurIndex);
  });
});
