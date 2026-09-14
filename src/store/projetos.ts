import atuaisJson from '@/database/projetos/atuais.json'
import encerradosJson from '@/database/projetos/encerrados.json'
import { defineStore } from 'pinia'
import { useRelatoriosStore } from '@/store/relatorios'

export interface Projeto {
	id: number
	titulo: string
	pesquisadorResponsavel: string
	instituicao: string
	local: string
	dataInicio: string
	dataPrevistaFim?: string
	dataFim?: string
	nivelAbrangencia: string
	slug: string
}

export interface RascunhoMestre {
	tipoPesquisador: string
	envolveDadosSus: string
	nivelAbrangencia: string
	nivelAbrangenciaOutro: string
	paragrafoResolucao: string
	justificativaResolucao: string
}

export interface RascunhoDadosGerais {
	pesquisadorResponsavel: { nome: string } | null
	nomePesquisador: string
	tituloPesquisa: string
	tipoPesquisador: string
	orientadores: string[]
	orientandos: string[]
	localPesquisa: string
	nomeSetor: string
	objetivosPesquisa: string
	etapasPesquisa: string
	envolveDadosSus: string
	cnpjInstituicao: string
	cepInstituicao: string
	metodologia: string
}

const rotulosNivelAbrangencia: Record<string, string> = {
	graduacao: 'Graduação',
	especializacao: 'Especialização',
	mestrado: 'Mestrado',
	doutorado: 'Doutorado'
}

const mestreVazio = (): RascunhoMestre => ({
	tipoPesquisador: '',
	envolveDadosSus: 'nao',
	nivelAbrangencia: 'outro',
	nivelAbrangenciaOutro: '',
	paragrafoResolucao: 'irao-interferir',
	justificativaResolucao: ''
})

const dadosGeraisVazio = (): RascunhoDadosGerais => ({
	pesquisadorResponsavel: null,
	nomePesquisador: '',
	tituloPesquisa: '',
	tipoPesquisador: '',
	orientadores: [],
	orientandos: [],
	localPesquisa: '',
	nomeSetor: '',
	objetivosPesquisa: '',
	etapasPesquisa: '',
	envolveDadosSus: 'nao',
	cnpjInstituicao: '',
	cepInstituicao: '',
	metodologia: ''
})

const slugificar = (texto: string) =>
	texto
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '_')
		.replace(/^_|_$/g, '') || 'projeto'

const dataHoje = () => {
	const agora = new Date()
	const dia = String(agora.getDate()).padStart(2, '0')
	const mes = String(agora.getMonth() + 1).padStart(2, '0')
	return `${dia}/${mes}/${agora.getFullYear()}`
}

const rotuloNivelAbrangencia = (mestre: RascunhoMestre) => {
	if (mestre.nivelAbrangencia === 'outro') {
		return mestre.nivelAbrangenciaOutro.trim() || 'Outro'
	}

	return rotulosNivelAbrangencia[mestre.nivelAbrangencia] ?? mestre.nivelAbrangencia ?? '—'
}

export const useProjetosStore = defineStore('projetos', {
	state: () => ({
		atuais: [...atuaisJson] as Projeto[],
		encerrados: [...encerradosJson] as Projeto[],
		rascunhoAberto: false,
		rascunho: {
			mestre: mestreVazio(),
			dadosGerais: dadosGeraisVazio()
		}
	}),
	actions: {
		iniciarNovo() {
			Object.assign(this.rascunho.mestre, mestreVazio())
			Object.assign(this.rascunho.dadosGerais, dadosGeraisVazio())
			this.rascunhoAberto = true
			useRelatoriosStore().limpar()
		},
		garantirRascunho() {
			if (!this.rascunhoAberto) {
				this.iniciarNovo()
			}
		},
		concluirRascunho() {
			if (!this.rascunhoAberto) return

			const { mestre, dadosGerais } = this.rascunho
			const titulo = dadosGerais.tituloPesquisa.trim() || 'Projeto sem título'
			const proximoId =
				[...this.atuais, ...this.encerrados].reduce(
					(maior, atual) => Math.max(maior, atual.id),
					0
				) + 1

			this.atuais.unshift({
				id: proximoId,
				titulo,
				pesquisadorResponsavel: dadosGerais.nomePesquisador.trim() || '—',
				instituicao: dadosGerais.localPesquisa.trim() || '—',
				local: dadosGerais.nomeSetor.trim() || dadosGerais.localPesquisa.trim() || '—',
				dataInicio: dataHoje(),
				nivelAbrangencia: rotuloNivelAbrangencia(mestre),
				slug: slugificar(titulo)
			})

			this.rascunhoAberto = false
			useRelatoriosStore().limpar()
		}
	}
})
