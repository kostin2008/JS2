Vue.component('cart', {
    data() {
        return {
            showCart: false,
            cartUrl: '/api/cart',
            imgCart: 'https://placehold.it/50x100',
            cartItems: [],
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson(`/api/cart/${prod.id_product}`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(product) {
            if (product.quantity > 1) {
                this.$parent.putJson(`/api/cart/${product.id_product}`, { quantity: -1 });
                product.quantity--;
            } else {
                this.$parent.delJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson(this.cartUrl)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            <div>
                <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                <div class="cart-block" v-show="showCart">
                    <p v-if="!cartItems.length">Корзина пуста</p>
                    <cart-item 
                    v-for="item of cartItems"
                    :key="item.id_product"
                    :cart-item="item"
                    :img="imgCart"
                    @remove="remove"></cart-item>
                </div>
            </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" :alt="cartItem.product_name">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}} ₽ за ед.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity * cartItem.price}} ₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                </div>`,
})