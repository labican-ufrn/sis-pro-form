<template>
	<div class="projetos">
		<header class="projetos__cabecalho">
			<h1 class="projetos__titulo">Projetos encerrados</h1>
			<p class="projetos__descricao">
				Todos os projetos já finalizados estão listados aqui. Você pode consultar o
				histórico das pesquisas encerradas e os dados registrados durante a execução.
			</p>
		</header>

		<div class="projetos__acoes">
			<InputText
				id="busca-projetos-encerrados"
				v-model="busca"
				class="projetos__busca"
				placeholder="Buscar projeto..."
				size="small"
			/>
		</div>

		<div class="projetos__conteudo">
			<ListaDeProjetos :dados="projetosFiltrados" tipo="encerrados" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ListaDeProjetos from '@/components/ListaDeDados/ListaDeProjetos.vue'
import { useProjetosStore } from '@/store/projetos'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'

const store = useProjetosStore()
const busca = ref('')

const projetosFiltrados = computed(() => {
	const termo = busca.value.trim().toLowerCase()
	if (!termo) return store.encerrados

	return store.encerrados.filter(projeto =>
		[
			projeto.titulo,
			projeto.pesquisadorResponsavel,
			projeto.instituicao,
			projeto.local,
			projeto.nivelAbrangencia
		]
			.filter(Boolean)
			.some(campo => String(campo).toLowerCase().includes(termo))
	)
})
</script>

<style scoped lang="scss">
.projetos {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__cabecalho {
		display: flex;
		flex-direction: column;
		gap: var(--g-8);
	}

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}

	&__descricao {
		color: var(--gray-700);
		font-size: var(--fs-14);
		font-weight: 500;
	}

	&__acoes {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: var(--g-8);
		width: 100%;
	}

	&__busca {
		width: 100%;
	}

	&__conteudo {
		width: 100%;
	}
}
</style>
