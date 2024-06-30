const $cards = document.querySelector('#cards');
const cards = document.querySelectorAll('.card');
const images = document.querySelectorAll('.img');
const backgrounds = document.querySelectorAll('.bg');
const bgFilters = document.querySelectorAll('.bgFilter');

const RANGE = 40;

const calcValue = (a, b) => {
    return (a / b * RANGE - RANGE / 2).toFixed(1)
};

document.addEventListener("mousemove", e => {
    const X = calcValue(e.x, window.innerWidth);
    const Y = calcValue(e.y, window.innerHeight);
    $cards.style.transform = `rotateX(${X * .2}deg) rotateY(${Y * .2}deg)`;

    images.forEach(img => {
        img.style.transform = `translateX(${-X * .5}px) translateY(${Y * .5}px)`
    });

    backgrounds.forEach(bg => {
        bg.style.backgroundPosition = `${X}px ${-Y}px`;
    });
});

cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        bgFilters.forEach(bgFilter => {
            bgFilter.style.background = `#000000a8`;
        });
        card.children[1].style.background = `#00000018`;
    });
});