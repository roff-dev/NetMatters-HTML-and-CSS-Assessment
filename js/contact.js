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

    // Function to clear all error messages
    function clearErrorMessages() {
        const alertDivs = document.querySelectorAll('.alert');
        alertDivs.forEach(alertDiv => alertDiv.remove()); // Remove all existing alerts
    }

    // Function to create and display an error alert
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.innerHTML = `<button onclick="removeAlert(event)">x</button>${message}`;
        document.querySelector('.contact-form').insertBefore(alertDiv, form);
        alertDiv.style.display = 'block';
    }

    // Function to clear form fields
    function clearForm() {
        form.reset();
        // Reset the custom checkbox
        const checkbox = document.getElementById('Checkbox');
        if (checkbox) {
            checkbox.checked = false;
            const customIcon = document.querySelector('.custom-icon');
            if (customIcon) {
                customIcon.className = 'icon-checkbox-unchecked custom-icon';
            }
        }
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrorMessages();
        
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
    });
});