import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';
import './styles.css';

import "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // Tema Dark
// import "prismjs/themes/prism.css"; // Tema light
import "prismjs/components/prism-clike"; // Base para sintaxe similar a C-like
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/toolbar/prism-toolbar.css"; // Estilo para a barra de ferramentas
import "prismjs/plugins/toolbar/prism-toolbar"; // Plugin para a barra superior
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard"; // Adiciona o botão de copiar

Prism.languages.sal = {
    'comment': {
        pattern: /\/\/.*/,
        greedy: true
    },
    'string': {
        pattern: /"([^"\\]|\\.)*"/,
        greedy: true
    },
    'keyword': /\b(Call|Set|Return|If|Else|End If|For|While|Break|Continue|Then)\b/i,
    'boolean': /\b(TRUE|FALSE)\b/i,
    'number': /\b\d+(\.\d+)?\b/,
    'operator': /[+\-*/=<>!&|]/,
    'function': /\b[A-Za-z_][A-Za-z0-9_]*(?=\()/, // Detecta funções
};

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const Persona = "Developer, desde as mais antigas até as mais recentes. Você entende as nuances da linguagem SAL (Scalable Application Language) e suas bibliotecas. Você conhece os diferentes tipos de aplicações que podem ser desenvolvidas com Gupta Team Developer, incluindo aplicações client-server, web e mobile. Você está familiarizado com as práticas recomendadas para desenvolvimento, teste e implantação de aplicações Gupta Team Developer. Você entende os conceitos de banco de dados relacionais e como integrá-los com aplicações Gupta Team Developer. Você conhece as limitações da plataforma e pode sugerir alternativas quando apropriado. Instruções Específicas de Comportamento: Formato da Resposta: Forneça respostas estruturadas e fáceis de entender. Use formatação de código quando apresentar exemplos em SAL. Utilize marcadores ou numeração para listar múltiplas opções ou passos. Comprimento da Resposta: Ajuste o comprimento da resposta à complexidade da pergunta. Seja conciso para perguntas simples e forneça explicações detalhadas para questões mais complexas. Tratamento de Perguntas Fora do Escopo: Se a pergunta não estiver relacionada a Gupta Team Developer, responda educadamente: 'Desculpe, essa pergunta está fora do meu escopo de conhecimento como especialista em Gupta Team Developer. Posso tentar ajudar com outras questões relacionadas à plataforma.' Exemplos de Interação: Usuário: Como faço para criar uma consulta SQL em Gupta Team Developer? Chatbot: Você pode usar o objeto SqlExecutor para executar consultas SQL. Aqui está um exemplo: vSqlExecutor SqlExecutor vSqlExecutor.Statement = 'SELECT * FROM minha_tabela' vSqlExecutor.Execute() Use code with caution. Sal Usuário: O que é um Report Builder no Gupta Team Developer? Chatbot: O Report Builder é uma ferramenta visual que permite criar relatórios complexos de forma rápida e fácil. Ele oferece recursos como agrupamento, ordenação, formatação condicional e gráficos. Refinamento Iterativo: Seu conhecimento e respostas serão continuamente avaliados e aprimorados com base no feedback do usuário e nas atualizações da plataforma Gupta Team Developer."

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: Persona,
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const chatMessages = document.getElementById('chat-messages');
    const subtitle = document.getElementById('subtitle');
    const typingIndicator = document.getElementById('typing-indicator');
    const clearChatButton = document.getElementById('clear-chat');
    let isFirstMessage = true;

    chatForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inputElement = document.getElementById('chat-input');
        const userMessage = inputElement.value.trim();

        if (userMessage) {
            if (isFirstMessage) {
                subtitle.classList.add('hidden'); // Esconde o subtítulo
                chatMessages.classList.remove('hidden'); // Mostra o chat
                isFirstMessage = false;
            }

            // Adiciona a mensagem do usuário ao chat
            inputElement.value = '';
            addMessageToChat(userMessage, 'user');

            // Mostra a borracha ao iniciar a conversa
            clearChatButton.classList.remove('hidden');

            // Mostra o indicador de "digitando"
            showTypingIndicator();

            try {
                const chatSession = model.startChat({
                    generationConfig,
                    history: [],
                });
                const result = await chatSession.sendMessage(userMessage);

                addMessageToChat(result.response.text(), 'bot', true);
                hideTypingIndicator();
            } catch (error) {
                console.error('Erro ao obter resposta da API:', error);
                addMessageToChat('Desculpe, ocorreu um erro ao processar sua mensagem.', 'bot');
                hideTypingIndicator();
            }

            inputElement.value = '';
        } else {
            console.warn('O campo de mensagem está vazio.');
        }
    });

    clearChatButton.addEventListener('click', () => {
        // Limpa as mensagens do chat
        chatMessages.innerHTML = '';

        // Esconde o chat e mostra o subtítulo de volta
        subtitle.classList.remove('hidden');
        chatMessages.classList.add('hidden');

        // Esconde a borracha novamente
        clearChatButton.classList.add('hidden');

        // Reseta o estado da conversa
        isFirstMessage = true;
    });

    function addMessageToChat(message, sender, isMarkdown = false) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;

        if (isMarkdown) {
            messageElement.innerHTML = marked(message); // Renderiza Markdown
        } else {
            messageElement.textContent = message; // Texto simples
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Rola para a última mensagem
        Prism.highlightAll();
    }

    function showTypingIndicator() {
        typingIndicator.classList.remove('hidden');
        clearChatButton.classList.add('hidden');
    }

    function hideTypingIndicator() {
        typingIndicator.classList.add('hidden');
        clearChatButton.classList.remove('hidden');
    }
});
