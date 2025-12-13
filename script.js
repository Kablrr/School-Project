let uploadedImage = null;

// Hidden detailed 1776 style description
const hidden1776Prompt = "in the style of 1776 American Revolutionary War era, historical painting, colonial uniforms, muskets, dramatic lighting, oil painting style";

// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const preview = document.getElementById('preview');
const resultImg = document.getElementById('result');
const loading = document.getElementById('loading');
const userPromptInput = document.getElementById('userPrompt');

// Drag & Drop events
dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('hover');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('hover'));
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('hover');
    handleFiles(e.dataTransfer.files);
});

// Click to open file selector
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => handleFiles(e.target.files));

// Handle uploaded files
function handleFiles(files) {
    const file = files[0];
    if(file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImage = e.target.result;
            preview.src = uploadedImage;
            previewContainer.style.display = "block";

            // Automatically generate 1776-style image
            generateImg2Img();
        }
        reader.readAsDataURL(file);
    }
}

// Generate image via Pollinations
async function generateImg2Img() {
    if(!uploadedImage) return;

    loading.style.display = "block";
    resultImg.src = "";

    // Combine user prompt + hidden 1776 prompt
    const userText = userPromptInput.value.trim();
    const fullPrompt = userText ? `${userText}, ${hidden1776Prompt}` : hidden1776Prompt;

    try {
        const apiUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?img=${encodeURIComponent(uploadedImage)}`;
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

// Optional: auto-generate when user types a new prompt
userPromptInput.addEventListener('change', () => {
    if(uploadedImage) generateImg2Img();
});


