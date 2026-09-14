<template>
	<div class="formulario-mestre">
		<header class="formulario-mestre__cabecalho">
			<h1 class="formulario-mestre__titulo">Formulário mestre</h1>
		</header>

		<form class="formulario-mestre__corpo formulario" @submit.prevent="avancar">
			<div class="formulario__grupo">
				<SeletorRadio
					id="tipo-pesquisador"
					v-model:opcao-selecionada="formulario.tipoPesquisador"
					rotulo="O pesquisador é orientador ou orientando?"
					direcao="coluna"
					required
					:opcoes="opcoesTipoPesquisador"
				/>
			</div>

			<div class="formulario__grupo">
				<SeletorRadio
					id="envolve-dados-sus"
					v-model:opcao-selecionada="formulario.envolveDadosSus"
					rotulo="Sua pesquisa envolve dados do SUS?"
					required
					:opcoes="opcoesSimNao"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<SeletorRadio
					id="nivel-abrangencia"
					v-model:opcao-selecionada="formulario.nivelAbrangencia"
					rotulo="Nível de abrangência do Projeto"
					direcao="coluna"
					required
					:opcoes="opcoesNivelAbrangencia"
				/>
				<InputText
					v-if="formulario.nivelAbrangencia === 'outro'"
					id="nivel-abrangencia-outro"
					v-model="formulario.nivelAbrangenciaOutro"
					class="formulario-mestre__campo"
					placeholder="Descreva o nível de abrangência"
					size="small"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<span class="rotulo rotulo--obrigatorio formulario-mestre__rotulo-longo">
					Em situações que o projeto submetido seja no âmbito de pesquisas com seres
					humanos em instituições do Sistema Único de Saúde - SUS, deve-se respeitar a
					Resolução 580/2018 (Art. 5º do CAPÍTULO II). Nesses casos, inserir na Carta de
					Anuência um dos parágrafos abaixo.
				</span>

				<div class="formulario-mestre__opcoes-resolucao">
					<label
						v-for="opcao in opcoesResolucao"
						:key="opcao.id"
						class="formulario-mestre__opcao-resolucao"
					>
						<RadioButton
							v-model="formulario.paragrafoResolucao"
							:input-id="opcao.id"
							:value="opcao.valor"
							name="paragrafo-resolucao"
						/>
						<span class="formulario-mestre__texto-opcao">{{ opcao.rotulo }}</span>
					</label>
				</div>

				<InputText
					v-if="formulario.paragrafoResolucao === 'irao-interferir'"
					id="justificativa-resolucao"
					v-model="formulario.justificativaResolucao"
					class="formulario-mestre__campo"
					placeholder="Descrever a justificativa"
					size="small"
				/>
			</div>

			<section class="formulario-mestre__formularios">
				<h2 class="formulario-mestre__formularios-titulo">
					De acordo com os dados fornecidos a respeito do projeto, esses serão os
					formulários que você deverá preencher
				</h2>
				<ul class="formulario-mestre__lista">
					<li
						v-for="formularioNecessario in formulariosNecessarios"
						:key="formularioNecessario"
						class="formulario-mestre__item"
					>
						{{ formularioNecessario }}
					</li>
				</ul>
			</section>

			<div class="formulario__rodape">
				<Button label="PRÓXIMO" type="submit" size="small" />
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import SeletorRadio, {
	type OpcoesSeletorRadio
} from '@/components/Campos/SeletorRadio/SeletorRadio.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import { useProjetosStore } from '@/store/projetos'
import { useRouter } from 'vue-router'

const router = useRouter()
const storeProjetos = useProjetosStore()
storeProjetos.garantirRascunho()
const formulario = storeProjetos.rascunho.mestre

const opcoesTipoPesquisador: OpcoesSeletorRadio[] = [
	{ id: 'orientador', rotulo: 'Orientador', valor: 'orientador' },
	{ id: 'orientando', rotulo: 'Orientando', valor: 'orientando' },
	{
		id: 'pesquisador-individual',
		rotulo: 'Pesquisador individual',
		valor: 'pesquisador-individual'
	}
]

