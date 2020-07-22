class ProductList {

    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchProducts();
        this.render();
        this.calcAllProducts();
    }

    fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (let product of this.goods) {
            const productObject = new ProductItem(product);

            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    // Метод, определяющий суммарную стоимость всех товаров
    calcAllProducts() {
        let totalPrice = 0;
        this.goods.forEach((product) => { totalPrice += product.price });
        let totalProductsAnswer = "Все товары на сумму: " + totalPrice + " \u20bd";
        document.querySelector('.products-total').innerHTML = totalProductsAnswer;
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="buy-btn">Купить</button>
                    </div>
                </div>`;
    }
}

// Класс элемента корзины
class BasketItem {
    constructor(id, title, price, img) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {

    }
}

// Класс корзины
class Basket {
    constructor() {

    }

    // Добавление товара в корзину
    addToBasket(id) {

    }

    // Удаление товара из корзины
    deleteFromBasket(id) {

    }

    // Считаем стоимость товаров в корзине
    calcAllProducts() {

    }

    // Считаем количество товаров в корзине и выводим на кнопку
    basketCount() {

    }

    // Рендер динамического содержимого корзины
    render() {

    }
}

const list = new ProductList();