<template>
	<div class="entidades">
		<header class="entidades__cabecalho">
			<h1 class="entidades__titulo">Orientadores</h1>
			<p class="entidades__descricao">
				Todos os orientadores já cadastrados no sistema estão listados aqui. Eles podem
				ser visualizados por outros usuários e utilizados na criação de projetos de
				pesquisa para facilitar o reaproveitamento dos dados. Você pode criar novos
				orientadores ou atualizar os já existentes.
			</p>
		</header>

		<div class="entidades__acoes">
			<InputText
				id="busca-orientador"
				v-model="busca"
				class="entidades__busca"
				placeholder="Buscar orientador..."
				size="small"
			/>
			<Button
				label="NOVO ORIENTADOR"
				size="small"
				icon="pi pi-plus"
				@click="irParaNovo"
			/>
		</div>

		<div class="entidades__conteudo">
			<ListaPesquisadoresResponsaveis
				:dados="filtrados"
				rotulo-nome="Nome completo do orientador"
				rotulo-editar="Editar orientador"
				rotulo-excluir="Excluir orientador"
				@editar="editar"
				@excluir="excluir"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import ListaPesquisadoresResponsaveis from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import { useOrientadoresStore } from '@/store/orientadores'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useOrientadoresStore()
const busca = ref('')

const filtrados = computed(() => {
	const termo = busca.value.trim().toLowerCase()
	if (!termo) return store.orientadores

	return store.orientadores.filter(item =>
		[item.nome, item.cpf, item.email, item.telefone, item.cidade, item.estado]
			.filter(Boolean)
			.some(campo => String(campo).toLowerCase().includes(termo))
	)
})

const irParaNovo = () => {
	router.push({ name: 'Novo Orientador' })
}

const editar = (id: number) => {
	router.push({ name: 'Editar Orientador', params: { id: String(id) } })
}

const excluir = (id: number) => {
	store.remover(id)
}
</script>

<style scoped lang="scss">
.entidades {
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
