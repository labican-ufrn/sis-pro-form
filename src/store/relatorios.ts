import { defineStore } from 'pinia'

export type ValoresRelatorio = Record<string, unknown>

export const useRelatoriosStore = defineStore('relatorios', {
	state: () => ({
		passos: {} as Record<number, ValoresRelatorio>
	}),
	actions: {
		valoresDoPasso(passo: number): ValoresRelatorio {
			if (!this.passos[passo]) {
				this.passos[passo] = {}
			}
			return this.passos[passo]
		},
		limpar() {
			this.passos = {}
		}
	}
})
