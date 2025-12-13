let uploadedImage = null;

// Drag & Drop functionality
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', e => e.preventDefault());
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if(file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result; // base64
            dropZone.textContent = "Image loaded! Ready to generate.";
        }
        reader.readAsDataURL(file);
    }
});

// Event listeners for buttons
document.getElementById('generateT2IBtn').addEventListener('click', generateT2I);
document.getElementById('generateImg2ImgBtn').addEventListener('click', generateImg2Img);

async function generateT2I() {
    const prompt = document.getElementById('t2iPrompt').value || "1776 style";
    const resultImg = document.getElementById('result');
    const loading = document.getElementById('loading');
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
}

async function generateImg2Img() {
    const prompt = document.getElementById('img2imgPrompt').value || "1776 style";
    const imageUrl = document.getElementById('imageUrl').value;
    const resultImg = document.getElementById('result');
    const loading = document.getElementById('loading');
    loading.style.display = "block";
    resultImg.src = "";

    try {
        let imgParam = "";
        if(uploadedImage) {
            imgParam = uploadedImage; // base64
        } else if(imageUrl) {
            imgParam = imageUrl;
        } else {
            alert("Please provide an image URL or upload an image.");
            loading.style.display = "none";
            return;
        }

        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?img=${encodeURIComponent(imgParam)}`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch (err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
}

