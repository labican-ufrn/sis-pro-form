<template>
	<div class="login">
		<main class="login__conteudo">
			<div class="login__cartao">
				<header class="login__cabecalho">
					<img
						class="login__logo"
						src="@/assets/images/logo64x64.svg"
						width="64"
						height="64"
						alt="Logo SisProForm"
					/>
					<h1 class="login__titulo">Entrar no SisProForm</h1>
				</header>

				<form class="login__formulario" @submit.prevent="entrar">
					<div class="campo-container">
						<label class="rotulo" for="email">E-mail</label>
						<InputText
							id="email"
							v-model="email"
							class="campo"
							type="email"
							autocomplete="email"
							size="small"
						/>
					</div>

					<div class="campo-container">
						<label class="rotulo" for="senha">Senha</label>
						<Password
							id="senha"
							v-model="senha"
							class="login__senha"
							input-class="campo"
							:feedback="false"
							toggle-mask
							autocomplete="current-password"
						/>
					</div>

					<button type="button" class="login__esqueci" @click.prevent>
						Esqueceu sua senha?
					</button>

					<Button
						class="login__entrar"
						label="ENTRAR"
						type="submit"
						size="small"
					/>
				</form>
			</div>
		</main>

		<footer class="login__rodape">
			<p>SisProForm | Todos os diretos reservados | 2025</p>
		</footer>
	</div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const senha = ref('')

const entrar = () => {
	router.push({ name: 'Principal' })
}
</script>

<style scoped lang="scss">
.login {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	min-height: 100svh;

	&__conteudo {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--p-64) var(--p-100);
	}

	&__cartao {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--g-16);
		width: 100%;
		max-width: 300px;
	}

	&__cabecalho {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--g-16);
	}

	&__logo {
		display: block;
		width: 64px;
		height: 64px;
		object-fit: contain;
	}

	&__titulo {
		color: var(--gray);
		font-size: var(--fs-16);
		font-weight: 700;
	}

	&__formulario {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--g-16);
		width: 100%;
	}

	&__senha {
		width: 100%;

		:deep(.p-password-input) {
			width: 100%;
		}
	}

	&__esqueci {
		border: 0;
		background: transparent;
		padding: 0;
		color: var(--primary-main);
		font-size: var(--fs-12);
		font-weight: 500;
		cursor: pointer;
	}

	&__entrar {
		width: 100%;
	}

	&__rodape {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 80px;
		padding: var(--p-16);
		background-color: var(--light);
		border-top: 1px solid var(--gray-200);
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

		p {
			color: var(--gray);
			font-size: var(--fs-14);
			font-weight: 500;
		}
	}

	@media (max-width: 768px) {
		&__conteudo {
			padding: var(--p-32) var(--p-20);
		}
	}
}
</style>
