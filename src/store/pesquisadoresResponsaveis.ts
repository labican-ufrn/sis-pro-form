import { defineStore } from 'pinia'
import pesquisadoresResponsaveis from '@/database/entidades/pesquisadoresResponsaveis.json'
import type { PesquisadorResponsavel } from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'

type NovoPesquisador = Omit<PesquisadorResponsavel, 'id'>

export const usePesquisadoreResponsaveisStore = defineStore('pesquisadoresResponsaveis', {
	state: () => ({
		pesquisadoresResponsaveis: [...pesquisadoresResponsaveis] as PesquisadorResponsavel[]
	}),
	actions: {
		adicionar(pesquisador: NovoPesquisador) {
			const proximoId =
				this.pesquisadoresResponsaveis.reduce(
					(maior, atual) => Math.max(maior, atual.id),
					0
				) + 1

			this.pesquisadoresResponsaveis.unshift({
				id: proximoId,
				...pesquisador
			})
		},
		remover(id: number) {
			this.pesquisadoresResponsaveis = this.pesquisadoresResponsaveis.filter(
				pesquisador => pesquisador.id !== id
			)
		},
		atualizar(id: number, pesquisador: NovoPesquisador) {
			const indice = this.pesquisadoresResponsaveis.findIndex(item => item.id === id)
			if (indice === -1) return false

			this.pesquisadoresResponsaveis[indice] = {
				id,
				...pesquisador
			}
			return true
		}
	}
})
