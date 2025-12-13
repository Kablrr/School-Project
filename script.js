// -------------------
// Pollinations Text → Image
// -------------------
const STYLE = ", American Revolutionary War era, 18th-century colonial American style, oil painting realism, muted earthy tones, tricorne hats, colonial clothing, parchment texture, vintage look";

function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    const imageElement = document.getElementById('generatedImage');
    const loadingStatus = document.getElementById('loadingStatus');

    if (!prompt) {
        alert("Please enter a prompt.");
        return;
    }

    loadingStatus.textContent = "Generating image...";
    imageElement.style.display = "none";

    const finalPrompt = encodeURIComponent(prompt + STYLE);
    const imageUrl = `https://image.pollinations.ai/prompt/${finalPrompt}?width=512&height=512&seed=${Math.floor(Math.random()*999999)}`;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
        loadingStatus.textContent = "";
        imageElement.src = imageUrl;
        imageElement.style.display = "block";
    };

    img.onerror = () => {
        loadingStatus.textContent = "Failed to load image. Try a different prompt.";
    };

    img.src = imageUrl;
}

// -------------------
// Img2Img (Hugging Face Space Interactive)
// -------------------
document.getElementById("convertBtn").addEventListener("click", () => {
    const file = document.getElementById("imgInput").files[0];
    const prompt = document.getElementById("img2imgPrompt").value || "1776 style";

    if(!file) return alert("Please upload an image");

    const reader = new FileReader();
    reader.onload = () => {
        const data = { prompt: prompt, image: reader.result };
        const iframe = document.getElementById("hfSpace");
        iframe.contentWindow.postMessage(data, "*"); // Must match your Space origin if you restrict
        iframe.scrollIntoView({behavior: "smooth"});
    };
    reader.readAsDataURL(file);
});

