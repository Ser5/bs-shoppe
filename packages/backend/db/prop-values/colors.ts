import { IPropValues } from "common/interfaces.js";
import { getList }     from "../utils.js";



export const colors: IPropValues = {
	1: {id: 1, name: 'Белый',       color: 'white'},
	2: {id: 2, name: 'Чёрный',      color: 'black'},
	3: {id: 3, name: 'Серый',       color: '#ddd'},
	4: {id: 4, name: 'Красный',     color: 'red'},
	5: {id: 5, name: 'Голубенький', color: '#3ed'},
};



export function getColors (idsList: number[]): IPropValues {
	return getList(colors, idsList);
}
