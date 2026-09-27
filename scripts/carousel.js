let index = 0;

const arrowButtonPrev = document.querySelector(".arrow-button.prev");
const arrowButtonNext = document.querySelector(".arrow-button.next");
const slides = document.querySelectorAll('.slide');
const inner = document.querySelector('.slider-row');
const controls = document.querySelectorAll(".control");

function updateCarousel() {
    const currentControl = document.querySelector(".control.current");

    currentControl.classList.remove("current");

    controls[index].classList.add("current");

    inner.style.transform = `translateX(${-index * 100}%)`;
}

if (arrowButtonPrev) {
    arrowButtonPrev.addEventListener("click", () => {
        index--;

        if (index < 0) {
            index = slides.length - 1;
        }

        updateCarousel();
    });
}

if (arrowButtonNext) {
    arrowButtonNext.addEventListener("click", () => {
        index++;

        if (index >= slides.length) {
            index = 0;
        }

        updateCarousel();
    });
}


controls.forEach((control) => {
    control.addEventListener("click", () => {
        const controlIndex = Array.prototype.indexOf.call(controls, control);

        index = controlIndex;

        updateCarousel();
    })
})