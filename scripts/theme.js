const themeSwitch = document.querySelector('.theme-switch');
const toggles = document.querySelectorAll('.theme-switch .toggle');
const body = document.body;

const lightToggle = toggles[0];
const darkToggle = toggles[1];

function setTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        lightToggle.classList.remove('current');
        darkToggle.classList.add('current');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        lightToggle.classList.add('current');
        darkToggle.classList.remove('current');
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    setTheme(savedTheme);
}

themeSwitch.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
});