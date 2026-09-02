<template>
	<div class="pesquisadores">
		<header class="pesquisadores__cabecalho">
			<h1 class="pesquisadores__titulo">Pesquisadores responsáveis</h1>
			<p class="pesquisadores__descricao">
				Todos os pesquisadores responsáveis já cadastrados no sistema estão listados aqui,
				eles podem ser visualizados por outros usuários e utilizados na criação de outros
				projetos de pesquisa para facilitar no reaproveitamento dos dados. Você pode criar
				novos pesquisadores responsáveis ou atualizar os já existentes.
			</p>
		</header>

		<div class="pesquisadores__acoes">
			<InputText
				id="buscaPesquisadorResponsavel"
				v-model="buscaPesquisadorResponsavel"
				class="pesquisadores__busca"
				placeholder="Buscar pesquisador..."
				size="small"
			/>
			<Button
				label="NOVO PESQUISADOR RESPONSÁVEL"
				size="small"
				icon="pi pi-plus"
				@click="irParaNovoPesquisador"
			/>
		</div>

		<div class="pesquisadores__conteudo">
			<ListaPesquisadoresResponsaveis
				:dados="pesquisadoresFiltrados"
				@editar="editarPesquisador"
				@excluir="excluirPesquisador"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import ListaPesquisadoresResponsaveis from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import { usePesquisadoreResponsaveisStore } from '@/store/pesquisadoresResponsaveis'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const storePesquisadores = usePesquisadoreResponsaveisStore()
const buscaPesquisadorResponsavel = ref('')

const pesquisadoresFiltrados = computed(() => {
	const termo = buscaPesquisadorResponsavel.value.trim().toLowerCase()
	if (!termo) return storePesquisadores.pesquisadoresResponsaveis

	return storePesquisadores.pesquisadoresResponsaveis.filter(pesquisador =>
		[
			pesquisador.nome,
			pesquisador.cpf,
			pesquisador.email,
			pesquisador.telefone,
			pesquisador.cidade,
			pesquisador.estado
		]
			.filter(Boolean)
			.some(campo => String(campo).toLowerCase().includes(termo))
	)
})

const irParaNovoPesquisador = () => {
	router.push({ name: 'Novo Pesquisador' })
}

const editarPesquisador = (id: number) => {
	router.push({ name: 'Editar Pesquisador', params: { id: String(id) } })
}

const excluirPesquisador = (id: number) => {
	storePesquisadores.remover(id)
}
</script>

<style scoped lang="scss">
.pesquisadores {
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
