import {
    fetchJSONData
} from "../../js/util.js";
import {
    musicPlay
} from "../../js/artist/wave0.js";

const musicBox = document.getElementById("music");

export async function innerMusicList(id) {
    // 해당 가수의 musicList와 albumList 불러오기
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
                    <div class="playBtn"><ion-icon class="ion-icon" name="play"></ion-icon></div>
                    <div class="pauseBtn"><ion-icon class="ion-icon" name="pause"></ion-icon></div>
                    <img src="../../img/artist/${id}/album/${musicList[id][i].albumNum}.png" />
                </div>
                <div class="id">
                    <div class="title">${musicList[id][i].title}</div>
                    <div class="album">${albumList[id][musicList[id][i].albumNum - 1].title} | ${albumList[id][musicList[id][i].albumNum - 1].date}</div>
                </div>
                <div class="function">
                    <ul>
                        <li>
                            <ion-icon class="ion-icon" name="volume-medium-outline"></ion-icon>
                            <input type="range" value="0" class="volumeControl"/>
                        </li>
                        <li>
                            <ion-icon class="ion-icon" name="repeat-outline"></ion-icon>
                        </li>
                        <li>
                            <a href="${musicList[id][i].live}" target="_blank">
                                <ion-icon class="ion-icon liveLink" name="headset-outline"></ion-icon>
                            </a>
                        </li>
                    </ul>
                </div>
                <audio controls class="player" preload="metadata">
                    <source src="../../mp3/artist/${id}/${musicList[id][i].title}.mp3" type="audio/mpeg"/>
                </audio>
                <input type="range" value="0" class="progress"/>
            </li>
        `;
    };
    musicListHTML = `<ul>${musicListHTML}</ul>`;
    musicBox.innerHTML = musicListHTML;

    const songs = document.querySelectorAll(".song");
    songs.forEach(song => {
        const thisPlayBtn = song.children[1].children[0];
        const thisPauseBtn = song.children[1].children[1];
        song.addEventListener("mouseover", () => {
            if(song.classList.contains('playing')){
                // 노래가 재생중 o 일때
                thisPlayBtn.classList.remove('mouseover');
                thisPauseBtn.classList.add('mouseover');
            }else{
                // 노래가 재생중 x 일때
                thisPauseBtn.classList.remove('mouseover');
                thisPlayBtn.classList.add('mouseover');
            }
        });
        song.addEventListener("mouseout", () => {
            thisPlayBtn.classList.remove('mouseover');
            thisPauseBtn.classList.remove('mouseover');
        });
    });

    // 음악 재생버튼을 누르면
    // 1. 모든 song의 음악 중지 및 비활성화
    // 1-1. 재생 버튼을 누른 song이 현재 재생중인 곡이 아닌 경우 였을 때만
    //      모든 song의 진행바 초기화 및 playing 태그 삭제
    // 2. 재생한 song의 음악 재생 및 활성화
    // 3. play 버튼 비활성화 및 pause 버튼 활성화
    // 4. 재생한 song의 canvas 활성화
    const playBtns = document.querySelectorAll(".playBtn");
    playBtns.forEach(playBtn => {
        playBtn.addEventListener("click", () => {
            const thisSong = playBtn.parentElement.parentElement;

            // 1
            const songs = document.querySelectorAll('.song');
            songs.forEach(song => {
                song.children[4].pause();
                song.classList.remove('active');
                // 1-1
                if(song !== thisSong){
                    song.children[4].currentTime = 0;
                    song.classList.remove('playing');
                }
            });

            // 2
            const thisPlayer = thisSong.children[4];
            thisPlayer.play();
            thisSong.classList.add('active');
            thisSong.classList.add('playing');

            // 3
            const thisPlayBtn = thisSong.children[1].children[0];
            const thisPauseBtn = thisSong.children[1].children[1];
            thisPlayBtn.classList.remove('mouseover');
            thisPauseBtn.classList.add('mouseover');

            // 4
            const thisCanvas = thisSong.children[0];
            const canvases = document.querySelectorAll('canvas');
            musicPlay(thisCanvas, canvases);
        });
    });

    // 음악 중지버튼을 누르면
    // 1. 중지한 song의 음악 중지 및 playing 태그 삭제
    // 2. pause 버튼 비활성화 및 play 버튼 활성화
    const pauseBtns = document.querySelectorAll(".pauseBtn");
    pauseBtns.forEach(pauseBtn => {
        pauseBtn.addEventListener("click", () => {
            // 1
            const thisSong = pauseBtn.parentElement.parentElement;
            const thisPlayer = thisSong.children[4];
            thisPlayer.pause();
            thisSong.classList.remove('playing');

            // 2
            const thisPlayBtn = thisSong.children[1].children[0];
            const thisPauseBtn = thisSong.children[1].children[1];
            thisPlayBtn.classList.add('mouseover');
            thisPauseBtn.classList.remove('mouseover');
        });
    });

    // 1. audio가 파일의 duration을 미리 불러올 수 있도록 함
    // 1-1. 기본적으로 진행바의 최대치 = 해당 음악의 최대치로 설정
    // 2. 진행바에 변화가 발생 시 현재 음악의 currentTime을 클릭한 진행바의 value로 설정
    // 3. 1초 간격으로 현재 음악의 currentTime에 맞춰 진행바의 value 설정
    // 3-1. 1초 간격으로 현재 음악의 currentTime에 맞춰 진행바 좌측 색칠
    // 4. 진행바 이동시 현재 음악의 currentTime에 맞춰 진행바 좌측 색칠
    const progresses = document.querySelectorAll(".progress");
    progresses.forEach(progress => {
        const thisSong = progress.parentElement;
        const thisPlayer = thisSong.children[4];

        // 1
        thisPlayer.onloadedmetadata = () => {
            // 1-1
            progress.max = thisPlayer.duration;
        };

        // 2
        progress.onchange = () => {
            thisPlayer.currentTime = progress.value;
        };

        // 3
        if(thisPlayer.play){
            setInterval(() => {
                progress.value = thisPlayer.currentTime;
                // 3-1
                const n = (progress.value / progress.max) * 100;
                progress.style.background = `linear-gradient(to right, #fdba29 ${n}%, #ccc ${n}%)`;
            }, 1000);
        };

        // 4
        progress.addEventListener("input", e => {
            const n = (e.target.value / progress.max) * 100;
            progress.style.background = `linear-gradient(to right, #bf8d20 ${n}%, #ccc ${n}%)`;
        });
    });

    // 음악 볼륨 기본 세팅 10%
    const players = document.querySelectorAll(".player");
    players.forEach(player => {
        player.volume = 0.1;
    });
};