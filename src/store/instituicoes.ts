import instituicoesJson from '@/database/entidades/responsaveisPelasInstituicoes.json'
import { defineStore } from 'pinia'

export interface Instituicao {
	id: number
	nome: string
	cargo: string
	nomeDaInstituicao: string
	cnpjDaInstituicao: string
	telefone?: string
	email?: string
	cep?: string
}

type NovaInstituicao = Omit<Instituicao, 'id'>

export const useInstituicoesStore = defineStore('instituicoes', {
	state: () => ({
		instituicoes: [...instituicoesJson] as Instituicao[]
	}),
	actions: {
		adicionar(instituicao: NovaInstituicao) {
			const proximoId =
				this.instituicoes.reduce((maior, atual) => Math.max(maior, atual.id), 0) + 1

			this.instituicoes.unshift({
				id: proximoId,
				...instituicao
			})
		},
		remover(id: number) {
			this.instituicoes = this.instituicoes.filter(instituicao => instituicao.id !== id)
		},
		atualizar(id: number, instituicao: NovaInstituicao) {
			const indice = this.instituicoes.findIndex(item => item.id === id)
			if (indice === -1) return false

			this.instituicoes[indice] = {
				id,
				...instituicao
			}
			return true
		}
	}
})
