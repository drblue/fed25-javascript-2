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
		<button class="btn btn-success"
			@click.exact="increaseSalary(1)"
			@click.shift="increaseSalary(25)"
		>
			Increase by 1
		</button>

		<!-- 🤩🤩🤩🤩🤩 -->
		<button class="btn btn-success"
			@click.exact="increaseSalary(5)"
			@click.alt="increaseSalary(100)"
		>
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
