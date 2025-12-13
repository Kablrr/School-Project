// Pollinations detailed 1776 style description
const style1776 = "in the style of a detailed 1776 American Revolutionary War painting, historical clothing, oil painting, dramatic lighting, intricate brushwork, realistic textures";

document.getElementById('generateT2IBtn').addEventListener('click', async () => {
    const promptInput = document.getElementById('t2iPrompt').value;
    const prompt = promptInput ? `${promptInput}, ${style1776}` : style1776;
    const resultImg = document.getElementById('resultT2I');
    const loading = document.getElementById('loadingT2I');

    loading.style.display = "block";
    resultImg.src = "";

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
});

document.getElementById('generateImg2ImgBtn').addEventListener('click', async () => {
    const promptInput = document.getElementById('img2imgPrompt').value;
    const prompt = promptInput ? `${promptInput}, ${style1776}` : style1776;
    const imageUrl = document.getElementById('imageUrl').value;
    const resultImg = document.getElementById('resultImg2Img');
    const loading = document.getElementById('loadingImg2Img');

    if (!imageUrl) {
        alert("Please provide a public image URL.");
        return;
    }

    loading.style.display = "block";
    resultImg.src = "";

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?img=${encodeURIComponent(imageUrl)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
});


