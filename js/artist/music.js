import {
    fetchJSONData
} from "../../js/util.js";
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

    console.log(albumList[id]);
    let musicListHTML = ``;
    for(let i = 0; i < musicList[id].length; i++){
        musicListHTML += `
            <li>
                <div class="play">
                    <img src="../../img/artist/${id}/album/${musicList[id][i].albumNum}.png" />
                </div>
                <div class="id">
                    <div class="title">${musicList[id][i].title}</div>
                    <div class="album">${albumList[id][musicList[id][i].albumNum - 1]}</div>
                </div>
            </li>
        `;
    };
    musicListHTML = `<ul>${musicListHTML}</ul>`;
    musicBox.innerHTML = musicListHTML;
};