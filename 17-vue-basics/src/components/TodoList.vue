<!--
Bind something 📿:

Longhand:
v-bind:key="todo.id"

Shorthand:
:key="todo.id"
-->
<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from '@/types';

const todos = ref<Todo[]>([
	{ id: 1, title: 'Learn Vue.js', completed: true },
	{ id: 2, title: 'Learn not to procrastinate', completed: false },
	{ id: 3, title: 'Take over the world', completed: false },
])
</script>

<template>
	<div>
		<h2>Todo List</h2>

		<ul class="list-group">
			<li
				class="list-group-item"
				:key="todo.id"
				v-for="todo in todos"
			>
				<input type="checkbox" v-model="todo.completed" class="me-2" />
				<span :class="{ done: todo.completed }">{{ todo.title }}</span>
			</li>
		</ul>
	</div>
</template>

<style lang="css" scoped>
.done {
	color: #bbb;
	font-style: italic;
	text-decoration: line-through;
}
</style>
