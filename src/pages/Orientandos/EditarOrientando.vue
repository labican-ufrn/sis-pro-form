<template>
	<div class="editar-entidade">
		<header class="editar-entidade__cabecalho">
			<h1 class="editar-entidade__titulo">Editar orientando</h1>
		</header>
		<p v-if="!pessoa" class="editar-entidade__aviso">Orientando não encontrado.</p>
		<FormularioPessoa
			v-else
			entidade="orientando"
			:id-edicao="pessoa.id"
			:pessoa="pessoa"
			@salvo="voltarParaLista"
		/>
	</div>
</template>

<script setup lang="ts">
import FormularioPessoa from '@/components/Formularios/Entidades/FormularioPessoa.vue'
import { useOrientandosStore } from '@/store/orientandos'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useOrientandosStore()

const pessoa = computed(() => {
	const id = Number(route.params.id)
	return store.orientandos.find(item => item.id === id)
})

const voltarParaLista = () => {
	router.push({ name: 'Orientandos' })
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
