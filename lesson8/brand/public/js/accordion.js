// Aккордеон на странице каталог
class Accordion {
	constructor(block = '.catalog', titles = '.catalog__item-cap', items = '.catalog__item-list', arrows = true) {
		this.block = document.querySelector(block);
		this.titles = [...document.querySelectorAll(titles)];
		this.items = [...document.querySelectorAll(items)];
		this.active = 0;
		this.arrows = arrows
		this._init();
	}
	_init() {
		this._hideAll();
		this._showItem(this.active);
		this.titles.forEach(el => {
			el.addEventListener('click', () => {
				this._hideAll();
				let num = this.titles.indexOf(el);
				if (this.active !== num) {
					this.active = num;
					this._showItem();
				} else {
					this.active = -1;
				}
			});
		})
	}
	_hideAll() {
		this.items.forEach(el => el.style.height = 0 );
		if (this.arrows) {
			this.titles.forEach(el => {
				let arrow = el.querySelector('.fa');
				arrow.classList.remove('fa-caret-up');
				arrow.classList.add('fa-caret-down')			
			})			
		}

	}
	_showItem() {
		let elem = this.items[this.active];
		elem.style.height = elem.scrollHeight + 'px';
		let arrow = this.titles[this.active].querySelector('.fa');
		if (this.arrows) {
			arrow.classList.remove('fa-caret-down');
			arrow.classList.add('fa-caret-up')			
		}
	}
};

window.addEventListener('DOMContentLoaded', () => {

	const accordion = new Accordion();
});