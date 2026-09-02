<template>
	<Form
		:key="chaveFormulario"
		:validation-schema="schema"
		:initial-values="valoresIniciais"
		@submit="onSubmit"
		class="formulario-instituicao formulario"
	>
		<div class="formulario__grupo">
			<CampoDeTexto
				id="nome-da-instituicao"
				nome="nome-da-instituicao"
				rotulo="Nome da instituição"
				texto-auxiliar="Ex: Universidade Federal do Rio Grande do Norte"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeCNPJ
				id="cnpj-da-instituicao"
				nome="cnpj-da-instituicao"
				rotulo="CNPJ da instituição"
				texto-auxiliar="00.000.000/0001-00"
				required
			/>
			<CampoDeTexto
				id="cep-da-instituicao"
				nome="cep-da-instituicao"
				rotulo="CEP da instituição"
				texto-auxiliar="Ex: 59064-000"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="nome-do-responsavel"
				nome="nome-do-responsavel"
				rotulo="Nome do responsável pela instituição"
				texto-auxiliar="Ex: João Batista da Silva Medeiros"
				required
			/>
			<CampoDeTexto
				id="cargo-do-responsavel"
				nome="cargo-do-responsavel"
				rotulo="Cargo"
				texto-auxiliar="Ex: Reitor"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTelefone
				id="telefone-do-responsavel"
				nome="telefone-do-responsavel"
				rotulo="Telefone"
				texto-auxiliar="Ex: (12) 34567-8910"
				required
			/>
			<CampoDeTexto
				id="email-do-responsavel"
				nome="email-do-responsavel"
				rotulo="E-mail"
				texto-auxiliar="Ex: contato@instituicao.edu.br"
				required
			/>
		</div>

		<div class="formulario__rodape">
			<Button class="formulario__enviar" label="SALVAR" type="submit" size="small" />
		</div>
	</Form>
</template>

<script setup lang="ts">
import CampoDeCNPJ from '@/components/Campos/CampoDeCNPJ/CampoDeCNPJ.vue'
import CampoDeTelefone from '@/components/Campos/CampoDeTelefone/CampoDeTelefone.vue'
import CampoDeTexto from '@/components/Campos/CampoDeTexto/CampoDeTexto.vue'
import type { Instituicao } from '@/store/instituicoes'
import { useInstituicoesStore } from '@/store/instituicoes'
import { instituicaoParaValoresFormulario } from '@/utils/entidadesFormulario'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import { computed } from 'vue'
import { Form } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<{
	idEdicao?: number
	instituicao?: Instituicao
}>()

const emit = defineEmits<{
	salvo: []
}>()

const storeInstituicoes = useInstituicoesStore()

const valoresIniciais = computed(() =>
	props.instituicao ? instituicaoParaValoresFormulario(props.instituicao) : undefined
)

const chaveFormulario = computed(() =>
	props.idEdicao ? `editar-instituicao-${props.idEdicao}` : 'nova-instituicao'
)

const campoObrigatorio = (mensagem: string) =>
	z
		.union([z.string(), z.undefined()])
		.transform(val => val || '')
		.refine(val => val.trim().length > 0, { message: mensagem })

const schema = toTypedSchema(
	z.object({
		'nome-da-instituicao': campoObrigatorio('O nome da instituição é obrigatório.'),
		'cnpj-da-instituicao': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => val.replace(/\D/g, '').length === 14, {
				message: 'Informe um CNPJ válido.'
			}),
		'cep-da-instituicao': campoObrigatorio('O CEP é obrigatório.'),
		'nome-do-responsavel': campoObrigatorio('O nome do responsável é obrigatório.'),
		'cargo-do-responsavel': campoObrigatorio('O cargo é obrigatório.'),
		'telefone-do-responsavel': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => val.replace(/\D/g, '').length >= 10, {
				message: 'Informe um telefone válido.'
			}),
		'email-do-responsavel': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
				message: 'Informe um e-mail válido.'
			})
	})
)

function onSubmit(values: Record<string, unknown>) {
	const dados = {
		nome: String(values['nome-do-responsavel'] || ''),
		cargo: String(values['cargo-do-responsavel'] || ''),
		nomeDaInstituicao: String(values['nome-da-instituicao'] || ''),
		cnpjDaInstituicao: String(values['cnpj-da-instituicao'] || '').replace(/\D/g, ''),
		telefone: String(values['telefone-do-responsavel'] || '').replace(/\D/g, ''),
		email: String(values['email-do-responsavel'] || ''),
		cep: String(values['cep-da-instituicao'] || '').replace(/\D/g, '')
	}

	if (props.idEdicao != null) {
		storeInstituicoes.atualizar(props.idEdicao, dados)
	} else {
		storeInstituicoes.adicionar(dados)
	}

	emit('salvo')
}
</script>

<style scoped lang="scss">
.formulario-instituicao {
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
