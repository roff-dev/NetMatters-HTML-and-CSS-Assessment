const dropdown = document.getElementById('accordian-dropdown');
const bodyText = document.querySelector('.accordian-text');

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
    bodyText.style.height = bodyText.scrollHeight + 'px';
    bodyText.classList.add('visible');
}
function closeDropdown() {
    bodyText.style.height = '0';
    bodyText.classList.remove('visible');
    setTimeout(() => {
        bodyText.classList.add('hidden');
    }, 300);
}
dropdown.addEventListener('click', (e) => {
    toggleDropdown();
});