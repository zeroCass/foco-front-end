<center><h1>FOCO - Aplicativo</h1></center>
<img
     	align="center"
	width="210"
	alt="tasks_overview"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/login-screen.png">

## Tabela de Conteúdos
  * [Sobre](#sobre)
  * [Layout](#layout)
  * [Como Usar](#como-usar)
    * [Pre requesitos](#pre-requesitos)
    * [Instalação](#instalação)
  * [Tecnologias Utilizadas](#tecnologias-utilizadas)
 
## Sobre 
O aplicativo **FOCO** foi desenvolvido como projeto final para a disciplina **Sistemas de Infomação (2022.1)
da Universidade de Brasília**. O objetivo era elaborar um aplicativo com foco na sustentabilidade
que se encaixasse em um dos 17 objetivos da [Onu](https://brasil.un.org/pt-br/sdgs, "Onu").

FOCO é um aplicativo de gerenciamento de tempo que utiliza-se de elementos da gamificação para aumentar o engajamento
dos usuários e sua produtidade. A princípio, foi pensado para atender exclusivamente crianças e adolescentes
portadores de TDAH, conforme o [arigo](https://github.com/zeroCass/foco-front-end/blob/main/preview/Software%20Requirements%20for%20the%20Design%20of%20Gamified%20Applications%20for%20Time%20Management%20and%20Tasks%20for%20Children%20and%20Adolescents%20with%20ADHD.pdf) que apresenta argumentos do porquê a gamificação juntamente com 
um aplicativo de gestão de tarefas pode auxiliar esse público. Porém, posteriormente o grupo decidiu ampliar o público alvo
afim de incluir pessoas que somente queiram gerenciar melhor o seu tempo.

A principais características do aplcativo são:
- Criar tarefas, definindo um nome, descrição, categoria, dificuldade, prioridade e tempo
- Criar missões, na qual consiste em um grupo de tarefas com a mesma categoria
- Criar itens para serem resgatados com estrelas na loja
- Realizar tarefas e missões antes do prazo vencer afim de acumular pontos de experiência para subir de nível e 
ganhar estrelas que podem ser usados para trocar por itens de recompensa na loja

As caracteristicas citadas acima são realizadas pelo usuario que chamamos de **autonômo**. Porém, existem ainda mais dois tipos de
usuarios: dependente e padrinho/madrinha. Estes usuários não foram totalmente implementados devido ao tempo curto, porém são 
features que podem ser feitas futuramente.


## Layout
<img
	width="210"
	alt="login"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/login-screen.png">
<img
	width="210"
	alt="register"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/register_screen.png">
<img
	width="210"
	alt="tasks"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/tasks_screen.png">	
<img
	width="210"
	alt="tasks_info"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/tasks_info.png">
<img
	width="210"
	alt="missions"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/missions_screen.png">	
<img
	width="210"
	alt="missions_info"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/mission_info.png">	
<img
	width="210"
	alt="shop"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/shop_screen.png">
<img
	width="210"
	alt="menu"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/menu.png">	
<img
	width="210"
	alt="perfil"
	src="https://github.com/zeroCass/foco-front-end/blob/main/preview/perfil.png">




### Pré-requesitos
É necessário que o seu dispositivo tenha todas as configurações necessárias para executar o React Native, segundo a documento oficial do [React Native](https://reactnative.dev/docs/getting-started)
Recomendo também instalar o [Android Studio](https://developer.android.com/studio?hl=pt) para rodar o projeto em um ambiente virtual android.

Vale dizer que, o aplicativo foi feito **apenas** usando o android studio. Portanto, ele pode até funcionar em dispositivos ios, porém por limitação de desenvolvimento, não foi possível testar o aplicativo nos dispositivos da apple.
### Instalação

Clone este repositório:

```
git clone https://github.com/zeroCass/foco-front-end
cd foco-front-end
```

Instale as dependências :
```
npm install
```

Quando a instalação das dependências terminar, execute o comando para abrir o ambiente de executação de sua preferência (recomendo o android):

```bash
react-native run-ios
# or
react-native run-android
```

## Tecnologias Utilizadas
## Front-End:
 * React Native
 * Javascript
 * Axios
## Back-End
 * NodeJS
 * Express
 * MySQL
 * AWS EC2 para hospedar o servidor e o Banco de Dados
O repositório contendo o código fonte para o back-end pode ser encontrado [aqui](https://github.com/zeroCass/foco-back-end)

## Features
 * [x] Refatorar useState em AuthScreen
 * [ ] Filtrar tasks/missions por dia
 * [ ] Filtrar tasks/missions completadas ou não
 * [ ] Adicionar Foto
