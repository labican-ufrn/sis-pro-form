<template>
	<div v-if="visivel" class="campo-relatorio" :class="`campo-relatorio--${campo.tipo}`">
		<template v-if="campo.tipo === 'grupo'">
			<div class="formulario__grupo">
				<CampoRelatorio
					v-for="(subcampo, indice) in campo.campos"
					:key="chaveSubcampo(subcampo, indice)"
					:campo="subcampo"
					:valores="valores"
					:id-prefix="idPrefix"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'assinaturas'">
			<div
				v-for="(linha, indice) in linhasAssinatura"
				:key="`${campo.nome}-${indice}`"
				class="campo-relatorio__assinatura"
			>
				<div class="formulario__grupo">
					<CampoRelatorio
						v-for="(subcampo, indiceCampo) in campo.campos"
						:key="`${campo.nome}-${indice}-${indiceCampo}`"
						:campo="subcampo"
						:valores="linha"
						:id-prefix="`${campo.nome}-${indice}`"
					/>
				</div>
			</div>
			<div class="campo-relatorio__acao">
				<Button
					:label="campo.labelBotao"
					icon="pi pi-plus"
					outlined
					size="small"
					type="button"
					@click="adicionarAssinatura"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'lista-selecao' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<Dropdown
					:id="idCampo"
					v-model="itemSelecionado"
					class="campo-relatorio__campo"
					:options="opcoesListaDisponiveis"
					option-label="nome"
					:placeholder="campo.placeholder"
					filter
				/>
				<div class="campo-relatorio__acao">
					<Button
						:label="campo.labelBotao ?? 'ADICIONAR'"
						icon="pi pi-plus"
						size="small"
						type="button"
						@click="adicionarItemLista"
					/>
				</div>
				<ul v-if="itensLista.length" class="campo-relatorio__selecionados">
					<li
						v-for="item in itensLista"
						:key="item"
						class="campo-relatorio__selecionado"
					>
						<span>{{ item }}</span>
						<Button
							icon="pi pi-times"
							text
							rounded
							severity="danger"
							size="small"
							type="button"
							:aria-label="`Remover ${item}`"
							@click="removerItemLista(item)"
						/>
					</li>
				</ul>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'faixa-etaria'">
			<div class="campo-relatorio__faixa">
				<span class="rotulo" :class="{ 'rotulo--obrigatorio': campo.required }">
					{{ campo.rotulo }}
				</span>
				<InputText
					:id="`${idCampo}-inicio`"
					v-model="valorInicioFaixa"
					class="campo-relatorio__faixa-campo"
					:placeholder="campo.placeholder ?? 'Ex: 5'"
					size="small"
				/>
				<span class="campo-relatorio__faixa-separador">a</span>
				<InputText
					:id="`${idCampo}-fim`"
					v-model="valorFimFaixa"
					class="campo-relatorio__faixa-campo"
					:placeholder="campo.placeholderFim ?? 'Ex: 10'"
					size="small"
				/>
				<span class="campo-relatorio__faixa-sufixo">{{ campo.rotuloSufixo ?? 'anos' }}</span>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'linha-manual'">
			<p class="campo-relatorio__linha-manual" :class="{ 'rotulo--obrigatorio': campo.required }">
				{{ campo.rotulo }}
			</p>
		</template>

		<template v-else-if="campo.tipo === 'checkbox' && campo.nome">
			<label class="campo-relatorio__checkbox">
				<Checkbox v-model="valorBooleano" :input-id="idCampo" binary />
				<span class="campo-relatorio__checkbox-rotulo" :class="{ 'rotulo--obrigatorio': campo.required }">
					{{ campo.rotulo }}
				</span>
			</label>
		</template>

		<template v-else-if="campo.tipo === 'radio' && campo.nome">
			<SeletorRadio
				:id="idCampo"
				v-model:opcao-selecionada="valorTexto"
				:rotulo="campo.rotulo ?? ''"
				:required="campo.required"
				:direcao="campo.direcao ?? 'linha'"
				:opcoes="campo.opcoes ?? []"
			/>
		</template>

		<template v-else-if="campo.tipo === 'textarea' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					v-if="campo.rotulo"
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<Textarea
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					:placeholder="campo.placeholder"
					rows="3"
					auto-resize
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'local' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<Dropdown
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					:options="opcoesLocal"
					:placeholder="campo.placeholder"
					filter
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'estado' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo ?? 'Estado' }}
				</label>
				<Dropdown
					:id="idCampo"
					v-model="valorEstado"
					class="campo-relatorio__campo"
					:options="estados"
					option-label="nome"
					:placeholder="campo.placeholder ?? 'Ex: Rio Grande do Norte'"
					filter
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'cidade' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo ?? 'Cidade' }}
				</label>
				<Dropdown
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					:options="cidadesDoEstado"
					:placeholder="campo.placeholder ?? 'Ex: Caicó'"
					:disabled="!cidadesDoEstado.length"
					filter
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'cpf' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputMask
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					mask="999.999.999-99"
					:placeholder="campo.placeholder"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'telefone' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputMask
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					mask="(99) 99999-9999"
					:placeholder="campo.placeholder"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'cnpj' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputMask
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					mask="99.999.999/9999-99"
					:placeholder="campo.placeholder ?? '00.000.000/0001-00'"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'cep' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputMask
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					mask="99999-999"
					:placeholder="campo.placeholder ?? '59300-000'"
				/>
			</div>
		</template>

		<template v-else-if="campo.tipo === 'data' && campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputMask
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					mask="99/99/9999"
					:placeholder="campo.placeholder"
				/>
			</div>
		</template>

		<template v-else-if="campo.nome">
			<div class="campo-relatorio__coluna">
				<label
					v-if="campo.rotulo"
					class="rotulo"
					:class="{ 'rotulo--obrigatorio': campo.required }"
					:for="idCampo"
				>
					{{ campo.rotulo }}
				</label>
				<InputText
					:id="idCampo"
					v-model="valorTexto"
					class="campo-relatorio__campo"
					:placeholder="campo.placeholder"
					size="small"
				/>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import SeletorRadio from '@/components/Campos/SeletorRadio/SeletorRadio.vue'
