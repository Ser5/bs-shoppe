import fs                from 'fs';
import path              from 'path';
import { fileURLToPath } from 'url';
import { IFavorites }    from 'common/interfaces';

interface IBasketData extends Record<number, number> {}

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);



class FilesDb {
	#favorites;
	#basket;

	constructor (dataFolderPath: string) {
		this.#favorites = new FavoritesTable(dataFolderPath + '/favorites.json');
		this.#basket    = new BasketTable(dataFolderPath + '/basket.json');
	}

	get favorites () { return this.#favorites; }
	get basket    () { return this.#basket; }
}



class Table {
	#filePath;

	constructor (fileName: string) {
		this.#filePath = fileName;
	}


	select (): Object {
		let data = {};
		let path = this.#filePath;
		if (fs.existsSync(path)) {
			try {
				let jsonBuffer = fs.readFileSync(path);
				try {
					data = JSON.parse(jsonBuffer.toString());
				} catch (e) {
					this.truncate();
				}
			} catch (e) {
				console.log('Какая-то шляпа при чтении');
			}
		} else {
			this.truncate();
		}
		return data;
	}


	insert (data: unknown) {
	}

	_delete (id: number) {
		let data: any = this.select();
		delete data[id];
		this._write(data);
	}

	truncate () {
		this._write({});
	}


	_write (data: Object) {
		try {
			fs.writeFileSync(this.#filePath, JSON.stringify(data));
		} catch (e) {
			console.log('Какая-то шляпа при записи');
		}
	}
}



class FavoritesTable extends Table {
	select (): IFavorites {
		let _data                = super.select();
		let data: IFavorites = {};
		for (let productId of Object.keys(_data)) {
			data[+productId] = true;
		}
		return data;
	}

	insert ({productId}: {productId: number}) {
		let data = this.select();
		data[productId] = true;
		this._write(data);
	}

	update ({productId}: {productId: number}) {
		this.insert({productId});
	}

	delete ({productId}: {productId: number}) {
		this._delete(productId);
	}
}



class BasketTable extends Table {
	select (): IBasketData {
		let _data             = super.select();
		let data: IBasketData = {};
		for (let [offerId, count] of Object.entries(_data)) {
			data[+offerId] = +count;
		}
		return data;
	}

	insert ({offerId, count}: {offerId: number, count: number}) {
		let data = this.select();
		if (!data[offerId]) {
			data[offerId] = count;
		}
		this._write(data);
	}

	update ({offerId, count}: {offerId: number, count: number}) {
		let data = this.select();
		if (data[offerId]) {
			data[offerId] = count;
		}
		this._write(data);
	}

	delete ({offerId}: {offerId: number}) {
		this._delete(offerId);
	}
}



//Путь к файлам - относительно папки dist.
export const filesDb = new FilesDb(__dirname + '/../filesdb-data/');
