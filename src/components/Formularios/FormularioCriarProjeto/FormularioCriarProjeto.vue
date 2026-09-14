<template>
	<div class="dados-gerais">
		<header class="dados-gerais__cabecalho">
			<h1 class="dados-gerais__titulo">Dados gerais do projeto</h1>
		</header>

		<form class="dados-gerais__corpo formulario" @submit.prevent="avancar">
			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="pesquisador-responsavel">
					Selecione o pesquisador responsável
				</label>
				<Dropdown
					id="pesquisador-responsavel"
					v-model="formulario.pesquisadorResponsavel"
					class="dados-gerais__campo"
					:options="opcoesPesquisadores"
					option-label="nome"
					placeholder="Selecione um pesquisador responsável"
					filter
					@update:model-value="preencherNomePesquisador"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="nome-pesquisador">
					Nome completo do pesquisador ou responsável
				</label>
				<InputText
					id="nome-pesquisador"
					v-model="formulario.nomePesquisador"
					class="dados-gerais__campo"
					placeholder="Ex: João Batista da Silva Medeiros"
					size="small"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="titulo-pesquisa">
					Título da pesquisa
				</label>
				<InputText
					id="titulo-pesquisa"
					v-model="formulario.tituloPesquisa"
					class="dados-gerais__campo"
					placeholder="Ex: Modelos de Saúde Essenciais"
					size="small"
				/>
			</div>

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

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="orientador-responsavel">
					Orientador responsável
				</label>
				<Dropdown
					id="orientador-responsavel"
					v-model="orientadorSelecionado"
					class="dados-gerais__campo"
					:options="opcoesOrientadoresDisponiveis"
					option-label="nome"
					placeholder="Selecione diferentes elementos"
					filter
				/>
				<div class="dados-gerais__acoes">
					<Button
						label="ADICIONAR ORIENTADOR"
						icon="pi pi-plus"
						size="small"
						type="button"
						@click="adicionarOrientador"
					/>
				</div>
				<ul v-if="formulario.orientadores.length" class="dados-gerais__selecionados">
					<li
						v-for="orientador in formulario.orientadores"
						:key="orientador"
						class="dados-gerais__selecionado"
					>
						<span>{{ orientador }}</span>
						<Button
							icon="pi pi-times"
							text
							rounded
							severity="danger"
							size="small"
							type="button"
							aria-label="Remover orientador"
							@click="removerOrientador(orientador)"
						/>
					</li>
				</ul>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="orientando-responsavel">
					Orientando responsável
				</label>
				<Dropdown
					id="orientando-responsavel"
					v-model="orientandoSelecionado"
					class="dados-gerais__campo"
					:options="opcoesOrientandosDisponiveis"
					option-label="nome"
					placeholder="Selecione diferentes elementos"
					filter
				/>
				<div class="dados-gerais__acoes">
					<Button
						label="ADICIONAR ORIENTANDO"
						icon="pi pi-plus"
						size="small"
						type="button"
						@click="adicionarOrientando"
					/>
				</div>
				<ul v-if="formulario.orientandos.length" class="dados-gerais__selecionados">
					<li
						v-for="orientando in formulario.orientandos"
						:key="orientando"
						class="dados-gerais__selecionado"
					>
						<span>{{ orientando }}</span>
						<Button
							icon="pi pi-times"
							text
							rounded
							severity="danger"
							size="small"
							type="button"
							aria-label="Remover orientando"
							@click="removerOrientando(orientando)"
						/>
					</li>
				</ul>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="local-pesquisa">
					Local de realização da pesquisa
				</label>
				<InputText
					id="local-pesquisa"
					v-model="formulario.localPesquisa"
					class="dados-gerais__campo"
					placeholder="Ex: Universidade Federal do Rio Grande do Norte"
					size="small"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="nome-setor">
					Colocar o nome do setor, se for o caso
				</label>
				<InputText
					id="nome-setor"
					v-model="formulario.nomeSetor"
					class="dados-gerais__campo"
					placeholder="Ex: setor de finanças"
					size="small"
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="objetivos-pesquisa">
					Citar os objetivos da pesquisa
				</label>
				<Textarea
					id="objetivos-pesquisa"
					v-model="formulario.objetivosPesquisa"
					class="dados-gerais__campo"
					placeholder="Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]"
					rows="3"
					auto-resize
				/>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="etapas-pesquisa">
					Citar quais etapas serão realizadas
				</label>
				<Textarea
					id="etapas-pesquisa"
					v-model="formulario.etapasPesquisa"
					class="dados-gerais__campo"
					placeholder="Descreva a metodologia que será utilizada em um resumo conciso"
					rows="3"
					auto-resize
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

			<div class="formulario__grupo formulario__grupo--2-colunas">
				<div class="dados-gerais__coluna">
					<label class="rotulo rotulo--obrigatorio" for="cnpj-instituicao">
						CNPJ da Instituição
					</label>
					<InputText
						id="cnpj-instituicao"
						v-model="formulario.cnpjInstituicao"
						class="dados-gerais__campo"
						placeholder="00.000.000/0001-00"
						size="small"
					/>
				</div>
				<div class="dados-gerais__coluna">
					<label class="rotulo rotulo--obrigatorio" for="cep-instituicao">
						CEP da Instituição
					</label>
					<InputText
						id="cep-instituicao"
						v-model="formulario.cepInstituicao"
						class="dados-gerais__campo"
						placeholder="593000-000"
						size="small"
					/>
				</div>
			</div>

			<div class="formulario__grupo formulario__grupo--coluna">
				<label class="rotulo rotulo--obrigatorio" for="metodologia">
					Citar metodologia que irá utilizar (resumo conciso)
				</label>
				<Textarea
					id="metodologia"
					v-model="formulario.metodologia"
					class="dados-gerais__campo"
					placeholder="Descreva a metodologia que será utilizada em um resumo conciso"
					rows="3"
					auto-resize
				/>
			</div>

			<section class="dados-gerais__formularios">
				<h2 class="dados-gerais__formularios-titulo">
					De acordo com os dados fornecidos a respeito do projeto, esses serão os
					formulários que você deverá preencher
				</h2>
				<ul class="dados-gerais__lista">
					<li
						v-for="formularioNecessario in formulariosNecessarios"
						:key="formularioNecessario"
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
import orientadoresJson from '@/database/entidades/orientadores.json'
import orientandosJson from '@/database/entidades/orientandos.json'
import { usePesquisadoreResponsaveisStore } from '@/store/pesquisadoresResponsaveis'
import { useProjetosStore } from '@/store/projetos'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

