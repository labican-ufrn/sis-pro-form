<template>
	<div class="lista-de-dados">
		<article
			v-for="pesquisador in dados"
			:key="pesquisador.id"
			class="lista-de-dados__pesquisador"
		>
			<div
				class="lista-de-dados__cabecalho"
				:class="{ 'lista-de-dados__cabecalho--recolhido': !estaExpandido(pesquisador.id) }"
			>
				<button
					type="button"
					class="lista-de-dados__gatilho"
					:aria-expanded="estaExpandido(pesquisador.id)"
					@click="alternar(pesquisador.id)"
				>
					<Dado
						:nome="rotuloNome"
						:valor="pesquisador.nome"
						cabecalho
						expansivel
						:expandido="estaExpandido(pesquisador.id)"
					/>
				</button>
				<Dado
					v-if="estaExpandido(pesquisador.id)"
					nome="CPF"
					:valor="formatarCpf(pesquisador.cpf)"
				/>
			</div>

			<template v-if="estaExpandido(pesquisador.id)">
				<div class="lista-de-dados__linha">
					<Dado nome="E-mail" :valor="pesquisador.email || '—'" />
					<Dado nome="Telefone" :valor="formatarTelefone(pesquisador.telefone)" />
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="Endereço" :valor="pesquisador.endereco" />
					<Dado nome="Número" :valor="pesquisador.numero" />
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="CEP" :valor="formatarCep(pesquisador.cep)" />
					<Dado nome="Bairro" :valor="pesquisador.bairro" />
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="Estado" :valor="pesquisador.estado" />
					<Dado nome="Cidade" :valor="pesquisador.cidade" />
				</div>

				<div class="lista-de-dados__rodape">
					<Button
						severity="warning"
						icon="pi pi-pencil"
						:aria-label="rotuloEditar"
						@click="$emit('editar', pesquisador.id)"
					/>
					<Button
						severity="danger"
						icon="pi pi-trash"
						:aria-label="rotuloExcluir"
						@click="$emit('excluir', pesquisador.id)"
					/>
				</div>
			</template>
		</article>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { ref, watch } from 'vue'
import Dado from './Dado.vue'

export interface PesquisadorResponsavel {
	id: number
	nome: string
	cpf: string
	email?: string
	telefone: string
	endereco: string
	numero: string
	cep: string
	bairro: string
	estado: string
	cidade: string
}

const props = withDefaults(
	defineProps<{
		dados: PesquisadorResponsavel[]
		rotuloNome?: string
		rotuloEditar?: string
		rotuloExcluir?: string
	}>(),
	{
		rotuloNome: 'Nome completo do pesquisador responsável',
		rotuloEditar: 'Editar pesquisador',
		rotuloExcluir: 'Excluir pesquisador'
	}
)

defineEmits<{
	editar: [id: number]
	excluir: [id: number]
}>()

const expandidoId = ref<number | null>(null)

watch(
	() => props.dados,
	lista => {
		if (!lista.length) {
			expandidoId.value = null
			return
		}
		if (expandidoId.value === null || !lista.some(item => item.id === expandidoId.value)) {
			expandidoId.value = lista[0].id
		}
	},
	{ immediate: true, deep: true }
)

const estaExpandido = (id: number) => expandidoId.value === id

const alternar = (id: number) => {
	expandidoId.value = expandidoId.value === id ? null : id
}

const apenasDigitos = (valor: string) => valor.replace(/\D/g, '')

const formatarCpf = (cpf: string) => {
	const digitos = apenasDigitos(cpf).padEnd(11, ' ').slice(0, 11)
	if (apenasDigitos(cpf).length !== 11) return cpf
	return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const formatarTelefone = (telefone: string) => {
	const digitos = apenasDigitos(telefone)
	if (digitos.length === 11) {
		return digitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
	}
	if (digitos.length === 10) {
		return digitos.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
	}
	return telefone
}

const formatarCep = (cep: string) => {
	const digitos = apenasDigitos(cep)
	if (digitos.length !== 8) return cep
	return digitos.replace(/(\d{5})(\d{3})/, '$1-$2')
}
</script>

<style scoped lang="scss">
.lista-de-dados {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__pesquisador {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	&__cabecalho,
	&__linha {
		display: flex;
		width: 100%;
	}

	&__cabecalho > *,
	&__linha > * {
		flex: 1 1 0;
		min-width: 0;
	}

	&__gatilho {
		display: block;
		padding: 0;
		border: 0;
		background: transparent;
		text-align: left;
		cursor: pointer;
	}

	&__cabecalho--recolhido .lista-de-dados__gatilho {
		flex: 1 1 100%;
	}

	&__rodape {
		display: flex;
		justify-content: flex-end;
		background-color: var(--light);
		border: 1px solid var(--gray-200);
		gap: var(--g-8);
		padding: var(--p-16);
	}
}
</style>
