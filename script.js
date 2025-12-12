function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const imageElement = document.getElementById('generatedImage');
    const loadingStatus = document.getElementById('loadingStatus');

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loadingStatus.textContent = "Generating image... this might take a moment.";
    imageElement.style.display = 'none'; // Hide previous image

    // Encode the prompt for the URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Construct the Pollinations API URL
    // The basic structure is https://image.pollinations.ai/prompt/{your_prompt}
    // You can add parameters like width, height, seed, and model
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Math.floor(Math.random() * 1000000)}&model=flux`;

    // Test if the image loads properly using an Image object
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Needed if you want to use the image with canvas later
    
    img.onload = () => {
        loadingStatus.textContent = "";
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    };

    img.onerror = () => {
        loadingStatus.textContent = "Failed to load image. Try a different prompt or check the console for errors.";
    };

    img.src = imageUrl; // This triggers the request to the API and starts image generation
}