import type { CampoRelatorio } from '@/components/Formularios/Relatorios/definicoesRelatorios'
import type { ValoresRelatorio } from '@/store/relatorios'
import { useInstituicoesStore } from '@/store/instituicoes'
import * as estadosCidades from '@/utils/estados-cidades.json'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Dropdown from 'primevue/dropdown'
import InputMask from 'primevue/inputmask'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'

interface Estado {
	nome: string
	sigla: string
	cidades: string[]
}

interface PessoaOpcao {
	nome: string
}

const props = withDefaults(
	defineProps<{
		campo: CampoRelatorio
		valores: ValoresRelatorio
		idPrefix?: string
	}>(),
	{
		idPrefix: ''
	}
)

const estados = ref<Estado[]>(estadosCidades.estados as Estado[])
const opcoesLocal = (estadosCidades.estados as Estado[]).map(estado => estado.nome)
const storeInstituicoes = useInstituicoesStore()
const { instituicoes } = storeToRefs(storeInstituicoes)
const opcoesResponsaveis = computed(() => instituicoes.value as PessoaOpcao[])
const itemSelecionado = ref<PessoaOpcao | null>(null)

const idCampo = computed(() => {
	const base = props.campo.nome ?? props.campo.tipo
	return props.idPrefix ? `${props.idPrefix}-${base}` : base
})

const visivel = computed(() => {
	const condicao = props.campo.visivelQuando
	if (!condicao) return true
	return props.valores[condicao.campo] === condicao.valor
})

const valorTexto = computed({
	get: () => String(props.valores[props.campo.nome ?? ''] ?? ''),
	set: valor => {
		if (props.campo.nome) {
			props.valores[props.campo.nome] = valor
		}
	}
})