interface PessoaOpcao {
	nome: string
}

const router = useRouter()
const storePesquisadores = usePesquisadoreResponsaveisStore()
const storeProjetos = useProjetosStore()
storeProjetos.garantirRascunho()
const formulario = storeProjetos.rascunho.dadosGerais

const opcoesPesquisadores = computed(() => storePesquisadores.pesquisadoresResponsaveis)

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

const orientadorSelecionado = ref<PessoaOpcao | null>(null)
const orientandoSelecionado = ref<PessoaOpcao | null>(null)

const opcoesOrientadoresDisponiveis = computed(() =>
	(orientadoresJson as PessoaOpcao[]).filter(
		orientador => !formulario.orientadores.includes(orientador.nome)
	)
)

const opcoesOrientandosDisponiveis = computed(() =>
	(orientandosJson as PessoaOpcao[]).filter(
		orientando => !formulario.orientandos.includes(orientando.nome)
	)
)

const preencherNomePesquisador = (pesquisador: PessoaOpcao | null) => {
	if (pesquisador?.nome) {
		formulario.nomePesquisador = pesquisador.nome
	}
}

watch(
	() => formulario.pesquisadorResponsavel?.nome,
	nome => {
		if (!nome) return
		const correspondente = opcoesPesquisadores.value.find(item => item.nome === nome)
		if (correspondente && correspondente !== formulario.pesquisadorResponsavel) {
			formulario.pesquisadorResponsavel = correspondente
		}
	},
	{ immediate: true }
)

const adicionarOrientador = () => {
	if (!orientadorSelecionado.value) return
	formulario.orientadores.push(orientadorSelecionado.value.nome)
	orientadorSelecionado.value = null
}

const removerOrientador = (nome: string) => {
	formulario.orientadores = formulario.orientadores.filter(item => item !== nome)
}

const adicionarOrientando = () => {
	if (!orientandoSelecionado.value) return
	formulario.orientandos.push(orientandoSelecionado.value.nome)
	orientandoSelecionado.value = null
}

const removerOrientando = (nome: string) => {
	formulario.orientandos = formulario.orientandos.filter(item => item !== nome)
}

const avancar = () => {
	router.push({ name: 'Relatórios', params: { passo: '1' } })
}
</script>

<style scoped lang="scss">
.dados-gerais {
	display: flex;
	flex-direction: column;
	gap: var(--g-16);
	width: 100%;

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-32);
		font-weight: 700;
	}

	&__campo {
		width: 100%;
	}

	&__coluna {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--g-8);
		min-width: 0;
	}

	&__acoes {
		display: flex;
		justify-content: flex-start;
	}

	&__selecionados {
		display: flex;
		flex-direction: column;
		gap: var(--g-8);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	&__selecionado {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--g-8);
		padding: var(--p-8) var(--p-12);
		border: 1px solid var(--gray-200);
		border-radius: 6px;
		background: var(--light);
		color: var(--gray);
		font-size: var(--fs-14);
	}

	&__formularios {
		display: flex;
		flex-direction: column;
		gap: var(--g-8);
	}

	&__formularios-titulo {
		margin: 0;
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 700;
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

	.formulario__grupo--coluna {
		flex-direction: column;
		align-items: stretch;
		gap: var(--g-8);
	}

	.formulario__grupo--2-colunas {
		display: flex;
		gap: var(--g-16);
	}

	.formulario__rodape {
		display: flex;
		justify-content: flex-start;
	}
}
</style>
