<template>
	<div v-if="isTelaLogin" class="app app--login">
		<RouterView />
	</div>
	<Container v-else class="app">
		<Menu />
		<RouterView />
	</Container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Container from '@/components/Container/Container.vue'
import Menu from '@/components/Menu/Menu.vue'

const route = useRoute()

const isTelaLogin = computed(() => route.name === 'Login')
</script>

<style scoped lang="scss"></style>
