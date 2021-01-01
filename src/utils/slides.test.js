import Slides from './slides';

describe('0 item', () => {
  const slides = new Slides([], {});
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([]);
  });
  it('has no index', () => {
    expect(slides.curIndex).toBe(null);
  });
});

const items = [1, 2, 3, 4, 5, 6];

describe('6 items', () => {
  const slides = new Slides(items, { rtl: false, loop: false });
  it('constructs slides', () => {
    expect(slides.curIndex).toBe(0);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(0);
  });
});

describe('6 items, rtl', () => {
  const slides = new Slides(items, { rtl: true, loop: false });
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([6, 5, 4, 3, 2, 1]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(5);
  });
});

describe('6 items, loop', () => {
  const slides = new Slides(items, { rtl: false, loop: true });
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([6, 1, 2, 3, 4, 5, 6, 1]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(1);
  });
});

describe('6 items, rtl, loop', () => {
  const slides = new Slides(items, { rtl: true, loop: true });
  it('constructs slides', () => {
    expect(slides.slides).toStrictEqual([1, 6, 5, 4, 3, 2, 1, 6]);
  });
  it('has index', () => {
    expect(slides.curIndex).toBe(6);
  });
});
