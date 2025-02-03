/* 
////////////////////////////////////////// FORM VALIDATION/////////////////////////////////////////////////
*/
/* jshint esversion: 6 */

//function to remove alerts
function removeAlert(event) {
    const alertDiv = event.target.closest('.alert');
    if (alertDiv) {
        alertDiv.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('form');
    // check form exists before proceeding
    if (!form) return;

    // get required input fields
    const requiredFields = [
        { element: document.getElementById('name'), name: 'Name' },
        { element: document.getElementById('email'), name: 'Email' },
        { element: document.getElementById('phone'), name: 'Phone' },
        { element: document.getElementById('message'), name: 'Message' }
    ];

    //clear all error messages
    function clearErrorMessages() {
        const alertDivs = document.querySelectorAll('.alert');
        alertDivs.forEach(alertDiv => alertDiv.remove());
        
        // remove red border
        requiredFields.forEach(field => {
            field.element.style.border = '';
        });
    }

    // create and display an error alert
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-error';
        alertDiv.innerHTML = `<button onclick="removeAlert(event)">x</button>${message}`;
        document.querySelector('.contact-form').insertBefore(alertDiv, form);
        alertDiv.style.display = 'block';
    }

    // clear form fields
    function clearForm() {
        form.reset();
        // reset the checkbox
        const checkbox = document.getElementById('Checkbox');
        if (checkbox) {
            checkbox.checked = false;
            const customIcon = document.querySelector('.custom-icon');
            if (customIcon) {
                customIcon.className = 'icon-checkbox-unchecked custom-icon';
            }
        }
    }

    // validate required fields are not empty
    function validateRequiredFields() {
        let isValid = true;
        const emptyFields = [];

        requiredFields.forEach(field => {
            if (!field.element.value.trim()) {
                field.element.style.border = '1px solid red';
                emptyFields.push(field.name);
                isValid = false;
            }
        });

        // show empty fields in error message
        if (!isValid) {
            showError(`Please fill in the following required fields: ${emptyFields.join(', ')}`);
        }

        return isValid;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrorMessages();

        // check required fields first
        if (!validateRequiredFields()) {
            return;
        }
        
        // if fields not empty proceed with php
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

                // clear form fields on success
                clearForm();

                // hide success message after 5 seconds
                setTimeout(() => {
                    alertDiv.style.display = 'none';
                }, 5000);
            } else if (data.errors) {
                // handle multiple errors
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

    // remove red outline when user starts typing
    requiredFields.forEach(field => {
        field.element.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.border = '';
            }
        });
    });
});