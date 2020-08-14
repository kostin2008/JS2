Vue.component('app-mini-cart', {
	data() {
		return {
	        cartShow: false
    	}			
	},
	props: ['cartList'],
	methods: {
		cartRevew() {
			let items = this.cartList.reduce((sum, current) => sum + current.quantity, 0);
			let total = this.cartList.reduce((sum, current) => sum + current.quantity * current.price, 0);
			let result = {items: items, total: total};
			return result
		},
		addProduct(product) {
			let find = this.cartList.find(el => el.id_product === product.id_product);
			if (find) {
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
					.then(data => {
						if (data.result === 1) {
							find.quantity++;
						}
				})
			} else {
				let prod = Object.assign({quantity: 1}, product);
				this.$parent.postJson(`/api/cart`, prod)
					.then(data => {
						if (data.result === 1) {
							this.cartList.push (prod);
						}
				})				
			}
		},
		remProduct(product) {
			let find = this.cartList.find(el => el.id_product === product.id_product);
			if (find.quantity === 1) {
				this.$parent.deleteJson(`/api/cart/${product.id_product}`)
					.then(data => {
						if (data.result === 1) {
							this.cartList.splice(this.cartList.indexOf(product), 1)
						}
					})
			} else {
				this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1})
					.then(data => {
						if (data.result === 1) {
							find.quantity--;
						}
				})				
			}
   		}					
	}, 
	mounted() {
		this.$parent.getJson(`/api/cart`)
			.then(data => {
				for (let el of data.contents) {
					if (!el.img) {
						el.img = 'img/default-placeholder.png';
					}
					this.cartList.push(el);
				}
			});
	},
	template: `
		<div class="cart">
			<div class="cart__quantity" v-show="cartRevew().items">{{cartRevew().items}}</div>
			<img src="img/cart-img.svg" alt="cart" @click="cartShow = !cartShow">
			<div class="drop__cart" v-show="cartShow">
				<app-mini-cart-item class="cart__item"
					v-for="product of $parent.cartList"
					:key="product.id_product"
					:product="product">
				</app-mini-cart-item>

				<div class="cart__total">
					<p v-show="!cartRevew().total">Cart empty</p>
					<p v-show="cartRevew().total">TOTAL</p>
					<p v-show="cartRevew().total">$ {{cartRevew().total}}.00</p>
				</div>
				<a href="checkout.html" class="cart__button">Checkout</a>
				<a href="cart.html" class="cart__button">Go to cart</a>
			</div>					
		</div>`
});

Vue.component('app-mini-cart-item', {
	props: ['product'],
	template: `
		<div class="cart__item">
			<img :src="product.img" :alt="product.product_name" class="cart__item-img">
			<div class="cart__item-text">
				<p class="cart__item-text1">{{product.product_name}}</p>
				<p class="cart__item-text2">
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star" aria-hidden="true"></i>
					<i class="fa fa-star-half-o" aria-hidden="true"></i>
				</p>
				<p class="cart__item-text3">{{product.quantity}} x $ {{product.price}}</p>
			</div>
			<div class="cart__del" @click="$parent.remProduct(product)"><i class="fa fa-times-circle" aria-hidden="true"></i></div>	
		</div>`
});

Vue.component('app-main-cart', {
	props: ['cartList'],
	methods: {
		clearCart() {
			//this.cartList.splice(0, this.cartList.length);
			this.$parent.deleteJson(`/api/cart/00`, true)
				.then(data => {
					if (data.result === 1) {
						this.cartList.splice(0, this.cartList.length);
					}
				})
		}
	}, 
	template: `
	<div>
		<div class="cart__list conteiner">
			<div class="cart__head">
				<div class="cart__head-left">Product Details</div>
				<div class="cart__head-rigth">
					<p class="cart__head-text">unite Price</p>
					<p class="cart__head-text">Quantity</p>
					<p class="cart__head-text">shipping</p>
					<p class="cart__head-text">Subtotal</p>
					<p class="cart__head-text">ACTION</p>
				</div>
			</div>
			<app-main-cart-item class="cart__item"
				v-for="product of $parent.cartList"
				:key="product.id_product"
				:product="product">
			</app-main-cart-item>
		</div>
	<div class="medium__button conteiner">
		<a href="#" class="cart__button-big" @click.prevent="clearCart()">cLEAR SHOPPING CART</a>
		<a href="catalog.html" class="cart__button-big">cONTINUE sHOPPING</a>
	</div>
	<!-- средние кнопки -->

	<!--форма заказа-->
	<form action="#" class="result conteiner">
		<div class="result__item">
			<h3 class="result-title">Shipping Adress</h3>
			<select class="result-input result-select" >
				<option class="result-option" value="#">Russia</option>
				<option class="result-option" value="#">Ukrain</option>
				<option class="result-option" value="#">Belarus</option>
			</select>
			<input type="text" class="result-input" placeholder="State">
			<input type="text" class="result-input" placeholder="Postcode / Zip">
			<a href="#" class="cart__button-small">get a quote</a>
		</div>
		<div class="result__item">
			<h3 class="result-title">coupon  discount</h3>
			<p class="result-text">Enter your coupon code if you have one</p>			
			<input type="text" class="result-input" placeholder="State">
			<a href="#" class="cart__button-small">Apply coupon</a>
		</div>
		<div>
			<div class="result__item-grey">
				<div class="result-txtbox">
					<p class="subtotal-text">Sub total<span class="subtotal-cost">$ {{$root.$refs.appMiniCart.cartRevew().total}} </span></p>
					<p class="total-text">GRAND TOTAL <span class="pink subtotal-cost">$ {{$root.$refs.appMiniCart.cartRevew().total}} </span></p>
				</div>
				<a href="checkout.html" class="cart__button-proceed">proceed to checkout</a>
			</div>			
		</div>

	</form>	

	<!--форма заказа-->			
	</div>`
});



Vue.component('app-main-cart-item', {
	props: ['product'],
	template: `
		<div class="cart__pos">
			<div class="cart__pos-left">
				<div class="cart__pos-img"><img :src="product.img" :alt="product.product_name"></div>
				<div>
					<a href="single.html" class="cart__pos-title">{{product.product_name}}</a>
					<p class="cart__pos-desc"><span class="bold">Color: </span>Red</p>
					<p class="cart__pos-desc"><span class="bold">Size: </span>Xll</p>					
				</div>
			</div>
			<div class="cart__pos-right">
				<div class="cart__pos-col">$ {{product.price}}</div>
				<div class="cart__pos-col">
					<input type="number" 
						class="cart__item-input" 
						v-model.number="product.quantity">
				</div>
				<div class="cart__pos-col">FREE</div>
				<div class="cart__pos-col">$ {{product.price * product.quantity}}</div>
				<div class="cart__pos-col">
					<div class="cart__del">
						<i class="fa fa-times-circle" aria-hidden="true" @click="$root.$refs.appMiniCart.remProduct(product)"></i>
					</div>
				</div>
			</div>
		</div>`
});