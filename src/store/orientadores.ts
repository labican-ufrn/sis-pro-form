import type { PesquisadorResponsavel } from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import orientadoresJson from '@/database/entidades/orientadores.json'
import { defineStore } from 'pinia'

type NovoOrientador = Omit<PesquisadorResponsavel, 'id'>

export const useOrientadoresStore = defineStore('orientadores', {
	state: () => ({
		orientadores: [...orientadoresJson] as PesquisadorResponsavel[]
	}),
	actions: {
		adicionar(orientador: NovoOrientador) {
			const proximoId =
				this.orientadores.reduce((maior, atual) => Math.max(maior, atual.id), 0) + 1

			this.orientadores.unshift({
				id: proximoId,
				...orientador
			})
		},
		remover(id: number) {
			this.orientadores = this.orientadores.filter(orientador => orientador.id !== id)
		},
		atualizar(id: number, orientador: NovoOrientador) {
			const indice = this.orientadores.findIndex(item => item.id === id)
			if (indice === -1) return false

			this.orientadores[indice] = {
				id,
				...orientador
			}
			return true
		}
	}
})
