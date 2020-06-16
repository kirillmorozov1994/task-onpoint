export default class ScrollingLinks {
  constructor({ wrapper, target }) {
    this.target = document.querySelector(target);
    this.wrapper = document.querySelector(wrapper);
    this.links = this.wrapper.children;
    this.currentSlide = 2;
  }

  run() {
    this.setInitData();
    this.setSlide();
    this.target.addEventListener("input", this.setLink.bind(this));
  }

  setLink(e) {
    this.choicePeriod(e.target.value, 1);
    this.setSlide();
  }

  choicePeriod(value, countLink) {
    if (value > (100 / this.links.length) * countLink) {
      this.choicePeriod(value, countLink + 1);
    } else {
      this.currentSlide = countLink - 1;
    }
  }

  setInitData() {
    this.wrapper.style.cssText = `
			transform: translateX(${(100 / this.links.length) * this.currentSlide}%));
		`;
    Array.prototype.forEach.call(this.links, (link) => {
      link.style.cssText = `
				width: ${100 / this.links.length}%;
				height: 100%;
			`;
    });
  }

  setSlide() {
    const value = (this.target.value / 100) * 100;
    this.target.style.cssText = `
			background-image: linear-gradient(to right, #d1eaff 0%, #d1eaff ${value}%, #c8c8c8 ${value}%, #c8c8c8 100%);
		`;
    this.wrapper.style.cssText = `
			transform: translateX(${(-100 / this.links.length) * this.currentSlide}%);
		`;
  }
}
