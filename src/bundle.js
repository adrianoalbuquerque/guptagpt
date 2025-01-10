const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const header = document.getElementById("site-header");
const chatForm = document.getElementById("chat-form");
const chatMessage = document.getElementById("chat-messages");
const chatContainer = document.getElementById("chat-container");
const subtitle = document.getElementById("subtitle");

// Aplica o tema baseado no localStorage
function applyTheme(theme) {
    body.classList.remove("light", "dark");
    header.classList.remove("light", "dark");
    chatForm.classList.remove("light", "dark");
    chatMessage.classList.remove("light", "dark");
    chatContainer.classList.remove("light", "dark");
    subtitle.classList.remove("light", "dark");

    body.classList.add(theme);
    header.classList.add(theme);
    chatForm.classList.add(theme);
    chatMessage.classList.add(theme);
    chatContainer.classList.add(theme);
    subtitle.classList.add(theme);

    if (theme === "dark") {
        themeToggle.classList.replace("fa-moon-o", "fa-sun-o");
    } else {
        themeToggle.classList.replace("fa-sun-o", "fa-moon-o");
    }

    // Salva o tema no localStorage
    localStorage.setItem("theme", theme);
}

// Carrega o tema salvo ou aplica o tema claro por padrão
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme("light"); // Tema padrão
    }
}

// Alterna entre os temas
themeToggle.addEventListener("click", function () {
    const currentTheme = body.classList.contains("light") ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
});

document.addEventListener("DOMContentLoaded", function () {
    loadTheme();

    const text = "Olá! Eu sou o GuptaGPT. Como posso ajudar você hoje?";
    const typingEffectElement = document.getElementById("typing-effect");
    let index = 0;

    function typeText() {
        if (index < text.length) {
            typingEffectElement.textContent += text[index];
            index++;
            setTimeout(typeText, 90); // Ajuste o tempo para acelerar ou desacelerar a digitação
        }
    }

    typeText();
});