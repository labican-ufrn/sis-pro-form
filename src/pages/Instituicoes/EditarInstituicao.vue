<template>
	<div class="editar-entidade">
		<header class="editar-entidade__cabecalho">
			<h1 class="editar-entidade__titulo">Editar instituição</h1>
		</header>
		<p v-if="!instituicao" class="editar-entidade__aviso">Instituição não encontrada.</p>
		<FormularioInstituicao
			v-else
			:id-edicao="instituicao.id"
			:instituicao="instituicao"
			@salvo="voltarParaLista"
		/>
	</div>
</template>

<script setup lang="ts">
import FormularioInstituicao from '@/components/Formularios/Entidades/FormularioInstituicao.vue'
import { useInstituicoesStore } from '@/store/instituicoes'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useInstituicoesStore()

const instituicao = computed(() => {
	const id = Number(route.params.id)
	return store.instituicoes.find(item => item.id === id)
})

const voltarParaLista = () => {
	router.push({ name: 'Instituições' })
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
