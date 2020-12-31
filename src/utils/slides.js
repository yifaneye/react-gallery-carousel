export class Slides {
  constructor(items, { rtl, loop, infinite }) {
    this.items = items;
    this.slides = null;
    this.curIndex = null;
    this.minIndex = null;
    this.maxIndex = null;
    this.rtl = rtl;
    this.loop = loop;
    this.infinite = infinite;
  }

  get currentIndex() {
    return this.curIndex;
  }

  getSlides() {
    if (this.slides) {
      return this.slides;
    }
    let slides = this.items;
    const slidesLength = slides.length;
    if (!slidesLength) {
      return [];
    }
    if (this.rtl) {
      slides.reverse();
    }
    if (this.loop) {
      slides = [slides[slidesLength - 1], ...slides, slides[0]];
    }
    this.slides = slides;
    this.getIndices();
    return slides;
  }

  getIndices() {
    const slidesLength = this.slides.length;
    if (slidesLength <= 1) {
      return 0;
    }
    const bufferLength = this.loop ? 1 : 0;
    const headIndex = this.rtl ? slidesLength - 1 - bufferLength : bufferLength;
    const tailIndex = this.rtl ? bufferLength : slidesLength - 1 - bufferLength;
    this.curIndex = headIndex;
    this.minIndex = headIndex < tailIndex ? headIndex : tailIndex;
    this.maxIndex = headIndex < tailIndex ? tailIndex : headIndex;
  }

  hasToUpdateIndex(change) {
    return (
      change !== 0 &&
      (this.infinite ||
        (this.curIndex + change >= this.minIndex &&
          this.curIndex + change <= this.maxIndex))
    );
  }

  calibrateIndex(change) {
    if (!this.loop) return;
    if (this.curIndex === this.minIndex && change < 0) {
      this.curIndex = this.maxIndex + 1;
    } else if (this.curIndex === this.maxIndex && change > 0) {
      this.curIndex = this.minIndex - 1;
    }
  }

  updateIndex(change) {
    this.curIndex = Math.abs(
      (this.slides.length + this.curIndex + change) % this.slides.length
    );
  }
}
