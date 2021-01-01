export default class Slides {
  constructor(items, { rtl, loop }) {
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
    if (this._rtl) slides.reverse();
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

  get slides() {
    return this._slides;
  }

  hasToUpdateIndex(change) {
    if (!this._length) return false;
    return (
      change !== 0 &&
      (this._loop ||
        (this._curIndex + change >= this._minIndex &&
          this._curIndex + change <= this._maxIndex))
    );
  }

  calibrateIndex(change) {
    if (!this._length) return;
    if (!this._loop) return;
    if (this._curIndex === this._minIndex && change < 0) {
      this._curIndex = this._maxIndex + 1;
    } else if (this._curIndex === this._maxIndex && change > 0) {
      this._curIndex = this._minIndex - 1;
    }
  }

  updateIndex(change) {
    if (!this._length) return false;
    if (!this.hasToUpdateIndex(change)) return false;
    this._curIndex = Math.abs(
      (this._length + this._curIndex + change) % this._length
    );
    return true;
  }
}
