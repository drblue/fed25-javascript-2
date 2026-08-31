<!--
Shorthand for directive `v-on:` is `@`

Example:
v-on:click="incrementCounter"
@click="incrementCounter"
-->
<script setup lang="ts">
import { ref } from "vue"

// Create the reactive variable `counter`
const counter = ref(0)

// Function to increment the value of `counter`
const incrementCounter = () => {
	counter.value++
}
</script>

<template>
	<div>
		<h2>Counter: {{ counter }}</h2>
		<button
			class="btn btn-primary"
			@click="incrementCounter"
		>
			Click meeeeee!! <span class="smol-text">You know you want to 🤩</span>
		</button>
	</div>
</template>
