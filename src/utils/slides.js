export default class Slides {
  constructor(items, { index, rtl = false, loop = false }) {
    this._rtl = rtl;
    this._loop = loop;

    // generate _slides
    this._slides = this._rtl ? [...items].reverse() : items;
    if (!this._slides || !this._slides.length) return;
    this._length = this._slides.length;

    // calculate indices
    const headIndex = this._rtl ? this._length - 1 : 0;
    const tailIndex = this._rtl ? 0 : this._length - 1;
    this._headIndex = headIndex;
    this._tailIndex = tailIndex;
    this._minIndex = headIndex < tailIndex ? headIndex : tailIndex;
    this._maxIndex = headIndex < tailIndex ? tailIndex : headIndex;
    this._curIndex = this._convertCurIndexForDisplay(index);
  }

  _convertCurIndexForDisplay(index) {
    if (!index || (!this._minIndex <= index && index <= this._maxIndex))
      return this._headIndex;
    if (this._rtl) return this._maxIndex - index + 1;
    return index - 1; // !this._rtl
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

  isMinIndex() {
    return this._curIndex === this._minIndex;
  }

  isMaxIndex() {
    return this._curIndex === this._maxIndex;
  }

  get curIndexForDisplay() {
    return this._curIndex + 1;
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
    if (this._curIndex === this._minIndex && change < 0)
      this._curIndex = this._maxIndex + 1;
    else if (this._curIndex === this._maxIndex && change > 0)
      this._curIndex = this._minIndex - 1;
  }

  canUpdateIndex(change) {
    if (!this._length) return false;
    if (change === 0) return false;
    if (this._loop) return true;
    return (
      this._minIndex <= this._curIndex + change &&
      this._curIndex + change <= this._maxIndex
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
    return this._minIndex <= index && index <= this._maxIndex;
  }

  goToIndex(index) {
    if (!this._length) return false;
    if (!this._canGoToIndex(index)) return false;
    this._curIndex = index;
    return true;
  }
}
