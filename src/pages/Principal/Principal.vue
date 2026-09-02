<template>
	<section class="principal">
		<div class="principal__texto">
			<h1 class="principal__titulo">SisProForm</h1>
			<p class="principal__subtitulo">Iniciação de projetos com mais agilidade</p>
		</div>
		<img
			class="principal__logo"
			src="@/assets/images/logo400x400.svg"
			width="400"
			height="400"
			alt="Logo SisProForm"
		/>
	</section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.principal {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: var(--g-48);
	width: 100%;
	min-height: calc(100vh - 14rem);

	&__texto {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	&__titulo {
		color: var(--dark);
		font-size: var(--fs-64);
		font-weight: 700;
		line-height: 1.2;
	}

	&__subtitulo {
		color: var(--dark);
		font-size: var(--fs-16);
		font-weight: 400;
	}

	&__logo {
		display: block;
		width: 400px;
		height: 400px;
		object-fit: contain;
		flex-shrink: 0;
	}

	@media (max-width: 1024px) {
		flex-direction: column-reverse;
		gap: var(--g-32);
		text-align: center;

		&__texto {
			align-items: center;
		}

		&__titulo {
			font-size: var(--fs-48);
		}

		&__logo {
			width: 240px;
			height: 240px;
		}
	}
}
</style>
