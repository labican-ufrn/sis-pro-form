import atuaisJson from '@/database/projetos/atuais.json'
import encerradosJson from '@/database/projetos/encerrados.json'
import { defineStore } from 'pinia'

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

export const useProjetosStore = defineStore('projetos', {
	state: () => ({
		atuais: [...atuaisJson] as Projeto[],
		encerrados: [...encerradosJson] as Projeto[]
	})
})
