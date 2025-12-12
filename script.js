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
// Function to load data when the page loads
window.onload = function() {
    // 1. Get the data from localStorage using its key
    const storedValue = localStorage.getItem("savedUserInput");

    // 2. Check if any data was actually found
    if (storedValue) {
        // 3. Find the HTML elements by their IDs
        const textBox = document.getElementById("myTextBox");
        const displayArea = document.getElementById("displayArea");

        // 4. Send the data back into the HTML elements
        textBox.value = storedValue;           // Puts data back into the input box
        displayArea.textContent = storedValue; // Displays data in the <span> element
    } else {
        document.getElementById("displayArea").textContent = "No data saved yet.";
    }
};

