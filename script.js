function saveData() {
    const textValue = document.getElementById("myTextBox").value;
    localStorage.setItem("savedUserInput", textValue); // Store the data
    document.getElementById("displayArea").textContent = textValue;
    alert("Data saved!");
}

// Function to load data when the page loads
window.onload = function() {
    const storedValue = localStorage.getItem("savedUserInput");
    if (storedValue) {
        document.getElementById("myTextBox").value = storedValue;
        document.getElementById("displayArea").textContent = storedValue;
    } else {
        document.getElementById("displayArea").textContent = "No data saved yet.";
    }
};
