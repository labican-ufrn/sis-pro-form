<template>
	<div class="nova-entidade">
		<header class="nova-entidade__cabecalho">
			<h1 class="nova-entidade__titulo">Novo orientador</h1>
		</header>
		<FormularioPessoa entidade="orientador" @salvo="voltarParaLista" />
	</div>
</template>

<script setup lang="ts">
import FormularioPessoa from '@/components/Formularios/Entidades/FormularioPessoa.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const voltarParaLista = () => {
	router.push({ name: 'Orientadores' })
}
</script>

<style scoped lang="scss">
.nova-entidade {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}
}
</style>
