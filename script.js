let uploadedImage = null;

// Drag & Drop
const dropZone = document.getElementById('dropZone');
const preview = document.getElementById('preview');

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('hover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('hover'));
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    if(file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            preview.src = uploadedImage;
        }
        reader.readAsDataURL(file);
    }
});

// Buttons
document.getElementById('generateT2IBtn').addEventListener('click', generateT2I);
document.getElementById('generateImg2ImgBtn').addEventListener('click', generateImg2Img);

function enhancePrompt(userPrompt) {
    const styleDesc = "in the style of 1776 American Revolutionary War paintings, dramatic lighting, detailed uniforms, colonial architecture, historic realism, oil painting textures, cinematic composition";
    return userPrompt ? `${userPrompt}, ${styleDesc}` : styleDesc;
}

async function generateT2I() {
    const userPrompt = document.getElementById('t2iPrompt').value;
    const prompt = enhancePrompt(userPrompt);
    const resultImg = document.getElementById('result');
    const loading = document.getElementById('loading');
    loading.style.display = "block";
    resultImg.src = "";

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
        const response = await fetch(apiUrl);
        if(!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch(err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
}

async function generateImg2Img() {
    const userPrompt = document.getElementById('img2imgPrompt').value;
    const prompt = enhancePrompt(userPrompt);
    const imageUrl = document.getElementById('imageUrl').value;
    const resultImg = document.getElementById('result');
    const loading = document.getElementById('loading');
    loading.style.display = "block";
    resultImg.src = "";

    try {
        let imgParam = "";
        if(uploadedImage) imgParam = uploadedImage;
        else if(imageUrl) imgParam = imageUrl;
        else {
            alert("Please provide an image URL or upload an image.");
            loading.style.display = "none";
            return;
        }

        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?img=${encodeURIComponent(imgParam)}`;
        const response = await fetch(apiUrl);
        if(!response.ok) throw new Error("Failed to generate image.");
        const blob = await response.blob();
        resultImg.src = URL.createObjectURL(blob);
    } catch(err) {
        alert("Error: " + err.message);
    } finally {
        loading.style.display = "none";
    }
}


