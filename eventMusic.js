const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songWrapItem = $(".main-song__listSong-wrapItem");
const audio = $(".audio-music");
const imageSong = $(".singing-img");
const songName = $(".layout-singing__infoSong-singer-song");
const singer = $(".layout-singing__infoSong-singer-name");
const btnPlay = $(".btn-play");
const btnPlayIcon = $(".btn-play > .layout-singing__controls-play-btn-icon");
const iconNextSong = $(".layout-singing__controls-play-btn-icon.icon-next");
const iconBackSong = $(".layout-singing__controls-play-btn-icon.icon-back");
const getBtn = $(".main-topic__content-btn");
const getIconBtn = $(".main-topic__content-btn-icon");
const changeBtn = $(".main-topic__content-btn-notify");
const progressedwrap = $(".layout-singing__subInfo-song-progress");
const progressedSmall = $(".layout-singing__subInfo-song-progressed");
const iconVolume = $(".layout-singing__subInfo-song-icon.icon-volume");
const repeat = $(".layout-singing__controls-play-btn-icon.btn-repeat");
const btnRandom = $(".layout-singing__controls-play-btn-icon.btn-random");
const progressBar = $(".progress-bar");
const progressed = $(".progressed");
const clickHeart = $(".layout-singing__infoSong-icon.active");
const getTime = $(".time-ended");
const RunTime = $(".wait-time");
const undulating = $(".undulating");
const appMusic = {
    isPlaySong: false,
    currentIndex: 0,
    isPress: false,
    isIcon: false,
    isRepeat: true,
    isHeart: false,
    song: [
        {
            singer: "Rhymastic",
            nameSong: "Yêu 5",
            linkSong: "./linkMusic/yeu5.mp3",
            image: "./img/yeu5.png",
            album: "Yêu 5 (Single)"
        }
        ,
        {
            singer: "Mr.Siro",
            nameSong: "Anh Chỉ Cà Người Thay Thế",
            linkSong: "./linkMusic/anhchilanguoithaythe.mp3",
            image: "./img/anhchilanguoithaythe.png",
            album: "Anh Chỉ Cà Người Thay Thế (Single)"
        },
        {
            singer: "Noo Phước Thịnh",
            nameSong: "Cause I love you",
            linkSong: "./linkMusic/causeiloveyou.mp3",
            image: "./img/causeiloveyou.png",
            album: "Cause I love you (Single)"
        },
        {
            singer: "Keyo",
            nameSong: "Em Là Ai",
            linkSong: "./linkMusic/emlaai.mp3",
            image: "./img/emlaai.png",
            album: "Em Là Ai (Remix) (Single)"
        },
        {
            singer: "Lil Zpoet",
            nameSong: "Kẻ Điên Tin Vào Tình Yêu",
            linkSong: "./linkMusic/kedientinvaotinyeu.mp3",
            image: "./img/kedientinvaotinhyeu.png",
            album: "Kẻ Điên Tin Vào Tình Yêu (Single)"
        },
        {
            singer: "Vũ Phụng Tiên",
            nameSong: "Lệ Lưu Ly",
            linkSong: "./linkMusic/leluuly.mp3",
            image: "./img/leluuly.png",
            album: "Lệ Lưu Ly (Single)"
        },
        {
            singer: "KHA",
            nameSong: "Lời Yêu Dgây Dại",
            linkSong: "./linkMusic/loiyeungaydai.mp3",
            image: "./img/loiyeungaydai.png",
            album: "Lời Yêu Dgây Dại (Single)"
        },
        {
            singer: "Sơn Tùng MTP",
            nameSong: "Lạc Trôi",
            linkSong: "./linkMusic/lactroi.mp3" ,
            image: "./img/lactroi.png",
            album: "Lạc trôi (Single)"
        }
    ]
}



