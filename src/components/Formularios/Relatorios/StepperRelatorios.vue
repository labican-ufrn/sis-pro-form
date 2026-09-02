<template>
	<nav class="stepper" aria-label="Etapas dos relatórios">
		<template v-for="passo in total" :key="passo">
			<button
				type="button"
				class="stepper__passo"
				:aria-current="passo === atual ? 'step' : undefined"
				:aria-label="`Ir para o relatório ${passo}`"
				@click="emitir('selecionar', passo)"
			>
				<span
					class="stepper__circulo"
					:class="{
						'stepper__circulo--ativo': passo === atual,
						'stepper__circulo--concluido': passo < atual
					}"
				>
					{{ passo }}
				</span>
			</button>
			<div v-if="passo < total" class="stepper__linha" aria-hidden="true"></div>
		</template>
	</nav>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		atual: number
		total?: number
	}>(),
	{
		total: 5
	}
)

const emitir = defineEmits<{
	(evento: 'selecionar', passo: number): void
}>()
</script>

<style scoped lang="scss">
.stepper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: 720px;
	margin: 0 auto;

	&__passo {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 0;
		background: transparent;
		cursor: pointer;
		font: inherit;
	}

	&__circulo {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 2px solid var(--gray-300);
		color: var(--gray-500);
		font-size: var(--fs-12);
		font-weight: 500;
		background: var(--light);

		&--ativo,
		&--concluido {
			border-color: var(--primary-main);
			color: var(--primary-main);
		}
	}

	&__linha {
		flex: 1;
		height: 1px;
		background: var(--gray-300);
		margin: 0 var(--m-4);
	}
}
</style>
