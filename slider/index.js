import './index.scss';

class Slider {
  parent = null;
  slider = null;
  startX = null;
  index = 0;

  constructor(parent, slider) {
    this.parent = parent;
    this.slider = slider;

    // initialize
    this.#init();
  }

  get elem() {
    return this.slider;
  }

  #init() {
    Array.from(this.slider.children).forEach(
      (slide, i) => (slide.style.transform = `translateX(${i * 100}%)`),
    );
    this.parent.addEventListener('mousedown', e => {
      this.onMouseDown(e);
    });
    this.parent.addEventListener('touchstart', e => {
      this.onTouchStart(e);
    });
    this.parent.addEventListener('mouseup', e => {
      this.onMouseUp(e);
    });
    this.parent.addEventListener('touchend', e => {
      this.onTouchEnd(e);
    });
  }

  #movePage(x) {
    if (x - this.startX !== 0) {
      if (x - this.startX > 0) {
        this.index = Math.max(0, this.index - 1);
        this.slider.style.transform = `translateX(-${100 * this.index}%)`;
      } else {
        this.index = Math.min(this.index + 1, this.slider.children.length - 1);
        this.slider.style.transform = `translateX(-${100 * this.index}%)`;
      }
    }
  }

  // sliding event start
  onMouseDown(e) {
    this.startX = e.pageX;
  }

  onTouchStart(e) {
    this.startX = e.changedTouches?.[0]?.clientX;
  }

  // sliding event ends
  onMouseUp(e) {
    this.#movePage(e.pageX);
    // reset values
    this.startX = null;
  }

  onTouchEnd(e) {
    this.#movePage(e.changedTouches?.[0]?.clientX);
    // reset values
    this.startX = null;
  }
}

const parentElem = '.slider';
const sliderElem = '.slider__wrapper';

new Slider(
  document.querySelector(parentElem),
  document.querySelector(sliderElem),
);
