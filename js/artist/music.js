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
                        <li class="pauseBtn"><ion-icon class="ion-icon" name="pause-outline"></ion-icon></li>
                        <li><a href="${musicList[id][i].live}" target="_blank"><ion-icon class="ion-icon" name="headset-outline"></ion-icon></a></li>
                    </ul>
                </div>
                <audio controls class="player">
                    <source src="../../mp3/artist/LeeSSang/발레리노.mp3" type="audio/mpeg"/>
                </audio>
                <input type="range" value="0" class="progress"/>
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
            const thisPlayer = thisSong.children[4];
            const thisProgress = thisSong.children[5];
            thisPlayer.play();
        });
    });

    const pauseBtns = document.querySelectorAll(".pauseBtn");
    pauseBtns.forEach(pauseBtn => {
        pauseBtn.addEventListener("click", () => {
            const thisSong = pauseBtn.parentElement.parentElement.parentElement;
            const thisPlayer = thisSong.children[4];
            thisPlayer.pause();
        });
    });

    const progresses = document.querySelectorAll(".progress");
    progresses.forEach(progress => {
        const thisSong = progress.parentElement;
        const thisPlayer = thisSong.children[4];
        progress.onchange = () => {
            console.log(progress.value)
            console.log(thisPlayer.currentTime)
            progress.max = thisPlayer.duration;
            progress.value = thisPlayer.currentTime;
        };

        if(thisPlayer.play()){
            setInterval(() => {
                progress.value = thisPlayer.currentTime;
            }, 500);
        };
    });

    const players = document.querySelectorAll(".player");
    players.forEach(player => {
        player.volume = 0.01;
    });
};