import './index.scss';
import getIntValueOf from './utils';

class Slider {
  parent = null;
  slider = null;
  startX = null;
  offsetLeft = null;
  isDown = false;
  isMoving = false;
  index = 0;

  constructor(parent, slider) {
    this.parent = parent;
    this.slider = slider;
  }

  get elem() {
    return this.slider;
  }

  init() {
    Array.from(this.slider.children).forEach((slide, i) => {
      slide.style.transform = `translateX(${i * 100}%)`;
    });
    // Down
    this.parent.addEventListener('mousedown', e => {
      this.onMouseDown(e);
    });
    this.parent.addEventListener('touchstart', e => {
      this.onTouchStart(e);
    });
    // Up
    this.parent.addEventListener('mouseup', e => {
      this.onMouseUp(e);
    });
    this.parent.addEventListener('touchend', e => {
      this.onTouchEnd(e);
    });
    // Move
    this.parent.addEventListener('mousemove', e => {
      this.onMouseMove(e);
    });
    this.parent.addEventListener('touchmove', e => {
      this.onTouchMove(e);
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
    this.isDown = true;
    const { transform } = this.slider.style;
    this.offsetLeft = transform ? getIntValueOf(transform) : 0;
  }

  onTouchStart(e) {
    this.startX = e.changedTouches?.[0]?.clientX;
    this.isDown = true;
    const { transform } = this.slider.style;
    this.offsetLeft = transform ? getIntValueOf(transform) : 0;
  }

  // sliding event ends
  onMouseUp(e) {
    this.#movePage(e.pageX);
    // reset values
    this.startX = null;
    this.isDown = false;
  }

  onTouchEnd(e) {
    this.#movePage(e.changedTouches?.[0]?.clientX);
    // reset values
    this.startX = null;
    this.isDown = false;
  }

  // while dragging
  onMouseMove(e) {
    if (!this.isDown) {
      return;
    }

    const distanceTravelled = e.pageX - this.startX; // in px
    const totalWidth = window.innerWidth; // in px
    const percentDistance = (distanceTravelled / totalWidth) * 100;

    this.slider.style.transform = `translateX(${
      this.offsetLeft + percentDistance
    }%)`;
  }

  onTouchMove(e) {
    if (!this.isDown) {
      return;
    }

    const distanceTravelled =
      (e.changedTouches?.[0]?.clientX ?? 0) - this.startX; // in px
    const totalWidth = window.innerWidth; // in px
    const percentDistance = (distanceTravelled / totalWidth) * 100;

    this.slider.style.transform = `translateX(${
      this.offsetLeft + percentDistance
    }%)`;
  }
}

const parentElem = '.slider';
const sliderElem = '.slider__wrapper';

const slider = new Slider(
  document.querySelector(parentElem),
  document.querySelector(sliderElem),
);

slider.init();
