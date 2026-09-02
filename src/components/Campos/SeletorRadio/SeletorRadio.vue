<template>
	<div class="selecao-radio" :class="{ 'selecao-radio--coluna': direcao === 'coluna' }">
		<span
			:id="`${id}-rotulo`"
			class="selecao-radio__rotulo rotulo"
			:class="{ 'rotulo--obrigatorio': required }"
			>{{ rotulo }}</span
		>

		<div class="selecao-radio__campos">
			<div v-for="opcao in opcoes" :key="opcao.id" class="selecao-radio__grupo">
				<RadioButton
					v-model="opcaoSelecionada"
					class="selecao-radio__caixa"
					:input-id="`${id}-${opcao.id}`"
					:value="opcao.valor"
					:name="id"
					@update:model-value="emitirOpcaoSelecionada"
				/>
				<label class="rotulo selecao-radio__rotulo-opcao" :for="`${id}-${opcao.id}`">{{
					opcao.rotulo
				}}</label>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import { nextTick, ref, watch } from 'vue'

export interface OpcoesSeletorRadio {
	id: string
	rotulo: string
	valor: string
}

interface Props {
	id: string
	rotulo: string
	opcoes: OpcoesSeletorRadio[]
	opcaoSelecionada?: string
	required?: boolean
	direcao?: 'linha' | 'coluna'
}

const props = withDefaults(defineProps<Props>(), {
	opcaoSelecionada: '',
	required: false,
	direcao: 'linha'
})

const emitir = defineEmits<{
	(evento: 'update:opcaoSelecionada', opcaoSelecionada: string): void
}>()

const opcaoSelecionada = ref<string>(props.opcaoSelecionada)

watch(
	() => props.opcaoSelecionada,
	valor => {
		opcaoSelecionada.value = valor
	}
)

const emitirOpcaoSelecionada = (): void => {
	nextTick(() => {
		emitir('update:opcaoSelecionada', opcaoSelecionada.value)
	})
}
</script>

<style scoped lang="scss">
.selecao-radio {
	display: flex;
	flex-direction: column;
	gap: var(--g-8);
	width: 100%;

	&__campos {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: var(--g-16);
	}

	&--coluna &__campos {
		flex-direction: column;
		gap: var(--g-8);
	}

	&__grupo {
		cursor: pointer;
		display: flex;
		align-items: flex-start;
		gap: var(--g-8);
	}

	&__rotulo-opcao {
		cursor: pointer;
		margin-bottom: 0;
		white-space: normal;
	}
}
</style>
