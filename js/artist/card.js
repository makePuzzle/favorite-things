import {
    innerMusicList
} from "./music.js";
const cards = document.querySelectorAll('.card');
const music = document.getElementById('music');
const back = document.getElementById('back');
const musicBtns = document.querySelectorAll('.musicBtn');

cards.forEach(card => {
    card.addEventListener("mouseover",()=>{
        card.classList.add("active")
    });
    card.addEventListener("mouseleave",()=>{
        card.classList.remove("active")
    });
});

musicBtns.forEach(musicBtn => {
    musicBtn.addEventListener("click",()=>{
        const thisCard = musicBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
        innerMusicList(thisCard.id);
        cards.forEach(card => {
            card.classList.add("none")
        });
        thisCard.classList.remove("none");
        thisCard.classList.add("fix");
        music.classList.add("fix");
        back.classList.add("fix");
    });
})

back.addEventListener("click",()=>{
    cards.forEach(card => {
        card.classList.remove("none");
        card.classList.remove("fix");
        music.classList.remove("fix");
        back.classList.remove("fix");
    });
});