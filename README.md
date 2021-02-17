<h1 align='center' >
    <img alt='Happy' src='.github/banner.png' />
</h1>

<p align='center'>
    Leve felicidade para o mundo, visite orfanatos e mude o dia de muitas crianças.</br>
    Projeto da Next Level Week #03 Omnistack - RocketSeat
</p>

<p id='insomniaButton' align='center'>
    <a href="https://insomnia.rest/run/?label=Happy&uri=https%3A%2F%2Fgist.githubusercontent.com%2FVitorFirmino%2Fe7d47e20d01f5dbfb9a12fbccda2835b%2Fraw%2F32b98b9e33099afd61c45b2df3566805840af4e4%2Fhappy.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<p align='center'>
    <img alt='Happy' src='.github/happy.png' width='100%'>
</p>

## 💻 Executando o Happy

### Pré-requisitos

É necessário ter instalado na sua máquina para execução desse projeto:
- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/)
- [Gerenciador de pacotes](https://www.npmjs.com)
    - [Yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable)

### ⌨ Baixando o projeto

```bash
# Clone o Repositório
$ git clone https://github.com/VitorFirmino/NLW-3.git

# Acesse a pasta do projeto
$ cd NLW-3
```

### 🗄️ Configurando o modulo do servidor
```bash
# Acesse a pasta do servidor
$ cd server

# Instale as dependências
$ yarn

# Execute o projeto
$ yarn start
```

### 🖥️ Configurando o modulo do site
```bash
# Acesse a pasta do servidor
$ cd web

# Instale as dependências
$ yarn

# Adicione as variáveis de ambiente
-> Crie um arquivo com o nome '.env'
# Crie uma conta gratuita no MapBox para pegar seu token
-> https://account.mapbox.com
# Salve o token no arquivo .env
-> REACT_APP_MAPBOX_TOKEN=TOKEN

# Execute o projeto
$ yarn start
```

### 📱 Configurando o modulo do aplicativo
```bash
# Acesse a pasta do servidor
$ cd mobile

# Instale as dependências
$ yarn

# Execute o projeto
$ yarn start
```