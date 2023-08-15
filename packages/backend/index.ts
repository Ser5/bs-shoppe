import express     from 'express';
import { filesDb } from './src/filesdb';
import { folders } from './db/folders';
import { offers }  from './db/offers';
import { products } from './db/products';



let app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE, OPTIONS");
	next();
});



app.post('/basket/:offerId(\\d+)/', (req, res) => {
	filesDb.basket.insert({offerId: +req.params.offerId, count: +(req.query.count ?? 1)});
	res.send({action: 'added'});
});

app.patch('/basket/:offerId(\\d+)/', (req, res) => {
	filesDb.basket.update({offerId: +req.params.offerId, count: +(req.query.count ?? 1)});
	res.send({action: 'updated'});
});

app.delete('/basket/:offerId(\\d+)/', (req, res) => {
	filesDb.basket.delete({offerId: +req.params.offerId});
	res.send({action: 'deleted'});
});

app.delete('/basket/', (req, res) => {
	filesDb.basket.truncate();
	res.send({action: 'cleared'});
});



app.post('/favorites/:productId(\\d+)/', (req, res) => {
	filesDb.favorites.insert({productId: +req.params.productId});
	res.send({action: 'added'});
});

app.delete('/favorites/:productId(\\d+)/', (req, res) => {
	filesDb.favorites.delete({productId: +req.params.productId});
	res.send({action: 'deleted'});
});



app.get('/page/:code/', (req, res) => {
	let data;

	switch (req.params.code) {
		case 'index':
			data = {
				folders:   folders,
				basket:    filesDb.basket.select(),
				favorites: filesDb.favorites.select(),
			};
		break;
		default:
			data = {
				folders:   folders,
				offers:    offers,
				products:  products,
				basket:    filesDb.basket.select(),
				favorites: filesDb.favorites.select(),
			};
		break;
	}

	res.json(data);
});



app.listen(5174, () => {
	console.log('http://localhost:5174');
});
