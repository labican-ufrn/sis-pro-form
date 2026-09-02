import type { PesquisadorResponsavel } from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import type { Instituicao } from '@/store/instituicoes'
import * as estadosCidades from '@/utils/estados-cidades.json'

interface Estado {
	nome: string
	sigla: string
	cidades: string[]
}

const estados = estadosCidades.estados as Estado[]

export const encontrarEstadoPorNome = (nomeEstado: string) =>
	estados.find(estado => estado.nome === nomeEstado || estado.sigla === nomeEstado) ?? null

export const formatarCpfParaMascara = (cpf: string) => {
	const digitos = cpf.replace(/\D/g, '').slice(0, 11)
	if (digitos.length !== 11) return cpf
	return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

export const formatarTelefoneParaMascara = (telefone: string) => {
	const digitos = telefone.replace(/\D/g, '')
	if (digitos.length === 11) {
		return digitos.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
	}
	if (digitos.length === 10) {
		return digitos.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
	}
	return telefone
}

export const formatarCnpjParaMascara = (cnpj: string) => {
	const digitos = cnpj.replace(/\D/g, '').slice(0, 14)
	if (digitos.length !== 14) return cnpj
	return digitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
}

export const pessoaParaValoresFormulario = (
	pessoa: PesquisadorResponsavel,
	entidade: 'pesquisador' | 'orientador' | 'orientando'
) => ({
	[`nome-do-${entidade}`]: pessoa.nome,
	[`cpf-do-${entidade}`]: formatarCpfParaMascara(pessoa.cpf),
	[`telefone-do-${entidade}`]: formatarTelefoneParaMascara(pessoa.telefone),
	[`endereco-do-${entidade}`]: pessoa.endereco,
	[`numero-do-endereco-do-${entidade}`]: pessoa.numero,
	[`cep-do-${entidade}`]: pessoa.cep,
	[`bairro-do-${entidade}`]: pessoa.bairro,
	[`estado-do-${entidade}`]: encontrarEstadoPorNome(pessoa.estado),
	[`cidade-do-${entidade}`]: pessoa.cidade
})

export const instituicaoParaValoresFormulario = (instituicao: Instituicao) => ({
	'nome-da-instituicao': instituicao.nomeDaInstituicao,
	'cnpj-da-instituicao': formatarCnpjParaMascara(instituicao.cnpjDaInstituicao),
	'cep-da-instituicao': instituicao.cep || '',
	'nome-do-responsavel': instituicao.nome,
	'cargo-do-responsavel': instituicao.cargo,
	'telefone-do-responsavel': formatarTelefoneParaMascara(instituicao.telefone || ''),
	'email-do-responsavel': instituicao.email || ''
})

export const extrairEstadoNome = (estado: unknown) => {
	if (typeof estado === 'string') return estado
	if (estado && typeof estado === 'object') {
		const valor = estado as { nome?: string; sigla?: string }
		return valor.nome || valor.sigla || ''
	}
	return ''
}
