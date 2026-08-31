<script setup lang="ts">
import { ref } from 'vue';

const parrotInput = ref("")

const submit = () => {
	alert("🦜: " + parrotInput.value)
}

const reset = () => {
	parrotInput.value = ""
}
</script>

<template>
	<div>
		<form class="mb-3" @submit.prevent="submit" @reset="reset">
			<label for="parrotInput">Say something</label>
			<input
				class="form-control"
				id="parrotInput"
				type="text"
				v-model="parrotInput"
			/>
			<button class="btn btn-success" type="submit">Submit</button>
			<button class="btn btn-danger" type="reset">Reset</button>
		</form>

		<div class="alert alert-success">
			<span role="img" aria-label="parrot">🦜</span> {{ parrotInput }}
		</div>
	</div>
</template>
