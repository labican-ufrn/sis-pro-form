<template>
	<Form
		:key="chaveFormulario"
		:validation-schema="schema"
		:initial-values="valoresIniciais"
		@submit="onSubmit"
		class="formulario-pesquisador formulario"
	>
		<div class="formulario__grupo">
			<CampoDeTexto
				id="nome-do-pesquisador"
				nome="nome-do-pesquisador"
				rotulo="Nome completo do pesquisador ou responsável"
				texto-auxiliar="Ex: João Batista da Silva Medeiros"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeCPF
				id="cpf-do-pesquisador"
				nome="cpf-do-pesquisador"
				rotulo="CPF"
				texto-auxiliar="Ex: 012.345.678-90"
				required
			/>
			<CampoDeTelefone
				id="telefone-do-pesquisador"
				nome="telefone-do-pesquisador"
				rotulo="Telefone"
				texto-auxiliar="Ex: (12) 34567-8910"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="endereco-do-pesquisador"
				nome="endereco-do-pesquisador"
				rotulo="Endereço"
				texto-auxiliar="Ex: Rua dos Caiacós"
				required
			/>
			<CampoDeNumero
				id="numero-do-endereco-do-pesquisador"
				nome="numero-do-endereco-do-pesquisador"
				rotulo="Número"
				texto-auxiliar="Ex: 4"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeTexto
				id="cep-do-pesquisador"
				nome="cep-do-pesquisador"
				rotulo="CEP"
				texto-auxiliar="593000-000"
				required
			/>
			<CampoDeTexto
				id="bairro-do-pesquisador"
				nome="bairro-do-pesquisador"
				rotulo="Bairro"
				texto-auxiliar="Ex: Vales Verdes"
				required
			/>
		</div>

		<div class="formulario__grupo">
			<CampoDeEstadoCidade
				id="estado-e-cidade-do-pesquisador"
				nome-estado="estado-do-pesquisador"
				nome-cidade="cidade-do-pesquisador"
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
import { usePesquisadoreResponsaveisStore } from '@/store/pesquisadoresResponsaveis'
import { extrairEstadoNome, pessoaParaValoresFormulario } from '@/utils/entidadesFormulario'
import { toTypedSchema } from '@vee-validate/zod'
import Button from 'primevue/button'
import { computed } from 'vue'
import { Form } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<{
	idEdicao?: number
	pessoa?: PesquisadorResponsavel
}>()

const emit = defineEmits<{
	salvo: []
}>()

const storePesquisadores = usePesquisadoreResponsaveisStore()

const valoresIniciais = computed(() =>
	props.pessoa ? pessoaParaValoresFormulario(props.pessoa, 'pesquisador') : undefined
)

const chaveFormulario = computed(() =>
	props.idEdicao ? `editar-pesquisador-${props.idEdicao}` : 'novo-pesquisador'
)

const campoObrigatorio = (mensagem: string) =>
	z
		.union([z.string(), z.undefined()])
		.transform(val => val || '')
		.refine(val => val.trim().length > 0, { message: mensagem })

const schema = toTypedSchema(
	z.object({
		'nome-do-pesquisador': campoObrigatorio('O nome do pesquisador é obrigatório.'),
		'cpf-do-pesquisador': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => val.replace(/\D/g, '').length === 11, {
				message: 'Informe um CPF válido.'
			}),
		'telefone-do-pesquisador': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => val.replace(/\D/g, '').length >= 10, {
				message: 'Informe um telefone válido.'
			}),
		'endereco-do-pesquisador': z
			.union([z.string(), z.undefined()])
			.transform(val => val || '')
			.refine(val => val.trim().length >= 5, {
				message: 'O endereço deve ter pelo menos 5 caracteres.'
			}),
		'numero-do-endereco-do-pesquisador': campoObrigatorio(
			'O número do endereço é obrigatório.'
		),
		'cep-do-pesquisador': campoObrigatorio('O CEP é obrigatório.'),
		'bairro-do-pesquisador': campoObrigatorio('O bairro é obrigatório.'),
		'estado-do-pesquisador': z.any().refine(val => Boolean(val), {
			message: 'Estado é obrigatório.'
		}),
		'cidade-do-pesquisador': campoObrigatorio('Cidade do pesquisador é obrigatório.')
	})
)

function onSubmit(values: Record<string, unknown>) {
	const dados = {
		nome: String(values['nome-do-pesquisador'] || ''),
		cpf: String(values['cpf-do-pesquisador'] || '').replace(/\D/g, ''),
		email: props.pessoa?.email || '',
		telefone: String(values['telefone-do-pesquisador'] || '').replace(/\D/g, ''),
		endereco: String(values['endereco-do-pesquisador'] || ''),
		numero: String(values['numero-do-endereco-do-pesquisador'] || ''),
		cep: String(values['cep-do-pesquisador'] || '').replace(/\D/g, ''),
		bairro: String(values['bairro-do-pesquisador'] || ''),
		estado: extrairEstadoNome(values['estado-do-pesquisador']),
		cidade: String(values['cidade-do-pesquisador'] || '')
	}

	if (props.idEdicao != null) {
		storePesquisadores.atualizar(props.idEdicao, dados)
	} else {
		storePesquisadores.adicionar(dados)
	}

	emit('salvo')
}
</script>

<style scoped lang="scss">
.formulario-pesquisador {
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
