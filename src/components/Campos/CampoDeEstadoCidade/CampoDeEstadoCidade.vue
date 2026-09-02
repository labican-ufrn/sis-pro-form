<template>
	<div class="campo-de-estado-cidade">
		<div class="campo-de-estado campo-container">
			<label class="campo-de-estado__rotulo rotulo rotulo--obrigatorio" :for="nomeEstado"
				>Estado</label
			>

			<Field :name="nomeEstado" v-slot="{ value, handleChange }">
				<Dropdown
					class="campo-de-estado-cidade__seletor"
					:inputId="nomeEstado"
					:options="estados"
					:optionLabel="'nome'"
					filter
					placeholder="Ex: Rio Grande do Norte"
					:modelValue="value"
					@update:modelValue="
						val => {
							handleChange(val)
							extrairCidadesDoEstadoSelecionado(val)
						}
					"
				/>
			</Field>

			<ErrorMessage class="campo-mensagem-de-erro" :name="nomeEstado" />
		</div>
		<div class="campo-de-cidade campo-container">
			<label class="campo-de-estado__rotulo rotulo rotulo--obrigatorio" :for="nomeCidade"
				>Cidade</label
			>

			<Field :name="nomeCidade" v-slot="{ value, handleChange }">
				<Dropdown
					class="campo-de-estado-cidade__seletor"
					:inputId="nomeCidade"
					:options="cidades"
					filter
					placeholder="Ex: Caicó"
					:modelValue="value"
					@update:modelValue="handleChange"
					:disabled="!cidades.length"
				/>
			</Field>

			<ErrorMessage class="campo-mensagem-de-erro" :name="nomeCidade" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { Field, ErrorMessage, useFieldValue } from 'vee-validate'
import { ref, watch } from 'vue'
import Dropdown from 'primevue/dropdown'
import * as estadosCidades from '@/utils/estados-cidades.json'

interface Props {
	id: string
	nomeEstado: string
	nomeCidade: string
}

type Cidade = string

interface Estado {
	nome: string
	sigla: string
	cidades: Cidade[]
}

const props = defineProps<Props>()

const estados = ref<Estado[]>(estadosCidades.estados as Estado[])
const cidades = ref<Cidade[]>([])
const estadoAtual = useFieldValue<Estado | string | null>(() => props.nomeEstado)

const extrairCidadesDoEstadoSelecionado = (estadoSelecionado: Estado | string | null) => {
	if (!estadoSelecionado) {
		cidades.value = []
		return
	}

	if (typeof estadoSelecionado === 'string') {
		const encontrado = estados.value.find(
			estado => estado.nome === estadoSelecionado || estado.sigla === estadoSelecionado
		)
		cidades.value = encontrado?.cidades || []
		return
	}

	cidades.value = estadoSelecionado.cidades || []
}

watch(
	estadoAtual,
	valor => {
		extrairCidadesDoEstadoSelecionado(valor ?? null)
	},
	{ immediate: true }
)
</script>

<style scoped lang="scss">
.campo-de-estado-cidade {
	width: 100%;
	display: flex;
	gap: var(--g-16);

	&__seletor {
		width: 100%;
		font-size: var(--fs-14);
	}
}
</style>
