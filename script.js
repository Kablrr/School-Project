// Universal 1776 styling for all outputs
const STYLE =
    ", American Revolutionary War era, 18th-century colonial American style, oil painting realism, muted earthy tones, tricorne hats, colonial clothing, parchment texture, vintage look";


// ------------------------------------------------------
// TEXT → IMAGE (Generate Button)
// ------------------------------------------------------
function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const loading = document.getElementById('loadingStatus');
    const img = document.getElementById('generatedImage');

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loading.textContent = "Generating image...";
    img.style.display = "none";

    const finalPrompt = encodeURIComponent(prompt + STYLE);

    const url =
        `https://image.pollinations.ai/prompt/${finalPrompt}` +
        `?width=512&height=512&seed=${Math.floor(Math.random() * 999999)}`;

    loadImage(url);
}


// ------------------------------------------------------
// IMG2IMG (Convert Button)
// ------------------------------------------------------
function convertImg2Img() {
    const file = document.getElementById("imgInput").files[0];
    const loading = document.getElementById('loadingStatus');
    const img = document.getElementById('generatedImage');

    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    loading.textContent = "Converting to 1776 style...";
    img.style.display = "none";

    const reader = new FileReader();

    reader.onloadend = () => {
        const base64 = reader.result;

        const finalPrompt = encodeURIComponent("Convert this image into 1776 historical American style" + STYLE);

        // Pollinations img2img reference
        const url =
            `https://image.pollinations.ai/prompt/${finalPrompt}` +
            `?width=512&height=512&image=${encodeURIComponent(base64)}` +
            `&seed=${Math.floor(Math.random() * 999999)}`;

        loadImage(url);
    };

    reader.readAsDataURL(file);
}


// ------------------------------------------------------
// Image Loader With Fallback
// ------------------------------------------------------
function loadImage(url) {
    const loading = document.getElementById('loadingStatus');
    const img = document.getElementById('generatedImage');

    const tester = new Image();
    tester.crossOrigin = "anonymous";

    tester.onload = () => {
        loading.textContent = "";
        img.src = url;
        img.style.display = "block";
    };

    tester.onerror = () => {
        loading.textContent = "Primary server failed… retrying fallback.";

        // Fallback Pollinations URL
        img.src = url.replace("image.pollinations.ai/prompt", "pollinations.ai/p");
        img.style.display = "block";
    };

    tester.src = url;
}

