async function askQuestion() {

    const input = document.getElementById("question");

    const chatBox = document.getElementById("chatBox");

    const question = input.value.trim();


    if (!question) {
        return;
    }


    // Show student's question

    const userMessage = document.createElement("div");

    userMessage.className = "message user";

    userMessage.innerHTML =
        "<strong>You:</strong><br>" +
        escapeHTML(question);

    chatBox.appendChild(userMessage);


    // Clear input

    input.value = "";


    // Show loading message

    const loadingMessage = document.createElement("div");

    loadingMessage.className = "message ai";

    loadingMessage.innerHTML =
        "<strong>DigiComm AI:</strong><br>Thinking...";

    chatBox.appendChild(loadingMessage);


    chatBox.scrollTop = chatBox.scrollHeight;


    try {

        /*
         * IMPORTANT:
         * Use /ask instead of 127.0.0.1.
         *
         * This allows the same code to work locally
         * and on Render.
         */

        const response = await fetch(
            "/ask",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    question: question
                })
            }
        );


        const data = await response.json();


        loadingMessage.remove();


        if (data.error) {

            const errorMessage =
                document.createElement("div");

            errorMessage.className = "message ai";

            errorMessage.innerHTML =
                "<strong>Error:</strong><br>" +
                escapeHTML(data.error);

            chatBox.appendChild(errorMessage);

            return;
        }


        // Display AI answer

        const aiMessage =
            document.createElement("div");

        aiMessage.className = "message ai";

        aiMessage.innerHTML =
            "<strong>DigiComm AI:</strong><br><br>" +
            formatAnswer(data.answer);

        chatBox.appendChild(aiMessage);


        chatBox.scrollTop = chatBox.scrollHeight;


    } catch (error) {

        loadingMessage.innerHTML =
            "<strong>Error:</strong><br>" +
            "Could not connect to the backend.";

        console.error(error);
    }
}


/*
 * Example question buttons
 */

function setQuestion(question) {

    const input = document.getElementById("question");

    input.value = question;

    input.focus();
}


/*
 * Clear chat
 */

function clearChat() {

    const chatBox = document.getElementById("chatBox");

    chatBox.innerHTML = `
        <div class="message ai">

            <strong>DigiComm AI:</strong>

            <br><br>

            Chat cleared.

            <br><br>

            Ask me a Digital Communication Systems
            question to continue.

        </div>
    `;
}


/*
 * Format AI answer
 *
 * Converts simple Markdown into readable HTML.
 */

function formatAnswer(text) {

    let formatted = escapeHTML(text);

    formatted = formatted
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/^# (.*)$/gm, "<h2>$1</h2>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

    return formatted;
}


/*
 * Prevent AI/user text from inserting unwanted HTML.
 */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
