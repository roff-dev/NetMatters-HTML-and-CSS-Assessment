/* 
////////////////////////////////////////// FORM VALIDATION/////////////////////////////////////////////////
*/
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    // Check if form exists before proceeding
    if (!form) {
        console.error("Form element not found!");
        return; // Exit if form is not found
    }
    const nameInput = document.getElementById('name');
    const companyInput = document.getElementById('company');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone'); //needs phone number regex
    const messageInput = document.getElementById('message');

    // email regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //phone regex
    const phonePattern = /^(?:\+44|0)7\d{9}$|^(?:\+44|0)(?:\d{2,4}|\(\d{2,4}\))\s?\d{3,4}\s?\d{3,4}$/;

    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // clear error messages
        clearErrorMessages();

        // Check all fields
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Field required, Do not leave blank.");
            isValid = false;
        }

        if (companyInput.value.trim() === "") {
            showError(companyInput, "Field required, Do not leave blank.");
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Field required, Do not leave blank.");
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            showError(emailInput, "Please enter a valid email.");
            isValid = false;
        }

        // Validate phone number using regex
        if (phoneInput.value.trim() === "") {
            showError(phoneInput, "Field required, Do not leave blank.");
            isValid = false;
        } else if (!phonePattern.test(phoneInput.value)) {
            showError(phoneInput, "Please enter a valid phone number.");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Field required, Do not leave blank.");
            isValid = false;
        }

        // Log the validation result
        console.log("Form is valid:", isValid);

        // prevent if invalid
        if (!isValid) {
            event.preventDefault();
            console.log("Form submission prevented due to validation errors.");
        } else {
            alert("Contact Form Sent! Response will arrive shortly.");
        }
    });
});