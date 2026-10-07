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
        "<strong>You:</strong><br>" + question;

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

        const response = await fetch(
            "http://127.0.0.1:8000/ask",
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
                data.error;

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
Convert simple Markdown headings
into readable HTML.
*/
function formatAnswer(text) {

    return text
        .replace(/^### (.*)$/gm, "<h3>$1</h3>")
        .replace(/^## (.*)$/gm, "<h2>$1</h2>")
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");
}