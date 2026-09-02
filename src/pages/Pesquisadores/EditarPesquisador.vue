<template>
	<div class="editar-entidade">
		<header class="editar-entidade__cabecalho">
			<h1 class="editar-entidade__titulo">Editar pesquisador responsável</h1>
		</header>
		<p v-if="!pessoa" class="editar-entidade__aviso">Pesquisador não encontrado.</p>
		<FormularioPesquisador
			v-else
			:id-edicao="pessoa.id"
			:pessoa="pessoa"
			@salvo="voltarParaLista"
		/>
	</div>
</template>

<script setup lang="ts">
import FormularioPesquisador from '@/components/Formularios/Entidades/FormularioPesquisador.vue'
import { usePesquisadoreResponsaveisStore } from '@/store/pesquisadoresResponsaveis'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = usePesquisadoreResponsaveisStore()

const pessoa = computed(() => {
	const id = Number(route.params.id)
	return store.pesquisadoresResponsaveis.find(item => item.id === id)
})

const voltarParaLista = () => {
	router.push({ name: 'Pesquisadores' })
}
</script>

<style scoped lang="scss">
.editar-entidade {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}

	&__aviso {
		margin: 0;
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}
}
</style>