const opcoesSimNao: OpcoesSeletorRadio[] = [
	{ id: 'sus-sim', rotulo: 'Sim', valor: 'sim' },
	{ id: 'sus-nao', rotulo: 'Não', valor: 'nao' }
]

const opcoesNivelAbrangencia: OpcoesSeletorRadio[] = [
	{
		id: 'graduacao',
		rotulo: 'Monografia/Trabalho de Conclusão de Curso – Graduação',
		valor: 'graduacao'
	},
	{
		id: 'especializacao',
		rotulo: 'Monografia/Trabalho de Conclusão de Curso – Especialização/outros',
		valor: 'especializacao'
	},
	{ id: 'mestrado', rotulo: 'Mestrado', valor: 'mestrado' },
	{ id: 'doutorado', rotulo: 'Doutorado', valor: 'doutorado' },
	{ id: 'outro', rotulo: 'Outro tipo (específica)', valor: 'outro' }
]

const opcoesResolucao = [
	{
		id: 'nao-irao-interferir',
		valor: 'nao-irao-interferir',
		rotulo:
			'Destacamos que de acordo com a Resolução 580/2018 no Art. 5º do CAPÍTULO II (Dos aspectos éticos das pesquisas com seres humanos em instituições do SUS), os procedimentos da pesquisa NÃO IRÃO INTERFERIR na rotina dos serviços de assistência à saúde bem como nas atividades profissionais dos trabalhadores.'
	},
	{
		id: 'irao-interferir',
		valor: 'irao-interferir',
		rotulo:
			'Destacamos que de acordo com a Resolução 580/2018 no Art. 5º do CAPÍTULO II (Dos aspectos éticos das pesquisas com seres humanos em instituições do SUS), os procedimentos da pesquisa IRÃO INTERFERIR na rotina dos serviços de assistência à saúde e/ou nas atividades profissionais dos trabalhadores, fato que pode ser justificado:'
	}
]

const formulariosNecessarios = [
	'Declaração de Compromisso Ético de Não Início da Pesquisa',
	'Termo de confidencialidade',
	'Folha de identificação do pesquisador',
	'Petição para Dispensa de TCLE ou RCLE',
	'Termo de autorização para gravação de voz e ou Registro de Imagens (fotos e ou vídeos)',
	'Carta de Anuência',
	'Termo de autorização institucional para uso de documentos (dos participantes)',
	'TCLE OU RCLE (Maiores de 18 Anos)',
	'TCLE ou RCLE (Para os Pais ou Responsáveis dos Menores de 18 Anos)',
	'TALE'
]

const avancar = () => {
	router.push({ name: 'Dados Gerais do Projeto' })
}
</script>

<style scoped lang="scss">
.formulario-mestre {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}

	&__corpo {
		gap: var(--g-16);
	}

	&__campo {
		width: 100%;
	}

	&__rotulo-longo {
		white-space: normal;
		line-height: 1.4;
	}

	&__opcoes-resolucao {
		display: flex;
		flex-direction: column;
		gap: var(--g-8);
		width: 100%;
	}

	&__opcao-resolucao {
		display: flex;
		align-items: flex-start;
		gap: var(--g-8);
		cursor: pointer;
	}

	&__texto-opcao {
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
		line-height: 1.4;
	}

	&__formularios {
		display: flex;
		flex-direction: column;
		gap: var(--g-8);
	}

	&__formularios-titulo {
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 700;
		margin: 0;
	}

	&__lista {
		display: flex;
		flex-direction: column;
		gap: var(--g-4);
		margin: 0;
		padding-left: var(--p-16);
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}

	&__item {
		list-style: disc;
	}

	.formulario__grupo--coluna {
		flex-direction: column;
		align-items: stretch;
	}

	.formulario__rodape {
		display: flex;
		justify-content: flex-start;
	}
}
</style>
