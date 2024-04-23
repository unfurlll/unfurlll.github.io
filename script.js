// Функція для взаємодії з моделлю GPT через API
async function interactWithGPT(prompt) {
    const apiKey = 'sk-proj-FcJxPxlUqNAdXzjQ2SssT3BlbkFJNasdERx9B5jlf0vtKWvT'; // Замініть на свій API ключ
    const apiUrl = 'https://api.openai.com/v1/completions';

    // Запит до сервера GPT
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'text-davinci-002', // Виберіть модель GPT
            prompt: prompt,
            max_tokens: 100 // Максимальна кількість токенів у відповіді
        })
    });

    // Обробка відповіді
    const data = await response.json();
    return data.choices[0].text.trim();
}

// Функція для надсилання повідомлення користувача та отримання відповіді від GPT
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    // Додати повідомлення користувача до чату
    chatBox.innerHTML += `<div class="chat-message user-message">${userInput}</div>`;

    // Очистити поле введення
    document.getElementById('user-input').value = '';

    // Отримати відповідь від моделі GPT
    const botResponse = await interactWithGPT(userInput);

    // Додати відповідь від GPT до чату
    chatBox.innerHTML += `<div class="chat-message bot-message">${botResponse}</div>`;

    // Прокрутити чат до нижнього краю
    chatBox.scrollTop = chatBox.scrollHeight;
}
