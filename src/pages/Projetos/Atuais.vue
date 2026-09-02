<template>
	<div class="projetos">
		<header class="projetos__cabecalho">
			<h1 class="projetos__titulo">Projetos atuais</h1>
			<p class="projetos__descricao">
				Todos os projetos em andamento estão listados aqui. Você pode visualizar os dados
				gerais de cada pesquisa e acompanhar o progresso dos formulários necessários.
			</p>
		</header>

		<div class="projetos__acoes">
			<InputText
				id="busca-projetos-atuais"
				v-model="busca"
				class="projetos__busca"
				placeholder="Buscar projeto..."
				size="small"
			/>
			<Button
				label="NOVO PROJETO"
				size="small"
				icon="pi pi-plus"
				@click="irParaNovoProjeto"
			/>
		</div>

		<div class="projetos__conteudo">
			<ListaDeProjetos :dados="projetosFiltrados" tipo="atuais" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ListaDeProjetos from '@/components/ListaDeDados/ListaDeProjetos.vue'
import { useProjetosStore } from '@/store/projetos'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useProjetosStore()
const busca = ref('')

const projetosFiltrados = computed(() => {
	const termo = busca.value.trim().toLowerCase()
	if (!termo) return store.atuais

	return store.atuais.filter(projeto =>
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

const irParaNovoProjeto = () => {
	router.push({ name: 'Novo Projeto' })
}
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
