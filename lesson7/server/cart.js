const add = (cart, req) => {
    cart.amount = +cart.amount + +req.body.price;
    cart.countGoods = +cart.countGoods + 1;
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};

const change = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cart.amount += find.price * req.body.quantity;
    cart.countGoods += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

const remove = (cart, req) => {
    const find = cart.contents.find(el => el.id_product === +req.params.id);
    cart.contents.splice(cart.contents.indexOf(find), 1);
    cart.amount = +cart.amount - +find.price;
    cart.countGoods = +cart.countGoods - 1;
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    remove
};