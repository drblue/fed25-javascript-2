<script setup lang="ts">
import { ref } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)

const updateMousePosition = (e: MouseEvent) => {
	mouseX.value = e.offsetX
	mouseY.value = e.offsetY
}
</script>

<template>
	<div class="mouse-area" @mousemove="updateMousePosition">
		<span>{{ mouseX }}, {{ mouseY }}</span>
	</div>
</template>

<style lang="css" scoped>
.mouse-area {
	align-items: center;
	background-color: #ccc;
	border: 4px solid #888;
	cursor: url(../assets/images/mouse-cursor.png) 1 4, pointer;
	display: flex;
	height: 300px;
	justify-content: center;
	width: 300px;
}
</style>
