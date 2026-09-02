<template>
	<div class="campo-de-cnpj campo-container">
		<label class="campo-de-cnpj__rotulo rotulo" :class="exibirRotuloObrigatorio" :for="id">{{
			rotulo
		}}</label>

		<Field :name="nome" v-slot="{ value, handleChange }">
			<InputMask
				:id="id"
				class="campo-de-cnpj__campo campo"
				mask="99.999.999/9999-99"
				:placeholder="textoAuxiliar"
				:modelValue="value"
				@update:modelValue="handleChange"
			/>
		</Field>

		<ErrorMessage class="campo-mensagem-de-erro" :name="nome" />
	</div>
</template>

<script setup lang="ts">
import InputMask from 'primevue/inputmask'
import { Field, ErrorMessage } from 'vee-validate'
import { computed } from 'vue'

interface Props {
	id: string
	rotulo: string
	textoAuxiliar?: string
	nome: string
	required?: boolean
}

const props = defineProps<Props>()

const exibirRotuloObrigatorio = computed(() => {
	return props.required ? 'rotulo--obrigatorio' : ''
})
</script>
