<script setup lang="ts">
</script>

<template>
	<div>
		<form class="mb-3">
			<label for="parrotInput">Say something</label>
			<input
				class="form-control"
				id="parrotInput"
				type="text"
			/>
			<button class="btn btn-success" type="submit">Submit</button>
			<button class="btn btn-danger" type="reset">Reset</button>
		</form>

		<div class="alert alert-success">
			<span role="img" aria-label="parrot">🦜</span> ...
		</div>
	</div>
</template>
