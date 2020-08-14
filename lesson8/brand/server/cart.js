let add = (cart, req) => {
    cart.contents.push(req.body);
    cart.amount = cartRevew(cart).total;
    cart.countGoods = cartRevew(cart).items;
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    cart.amount = cartRevew(cart).total;
    cart.countGoods = cartRevew(cart).items;
    return JSON.stringify(cart, null, 4);
};

let del = (cart, req) => {
    find = cart.contents.find(el => el.id_product === +req.params.id);
   	cart.contents.splice(cart.contents.indexOf(find), 1);
    cart.amount = cartRevew(cart).total;
    cart.countGoods = cartRevew(cart).items;
    return JSON.stringify(cart, null, 4);
};

let clearAll = (cart, req) => {
    let emptyCart = {
        amount: 0,
        countGoods: 0, 
        contents: []       
    }
    return JSON.stringify(emptyCart, null, 4);
}

let cartRevew = (cart) => {
    let items = cart.contents.reduce((sum, current) => sum + current.quantity, 0);
    let total = cart.contents.reduce((sum, current) => sum + current.quantity * current.price, 0);
    let result = {items: items, total: total};
    return result  
}

module.exports = {
    add,
    change,
    del,
    clearAll
};

