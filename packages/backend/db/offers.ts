import { IOffers }                from 'common/interfaces';
import { products }               from "./products";
import { getPropValueCombosList } from "common/utils";



export const offers: IOffers = {
};



let offerId = 1;

for (let product of Object.values(products)) {
	let combosList = getPropValueCombosList(product.props);

	if (combosList.length == 0) {
		//Товар без характеристик - одно предложение
		offers[offerId] = {
			id:        offerId,
			productId: product.id,
			name:      product.name,
			props:     {},
			price:     100,
		};
		offerId++;
	} else {
		//Товар с характеристиками - несколько предложений
		for (let propValues of combosList) {
			let valuesString: string = '';
			for (let [propId, valueId] of Object.entries(propValues)) {
				let prop     =  product.props[+propId];
				let value    =  prop.values[valueId];
				valuesString += `${prop.name.toLowerCase()} ${value.name.toLowerCase()}, `;
			}
			valuesString = valuesString.substring(0, valuesString.length - 2);
			offers[offerId] = {
				id:        offerId,
				productId: product.id,
				name:      `${product.name} (${valuesString})`,
				props:     propValues,
				price:     100,
			};
			offerId++;
		}
	}
}
