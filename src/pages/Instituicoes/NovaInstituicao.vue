<template>
	<div class="nova-entidade">
		<header class="nova-entidade__cabecalho">
			<h1 class="nova-entidade__titulo">Nova instituição</h1>
		</header>
		<FormularioInstituicao @salvo="voltarParaLista" />
	</div>
</template>

<script setup lang="ts">
import FormularioInstituicao from '@/components/Formularios/Entidades/FormularioInstituicao.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const voltarParaLista = () => {
	router.push({ name: 'Instituições' })
}
</script>

<style scoped lang="scss">
.nova-entidade {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}
}
</style>
