/* 
////////////////////////////////////////// FORM VALIDATION/////////////////////////////////////////////////
*/
/* jshint esversion: 6 */

// Global function to remove alerts
function removeAlert(event) {
    const alertDiv = event.target.closest('.alert');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    // Check if form exists before proceeding
    if (!form) return;

    const nameInput = document.getElementById('name');
    const companyInput = document.getElementById('company');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone'); 

    // Function to clear all error messages
    function clearErrorMessages() {
        const alertDivs = document.querySelectorAll('.alert-error');
        alertDivs.forEach(alertDiv => alertDiv.remove()); // Remove all existing error alerts
    }

    // Function to create and display an error alert
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.innerHTML = `<button onclick="removeAlert(event)">x</button>${message}`;
        document.querySelector('.contact-form').insertBefore(alertDiv, form); // Insert alert before the form
        alertDiv.style.display = 'block'; // Show the alert
    }

    // Function to clear form fields
    function clearForm() {
        form.reset();
        // Reset the custom checkbox if you have one
        const checkbox = document.getElementById('Checkbox');
        if (checkbox) {
            checkbox.checked = false;
            const customIcon = document.querySelector('.custom-icon');
            if (customIcon) {
                customIcon.className = 'icon-checkbox-unchecked custom-icon';
            }
        }
    }

    // Function to validate form
    function validateForm() {
        const errors = []; // Array to hold error messages

        // Example validation checks
        if (!emailInput.value.includes('@')) {
            errors.push('Please enter a valid email address.');
        }
        if (phoneInput.value.length < 10) {
            errors.push('Phone number must be at least 10 digits long.');
        }
        // Add more validation checks as needed

        // Display errors if any
        if (errors.length > 0) {
            errors.forEach(error => showError(error)); // Show each error
            return false; // Return false if there are errors
        }

        return true; // Return true if no errors
    }

    document.getElementById('form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrorMessages(); // Clear existing error messages before validation
        
        if (validateForm()) {
            const formData = new FormData(this);
            
            fetch('inc/process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success';
                    alertDiv.innerHTML = `<button onclick="removeAlert(event)">x</button>Your message has been sent!`;
                    document.querySelector('.contact-form').insertBefore(alertDiv, form);
                    alertDiv.style.display = 'block';

                    // Clear form fields on success
                    clearForm();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        alertDiv.style.display = 'none';
                    }, 5000);
                } else if (data.errors) {
                    // Handle multiple errors
                    data.errors.forEach(error => {
                        showError(error);
                    });
                } else {
                    showError('An error occurred. Please try again later.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showError('An error occurred. Please try again later.');
            });
        }
    });
});