function renderSong() {
    const htmls = appMusic.song.map((e,index) => {
        return `
        <div class="main-song__listSong-item ${index === appMusic.currentIndex ? "active" : ""}" data-index = ${index}>                      
            <div class="main-song__listSong-item-song">
            <i class="main-song__listSong-item-song-icon fa-solid fa-music"></i>
            <img src="${e.image}" alt="" class="main-song__listSong-item-song-img">
            <div class="main-song__listSong-item-song-info">
            <h3 class="main-song__listSong-item-song-info-name">${e.nameSong}</h3>
            <div class="main-song__listSong-item-song-info-singer">
                ${e.singer}
            </div>
            </div>
            </div>
            <div class="main-song__listSong-item-album">
                ${e.album}
            </div>
            <div class="main-song__listSong-item-time">
                04:32
            </div>            
        </div>
        `
    }) 
    songWrapItem.innerHTML = htmls.join("");
}


function defineProperties() {
    Object.defineProperty(appMusic,"currentSong", {
        get: function() {
            return appMusic.song[appMusic.currentIndex];
        }
    })
}     

function loadCurrentSong() {
    imageSong.src = appMusic.currentSong.image;
    songName.innerHTML = appMusic.currentSong.nameSong;
    singer.innerHTML = appMusic.currentSong.singer; 
    audio.src = appMusic.currentSong.linkSong;
}

function handleEventSong() {
    // click vao btn play dể nghe 
    btnPlay.onclick = () => {
        if(appMusic.isPlaySong === false){
            audio.play();
        }else{
            audio.pause();
        }
    }
    // khi bài hát được play()
    audio.onplay = function() {
        appMusic.isPlaySong = true;
        btnPlayIcon.classList.add("fa-pause");
        btnPlayIcon.classList.remove("fa-play");
        getIconBtn.classList.add("fa-pause");
        getIconBtn.classList.remove("fa-play");
        changeBtn.innerText = "TẠM DỪNG";
        $(".main-song__listSong-item.active").scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
        timeDuration();
        undulating.style.display = "flex";

    }
    // khi bài hát bị pause()
    audio.onpause = function() {
        appMusic.isPlaySong = false;
        btnPlayIcon.classList.remove("fa-pause");
        btnPlayIcon.classList.add("fa-play");
        getIconBtn.classList.remove("fa-pause");
        getIconBtn.classList.add("fa-play");
        changeBtn.innerText = "TIẾP TỤC PHÁT"
        undulating.style.display = "none";
    }

    
    // tiến độ bài hát (thanh progress)
    audio.ontimeupdate = function() {
        if(audio.duration){
            const audioPercent = audio.currentTime / audio.duration * 100;
            progressed.style.width = audioPercent + "%";
        }
    }
    // Công thức
    // Tính % của thanh progress khi bài hát chạy
    // -- progress.style.width = thời gian hiện tại của bài hát(currentTime) / tổng thời gian của bài hát * 100%;
    // Tính thời gian của bài hát khi click tua bài hát
    // -- audio.currentTime = độ dài thanh ptogress hiện tại / kích thước của thanh progress * 100%;
    progressBar.onclick = (e) => {
        const progressBarWidth = e.target.offsetWidth; // kích thước thanh progressBar
        const positionClick = e.offsetX; // vị trí khi click
        const currentClick = positionClick / progressBarWidth;  // lấy vị trí click / kích thước progressBar

        audio.currentTime = currentClick * audio.duration; // lấy currentClick * tổng thời gian của bài hát => thời gian hiện tại
        progressed.style.width = positionClick + "px";
    }

    // nhấn giữ thanh tiến trình và kéo 
    function widthProSmall(a) {
        progressedSmall.style.width = a.offsetX + "px";
    }
    progressedwrap.onmousedown = (e) => {
        if(appMusic.isPress === false){
            progressedwrap.addEventListener("mousemove", widthProSmall);
            appMusic.isPress = true;
        }
    }
    progressedwrap.onmouseup = (e) => {
        progressedwrap.removeEventListener("mousemove", widthProSmall);
        appMusic.isPress = false;
    }

    

    // xử lý khi tăng giảm âm lượng
    progressedwrap.onclick = (e) => {
        const progressWidth = e.target.offsetWidth;   
        const newWidth = progressedSmall.style.width = e.offsetX + "px";
        audio.volume = Number(newWidth.replace("px","")) / progressWidth;
        if(audio.volume === 0){
            iconVolume.classList.add("fa-volume-xmark");
            iconVolume.classList.remove("fa-volume-high");
        }else{
            iconVolume.classList.remove("fa-volume-xmark");
            iconVolume.classList.add("fa-volume-high");
        }
    }

    // xử lý khi bấm vào bài hát kế tiếp 
    iconNextSong.onclick = () => {
        nextSong();
        renderSong();
        audio.play();
    }
    // xử lý trở về bài hát trước đó
    iconBackSong.onclick = () => {
        backSong();
        renderSong();
        audio.play();
    }
    // xử lý play() và pause() cho nút btn
    getBtn.onclick = (e) => {
        if(appMusic.isPlaySong === false){
            audio.play();
        }else{
            audio.pause();
        }
    }

    // khi hết bài hát sẽ phát bài kế tiếp
    audio.onended = (e) => {
        nextSong();
        renderSong();
        audio.play();
    }

    // xử lý bài hát khi xong sẽ lặp lại
    audio.onended = function(e) {
        if(btnRandom.classList.contains("icon-click") || repeat.classList.contains("icon-click")){
            if(btnRandom.classList.contains("icon-click")){
                appMusic.currentIndex = Math.round(Math.random() * appMusic.song.length); 
                nextSong();
                renderSong();
                audio.play();
            }else if(repeat.classList.contains("icon-click")){
                audio.play();
            }else if(btnRandom.classList.contains("icon-click") && repeat.classList.contains("icon-click")){
                audio.play();
            }
        }else{
            nextSong();
            renderSong();
            audio.play();
        }
    }

    // click vào nút repeat
    repeat.onclick = (e) => {
        if(appMusic.isIcon === false){
            repeat.classList.add("icon-click");
            appMusic.isIcon = true;
        }else{
            repeat.classList.remove("icon-click");
            appMusic.isIcon = false;
        }
    }
    

    // click vào bài hát và phát
    songWrapItem.onclick = (e) => {
        const clickSong = e.target.closest(".main-song__listSong-item:not(.active)");
        if(clickSong){
            appMusic.currentIndex = Number(clickSong.dataset.index);
            loadCurrentSong();
            audio.play();
            renderSong();
        }

    }
    
    // xử lý khi bấm vào nút random bài hát
    btnRandom.onclick = (e) => {
        if(appMusic.isIcon === false){
            btnRandom.classList.add("icon-click");
            appMusic.isIcon = true;
        }else{
            btnRandom.classList.remove("icon-click");
            appMusic.isIcon = false;
        }
    }

    // xử lý khi click vao trái tim
    clickHeart.onclick = (e) => {
        if(appMusic.isHeart === false){
            e.target.style.color = "red";
            appMusic.isHeart = true;
        }else{
            e.target.style.color = "";
            appMusic.isHeart = false;
        }
    }
    
}

