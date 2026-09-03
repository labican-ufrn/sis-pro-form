export type TipoCampo =
	| 'texto'
	| 'cpf'
	| 'telefone'
	| 'cnpj'
	| 'cep'
	| 'textarea'
	| 'data'
	| 'local'
	| 'estado'
	| 'cidade'
	| 'radio'
	| 'checkbox'
	| 'assinaturas'
	| 'lista-selecao'
	| 'faixa-etaria'
	| 'linha-manual'
	| 'grupo'

export type VarianteLinhaManual = 'linha' | 'local-data' | 'assinatura' | 'titulo'

export interface CampoRelatorio {
	tipo: TipoCampo
	nome?: string
	rotulo?: string
	placeholder?: string
	placeholderFim?: string
	required?: boolean
	direcao?: 'linha' | 'coluna'
	opcoes?: { id: string; rotulo: string; valor: string }[]
	campos?: CampoRelatorio[]
	labelBotao?: string
	rotuloSufixo?: string
	nomeInicio?: string
	nomeFim?: string
	nomeEstadoVinculado?: string
	nomeCidadeVinculada?: string
	variante?: VarianteLinhaManual
	visivelQuando?: { campo: string; valor: string }
}

export interface RelatorioDefinicao {
	passo: number
	titulo: string
	campos: CampoRelatorio[]
}

const campoLocalData = (prefixo: string): CampoRelatorio => ({
	tipo: 'grupo',
	campos: [
		{
			tipo: 'local',
			nome: `${prefixo}Local`,
			rotulo: 'Local',
			placeholder: 'Ex: Rio Grande do Norte',
			required: true
		},
		{
			tipo: 'data',
			nome: `${prefixo}Data`,
			rotulo: 'Data',
			placeholder: 'Ex: 01/01/1970',
			required: true
		}
	]
})

const campoLocalSimplesData = (prefixo: string): CampoRelatorio => ({
	tipo: 'grupo',
	campos: [
		{
			tipo: 'local',
			nome: `${prefixo}Local`,
			rotulo: 'Local',
			placeholder: 'Selecione o local',
			required: true
		},
		{
			tipo: 'data',
			nome: `${prefixo}Data`,
			rotulo: 'Data',
			placeholder: 'Ex: 01/01/1970',
			required: true
		}
	]
})

const opcoesResolucao580 = [
	{
		id: 'nao-irao-interferir',
		rotulo:
			'Destacamos que de acordo com a Resolução 580/2018 no Art. 5º do CAPÍTULO II (Dos aspectos éticos das pesquisas com seres humanos em instituições do SUS), os procedimentos da pesquisa NÃO IRÃO INTERFERIR na rotina dos serviços de assistência à saúde bem como nas atividades profissionais dos trabalhadores.',
		valor: 'nao-irao-interferir'
	},
	{
		id: 'irao-interferir',
		rotulo:
			'Destacamos que de acordo com a Resolução 580/2018 no Art. 5º do CAPÍTULO II (Dos aspectos éticos das pesquisas com seres humanos em instituições do SUS), os procedimentos da pesquisa IRÃO INTERFERIR na rotina dos serviços de assistência à saúde e/ou nas atividades profissionais dos trabalhadores, fato que pode ser justificado:',
		valor: 'irao-interferir'
	}
]

const camposEnderecoParticipante = (prefixo: string): CampoRelatorio[] => [
	{
		tipo: 'grupo',
		campos: [
			{
				tipo: 'telefone',
				nome: `${prefixo}Telefone`,
				rotulo: 'Telefone',
				placeholder: 'Ex: (12) 34567-8910',
				required: true
			},
			{
				tipo: 'texto',
				nome: `${prefixo}Email`,
				rotulo: 'E-mail',
				placeholder: 'johndoe@gmail.com',
				required: true
			}
		]
	},
	{
		tipo: 'grupo',
		campos: [
			{
				tipo: 'texto',
				nome: `${prefixo}Endereco`,
				rotulo: 'Endereço',
				placeholder: 'Ex: Rua dos Caiacós',
				required: true
			},
			{
				tipo: 'texto',
				nome: `${prefixo}Numero`,
				rotulo: 'Número',
				placeholder: 'Ex: 4',
				required: true
			}
		]
	},
	{
		tipo: 'grupo',
		campos: [
			{
				tipo: 'cep',
				nome: `${prefixo}Cep`,
				rotulo: 'CEP',
				placeholder: '59300-000',
				required: true
			},
			{
				tipo: 'texto',
				nome: `${prefixo}Bairro`,
				rotulo: 'Bairro',
				placeholder: 'Ex: Vales Verdes',
				required: true
			}
		]
	},
	{
		tipo: 'grupo',
		campos: [
			{
				tipo: 'estado',
				nome: `${prefixo}Estado`,
				rotulo: 'Estado',
				required: true,
				nomeCidadeVinculada: `${prefixo}Cidade`
			},
			{
				tipo: 'cidade',
				nome: `${prefixo}Cidade`,
				rotulo: 'Cidade',
				required: true,
				nomeEstadoVinculado: `${prefixo}Estado`
			}
		]
	}
]

