export class Slides {
  constructor(items, { rtl, loop }) {
    this.items = items;
    this.slides = null;
    this.length = 0;
    this.curIndex = null;
    this.minIndex = null;
    this.maxIndex = null;
    this.rtl = rtl;
    this.loop = loop;
  }

  get currentIndex() {
    return this.curIndex;
  }

  getSlides() {
    if (this.slides) return this.slides;
    let slides = this.items;
    const slidesLength = slides.length;
    if (!slidesLength) {
      this.slides = slides;
      return this.slides;
    }
    if (this.rtl) slides.reverse();
    if (this.loop) slides = [slides[slidesLength - 1], ...slides, slides[0]];
    this.slides = slides;
    this.length = slides.length;
    const bufferLength = this.loop ? 1 : 0;
    const headIndex = this.rtl ? this.length - 1 - bufferLength : bufferLength;
    const tailIndex = this.rtl ? bufferLength : this.length - 1 - bufferLength;
    this.curIndex = headIndex;
    this.minIndex = headIndex < tailIndex ? headIndex : tailIndex;
    this.maxIndex = headIndex < tailIndex ? tailIndex : headIndex;
    return this.slides;
  }

  hasToUpdateIndex(change) {
    if (!this.length) return false;
    return (
      change !== 0 &&
      (this.loop ||
        (this.curIndex + change >= this.minIndex &&
          this.curIndex + change <= this.maxIndex))
    );
  }

  calibrateIndex(change) {
    if (!this.length) return;
    if (!this.loop) return;
    if (this.curIndex === this.minIndex && change < 0) {
      this.curIndex = this.maxIndex + 1;
    } else if (this.curIndex === this.maxIndex && change > 0) {
      this.curIndex = this.minIndex - 1;
    }
  }

  updateIndex(change) {
    if (!this.length) return false;
    if (!this.hasToUpdateIndex(change)) return false;
    this.curIndex = Math.abs(
      (this.length + this.curIndex + change) % this.length
    );
    return true;
  }
}