// lấy thời gian của bài hát
function runTimeSong() {
    const minute = (audio.duration / 60).toFixed();
    const date = new Date();
    const second = date.getSeconds();
    RunTime.innerHTML = "0" + minute + ":" + second;
}

// thời gian của bài hát
function timeDuration() {
    const minute = (audio.duration / 60).toFixed();
    const second = (audio.duration % 60).toFixed();
    const m = minute < 10 ? "0" + minute : minute;
    getTime.innerText = m + ":" + second;
    console.log(getTime.innerText)
}

// volum mặt định khi vào app
function defaultVolume() {
    audio.volume = 1;
    progressedSmall.style.width = progressedwrap.offsetWidth + "px";
}

function nextSong() {
    appMusic.currentIndex++;
    if(appMusic.currentIndex >= appMusic.song.length){
        appMusic.currentIndex = 0;
    }
    loadCurrentSong();
}
function backSong() {
    appMusic.currentIndex--;
    if(appMusic.currentIndex < 0){
        appMusic.currentIndex = appMusic.song.length - 1;
    }
    loadCurrentSong();
}

function start() {
    
    defineProperties();// đinh nghĩa bai hat hiện tại
    
    renderSong();// render các bài hát ra giao diện
    
    loadCurrentSong(); // load ra bài hát đầu tiên
    
    handleEventSong(); // xử lý các sự kiện

    defaultVolume(); // default volume 
}
start();