<template>
	<div class="lista-de-dados">
		<article
			v-for="projeto in dados"
			:key="projeto.id"
			class="lista-de-dados__projeto"
		>
			<div
				class="lista-de-dados__cabecalho"
				:class="{ 'lista-de-dados__cabecalho--recolhido': !estaExpandido(projeto.id) }"
			>
				<button
					type="button"
					class="lista-de-dados__gatilho"
					:aria-expanded="estaExpandido(projeto.id)"
					@click="alternar(projeto.id)"
				>
					<Dado
						nome="Título da pesquisa"
						:valor="projeto.titulo"
						cabecalho
						expansivel
						:expandido="estaExpandido(projeto.id)"
					/>
				</button>
				<Dado
					v-if="estaExpandido(projeto.id)"
					nome="Pesquisador responsável"
					:valor="projeto.pesquisadorResponsavel"
				/>
			</div>

			<template v-if="estaExpandido(projeto.id)">
				<div class="lista-de-dados__linha">
					<Dado nome="Instituição" :valor="projeto.instituicao" />
					<Dado nome="Local" :valor="projeto.local" />
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="Data de início" :valor="projeto.dataInicio" />
					<Dado
						v-if="tipo === 'atuais'"
						nome="Previsão de término"
						:valor="projeto.dataPrevistaFim || '—'"
					/>
					<Dado
						v-else
						nome="Data de encerramento"
						:valor="projeto.dataFim || '—'"
					/>
				</div>
				<div class="lista-de-dados__linha">
					<Dado nome="Nível de abrangência" :valor="projeto.nivelAbrangencia" />
					<Dado nome="Status" :valor="rotuloStatus" />
				</div>
			</template>
		</article>

		<p v-if="!dados.length" class="lista-de-dados__vazio">
			Nenhum projeto encontrado.
		</p>
	</div>
</template>

<script setup lang="ts">
import type { Projeto } from '@/store/projetos'
import { computed, ref, watch } from 'vue'
import Dado from './Dado.vue'

const props = defineProps<{
	dados: Projeto[]
	tipo: 'atuais' | 'encerrados'
}>()

const expandidoId = ref<number | null>(null)

const rotuloStatus = computed(() =>
	props.tipo === 'atuais' ? 'Em andamento' : 'Encerrado'
)

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
</script>

<style scoped lang="scss">
.lista-de-dados {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__projeto {
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

	&__vazio {
		margin: 0;
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}
}
</style>
