/* 
////////////////////////////////////////// FORM VALIDATION/////////////////////////////////////////////////
*/
/* jshint esversion: 6 */

// Global function to remove alerts
function removeAlert(event) {
    const button = event.target;
    const alertDiv = button.closest('.alert');
    if (alertDiv) {
        alertDiv.style.display = 'none';
        alertDiv.innerHTML = ''; // Clear the content
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    // Check if form exists before proceeding
    if (!form) {
        console.error("Form element not found!");
        return; // Exit if form is not found
    }
    const alertDiv = document.querySelector('.alert-error');
    // Function to show error message
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorDiv = formControl.querySelector('.error-message') || document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorDiv);
        }
        
        input.classList.add('error');
    }

    // Function to clear all error messages
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(error => error.remove());
        errorInputs.forEach(input => input.classList.remove('error'));
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

    function validateForm() {
        let isValid = true;
        
        // clear error messages
        clearErrorMessages();

        // Check all fields
        if (nameInput.value.trim() === "") {
            showError(nameInput, "Field required, Do not leave blank.");
            isValid = false;
        }

        // if (companyInput.value.trim() === "") {
        //     showError(companyInput, "Field required, Do not leave blank.");
        //     isValid = false;
        // }

        if (emailInput.value.trim() === "") {
            showError(emailInput, "Field required, Do not leave blank.");
            isValid = false;
        } 
        // else if (!emailPattern.test(emailInput.value)) {
        //     showError(emailInput, "Please enter a valid email.");
        //     isValid = false;
        // }

        // Validate phone number using regex
        if (phoneInput.value.trim() === "") {
            showError(phoneInput, "Field required, Do not leave blank.");
            isValid = false;
        } 
        // else if (!phonePattern.test(phoneInput.value)) {
        //     showError(phoneInput, "Please enter a valid phone number.");
        //     isValid = false;
        // }

        if (messageInput.value.trim() === "") {
            showError(messageInput, "Field required, Do not leave blank.");
            isValid = false;
        }

        return isValid;
    }

    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(this);
            
            fetch('inc/process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
                if (data.success) {
                    this.reset();
                    if (alertDiv) {
                        alertDiv.style.display = 'block';
                        alertDiv.insertAdjacentHTML('beforeend', 'Thank you for your message. We will get back to you soon!');
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            const successMessages = alertDiv.querySelectorAll('.success-message');
                            successMessages.forEach(msg => msg.remove());
                            if (alertDiv.children.length === 0) {
                                alertDiv.style.display = 'none';
                            }
                        }, 5000);
                    }
                } else {
                    if (alertDiv) {
                        alertDiv.style.display = 'block';
                        alertDiv.insertAdjacentHTML('beforeend', `${data.error}`);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const alertDiv = document.querySelector('.alert-error');
                if (alertDiv) {
                    alertDiv.style.display = 'block';
                    alertDiv.insertAdjacentHTML('beforeend', '<div class="error-message">An error occurred. Please try again later.</div>');
                }
            });
        }
    });
});