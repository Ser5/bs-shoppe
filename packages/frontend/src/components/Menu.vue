<script setup lang="ts">
import { ref, onUnmounted, onMounted } from 'vue';
import _ from 'lodash';
import { useMainStore } from '@store/main';
import Dropdown         from './Dropdown.vue';
import MenuLevel        from './MenuLevel.vue';

interface IMediaMatch {
	matches: boolean,
}



let mainStore = useMainStore();
let foldersStore  = mainStore.folders();
let backdropStore = mainStore.backdrop();


let mobileMedia: IMediaMatch = {matches: false};

let isActive = ref(false);
let isMobile = ref(mobileMedia.matches);



function windowResizeHandler () {
	isMobile.value = mobileMedia.matches;
	if (!isMobile.value) {
		isActive.value         = false;
		backdropStore.isActive = false;
	}
}




function hoverToggleDropdown (active: boolean) {
	if (!isMobile.value) {
		isActive.value = active;
	}
}

function toggleSideDropdown (active?: boolean) {
	if (active === undefined) {
		isActive.value = !isActive.value;
	} else {
		isActive.value = active;
	}
	backdropStore.isActive = isActive.value;
}



let throttledWindowResizeHandler: _.DebouncedFunc<() => void>;
let sideDropdownToggler = ()=>{};



onMounted(() => {
	mobileMedia = matchMedia('(max-width: 768px)');

	windowResizeHandler();
	throttledWindowResizeHandler = _.throttle(windowResizeHandler, 25);

	window.addEventListener('resize', throttledWindowResizeHandler);
	backdropStore.addClickListener(sideDropdownToggler);

	sideDropdownToggler = () => toggleSideDropdown(false);
});



onUnmounted(() => {
	window.removeEventListener('resize', throttledWindowResizeHandler);
	backdropStore.removeClickListener(sideDropdownToggler);
});
</script>



<template>
	<div class="menu" @mouseenter="hoverToggleDropdown(true)" @mouseleave="hoverToggleDropdown(false)">
		<a class="btn menu__button menu__button_big" href="/catalog/">
			<div class="menu__icon">🍔</div>
			<div class="menu__text">Каталог</div>
		</a>
		<button class="btn menu__button menu__button_small" @click="toggleSideDropdown()">🍔</button>
		<Teleport to="#app" :disabled="!isMobile">
			<Dropdown class="menu__dropdown" :isActive="isActive">
				<a href="/catalog/" class="menu__catalog">Весь каталог</a>
				<MenuLevel :foldersList="foldersStore.tree" />
			</Dropdown>
		</Teleport>
	</div>
</template>



<style scoped>
.menu {
	position: relative;
}

.menu__button {
	display: flex;
}
.menu__button_big {}
.menu__button_small {
	display: none;
}

.menu__icon {
	margin-right: 10px;
	transition: all 0.25s;
}
.menu__text {
	margin-right: 3px;
	font-size: 20px;
	line-height: 100%;
}

.menu:hover .menu__icon {
	transform: rotateZ(20deg);
}

.menu__dropdown {
	position: absolute;
	left: 0;
	top: 30px;
	min-width: 230px;
	font-size: 18px;
	z-index: 5;
}

.menu__catalog {
	display: block;
	padding: 5px 0 15px 0;
}

@media (max-width: 768px) {
	.menu__button_big   {display: none;}
	.menu__button_small {display: flex;}

	.menu__dropdown {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
	}
}
</style>
