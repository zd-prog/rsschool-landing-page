const burgerMenu = document.querySelector(".burger-menu");
const burgerButton = document.querySelector(".burger-menu-button");

burgerButton.addEventListener('click', () => {
    if (burgerButton.classList.contains("active")) {
        closeMenu();
    } else {
        openMenu();
    }
});

function openMenu() {
    burgerButton.classList.add("active");
    burgerMenu.classList.add("open");
    body.classList.add("modal-open");
}

function closeMenu() {
    burgerMenu.classList.remove("open");
    burgerButton.classList.remove("active");

    body.classList.remove("modal-open");
}

const menuLinks = document.querySelectorAll('.burger-menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeMenu();
    }
});