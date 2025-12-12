function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const imageElement = document.getElementById('generatedImage');
    const loadingStatus = document.getElementById('loadingStatus');

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loadingStatus.textContent = "Generating image... this might take a moment.";
    imageElement.style.display = 'none';

    // Add 1776 style to every prompt
    const finalPrompt = 
        prompt + ", American Revolutionary War era, 18th-century colonial American style, oil painting realism, muted earthy tones, tricorne hats, colonial clothing, vintage texture";

    const encodedPrompt = encodeURIComponent(finalPrompt);

    // Main Pollinations URL
    let imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${Math.floor(Math.random()*999999)}`;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
        loadingStatus.textContent = "";
        imageElement.src = imageUrl;
        imageElement.style.display = 'block';
    };

    img.onerror = () => {
        loadingStatus.textContent = "Retrying with fallback server...";
        imageElement.src = `https://pollinations.ai/p/${encodedPrompt}`;
        imageElement.style.display = 'block';
    };

    img.src = imageUrl;
}


