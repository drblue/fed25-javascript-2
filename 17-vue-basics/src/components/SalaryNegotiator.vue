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

		<img
			class="img-fluid my-3"
			src="https://media1.tenor.com/m/aWcyWL5BsY0AAAAd/money-printer-go-brr-jerome-powell.gif"
			v-show="salary >= 1337"
		/>

		<img
			class="img-fluid my-3"
			src="https://media0.giphy.com/media/8nM6YNtvjuezzD7DNh/200w.gif?cid=6c09b952mrtnhuf5614d1uty65gey2to6nn721w72fndvu83&ep=v1_gifs_search&rid=200w.gif&ct=g"
			v-if="salary < 0"
		/>

		<div>
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
	</div>
</template>
