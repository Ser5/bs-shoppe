import { IProductPropsCollection, IProductPropsCollectionItem, IPropValuesMap } from "./interfaces";

let workPropsList:   IProductPropsCollectionItem[];
let propValueCombos: IPropValuesMap[];

function _walkProps (propIndex: number, combo: IPropValuesMap = {}) {
	let prop = workPropsList[propIndex];
	for (let value of Object.values(prop.values)) {
		if (propIndex == 0) {
			combo = {};
		}
		combo[prop.id] = value.id;
		if (workPropsList[propIndex + 1]) {
			_walkProps(propIndex + 1, combo);
		}
		if (propIndex == workPropsList.length - 1) {
			propValueCombos.push({...combo});
		}
	}
}



export function getPropValueCombosList (props: IProductPropsCollection): IPropValuesMap[] {
	propValueCombos = [];
	workPropsList   = Object.values(props);
	if (workPropsList.length > 0) {
		_walkProps(0);
	}
	return propValueCombos;
}



export function getPropValueComboStringsList (props: IProductPropsCollection): string[] {
	getPropValueCombosList(props);
	let stringsList: string[] = [];
	for (let combo of Object.values(propValueCombos)) {
		let str = '';
		for (let [propId, valueId] of Object.entries(combo)) {
			str += `${propId}=${valueId};`;
		}
		stringsList.push(str);
	}
	return stringsList;
}



export async function fetchApi<T = never> (url: string, method: string = 'GET'): Promise<T> {
	let response = await fetch(`http://localhost:5174${url}`, {method});
	return await response.json();
}
