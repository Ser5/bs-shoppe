import { IPropValues } from 'common/interfaces';

export function getList (source: IPropValues, idsList: number[]): IPropValues {
	let result: IPropValues = {};
	for (let id of idsList) {
		result[id] = source[id];
	}
	return result;
}
