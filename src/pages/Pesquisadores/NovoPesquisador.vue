<template>
	<div class="novo-pesquisador">
		<header class="novo-pesquisador__cabecalho">
			<h1 class="novo-pesquisador__titulo">Novo pesquisador responsável</h1>
		</header>
		<FormularioPesquisador @salvo="voltarParaLista" />
	</div>
</template>

<script setup lang="ts">
import FormularioPesquisador from '@/components/Formularios/Entidades/FormularioPesquisador.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const voltarParaLista = () => {
	router.push({ name: 'Pesquisadores' })
}
</script>

<style scoped lang="scss">
.novo-pesquisador {
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
