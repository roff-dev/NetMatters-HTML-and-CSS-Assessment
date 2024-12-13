const dropdown = document.getElementById('accordion-dropdown');
const bodyText = document.querySelector('.accordion-text');

//initially set the height to 0 and add hidden class
//not setting height first was meaning first open didnt have effect
bodyText.style.height = '0';
bodyText.classList.add('hidden');

function toggleDropdown() {
    if (bodyText.classList.contains('visible')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

function openDropdown() {
    bodyText.classList.remove('hidden');
    //check full scroll height
    const scrollHeight = bodyText.scrollHeight;
    //set height
    bodyText.style.height = scrollHeight + 'px';
    bodyText.classList.add('visible');
}

function closeDropdown() {
    bodyText.style.height = '0';
    bodyText.classList.remove('visible');
    setTimeout(() => {
        bodyText.classList.add('hidden');
    }, 300);
}

dropdown.addEventListener('click', toggleDropdown);