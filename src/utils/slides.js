export default class Slides {
  constructor(items, { rtl = false, loop = false }) {
    this._items = items;
    this._slides = null;
    this._length = 0;
    this._curIndex = null;
    this._minIndex = null;
    this._maxIndex = null;
    this._rtl = rtl;
    this._loop = loop;

    // generate _slides
    let slides = this._items;
    const slidesLength = slides.length;
    if (!slidesLength) {
      this._slides = slides;
      return;
    }
    if (this._rtl) slides = [...slides].reverse();
    if (this._loop) slides = [slides[slidesLength - 1], ...slides, slides[0]];
    this._slides = slides;
    this._length = slides.length;

    // calculate indices
    const bufferLength = this._loop ? 1 : 0;
    const headIndex = this._rtl
      ? this._length - 1 - bufferLength
      : bufferLength;
    const tailIndex = this._rtl
      ? bufferLength
      : this._length - 1 - bufferLength;
    this._curIndex = headIndex;
    this._minIndex = headIndex < tailIndex ? headIndex : tailIndex;
    this._maxIndex = headIndex < tailIndex ? tailIndex : headIndex;
  }

  get curIndex() {
    return this._curIndex;
  }

  get curIndexAsKey() {
    if (this._curIndex < this._minIndex) return this._maxIndex;
    if (this._curIndex > this._maxIndex) return this._minIndex;
    return this._curIndex;
  }

  get curIndexForDisplay() {
    // if (this._rtl) return this._maxIndex - this._curIndex + 1; // no matter the value of this._loop
    if (!this._loop) return this._curIndex + 1;
    return this.curIndexAsKey;
  }

  get slides() {
    return this._slides;
  }

  static _range(min, max) {
    const length = max - min + 1;
    return Array(length)
      .fill(min)
      .map((x, index) => x + index);
  }

  get allIndices() {
    if (!this._length) return [];
    return Slides._range(this._minIndex, this._maxIndex);
  }

  calibrateIndex(change) {
    if (!this._length) return;
    if (!this._loop) return;
    switch (this._curIndex) {
      case this._minIndex - 1:
        if (change < 0) this._curIndex = this._maxIndex;
        break;
      case this._minIndex:
        if (change < 0) this._curIndex = this._maxIndex + 1;
        break;
      case this._maxIndex:
        if (change > 0) this._curIndex = this._minIndex - 1;
        break;
      case this._maxIndex + 1:
        if (change > 0) this._curIndex = this._minIndex;
        break;
    }
  }

  canUpdateIndex(change) {
    if (!this._length) return false;
    return (
      change !== 0 &&
      (this._loop ||
        (this._curIndex + change >= this._minIndex &&
          this._curIndex + change <= this._maxIndex))
    );
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
    return this._minIndex <= index <= this._maxIndex;
  }

  goToIndex(index) {
    if (!this._length) return false;
    if (!this._canGoToIndex(index)) return false;
    this._curIndex = index;
    return true;
  }
}
