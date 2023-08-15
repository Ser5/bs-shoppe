import { IPropValues } from "common/interfaces.js";
import { getList }     from "../utils.js";



export const sizes: IPropValues = {};

for (let s = 40; s <= 52; s++) {
	sizes[s] = {id: s, name: ''+s};
}



export function getSizes (idsList: number[]): IPropValues {
	return getList(sizes, idsList);
}