const valorBooleano = computed({
	get: () => Boolean(props.valores[props.campo.nome ?? '']),
	set: valor => {
		if (props.campo.nome) {
			props.valores[props.campo.nome] = valor
		}
	}
})

const valorEstado = computed({
	get: () => (props.valores[props.campo.nome ?? ''] as Estado | null) ?? null,
	set: valor => {
		if (!props.campo.nome) return
		props.valores[props.campo.nome] = valor
		const nomeCidade = props.campo.nomeCidadeVinculada
		if (nomeCidade) {
			props.valores[nomeCidade] = ''
		}
	}
})

const cidadesDoEstado = computed(() => {
	const nomeEstadoRef = props.campo.nomeEstadoVinculado
	if (!nomeEstadoRef) return []
	const estado = props.valores[nomeEstadoRef] as Estado | null
	return estado?.cidades ?? []
})

const valorInicioFaixa = computed({
	get: () => String(props.valores[props.campo.nomeInicio ?? ''] ?? ''),
	set: valor => {
		if (props.campo.nomeInicio) {
			props.valores[props.campo.nomeInicio] = valor
		}
	}
})

const valorFimFaixa = computed({
	get: () => String(props.valores[props.campo.nomeFim ?? ''] ?? ''),
	set: valor => {
		if (props.campo.nomeFim) {
			props.valores[props.campo.nomeFim] = valor
		}
	}
})

const itensLista = computed(() => {
	const nome = props.campo.nome
	if (!nome || !Array.isArray(props.valores[nome])) return []
	return props.valores[nome] as string[]
})

const opcoesListaDisponiveis = computed(() =>
	opcoesResponsaveis.value.filter(opcao => !itensLista.value.includes(opcao.nome))
)

const linhasAssinatura = computed(() => {
	const nome = props.campo.nome
	if (!nome || !Array.isArray(props.valores[nome])) return []
	return props.valores[nome] as ValoresRelatorio[]
})

const adicionarAssinatura = () => {
	const nome = props.campo.nome
	if (!nome) return
	if (!Array.isArray(props.valores[nome])) {
		props.valores[nome] = [{}]
	}
	;(props.valores[nome] as ValoresRelatorio[]).push({})
}

const adicionarItemLista = () => {
	const nome = props.campo.nome
	if (!nome || !itemSelecionado.value) return
	if (!Array.isArray(props.valores[nome])) {
		props.valores[nome] = []
	}
	;(props.valores[nome] as string[]).push(itemSelecionado.value.nome)
	itemSelecionado.value = null
}

const removerItemLista = (item: string) => {
	const nome = props.campo.nome
	if (!nome || !Array.isArray(props.valores[nome])) return
	props.valores[nome] = (props.valores[nome] as string[]).filter(atual => atual !== item)
}

const chaveSubcampo = (subcampo: CampoRelatorio, indice: number) =>
	subcampo.nome ?? `${subcampo.tipo}-${indice}`
</script>

<style scoped lang="scss">
.campo-relatorio {
	width: 100%;

	&--grupo,
	&--assinaturas,
	&--lista-selecao {
		display: flex;
		flex-direction: column;
		gap: var(--g-16);
	}

	&__coluna {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: var(--g-8);
		min-width: 0;
	}

	&__campo {
		width: 100%;
	}

	&__assinatura {
		display: flex;
		flex-direction: column;
		gap: var(--g-16);
	}

	&__acao {
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

	&__faixa {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--g-8);
	}

	&__faixa-campo {
		width: 72px;
	}

	&__faixa-separador,
	&__faixa-sufixo {
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}

	&__linha-manual {
		margin: 0;
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
	}

	&__checkbox {
		display: flex;
		align-items: flex-start;
		gap: var(--g-8);
		cursor: pointer;
	}

	&__checkbox-rotulo {
		color: var(--gray);
		font-size: var(--fs-14);
		font-weight: 500;
		line-height: 1.4;
	}

	.formulario__grupo {
		align-items: flex-start;
	}
}
</style>
