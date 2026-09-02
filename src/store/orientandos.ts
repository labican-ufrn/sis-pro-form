import type { PesquisadorResponsavel } from '@/components/ListaDeDados/ListaPesquisadoresResponsaveis.vue'
import orientandosJson from '@/database/entidades/orientandos.json'
import { defineStore } from 'pinia'

type NovoOrientando = Omit<PesquisadorResponsavel, 'id'>

export const useOrientandosStore = defineStore('orientandos', {
	state: () => ({
		orientandos: [...orientandosJson] as PesquisadorResponsavel[]
	}),
	actions: {
		adicionar(orientando: NovoOrientando) {
			const proximoId =
				this.orientandos.reduce((maior, atual) => Math.max(maior, atual.id), 0) + 1

			this.orientandos.unshift({
				id: proximoId,
				...orientando
			})
		},
		remover(id: number) {
			this.orientandos = this.orientandos.filter(orientando => orientando.id !== id)
		},
		atualizar(id: number, orientando: NovoOrientando) {
			const indice = this.orientandos.findIndex(item => item.id === id)
			if (indice === -1) return false

			this.orientandos[indice] = {
				id,
				...orientando
			}
			return true
		}
	}
})
