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

    // Function to show error message
    function showError(input, message) {
        // Implementation of showError
    }

    // Function to clear all error messages
    function clearErrorMessages() {
        const alertDivError = document.querySelector('.alert-error');
        if (alertDivError) {
            alertDivError.style.display = 'none';
            alertDivError.innerHTML = ''; // Clear existing messages
        }
    }

    // Add event listener for the "x" button to clear error alerts
    document.addEventListener('click', function(event) {
        if (event.target.matches('.alert-error .close-button')) { // Assuming the close button has a class 'close-button'
            clearErrorMessages();
        }
    });

    // Function to validate form
    function validateForm() {
        // Implementation of validateForm
        return true; // or false based on validation
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
                const alertDiv = document.querySelector('.alert-success'); // Ensure this is the correct success alert div
                if (data.success) {
                    this.reset();
                    if (alertDiv) {
                        alertDiv.style.display = 'block';
                        alertDiv.insertAdjacentHTML('beforeend', 'Your message has been sent!');
                        // Hide success message after 5 seconds
                        setTimeout(() => {
                            const successMessages = document.querySelectorAll('.alert-success');
                            successMessages.forEach(msg => msg.remove());
                            if (alertDiv.children.length === 0) {
                                alertDiv.style.display = 'none';
                            }
                        }, 5000);
                    }
                } else {
                    const alertDivError = document.querySelector('.alert-error');
                    if (alertDivError) {
                        alertDivError.style.display = 'block';
                        alertDivError.insertAdjacentHTML('beforeend', `${data.error}`);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const alertDivError = document.querySelector('.alert-error');
                if (alertDivError) {
                    alertDivError.style.display = 'block';
                    alertDivError.insertAdjacentHTML('beforeend', '<div class="error-message">An error occurred. Please try again later.</div>');
                }
            });
        }
    });
});