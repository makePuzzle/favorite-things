const cards = document.querySelectorAll('.card');
const music = document.getElementById('music');
const off = document.getElementById('off');
const musicBtns = document.querySelectorAll('.musicBtn');
const musicBtn_1 = document.getElementById('musicBtn_1');

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
        console.log(musicBtn)
        const thisCard = musicBtn.parentElement.parentElement.parentElement.parentElement.parentElement;
        cards.forEach(card => {
            card.classList.add("none")
        });
        thisCard.classList.remove("none");
        thisCard.classList.add("fix");
        music.classList.add("fix");
        off.classList.add("fix");
    });
})

off.addEventListener("click",()=>{
    cards.forEach(card => {
        card.classList.remove("none");
        card.classList.remove("fix");
        music.classList.remove("fix");
        off.classList.remove("fix");
    });
});