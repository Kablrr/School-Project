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

    // Add "from 1776" to every prompt
    const finalPrompt = prompt + " from 1776";

    // Encode the final prompt for the URL
    const encodedPrompt = encodeURIComponent(finalPrompt);

    // Construct the Pollinations API URL
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Math.floor(Math.random() * 1000000)}&model=flux`;

    // Test the image load
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
        loadingStatus.textContent = "";
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    };

    img.onerror = () => {
        loadingStatus.textContent = "Failed to load image. Try a different prompt or check the console for errors.";
    };

    img.src = imageUrl;
}
