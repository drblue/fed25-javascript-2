<script setup lang="ts">
import ClickCounter from "@/components/ClickCounter.vue";
import ParrotParrot from "./components/ParrotParrot.vue";
import SalaryNegotiator from "./components/SalaryNegotiator.vue";
import MouseTracker from "./components/MouseTracker.vue";
</script>

<template>
	<div class="container">
		<h1>Vue 3 Basics</h1>
		<h2>How you like them Vue's?</h2>

		<hr class="my-4" />

		<MouseTracker />

		<hr class="my-4" />

		<SalaryNegotiator />

		<hr class="my-4" />

		<ParrotParrot />

		<hr class="my-4" />

		<ClickCounter />

		<hr class="my-4" />

	</div>
</template>

<style scoped></style>
