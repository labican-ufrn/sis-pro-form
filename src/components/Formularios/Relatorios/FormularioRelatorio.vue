<template>
	<div class="relatorios">
		<header class="relatorios__cabecalho">
			<h1 class="relatorios__titulo">Relatórios necessários</h1>
			<StepperRelatorios :atual="passo" :total="TOTAL_PASSOS" @selecionar="irParaPasso" />
		</header>

		<h2 class="relatorios__subtitulo">{{ definicao.titulo }}</h2>

		<form class="relatorios__corpo formulario" @submit.prevent="avancar">
			<CampoRelatorio
				v-for="(campo, indice) in definicao.campos"
				:key="`${passo}-${campo.nome ?? campo.tipo}-${indice}`"
				:campo="campo"
				:valores="valores"
			/>

			<div class="formulario__rodape">
				<Button label="PRÓXIMO" type="submit" size="small" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import CampoRelatorio from '@/components/Formularios/Relatorios/CampoRelatorio.vue'
import { relatoriosNecessarios } from '@/components/Formularios/Relatorios/definicoesRelatorios'
import StepperRelatorios from '@/components/Formularios/Relatorios/StepperRelatorios.vue'
import { useRelatoriosStore } from '@/store/relatorios'
import Button from 'primevue/button'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const TOTAL_PASSOS = relatoriosNecessarios.length

const route = useRoute()
const router = useRouter()
const store = useRelatoriosStore()

const passo = computed(() => {
	const numero = Number(route.params.passo)
	if (!Number.isInteger(numero) || numero < 1 || numero > TOTAL_PASSOS) {
		return 1
	}
	return numero
})

const definicao = computed(
	() => relatoriosNecessarios.find(item => item.passo === passo.value) ?? relatoriosNecessarios[0]
)

const valores = computed(() => store.valoresDoPasso(passo.value))

const inicializarCamposEspeciais = () => {
	for (const campo of definicao.value.campos) {
		if (!campo.nome) continue
		if (campo.tipo === 'assinaturas' && !Array.isArray(valores.value[campo.nome])) {
			valores.value[campo.nome] = [{}]
		}
		if (campo.tipo === 'lista-selecao' && !Array.isArray(valores.value[campo.nome])) {
			valores.value[campo.nome] = []
		}
	}
}

watch(
	() => route.params.passo,
	parametro => {
		const numero = Number(parametro)
		if (!Number.isInteger(numero) || numero < 1 || numero > TOTAL_PASSOS) {
			router.replace({ name: 'Relatórios', params: { passo: '1' } })
			return
		}
		inicializarCamposEspeciais()
		window.scrollTo({ top: 0, behavior: 'smooth' })
	},
	{ immediate: true }
)

const irParaPasso = (destino: number) => {
	if (destino === passo.value || destino < 1 || destino > TOTAL_PASSOS) return
	router.push({ name: 'Relatórios', params: { passo: String(destino) } })
}

const avancar = () => {
	if (passo.value < TOTAL_PASSOS) {
		irParaPasso(passo.value + 1)
		return
	}
	router.push({ name: 'Projetos atuais' })
}
</script>

<style scoped lang="scss">
.relatorios {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__cabecalho {
		display: flex;
		flex-direction: column;
		gap: var(--g-16);
	}

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}

	&__subtitulo {
		margin: 0;
		color: var(--dark);
		font-size: var(--fs-16);
		font-weight: 700;
	}

	&__corpo {
		gap: var(--g-16);
	}

	.formulario__rodape {
		display: flex;
		justify-content: flex-start;
	}
}
</style>
