import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/pages/Login/Login.vue'
import Principal from '@/pages/Principal/Principal.vue'
import Atuais from '@/pages/Projetos/Atuais.vue'
import NovoProjeto from '@/pages/Projetos/NovoProjeto.vue'
import DadosGerais from '@/pages/Projetos/DadosGerais.vue'
import Relatorios from '@/pages/Projetos/Relatorios.vue'
import Encerrados from '@/pages/Projetos/Encerrados.vue'
import Pesquisadores from '@/pages/Pesquisadores/Pesquisadores.vue'
import NovoPesquisador from '@/pages/Pesquisadores/NovoPesquisador.vue'
import EditarPesquisador from '@/pages/Pesquisadores/EditarPesquisador.vue'
import Orientadores from '@/pages/Orientadores/Orientadores.vue'
import NovoOrientador from '@/pages/Orientadores/NovoOrientador.vue'
import EditarOrientador from '@/pages/Orientadores/EditarOrientador.vue'
import Orientandos from '@/pages/Orientandos/Orientandos.vue'
import NovoOrientando from '@/pages/Orientandos/NovoOrientando.vue'
import EditarOrientando from '@/pages/Orientandos/EditarOrientando.vue'
import Instituicoes from '@/pages/Instituicoes/Instituicoes.vue'
import NovaInstituicao from '@/pages/Instituicoes/NovaInstituicao.vue'
import EditarInstituicao from '@/pages/Instituicoes/EditarInstituicao.vue'

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/',
		name: 'Principal',
		component: Principal
	},
	{
		path: '/projetos/novo',
		name: 'Novo Projeto',
		component: NovoProjeto
	},
	{
		path: '/projetos/novo/dados-gerais',
		name: 'Dados Gerais do Projeto',
		component: DadosGerais
	},
	{
		path: '/projetos/novo/relatorios/:passo',
		name: 'Relatórios',
		component: Relatorios
	},
	{
		path: '/projetos/atuais',
		name: 'Projetos atuais',
		component: Atuais
	},
	{
		path: '/projetos/encerrados',
		name: 'Projetos encerrados',
		component: Encerrados
	},
	{
		path: '/pesquisadores',
		name: 'Pesquisadores',
		component: Pesquisadores
	},
	{
		path: '/pesquisadores/novo',
		name: 'Novo Pesquisador',
		component: NovoPesquisador
	},
	{
		path: '/pesquisadores/:id/editar',
		name: 'Editar Pesquisador',
		component: EditarPesquisador
	},
	{
		path: '/orientadores',
		name: 'Orientadores',
		component: Orientadores
	},
	{
		path: '/orientadores/novo',
		name: 'Novo Orientador',
		component: NovoOrientador
	},
	{
		path: '/orientadores/:id/editar',
		name: 'Editar Orientador',
		component: EditarOrientador
	},
	{
		path: '/orientandos',
		name: 'Orientandos',
		component: Orientandos
	},
	{
		path: '/orientandos/novo',
		name: 'Novo Orientando',
		component: NovoOrientando
	},
	{
		path: '/orientandos/:id/editar',
		name: 'Editar Orientando',
		component: EditarOrientando
	},
	{
		path: '/instituicoes',
		name: 'Instituições',
		component: Instituicoes
	},
	{
		path: '/instituicoes/nova',
		name: 'Nova Instituição',
		component: NovaInstituicao
	},
	{
		path: '/instituicoes/:id/editar',
		name: 'Editar Instituição',
		component: EditarInstituicao
	}
]

export const router = createRouter({
	history: createWebHistory(),
	routes
})
