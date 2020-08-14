const express = require('express');
const app = express();
const fs = require('fs');
const cart = require('./cartRouter');
console.log('app');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port} ....`));

app.use(express.json());
app.use('/', express.static('public'));

app.use('/api/cart', cart);
app.get('/api/products', (req, res) => {
	fs.readFile('server/db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}))
        } else {
            res.send(data);
        }
    })
});

