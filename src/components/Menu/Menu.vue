<template>
	<Sidebar
		class="sidebar"
		:visible="true"
		:modal="false"
		:show-close-icon="false"
		:position="'left'"
		:style="{ width: '200px' }"
	>
		<template #header>
			<div class="sidebar__cabecalho">
				<div class="sidebar__logo">
					<router-link class="sidebar__link" to="/">
						<img class="sidebar__logo" src="@/assets/images/logo30x30.svg" alt="Logo" />
						<h1 class="sidebar__titulo">SisProForm</h1>
					</router-link>
				</div>
				<div>
					<Button
						label="NOVO PROJETO"
						size="small"
						icon="pi pi-plus"
						@click="redirecionarParaNovoProjeto"
					/>
				</div>
			</div>
		</template>

		<div class="sidebar__conteudo">
			<div class="secao">
				<div class="secao__titulo">PROJETOS</div>
				<ul class="secao__menu">
					<li class="secao__item">
						<router-link class="secao__link" to="/projetos/atuais"
							><i class="pi pi-objects-column"></i>Atuais</router-link
						>
					</li>
					<li class="secao__item">
						<router-link class="secao__link" to="/projetos/encerrados">
							<i class="pi pi-th-large"></i>Encerrados</router-link
						>
					</li>
				</ul>
			</div>
			<div class="secao">
				<div class="secao__titulo">ENTIDADES</div>
				<ul class="secao__menu">
					<li class="secao__item">
						<router-link class="secao__link" to="/pesquisadores"
							><i class="pi pi-id-card"></i>Pesquisadores</router-link
						>
					</li>
					<li class="secao__item">
						<router-link class="secao__link" to="/orientadores"
							><i class="pi pi-users"></i>Orientadores</router-link
						>
					</li>
					<li class="secao__item">
						<router-link class="secao__link" to="/orientandos"
							><i class="pi pi-user"></i>Orientandos</router-link
						>
					</li>
					<li class="secao__item">
						<router-link class="secao__link" to="/instituicoes"
							><i class="pi pi-graduation-cap"></i>Instituições</router-link
						>
					</li>
				</ul>
			</div>
			<div class="secao">
				<div class="secao__titulo">OUTRAS AÇÕES</div>
				<ul class="secao__menu">
					<li class="secao__item">
						<button class="secao__link secao__link--botao" type="button" @click="sair">
							<i class="pi pi-sign-out"></i>Sair
						</button>
					</li>
				</ul>
			</div>
		</div>
	</Sidebar>
</template>

<script setup lang="ts">
import { router } from '@/router'
import { useProjetosStore } from '@/store/projetos'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'

const storeProjetos = useProjetosStore()

const redirecionarParaNovoProjeto = () => {
	storeProjetos.iniciarNovo()
	router.push('/projetos/novo')
}

const sair = () => {
	router.push({ name: 'Login' })
}
</script>

<style scoped lang="scss">
.sidebar {
	width: 200px;

	&__cabecalho {
		display: flex;
		flex-direction: column;
		gap: var(--g-24);
	}

	&__link {
		display: flex;
		align-items: center;
		text-decoration: none;
		gap: var(--g-8);
	}

	&__titulo {
		font-size: var(--fs-14);
		font-weight: 700;
	}

	.secao {
		margin-top: var(--m-16);
		margin-bottom: var(--m-28);

		&__titulo {
			font-size: var(--fs-12);
			color: var(--gray-500);
			font-weight: 500;
			padding: var(--p-8);
		}

		&__menu {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			flex-direction: column;
		}

		&__item {
			font-size: var(--fs-14);
			font-weight: 500;
		}

		&__link {
			display: flex;
			flex-direction: row;
			align-items: center;
			width: 100%;
			color: var(--gray-700);
			text-decoration: none;
			gap: var(--g-8);
			padding: var(--p-14);
			border: 0;
			background: transparent;
			font: inherit;
			text-align: left;
			cursor: pointer;

			&:hover {
				background-color: var(--gray-50);
			}

			&--botao {
				font-size: var(--fs-14);
				font-weight: 500;
			}
		}
	}
}
</style>
