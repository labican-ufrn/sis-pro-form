<template>
	<div class="dado" :class="{ 'dado--cabecalho': cabecalho }">
		<div class="dado__topo">
			<span class="dado__nome">{{ nome }}</span>
			<span v-if="expansivel" class="dado__expansor" aria-hidden="true">
				<i class="pi" :class="expandido ? 'pi-chevron-up' : 'pi-chevron-down'"></i>
			</span>
		</div>
		<span class="dado__valor">{{ valor }}</span>
	</div>
</template>

<script setup lang="ts">
interface Props {
	nome: string
	valor: string | number
	cabecalho?: boolean
	expansivel?: boolean
	expandido?: boolean
}

withDefaults(defineProps<Props>(), {
	cabecalho: false,
	expansivel: false,
	expandido: false
})

</script>

<style scoped lang="scss">
.dado {
	width: 100%;
	display: flex;
	flex-direction: column;
	background-color: var(--light);
	border: 1px solid var(--gray-200);
	gap: var(--g-8);
	padding: var(--p-16);

	&__topo {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--g-8);
		min-height: 17px;
	}

	&__nome {
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 700;
	}

	&__valor {
		color: var(--gray-500);
		font-size: var(--fs-12);
		font-weight: 500;
	}

	&__expansor {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 14px;
		height: 14px;
		color: var(--gray);

		.pi {
			font-size: var(--fs-12);
		}
	}
}
</style>
