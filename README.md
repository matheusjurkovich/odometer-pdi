# Odometer PDI

## Visão Geral

O Odometer PDI é um aplicativo híbrido desenvolvido usando Angular e Capacitor. Ele utiliza Ionic para componentes de UI e se integra com Android para funcionalidades nativas. O objetivo do aplicativo é tirar fotos dos odômetros de veículos, extrair o texto da quilometragem e preencher automaticamente um formulário com a quilometragem atual do veículo.

## Estrutura do Projeto

- **.angular/**: Arquivos de cache do Angular.
- **.browserslistrc**: Configuração para navegadores suportados.
- **.editorconfig**: Configuração do editor.
- **.eslintrc.json**: Configuração do ESLint.
- **.gitignore**: Arquivo de ignore do Git.
- **.idea/**: Arquivos específicos do IDE.
- **.vscode/**: Configurações específicas do VS Code.
- **android/**: Arquivos e configurações específicas do Android.
- **angular.json**: Configuração do Angular CLI.
- **capacitor.config.ts**: Configuração do Capacitor.
- **ionic.config.json**: Configuração do Ionic.
- **karma.conf.js**: Configuração do Karma para testes unitários.
- **package.json**: Dependências e scripts do Node.js.
- **README.md**: Documentação do projeto.
- **src/**: Código-fonte da aplicação Angular.
- **tsconfig.app.json**: Configuração do TypeScript para o app.
- **tsconfig.json**: Configuração base do TypeScript.
- **tsconfig.spec.json**: Configuração do TypeScript para testes.
- **www/**: Recursos web para a aplicação.

## Começando

### Pré-requisitos

- Node.js
- npm
- Angular CLI
- Ionic CLI
- Android Studio (para desenvolvimento Android)

### Instalação

1. Clone o repositório:

    ```sh
    git clone <repository-url>
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd <project-directory>
    ```

3. Instale as dependências:

    ```sh
    npm install
    ```

### Executando a Aplicação

Para servir a aplicação localmente:

```sh
npm run start
```

### Funcionalidades

- Captura de Imagens: Utilize a câmera do dispositivo para tirar fotos dos odômetros dos veículos.
- Reconhecimento de Texto: Extraia a quilometragem das imagens capturadas usando OCR.
- Preenchimento Automático: Preencha automaticamente o formulário com a quilometragem atual do veículo.

### Testes

Para executar os testes unitários:

```sh
npm run test
```

### Contribbuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

### Licença

Este projeto está licenciado sob a licença MIT.
