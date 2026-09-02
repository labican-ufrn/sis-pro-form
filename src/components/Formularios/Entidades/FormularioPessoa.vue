<template>
	<Form
		:key="chaveFormulario"
		:validation-schema="schema"
		:initial-values="valoresIniciais"
		@submit="onSubmit"
		class="formulario-pessoa formulario"
	>
		<div class="formulario__grupo">
			<CampoDeTexto
				:id="`nome-do-${entidade}`"
				:nome="`nome-do-${entidade}`"
				:rotulo="rotulos.nome"
				:texto-auxiliar="placeholders.nome"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeCPF
				:id="`cpf-do-${entidade}`"
				:nome="`cpf-do-${entidade}`"
				rotulo="CPF"
				texto-auxiliar="Ex: 012.345.678-90"
				required
			/>
			<CampoDeTelefone
				:id="`telefone-do-${entidade}`"
				:nome="`telefone-do-${entidade}`"
				rotulo="Telefone"
				texto-auxiliar="Ex: (12) 34567-8910"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				:id="`endereco-do-${entidade}`"
				:nome="`endereco-do-${entidade}`"
				rotulo="Endereço"
				texto-auxiliar="Ex: Rua dos Caiacós"
				required
			/>
			<CampoDeNumero
				:id="`numero-do-endereco-do-${entidade}`"
				:nome="`numero-do-endereco-do-${entidade}`"
				rotulo="Número"
				texto-auxiliar="Ex: 4"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				:id="`cep-do-${entidade}`"
				:nome="`cep-do-${entidade}`"
				rotulo="CEP"
				texto-auxiliar="593000-000"
				required
			/>
			<CampoDeTexto
				:id="`bairro-do-${entidade}`"
				:nome="`bairro-do-${entidade}`"
				rotulo="Bairro"
				texto-auxiliar="Ex: Vales Verdes"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeEstadoCidade
				:id="`estado-e-cidade-do-${entidade}`"
				:nome-estado="`estado-do-${entidade}`"
				:nome-cidade="`cidade-do-${entidade}`"
			/>
		</div>

		<div class="formulario__rodape">
			<Button class="formulario__enviar" label="SALVAR" type="submit" size="small" />
		</div>
	</Form>
</template>

<script setup lang="ts">
import CampoDeCPF from '@/components/Campos/CampoDeCPF/CampoDeCPF.vue'
import CampoDeEstadoCidade from '@/components/Campos/CampoDeEstadoCidade/CampoDeEstadoCidade.vue'
import CampoDeNumero from '@/components/Campos/CampoDeNumero/CampoDeNumero.vue'
import CampoDeTelefone from '@/components/Campos/CampoDeTelefone/CampoDeTelefone.vue'
import CampoDeTexto from '@/components/Campos/CampoDeTexto/CampoDeTexto.vue'
import type { PesquisadorResponsavel } from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import { useOrientadoresStore } from '@/store/orientadores'
import { useOrientandosStore } from '@/store/orientandos'
import { extrairEstadoNome, pessoaParaValoresFormulario } from '@/utils/entidadesFormulario'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import { computed } from 'vue'
import { Form } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<{
	entidade: 'orientador' | 'orientando'
	idEdicao?: number
	pessoa?: PesquisadorResponsavel
}>()

const emit = defineEmits<{
	salvo: []
}>()

const storeOrientadores = useOrientadoresStore()
const storeOrientandos = useOrientandosStore()

const rotulos = computed(() =>
	props.entidade === 'orientador'
		? { nome: 'Nome completo do orientador' }
		: { nome: 'Nome completo do orientando' }
)

const placeholders = computed(() => ({
	nome: 'Ex: João Batista da Silva Medeiros'
}))

const valoresIniciais = computed(() =>
	props.pessoa ? pessoaParaValoresFormulario(props.pessoa, props.entidade) : undefined
)

const chaveFormulario = computed(() =>
	props.idEdicao
		? `editar-${props.entidade}-${props.idEdicao}`
		: `novo-${props.entidade}`
)

const campoObrigatorio = (mensagem: string) =>
	z
		.union([z.string(), z.undefined()])
		.transform(val => val || '')
		.refine(val => val.trim().length > 0, { message: mensagem })

const schema = computed(() => {
	const e = props.entidade
	return toTypedSchema(
		z.object({
			[`nome-do-${e}`]: campoObrigatorio(`O nome do ${e} é obrigatório.`),
			[`cpf-do-${e}`]: z
				.union([z.string(), z.undefined()])
				.transform(val => val || '')
				.refine(val => val.replace(/\D/g, '').length === 11, {
					message: 'Informe um CPF válido.'
				}),
			[`telefone-do-${e}`]: z
				.union([z.string(), z.undefined()])
				.transform(val => val || '')
				.refine(val => val.replace(/\D/g, '').length >= 10, {
					message: 'Informe um telefone válido.'
				}),
			[`endereco-do-${e}`]: z
				.union([z.string(), z.undefined()])
				.transform(val => val || '')
				.refine(val => val.trim().length >= 5, {
					message: 'O endereço deve ter pelo menos 5 caracteres.'
				}),
			[`numero-do-endereco-do-${e}`]: campoObrigatorio(
				'O número do endereço é obrigatório.'
			),
			[`cep-do-${e}`]: campoObrigatorio('O CEP é obrigatório.'),
			[`bairro-do-${e}`]: campoObrigatorio('O bairro é obrigatório.'),
			[`estado-do-${e}`]: z.any().refine(val => Boolean(val), {
				message: 'Estado é obrigatório.'
			}),
			[`cidade-do-${e}`]: campoObrigatorio(`Cidade do ${e} é obrigatória.`)
		})
	)
})

function onSubmit(values: Record<string, unknown>) {
	const e = props.entidade
	const dados = {
		nome: String(values[`nome-do-${e}`] || ''),
		cpf: String(values[`cpf-do-${e}`] || '').replace(/\D/g, ''),
		email: props.pessoa?.email || '',
		telefone: String(values[`telefone-do-${e}`] || '').replace(/\D/g, ''),
		endereco: String(values[`endereco-do-${e}`] || ''),
		numero: String(values[`numero-do-endereco-do-${e}`] || ''),
		cep: String(values[`cep-do-${e}`] || '').replace(/\D/g, ''),
		bairro: String(values[`bairro-do-${e}`] || ''),
		estado: extrairEstadoNome(values[`estado-do-${e}`]),
		cidade: String(values[`cidade-do-${e}`] || '')
	}

	if (props.entidade === 'orientador') {
		if (props.idEdicao != null) {
			storeOrientadores.atualizar(props.idEdicao, dados)
		} else {
			storeOrientadores.adicionar(dados)
		}
	} else if (props.idEdicao != null) {
		storeOrientandos.atualizar(props.idEdicao, dados)
	} else {
		storeOrientandos.adicionar(dados)
	}

	emit('salvo')
}
</script>

<style scoped lang="scss">
.formulario-pessoa {
	width: 100%;

	.formulario__grupo {
		width: 100%;
	}

	.formulario__rodape {
		display: flex;
		justify-content: flex-start;
	}
}
</style>
