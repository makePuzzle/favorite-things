import {
    fetchJSONData
} from "../../js/util.js";
import {
    musicPlay
} from "../../js/artist/wave.js";

const musicBox = document.getElementById("music");

export async function innerMusicList(id) {
    const musicList = new Object();
    await fetchJSONData(`../../json/artist/${id}/musicList.json`,data => {
        musicList[id] = data;
    });
    const albumList = new Object();
    await fetchJSONData(`../../json/artist/${id}/albumList.json`,data => {
        albumList[id] = data;
    });

    let musicListHTML = ``;
    for(let i = 0; i < musicList[id].length; i++){
        musicListHTML += `
            <li class="song">
                <canvas width="35" height="35"></canvas>
                <div class="cover">
                    <img src="../../img/artist/${id}/album/${musicList[id][i].albumNum}.png" />
                </div>
                <div class="id">
                    <div class="title">${musicList[id][i].title}</div>
                    <div class="album">${albumList[id][musicList[id][i].albumNum - 1].title} | ${albumList[id][musicList[id][i].albumNum - 1].date}</div>
                </div>
                <div class="function">
                    <ul>
                        <li class="playBtn"><ion-icon class="ion-icon" name="play-outline"></ion-icon></li>
                        <li><ion-icon class="ion-icon" name="pause-outline"></ion-icon></li>
                        <li><a href="${musicList[id][i].live}" target="_blank"><ion-icon class="ion-icon" name="headset-outline"></ion-icon></a></li>
                    </ul>
                </div>
            </li>
        `;
    };
    musicListHTML = `<ul>${musicListHTML}</ul>`;
    musicBox.innerHTML = musicListHTML;

    const playBtns = document.querySelectorAll(".playBtn");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener("click", () => {
            const songs = document.querySelectorAll('.song');
            const canvases = document.querySelectorAll('canvas');
            const thisSong = playBtn.parentElement.parentElement.parentElement;
            const thisCanvas = thisSong.children[0];
            songs.forEach(song => {
                song.classList.remove('active')
            });
            thisSong.classList.add('active');
            musicPlay(thisCanvas, canvases);
            console.log(canvases)
        })
    })
};