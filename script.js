// Initialize a variable with a default value
let myVariable = "default value";

// Function to handle the submit event
function updateVariable(event) {
    // Prevent the form from actually submitting and refreshing the page
    event.preventDefault();

    // Get the value from the input field using its ID
    const inputValue = document.getElementById("userInput").value;

    // Update the JavaScript variable
    myVariable = inputValue;

    // Optional: Update the display on the page to show the new value
    document.getElementById("displayArea").textContent = myVariable;

    // Optional: Log the new value to the console to verify
    console.log("Variable updated to: ", myVariable);

    // Optional: Clear the input field after submission
    document.getElementById("userInput").value = "";
}

// Add an event listener to the form's submit event
// We attach it to the form element and listen for the 'submit' event
document.getElementById("myForm").addEventListener("submit", updateVariable);
