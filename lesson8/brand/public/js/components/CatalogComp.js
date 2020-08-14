Vue.component('app-catalog', {
	data() {
		return {
			products: []
		}
	},
	props: ['quant'],
	methods: {
		filter(filterData) {
			const regexp = new RegExp(filterData, 'i');
			this.products.forEach(el => el.filter = regexp.test(el.product_name));
		}
	},
	mounted() {
		console.log(this.quant);
		this.$parent.getJson(`/api/products`)
			.then(data => {
				for (let el of data) {
					if (!el.img) {
						el.img = 'img/default-placeholder.png';
					}
					el.filter = true;
					this.products.push(el);

				}
			})		

	},
	template: `
			<div class="goods__greed">
				<app-catalog-item class="goods__greed-one"
					v-for="item of products.slice(0, quant)"
					:key="item.id_product"
					:product="item"
					v-if="item.filter">
				</app-catalog-item>
			</div>`
});


Vue.component('app-catalog-item', {
	props: ['product'],
	template: `
		<div class="goods__greed-one">
				<div class="lenta-wrap" v-show="product.discount">
					<div class="ribbon">Скидка</div>
				</div>			
			<a href="single.html" class="img__link">
				<div class="goods__greed-img"><img :src="product.img" :alt="product.product_name"></div>
				<div class="goods__greed-text">
					<p class="goods__greed-item">{{product.product_name}}</p>
					<p class="goods__greed-cost">$ {{product.price}}</p>							
				</div>
			</a>
			<div class="mask"><a href="#" class="mask__add" 
				@click.prevent="$root.$refs.appMiniCart.addProduct(product)">Add to Cart</a></div>
		</div>`
});