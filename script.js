// Function to generate and set a new image source
function generateAndDisplayImage(prompt) {
    const encodedPrompt = encodeURIComponent(prompt);
    // Include parameters for width, height, and model as needed
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&model=flux`;
    
    document.getElementById('aiImage').src = imageUrl;
}

// Call the function with a specific prompt
generateAndDisplayImage("A minimalist abstract artwork of a cat in space");
async function generateText(prompt) {
    const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&temperature=0.8`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log('Generated Text:', text);
        // Display the text on your webpage (e.g., in a <p> tag)
        // document.getElementById('textOutput').textContent = text;
    } catch (error) {
        console.error('Error fetching text:', error);
    }
}

// Call the function with a specific prompt
generateText("Write a short story about a robot learning to love");

