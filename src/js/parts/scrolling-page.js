export default class ScrollingPage {
  constructor(wrapper) {
    this.wrapper = document.querySelector(wrapper);
    this.slides = this.wrapper.children;
    this.currentSlide = 0;
    this.startY = 0;
    this.endY = 0;
  }
  run() {
    this.setInitData();
    this.setSlide();
    this.wrapper.addEventListener("touchstart", this.getStartTouch.bind(this));
    this.wrapper.addEventListener("touchend", this.getEndTouch.bind(this));
    return this;
  }

  addNextScroll(selector) {
    this.btnNext = document.querySelector(selector);
    this.btnNext.addEventListener("click", () => {
      this.pageScroll(1);
    });
  }

  pageScroll(delta) {
    if (delta > 0) {
      if (this.currentSlide < this.slides.length - 1) {
        this.currentSlide++;
        this.setSlide();
      }
    } else if (delta < 0) {
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.setSlide();
      }
    }
  }

  getStartTouch(event) {
    if (event.target.tagName !== "INPUT") {
      this.startY = event.changedTouches[0].clientY;
    }
  }

  getEndTouch(event) {
    if (event.target.tagName !== "INPUT") {
      this.endY = event.changedTouches[0].clientY;
      const delta = this.startY - this.endY;
      this.pageScroll(delta);
    }
  }

  setInitData() {
    this.wrapper.style.cssText = `
			transform: translateY(${(100 / this.slides.length) * this.currentSlide}%));
		`;
    Array.prototype.forEach.call(this.slides, (slide) => {
      slide.style.cssText = `
				width: 100%;
				height: ${100 / this.slides.length}%;
			`;
    });
    this.pagginate = document.querySelector(".pagination");
    for (let i = 0; i < this.slides.length; i++) {
      const newCircle = document.createElement("div");
      newCircle.classList.add("pagination-item");
      newCircle.addEventListener("touchstart", this.setCircle.bind(this));
      this.pagginate.appendChild(newCircle);
    }
  }

  setCircle(e) {
    this.currentSlide = Array.prototype.findIndex.call(
      this.pagginate.children,
      (item) => e.target == item
    );
    this.setSlide();
  }

  setSlide() {
    this.wrapper.style.cssText = `
			transform: translateY(${(-100 / this.slides.length) * this.currentSlide}%);
		`;
    Array.prototype.forEach.call(this.pagginate.children, (item) =>
      item.classList.remove("pagination-item-active")
    );
    this.pagginate.children[this.currentSlide].classList.add(
      "pagination-item-active"
    );
  }
}
