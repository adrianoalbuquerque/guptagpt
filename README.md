# Gupta AI Assistant

Gupta AI Assistant é uma interface de chatbot interativa baseada em JavaScript, estilizada com CSS e integrada com a API do Google Generative AI (Gemini). O projeto simula o comportamento de um chatbot semelhante ao ChatGPT, com suporte para markdown nas respostas e interação dinâmica com o usuário.

**Acesse a aplicação aqui:** [Gupta AI Assistant Online](http://guptagpt.s3-website-sa-east-1.amazonaws.com/)

## Funcionalidades

- **Envio de mensagens:** O usuário pode enviar mensagens por meio de um campo de entrada.
- **Respostas formatadas:** Respostas do chatbot são exibidas em formato Markdown.
- **Tema escuro/claro:** Alternância entre modos de exibição com tema claro e escuro.
- **Efeito de digitação:** Animação de digitação simulada para a interação do bot.
- **Três pontinhos animados:** Indicador visual enquanto aguarda a resposta do chatbot.
 
## Tecnologias Utilizadas

- **HTML5** e **CSS3** para a estrutura e estilo da interface.
- **JavaScript (ES6)** para manipulação dinâmica do DOM e integração com a API.
- **Google Generative AI (Gemini)** para processamento de mensagens e geração de respostas.
- **Webpack:** Utilizado como empacotador de módulos para organizar e otimizar os arquivos do projeto.
- **Font Awesome** para ícones na interface.
- **Prism.js** Biblioteca para realce de sintaxe em código-fonte, usada para destacar trechos de código em aplicações web.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente:

- [Node.js](https://nodejs.org/) (para gerenciamento de pacotes e execução do projeto).
- Navegador moderno (como Chrome, Firefox, etc.).

## Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/adrianoalbuquerque/guptagpt.git
   ```

2. **Acesse o diretório do projeto:**
   ```bash
   cd guptagpt
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Configure a API Key:**
   Substitua `GEMINI_API_KEY` no arquivo `index.js` pela sua chave de API do Google Generative AI.

5. **Execute o projeto:**
   ```bash
   npm start
   ```

6. **Acesse a aplicação:**
   Abra o navegador e vá para `http://localhost:3000`.

## Estrutura do Projeto

```
.
├── src/
│   ├── shared         # Pasta de recursos reutilizáveis
│   ├── index.js       # Código principal
│   ├── styles.css     # Estilos da aplicação
│   └── ...
├── public/
│   ├── index.html     # Arquivo HTML principal
│   └── ...
├── package.json       # Configuração de dependências e scripts
├── README.md          # Documentação do projeto
└── ...
```

## Funcionalidades Futuras

- Suporte a múltiplas línguas.
- Histórico de conversas persistente.
- Integração com outras APIs de IA.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Fork o repositório.**
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m "Descrição da funcionalidade"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para dúvidas ou sugestões, entre em contato:

- GitHub: [Adriano Albuquerque](https://github.com/adrianoalbuquerque)
- Email: adrianot.albuquerque@gmail.com
