// keep SlidesFactory for future use (for other features)
export default class SlidesFactory {
  CreateSlides(slides, options) {
    // if (options.isRTL) return new SlidesWithRTL(slides, options);
    return new Slides(slides, options);
  }
}

class Slides {
  constructor(items, { index, isLoop = false }) {
    this._isLoop = isLoop;

    // generate _slides
    this._slides = items;
    if (!this._slides || !this._slides.length) return;
    this._length = this._slides.length;

    // calculate indices
    this._minIndex = 0;
    this._maxIndex = this._length - 1;
    this._headIndex = this._minIndex;
    this._curIndex = this._convertCurIndexForDisplayToCurIndex(index);
  }

  _isIndexInRange(index) {
    return this._minIndex <= index && index <= this._maxIndex;
  }

  _convertCurIndexForDisplayToCurIndex(index) {
    if (!index) return this._headIndex;
    if (!this._isIndexInRange(index)) return this._headIndex;
    return index;
  }

  get slides() {
    return this._slides;
  }

  get length() {
    return this._length;
  }

  get curIndex() {
    return this._curIndex;
  }

  get curIndexForDisplay() {
    return this._curIndex + 1;
  }

  isMinIndex() {
    return this._curIndex === this._minIndex;
  }

  isMaxIndex() {
    return this._curIndex === this._maxIndex;
  }

  static _range(min, max) {
    const length = max - min + 1;
    return Array(length)
      .fill(min)
      .map((x, index) => x + index);
  }

  get allIndices() {
    if (!this._length) return [];
    return this.constructor._range(this._minIndex, this._maxIndex);
  }

  calibrateIndex(change) {
    if (!this._length) return false;
    if (!this._isLoop) return false;
    if (this._curIndex === this._minIndex && change < 0) {
      this._curIndex = this._maxIndex + 1;
      return true;
    } else if (this._curIndex === this._maxIndex && change > 0) {
      this._curIndex = this._minIndex - 1;
      return true;
    }
    return false;
  }

  canUpdateIndex(change) {
    if (!this._length) return false;
    if (change === 0) return false;
    if (this._isLoop) return true;
    return this._isIndexInRange(this._curIndex + change);
  }

  updateIndex(change) {
    if (!this._length) return false;
    if (!this.canUpdateIndex(change)) return false;
    this._curIndex = Math.abs(
      (this._length + this._curIndex + change) % this._length
    );
    return true;
  }

  _canGoToIndex(index) {
    if (!this._length) return false;
    return this._isIndexInRange(index);
  }

  goToIndex(index) {
    if (!this._length) return false;
    if (!this._canGoToIndex(index)) return false;
    this._curIndex = index;
    return true;
  }
}

/*
// deprecated code used for RTL support, in favour of CSS flex-direction: row-reverse,
// since merely reverse the order of slides in RTL carousel can not reverse
// the order of "tabbing" (keyboard navigation) of dot buttons and thumbnails.

class SlidesWithRTL extends Slides {
  constructor(items, options) {
    super(items, options);

    // generate _slides
    this._slides = [...items].reverse();

    // calculate indices
    this._headIndex = this._maxIndex;
    this._curIndex = this._convertCurIndexForDisplayToCurIndex(options.index);
  }

  _convertCurIndexForDisplayToCurIndex(index) {
    if (!index) return this._headIndex;
    index -= 1;
    if (!this._isIndexInRange(index)) return this._headIndex;
    return this._headIndex - index;
  }

  get curIndexForDisplay() {
    return this._headIndex - this._curIndex + 1;
  }
}
*/
