<script setup lang="ts">
import { ref } from 'vue'

const salary = ref(0)

const decreaseSalary = (amount: number) => {
	salary.value -= amount
}

const increaseSalary = (amount: number) => {
	salary.value += amount
}
</script>

<template>
	<div>
		<h2>Salary: {{ salary }}</h2>

		<!-- 🤩 -->
		<button class="btn btn-success" @click="increaseSalary(1)">
			Increase by 1
		</button>

		<!-- 🤩🤩🤩🤩🤩 -->
		<button class="btn btn-success" @click="increaseSalary(5)">
			Increase by 5
		</button>

		<!-- 🥺 -->
		<button class="btn btn-warning" @click="decreaseSalary(1)">
			Decrease by 1
		</button>

		<!-- 🥺🥺🥺🥺🥺 -->
		<button class="btn btn-warning" @click="decreaseSalary(5)">
			Decrease by 5
		</button>
	</div>
</template>
