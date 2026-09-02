<template>
	<div class="lista-de-dados">
		<article
			v-for="instituicao in dados"
			:key="instituicao.id"
			class="lista-de-dados__instituicao"
		>
			<div
				class="lista-de-dados__cabecalho"
				:class="{ 'lista-de-dados__cabecalho--recolhido': !estaExpandido(instituicao.id) }"
			>
				<button
					type="button"
					class="lista-de-dados__gatilho"
					:aria-expanded="estaExpandido(instituicao.id)"
					@click="alternar(instituicao.id)"
				>
					<Dado
						nome="Nome da instituição"
						:valor="instituicao.nomeDaInstituicao"
						cabecalho
						expansivel
						:expandido="estaExpandido(instituicao.id)"
					/>
				</button>
				<Dado
					v-if="estaExpandido(instituicao.id)"
					nome="CNPJ"
					:valor="formatarCnpj(instituicao.cnpjDaInstituicao)"
				/>
			</div>

			<template v-if="estaExpandido(instituicao.id)">
				<div class="lista-de-dados__linha">
					<Dado nome="Responsável" :valor="instituicao.nome" />
					<Dado nome="Cargo" :valor="instituicao.cargo" />
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="E-mail" :valor="instituicao.email || '—'" />
					<Dado
						nome="Telefone"
						:valor="formatarTelefone(instituicao.telefone || '')"
					/>
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="CEP" :valor="formatarCep(instituicao.cep || '')" />
				</div>

				<div class="lista-de-dados__rodape">
					<Button
						severity="warning"
						icon="pi pi-pencil"
						aria-label="Editar instituição"
						@click="$emit('editar', instituicao.id)"
					/>
					<Button
						severity="danger"
						icon="pi pi-trash"
						aria-label="Excluir instituição"
						@click="$emit('excluir', instituicao.id)"
					/>
				</div>
			</template>
		</article>

		<p v-if="!dados.length" class="lista-de-dados__vazio">
			Nenhuma instituição encontrada.
		</p>
	</div>
</template>

<script setup lang="ts">
import type { Instituicao } from '@/store/instituicoes'
import Button from 'primevue/button'
import { ref, watch } from 'vue'
import Dado from './Dado.vue'

const props = defineProps<{
	dados: Instituicao[]
}>()

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

const formatarCnpj = (cnpj: string) => {
	const digitos = apenasDigitos(cnpj)
	if (digitos.length !== 14) return cnpj || '—'
	return digitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

const formatarTelefone = (telefone: string) => {
	const digitos = apenasDigitos(telefone)
	if (digitos.length === 11) {
		return digitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
	}
	if (digitos.length === 10) {
		return digitos.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
	}
	return telefone || '—'
}

const formatarCep = (cep: string) => {
	const digitos = apenasDigitos(cep)
	if (digitos.length !== 8) return cep || '—'
	return digitos.replace(/(\d{5})(\d{3})/, '$1-$2')
}
</script>

<style scoped lang="scss">
.lista-de-dados {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__instituicao {
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

	&__vazio {
		margin: 0;
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}
}
</style>
