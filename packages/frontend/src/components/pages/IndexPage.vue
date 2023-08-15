<script setup lang="ts">
</script>



<template>
	<h1>BS.Shoppe</h1>
	<main>
		<div>Работаем с 2023-го года!</div>
		<nav>
			<a href="/catalog/">Каталог</a>
			<a href="/favorites/">Избранное</a>
			<a href="/basket/">Корзина</a>
		</nav>
	</main>
</template>



<style scoped>
h1 {
	margin: 70px 0 30px 0;
	font-size: 100px;
	line-height: 100%;
	text-align: center;
}

main {
	width: max-content;
	margin: 0 auto;
}

div {
	width: max-content;
	margin-bottom: 70px;
	color: #ddd;
	letter-spacing: 2px;
}

nav {
	width: max-content;
}

nav a {
	display: block;
	margin-bottom: 20px;
	font-size: 24px;
}
</style>