export const relatoriosNecessarios: RelatorioDefinicao[] = [
	{
		passo: 1,
		titulo: 'Declaração de Compromisso Ético de Não Início da Pesquisa',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome completo do pesquisador ou responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'grupo',
				campos: [
					{
						tipo: 'cpf',
						nome: 'cpfPesquisador',
						rotulo: 'CPF do pesquisador ou responsável',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					},
					{
						tipo: 'texto',
						nome: 'tituloPesquisa',
						rotulo: 'Título da pesquisa',
						placeholder: 'Ex: Modelos de Saúde Essenciais',
						required: true
					}
				]
			},
			campoLocalData('')
		]
	},
	{
		passo: 2,
		titulo: 'Termo de confidencialidade',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisadorPlataforma',
				rotulo: 'Nome do pesquisador responsável, mesmo nome inserido na Plataforma Brasil',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeOrientadoOrientador',
				rotulo: 'Nome do orientado(a) ou do orientador(a)',
				placeholder: 'Ex: Alex Teixeira Santos',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'participantes',
				rotulo: 'Citar o nome de todos os participantes da pesquisa',
				placeholder: 'Ex: Erik Silva de Brado, Luciano Braga de Santos',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'setor',
				rotulo: 'Colocar o nome do setor, se for o caso',
				placeholder: 'Ex: setor de finanças',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			campoLocalSimplesData(''),
			{
				tipo: 'assinaturas',
				nome: 'assinaturasPesquisador',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Nome do(a) pesquisador(a) responsável',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do pesquisador ou responsável',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasOrientador',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Nome do(a) orientador(a)',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) orientador(a)',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasOrientando',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'assinatura do(a) orientador(a)',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) orientando(a)',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasMembro',
				labelBotao: 'assinatura do membro da equipe de pesquisa',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Membro da equipe de pesquisa',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) membro da equipe de pesquisa',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			}
		]
	},
	{
		passo: 3,
		titulo: 'Folha de identificação do pesquisador',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'linkLattes',
				rotulo: 'Link do currículo Lattes',
				placeholder: 'Ex: https://linkdocurriculolattes.com.br',
				required: true
			},
			{
				tipo: 'grupo',
				campos: [
					{
						tipo: 'telefone',
						nome: 'telefone',
						rotulo: 'Telefone',
						placeholder: 'Ex: (12) 34567-8910',
						required: true
					},
					{
						tipo: 'texto',
						nome: 'email',
						rotulo: 'Email',
						placeholder: 'johndoe@gmail.com',
						required: true
					}
				]
			},
			{
				tipo: 'texto',
				nome: 'instituicaoProponente',
				rotulo: 'Instituição Proponente',
				placeholder: 'Ex: Universidade Federal do Rio Grande do Norte',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'departamento',
				rotulo: 'Departamento e/ou Programa de Pós-Graduação',
				placeholder: 'Ex: Departamento de Computação e Tecnologia',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'instituicaoCoparticipante',
				rotulo:
					'Instituição Coparticipante (aquela na qual haverá o desenvolvimento de alguma etapa da pesquisa)',
				placeholder: 'Ex: Instituto Federal do Rio Grande do Norte',
				required: true
			},
			{
				tipo: 'radio',
				nome: 'nivelAbrangencia',
				rotulo: 'Nível de abrangência do Projeto',
				required: true,
				direcao: 'coluna',
				opcoes: [
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
			},
			{
				tipo: 'texto',
				nome: 'nivelAbrangenciaOutro',
				placeholder: 'Descreva o nível de abrangência',
				visivelQuando: { campo: 'nivelAbrangencia', valor: 'outro' }
			},
			{
				tipo: 'radio',
				nome: 'fonteColeta',
				rotulo: 'Fonte para coleta de dados',
				required: true,
				direcao: 'coluna',
				opcoes: [
					{
						id: 'ser-humano',
						rotulo: 'O ser humano, de forma direta, em sua totalidade',
						valor: 'ser-humano'
					},
					{
						id: 'dados-secundarios',
						rotulo: 'Dados secundários de acesso restrito',
						valor: 'dados-secundarios'
					},
					{
						id: 'material-biologico',
						rotulo: 'Material biológico humano armazenado',
						valor: 'material-biologico'
					},
					{ id: 'outros', rotulo: 'Outros (especificar)', valor: 'outros' }
				]
			},
			{
				tipo: 'texto',
				nome: 'fonteColetaOutro',
				placeholder: 'Descreva a fonte de coleta de dados utilizada',
				visivelQuando: { campo: 'fonteColeta', valor: 'outros' }
			},
			{
				tipo: 'grupo',
				campos: [
					{
						tipo: 'data',
						nome: 'periodoInicio',
						rotulo: 'Período de realização (início)',
						placeholder: 'Ex: 01/01/1970',
						required: true
					},
					{
						tipo: 'data',
						nome: 'periodoFim',
						rotulo: 'Período de realização (fim)',
						placeholder: 'Ex: 01/01/1970',
						required: true
					}
				]
			},
			{
				tipo: 'texto',
				nome: 'numeroAmostral',
				rotulo: 'Número amostral',
				placeholder: '4',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'criteriosAmostral',
				rotulo: 'Quais os critérios usados para a escolha do número amostral?',
				placeholder: 'Descreva quais critérios foram usados para a escolha do número amostral',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'planosRecrutamento',
				rotulo: 'Descrever os planos para o recrutamento dos participantes da pesquisa',
				placeholder: 'Descreva quais critérios foram usados para a escolha do número amostral',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'explicacaoTcle',
				rotulo:
					'Descrever a forma como será explicado ao participante o Termo de Consentimento Livre e Esclarecido – TCLE (processo de obtenção do TCLE)',
				placeholder: 'Descreva o modelo de explicação ao participante',
				required: true
			},
			{
				tipo: 'radio',
				nome: 'gravacaoVoz',
				rotulo: 'Será utilizado algum recurso para gravação de voz dos participantes da pesquisa?',
				required: true,
				opcoes: [
					{ id: 'gravacao-sim', rotulo: 'Sim', valor: 'sim' },
					{ id: 'gravacao-nao', rotulo: 'Não', valor: 'nao' }
				]
			},
			{
				tipo: 'radio',
				nome: 'imagensParticipantes',
				rotulo: 'Serão utilizadas imagens (fotos ou vídeos) dos participantes da pesquisa?',
				required: true,
				opcoes: [
					{ id: 'imagens-sim', rotulo: 'Sim', valor: 'sim' },
					{ id: 'imagens-nao', rotulo: 'Não', valor: 'nao' }
				]
			}
		]
	},
	{
		passo: 4,
		titulo: 'Petição para Dispensa de TCLE ou RCLE',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisadorPlataforma',
				rotulo: 'Nome do pesquisador responsável, mesmo nome inserido na Plataforma Brasil',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeOrientadoOrientador',
				rotulo: 'Nome do orientado(a) ou do orientador(a)',
				placeholder: 'Ex: Alex Teixeira Santos',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'participantes',
				rotulo: 'Citar o nome de todos os participantes da pesquisa',
				placeholder: 'Ex: Erik Silva de Brado, Luciano Braga de Santos',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'setor',
				rotulo: 'Colocar o nome do setor, se for o caso',
				placeholder: 'Ex: setor de finanças',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			campoLocalSimplesData(''),
			{
				tipo: 'assinaturas',
				nome: 'assinaturasPesquisador',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Nome do(a) pesquisador(a) responsável',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do pesquisador ou responsável',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasOrientador',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Nome do(a) orientador(a)',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) orientador(a)',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasOrientando',
				labelBotao: 'assinatura do(a) pesquisador(a) responsável',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'assinatura do(a) orientador(a)',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) orientando(a)',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			},
			{
				tipo: 'assinaturas',
				nome: 'assinaturasMembro',
				labelBotao: 'assinatura do membro da equipe de pesquisa',
				campos: [
					{
						tipo: 'texto',
						nome: 'nome',
						rotulo: 'Membro da equipe de pesquisa',
						placeholder: 'Ex: João Batista da Silva Medeiros',
						required: true
					},
					{
						tipo: 'cpf',
						nome: 'cpf',
						rotulo: 'CPF do(a) membro da equipe de pesquisa',
						placeholder: 'Ex: 012.345.678-90',
						required: true
					}
				]
			}
		]
	},
	{
		passo: 5,
		titulo: 'Termo de autorização para gravação de voz e ou Registro de Imagens (fotos e ou vídeos)',
		campos: [
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Citar os objetivos da pesquisa',
				placeholder:
					'Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'justificativa',
				rotulo:
					'Citar a justificativa e esclarecer se há algum método alternativo para os procedimentos que serão adotados. Este parágrafo deve ser claro e objetivo para não se tornar muito extenso',
				placeholder:
					'Ex: Baseado na justificativa apresentada o método alternativo para os procedimentos diz respeito as normas do instituto em questão [...]',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'tipoUso',
				rotulo:
					'Esclarecer e descrever o tipo (foto e/ou vídeo e/ou áudio), estimativa de quantidade (número de fotos, horas de gravação, etc)',
				placeholder:
					'Ex: Serão feitos alguns vídeos para que fique registrado os procedimentos feitos no pacientes, além de áudios para comprovar a autenticidade das operações [...]',
				required: true
			},
			{
				tipo: 'radio',
				nome: 'autorizoUso',
				rotulo: 'Eu autorizo o uso de:',
				required: true,
				direcao: 'coluna',
				opcoes: [
					{
						id: 'imagens',
						rotulo: 'Minhas imagens (fotos e/ou vídeos)',
						valor: 'imagens'
					},
					{ id: 'voz', rotulo: 'Minha voz', valor: 'voz' },
					{
						id: 'imagens-voz',
						rotulo: 'Minhas imagens (fotos e/ou vídeos) e minha voz',
						valor: 'imagens-voz'
					}
				]
			},
			campoLocalData(''),
			campoLocalSimplesData('assinatura')
		]
	},
	{
		passo: 6,
		titulo: 'Carta de Anuência',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'lista-selecao',
				nome: 'responsaveisInstituicao',
				rotulo: 'Responsável(is) pela instituição',
				placeholder: 'Selecione o responsável pela instituição',
				labelBotao: 'ADICIONAR RESPONSÁVEL',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Citar os objetivos da pesquisa',
				placeholder:
					'Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'setor',
				rotulo: 'Colocar o nome do setor, se for o caso',
				placeholder: 'Ex: setor de finanças',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'instituicao',
				rotulo: 'Instituição / local de realização da pesquisa',
				placeholder: 'Ex: Universidade Federal do Rio Grande do Norte',
				required: true
			},
			{
				tipo: 'radio',
				nome: 'envolveDadosSus',
				rotulo: 'Sua pesquisa envolve dados do SUS?',
				required: true,
				direcao: 'linha',
				opcoes: [
					{ id: 'sus-sim', rotulo: 'Sim', valor: 'sim' },
					{ id: 'sus-nao', rotulo: 'Não', valor: 'nao' }
				]
			},
			{
				tipo: 'radio',
				nome: 'paragrafoResolucao',
				rotulo:
					'Em situações que o projeto submetido seja no âmbito de pesquisas com seres humanos em instituições do Sistema Único de Saúde - SUS, deve-se respeitar a Resolução 580/2018 (Art. 5º do CAPÍTULO II). Nesses casos, inserir na Carta de Anuência um dos parágrafos abaixo.',
				required: true,
				direcao: 'coluna',
				opcoes: opcoesResolucao580,
				visivelQuando: { campo: 'envolveDadosSus', valor: 'sim' }
			},
			{
				tipo: 'texto',
				nome: 'justificativaResolucao',
				placeholder: 'Descrever a justificativa',
				required: true,
				visivelQuando: { campo: 'paragrafoResolucao', valor: 'irao-interferir' }
			},
			campoLocalData(''),
			{
				tipo: 'cnpj',
				nome: 'cnpjInstituicao',
				rotulo: 'CNPJ da Instituição',
				placeholder: '00.000.000/0001-00',
				required: true
			}
		]
	},
	{
		passo: 7,
		titulo: 'Termo de autorização institucional para uso de documentos (dos participantes)',
		campos: [
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'lista-selecao',
				nome: 'responsaveisInstituicao',
				rotulo: 'Responsável(is) pela instituição',
				placeholder: 'Selecione o responsável pela instituição',
				labelBotao: 'ADICIONAR RESPONSÁVEL',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Citar os objetivos da pesquisa',
				placeholder:
					'Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'documentos',
				rotulo: 'Citar os documentos que serão utilizados na pesquisa',
				placeholder: 'Ex: prontuários, fichas de atendimento, registros acadêmicos...',
				required: true
			},
			{
				tipo: 'checkbox',
				nome: 'autorizoDocumentos',
				rotulo:
					'Autorizo o uso dos documentos dos participantes desta instituição para fins da pesquisa descrita acima',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'finalidadeUso',
				rotulo: 'Descrever a finalidade do uso dos documentos',
				placeholder: 'Descreva para que os documentos serão utilizados nesta pesquisa',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'guardaDocumentos',
				rotulo: 'Informar como e onde os documentos serão armazenados e por quanto tempo',
				placeholder: 'Descreva a forma, o local e o prazo de armazenamento',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeResponsavelInstituicao',
				rotulo: 'Nome do(a) responsável pela instituição',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'grupo',
				campos: [
					{
						tipo: 'telefone',
						nome: 'telefoneResponsavel',
						rotulo: 'Telefone',
						placeholder: 'Ex: (12) 34567-8910',
						required: true
					},
					{
						tipo: 'texto',
						nome: 'emailResponsavel',
						rotulo: 'E-mail',
						placeholder: 'johndoe@gmail.com',
						required: true
					}
				]
			},
			{
				tipo: 'cnpj',
				nome: 'cnpjInstituicao',
				rotulo: 'CNPJ da Instituição',
				placeholder: '00.000.000/0001-00',
				required: true
			},
			campoLocalData(''),
			{
				tipo: 'texto',
				nome: 'nomeAssinante',
				rotulo: 'Nome do(a) assinante',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'cnpj',
				nome: 'cnpjAssinante',
				rotulo: 'CNPJ do(a) assinante',
				placeholder: '00.000.000/0001-00',
				required: true
			}
		]
	},
	{
		passo: 8,
		titulo: 'TCLE OU RCLE (Maiores de 18 Anos)',
		campos: [
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Citar os objetivos da pesquisa',
				placeholder:
					'Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'procedimentos',
				rotulo: 'Descrever os procedimentos aos quais o participante será submetido',
				placeholder: 'Descreva o que será feito com o participante durante a pesquisa',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'riscos',
				rotulo: 'Descrever os riscos e desconfortos esperados',
				placeholder: 'Descreva os riscos e desconfortos da participação',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'beneficios',
				rotulo: 'Descrever os benefícios esperados',
				placeholder: 'Descreva os benefícios esperados para o participante ou para a sociedade',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'sigilo',
				rotulo: 'Descrever as formas de garantia do sigilo e da privacidade',
				placeholder: 'Descreva como o sigilo e a privacidade dos dados serão garantidos',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'direitos',
				rotulo:
					'Informar sobre a liberdade de recusar a participar ou de retirar o consentimento a qualquer momento',
				placeholder: 'Descreva os direitos do participante, inclusive a retirada do consentimento',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeParticipante',
				rotulo: 'Nome do participante da pesquisa',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			...camposEnderecoParticipante('participante'),
			{
				tipo: 'texto',
				nome: 'contatoPesquisador',
				rotulo: 'Nome e contato do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros — (84) 99999-9999',
				required: true
			},
			campoLocalData(''),
			{
				tipo: 'texto',
				nome: 'nomeAssinante',
				rotulo: 'Nome do(a) assinante',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			campoLocalSimplesData('assinatura')
		]
	},
	{
		passo: 9,
		titulo: 'TCLE ou RCLE (Para os Pais ou Responsáveis dos Menores de 18 Anos)',
		campos: [
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Citar os objetivos da pesquisa',
				placeholder:
					'Ex: Essa pesquisa tem como objetivo coletar dados para descobrir mais sobre o problema que está ocorrendo com [...]',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'procedimentos',
				rotulo: 'Descrever os procedimentos aos quais o menor será submetido',
				placeholder: 'Descreva o que será feito com o menor durante a pesquisa',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'riscos',
				rotulo: 'Descrever os riscos e desconfortos esperados',
				placeholder: 'Descreva os riscos e desconfortos da participação do menor',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'beneficios',
				rotulo: 'Descrever os benefícios esperados',
				placeholder: 'Descreva os benefícios esperados para o menor ou para a sociedade',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'sigilo',
				rotulo: 'Descrever as formas de garantia do sigilo e da privacidade',
				placeholder: 'Descreva como o sigilo e a privacidade dos dados serão garantidos',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'direitos',
				rotulo:
					'Informar sobre a liberdade de recusar a participação do menor ou de retirar o consentimento a qualquer momento',
				placeholder:
					'Descreva os direitos do responsável e do menor, inclusive a retirada do consentimento',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeResponsavel',
				rotulo: 'Nome do pai, mãe ou responsável legal',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			...camposEnderecoParticipante('responsavel'),
			{
				tipo: 'texto',
				nome: 'nomeMenor',
				rotulo: 'Nome do menor participante da pesquisa',
				placeholder: 'Ex: Alex Teixeira Santos',
				required: true
			},
			campoLocalData(''),
			{
				tipo: 'texto',
				nome: 'nomeAssinante',
				rotulo: 'Nome do(a) assinante',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			campoLocalSimplesData('assinatura')
		]
	},
	{
		passo: 10,
		titulo: 'TALE (Termo de Assentimento Livre e Esclarecido)',
		campos: [
			{
				tipo: 'texto',
				nome: 'tituloPesquisa',
				rotulo: 'Título da pesquisa',
				placeholder: 'Ex: Modelos de Saúde Essenciais',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomePesquisador',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'telefone',
				nome: 'telefonePesquisador',
				rotulo: 'Telefone do pesquisador responsável',
				placeholder: 'Ex: (12) 34567-8910',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'objetivos',
				rotulo: 'Explicar, em linguagem simples, o que é a pesquisa e seus objetivos',
				placeholder: 'Explique a pesquisa de forma simples para crianças e adolescentes',
				required: true
			},
			{
				tipo: 'faixa-etaria',
				nome: 'faixaEtaria',
				rotulo: 'As crianças que irão participar desta pesquisa têm de',
				rotuloSufixo: 'anos',
				nomeInicio: 'idadeInicio',
				nomeFim: 'idadeFim',
				placeholder: 'Ex: 5',
				placeholderFim: 'Ex: 10',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomeParticipante',
				rotulo: 'Nome do participante da pesquisa',
				placeholder: 'Ex: Alex Teixeira Santos',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'oQueVaiAcontecer',
				rotulo: 'O que vai acontecer se você participar desta pesquisa?',
				placeholder: 'Descreva o que o participante fará na pesquisa',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'riscos',
				rotulo: 'Existe algum risco em participar?',
				placeholder: 'Explique os riscos de forma simples',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'beneficios',
				rotulo: 'Quais os benefícios de participar?',
				placeholder: 'Explique os benefícios de forma simples',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'podeDesistir',
				rotulo: 'Você pode desistir de participar a qualquer momento?',
				placeholder: 'Explique o direito de desistência',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'duvidas',
				rotulo: 'Com quem você pode falar se tiver dúvidas?',
				placeholder: 'Informe o contato para dúvidas',
				required: true
			},
			{
				tipo: 'local',
				nome: 'local',
				rotulo: 'Local',
				placeholder: 'Ex: Rio Grande do Norte',
				required: true
			},
			{
				tipo: 'textarea',
				nome: 'outrasInformacoes',
				rotulo: 'Outras informações importantes',
				placeholder: 'Descreva outras informações relevantes',
				required: true
			},
			{
				tipo: 'linha-manual',
				variante: 'titulo',
				rotulo: 'Assinaturas do termo (preenchimento manual)'
			},
			{
				tipo: 'texto',
				nome: 'nomeParticipanteManual',
				rotulo: 'Nome do participante da pesquisa',
				placeholder: 'Ex: Alex Teixeira Santos',
				required: true
			},
			{
				tipo: 'linha-manual',
				variante: 'local-data',
				rotulo: 'Local e data',
				required: true
			},
			{
				tipo: 'linha-manual',
				variante: 'assinatura',
				rotulo: 'Assinatura do menor',
				required: true
			},
			{
				tipo: 'texto',
				nome: 'nomePesquisadorManual',
				rotulo: 'Nome do pesquisador responsável',
				placeholder: 'Ex: João Batista da Silva Medeiros',
				required: true
			},
			{
				tipo: 'linha-manual',
				variante: 'local-data',
				rotulo: 'Local e data',
				required: true
			},
			{
				tipo: 'linha-manual',
				variante: 'assinatura',
				rotulo: 'Assinatura do pesquisador(a)',
				required: true
			}
		]
	}
]
