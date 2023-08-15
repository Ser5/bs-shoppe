import { defineStore } from 'pinia';
import { ref }         from 'vue';

type TListener = () => any;

export const useBackdropStore = defineStore('backdrop', () => {
	let isActive  = ref(false);
	let listeners = ref(new Set<TListener>());

	function addClickListener (listener: TListener) {
		listeners.value.add(listener);
	}

	function removeClickListener (listener: TListener) {
		listeners.value.delete(listener);
	}

	function clicked () {
		for (let listener of listeners.value.values()) {
			listener();
		}
	}

	return {isActive, addClickListener, removeClickListener, clicked};
});
