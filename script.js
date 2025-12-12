function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const imageElement = document.getElementById('generatedImage');
    const loadingStatus = document.getElementById('loadingStatus');
    const imgInput = document.getElementById('imgInput').files[0];

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loadingStatus.textContent = "Generating image...";
    imageElement.style.display = 'none';

    const stylePrompt = ", American Revolutionary War era, 18th-century colonial American style, oil painting realism, muted earthy tones, tricorne hats, colonial clothing, vintage texture";

    const finalPrompt = encodeURIComponent(prompt + stylePrompt);
    let imageUrl = "";

    // ---------------------------
    // CASE 1: IMG2IMG (user uploaded a picture)
    // ---------------------------
    if (imgInput) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Image = reader.result;

            // Pollinations supports using ?image=data:...
            imageUrl = 
                `https://image.pollinations.ai/prompt/${finalPrompt}?width=512&height=512&image=${encodeURIComponent(base64Image)}&seed=${Math.floor(Math.random()*999999)}`;

            loadImage(imageUrl);
        };

        reader.readAsDataURL(imgInput); 
    }
    else {
        // ---------------------------
        // CASE 2: Normal text-to-image
        // ---------------------------
        imageUrl =
            `https://image.pollinations.ai/prompt/${finalPrompt}?width=512&height=512&seed=${Math.floor(Math.random()*999999)}`;

        loadImage(imageUrl);
    }

    function loadImage(url) {
        const testImg = new Image();
        testImg.crossOrigin = "anonymous";

        testImg.onload = () => {
            loadingStatus.textContent = "";
            imageElement.src = url;
            imageElement.style.display = 'block';
        };

        testImg.onerror = () => {
            loadingStatus.textContent = "Retrying with fallback server...";
            imageElement.src = url.replace("image.pollinations.ai/prompt", "pollinations.ai/p");
            imageElement.style.display = 'block';
        };

        testImg.src = url;
    }
}


