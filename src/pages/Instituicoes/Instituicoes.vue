<template>
	<div class="entidades">
		<header class="entidades__cabecalho">
			<h1 class="entidades__titulo">Instituições</h1>
			<p class="entidades__descricao">
				Todas as instituições já cadastradas no sistema estão listadas aqui. Elas podem
				ser visualizadas por outros usuários e utilizadas na criação de projetos de
				pesquisa para facilitar o reaproveitamento dos dados. Você pode criar novas
				instituições ou atualizar as já existentes.
			</p>
		</header>

		<div class="entidades__acoes">
			<InputText
				id="busca-instituicao"
				v-model="busca"
				class="entidades__busca"
				placeholder="Buscar instituição..."
				size="small"
			/>
			<Button
				label="NOVA INSTITUIÇÃO"
				size="small"
				icon="pi pi-plus"
				@click="irParaNova"
			/>
		</div>

		<div class="entidades__conteudo">
			<ListaInstituicoes :dados="filtradas" @editar="editar" @excluir="excluir" />
		</div>
	</div>
</template>

<script setup lang="ts">
import ListaInstituicoes from '@/components/ListaDeDados/ListaInstituicoes.vue'
import { useInstituicoesStore } from '@/store/instituicoes'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useInstituicoesStore()
const busca = ref('')

const filtradas = computed(() => {
	const termo = busca.value.trim().toLowerCase()
	if (!termo) return store.instituicoes

	return store.instituicoes.filter(item =>
		[
			item.nomeDaInstituicao,
			item.nome,
			item.cargo,
			item.cnpjDaInstituicao,
			item.email,
			item.telefone
		]
			.filter(Boolean)
			.some(campo => String(campo).toLowerCase().includes(termo))
	)
})

const irParaNova = () => {
	router.push({ name: 'Nova Instituição' })
}

const editar = (id: number) => {
	router.push({ name: 'Editar Instituição', params: { id: String(id) } })
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
