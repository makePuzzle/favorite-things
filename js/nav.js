const nav = document.getElementById('nav');

const navHTML = `
<ul>
    <li class="menu active">
        <a href="/html/home">
            <span class="icon">
                <ion-icon name="home-outline"></ion-icon>
            </span>
            <span class="text">Home</span>
        </a>
    </li>
    <li class="menu">
        <a href="/html/lol/card.html">
            <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="7 9 32 36" id="league-of-legends">
                    <path d="M35,37.13A14.38,14.38,0,0,0,24,13.46a11.51,11.51,0,0,0-1.45.1V10.68H11.87l2.92,3.58v2.56a14.29,14.29,0,0,0-.18,22l-3.12,3.5H34l4.64-5.16ZM24,14.64A13.21,13.21,0,0,1,33.4,37.13H31.94a12.21,12.21,0,0,0-8-21.49,11.66,11.66,0,0,0-1.46.11v-1A13.94,13.94,0,0,1,24,14.64Zm-1.47,1.7A11.82,11.82,0,0,1,24,16.23a11.62,11.62,0,0,1,7,20.9H22.42ZM14.85,35.07a11.53,11.53,0,0,1,0-14.34Zm-4.11-7.19a13.15,13.15,0,0,1,4.06-9.49v1.42a12.14,12.14,0,0,0,0,16.18v1.43A13.17,13.17,0,0,1,10.74,27.88ZM33.5,41.11H14.13L16,39,16,13.84l-1.62-2h7l-.12,26.45H36Z"></path>
                </svg>
            </span>
            <span class="text">LOL</span>
        </a>
    </li>
    <li class="menu">
        <a href="/html/artist/card.html">
            <span class="icon">
                <ion-icon name="musical-notes-outline"></ion-icon>
            </span>
            <span class="text">Artist</span>
        </a>
    </li>
    <li class="menu">
        <a href="/html/think/wave/app.html">
            <span class="icon">
                <ion-icon name="book-outline"></ion-icon>
            </span>
            <span class="text">Think</span>
        </a>
    </li>
    <li class="menu">
        <a href="">
            <span class="icon">
                <ion-icon name="settings-outline"></ion-icon>
            </span>
            <span class="text">Settings</span>
        </a>
    </li>
    <div id="indicator"></div>
</ul>
`;

nav.innerHTML = navHTML;

const menus = document.querySelectorAll('.menu');

menus.forEach(menu => {
    menu.addEventListener('mouseover', () => {
        menus.forEach(menu => menu.classList.remove('active'));
        menu.classList.add('active');
    });
});