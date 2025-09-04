import { DotLottie } from 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm';
const giftParent = document.getElementById("giftParent");
const giftImgModal = document.getElementById("giftImgModal");
const giftVideoModal = document.getElementById("giftVideoModal");
const nftNameModal = document.getElementById("nftNameModal");
const giftBadgeModal = document.getElementById("giftBadgeModal");
const modalContent = document.getElementById("modalContent");
const statusGiftModal = document.getElementById("statusGiftModal");
const availabilityModalGift = document.getElementById("availabilityModalGift");
const priceNftModal= document.querySelectorAll(".priceNftModal");
const main = document.getElementById("main");
const market = document.getElementById("market");
const profile = document.getElementById("profile");
const mainPageButton = document.getElementById("mainPageButton");
const marketPageButton = document.getElementById("marketPageButton");
const profilePageButton = document.getElementById("profilePageButton");

const profileGiftCloseBtn = document.getElementById("profileGiftCloseBtn");
const okBtn = document.getElementById("okBtn");
const profileGiftModal = document.getElementById("profileGiftModal");
const profileGifts = document.getElementById("profileGifts");
const profileGiftImg = document.getElementById("profileGiftImg");
const profileGiftVideo = document.getElementById("profileGiftVideo");
const profileGiftName = document.getElementById("profileGiftName");
const emojiVideo = document.getElementById("emojiVideo");
const giftProfileCard = document.getElementById("giftProfileCard");
const profileGiftStatus = document.getElementById("profileGiftStatus");
const profileGiftPrice = document.getElementById("profileGiftPrice");
const profileGiftAvilable = document.getElementById("profileGiftAvilable");
const profileUserName = document.getElementById("profileUserName");
const giftCanvasModal = document.getElementById("giftCanvasModal");
const profileGiftCanvas = document.getElementById("profileGiftCanvas");
const mintedNftModalNumber = document.getElementById("mintedNftModalNumber");
const mintPEl = document.getElementById("mintPEl");
const mintDivEl = document.getElementById("mintDivEl");
const profileGiftModelDiv = document.getElementById("profileGiftModelDiv");
const profileGiftModelName = document.getElementById("profileGiftModelName");
const giftParentExpired = document.getElementById("giftParentExpired");
const expiredGiftH2 = document.getElementById("expiredGiftH2");
const buyGiftBtt = document.getElementById("buyGiftBtt");
const userImg = document.getElementById("userImg");
const usernameElm = document.getElementById("username");
const boughtCount = document.getElementById("boughtCount");
const loadingPage = document.getElementById("loadingPage");
const emojiImg = document.getElementById("emojiImg");
const emojiCanvas = document.getElementById("emojiCanvas");
const giftsUsersUsername = document.getElementById("giftsUsersUsername");
const giftsUsersItemName = document.getElementById("giftsUsersItemName");
const usersGiftNotification = document.getElementById("usersGiftNotification");
const userId = document.getElementById("userId");
const serverUrl = "http://localhost:3000/" && "https://servergiftopia-production.up.railway.app/";
const closeProfileAnotherUserView = document.getElementById("closeProfileAnotherUserView");
const shareProfile = document.getElementById("shareProfile");
const youHaveNotGiftText = document.getElementById("youHaveNotGiftText");
const leaderPageButton = document.getElementById("leaderPageButton");
const leader = document.getElementById("leader");
const noGift = document.getElementById("noGift");
const upgrade_modal_header = document.querySelector('#upgrade_modal_header');
let beforeProfile;
let currentElementModal = {};
let transferDataId = 0;
const blackModelsId = [3]
function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span><div class="close-btn">&times;</div>`;

    toast.querySelector('.close-btn').onclick = () => removeToast(toast);

    container.appendChild(toast);

    setTimeout(() => removeToast(toast), 3000);
}

function removeToast(toast) {
    toast.style.animation = 'fadeOut 0.4s forwards';
    setTimeout(() => toast.remove(), 400);
}
function parseQuery(query) {
    const params = new URLSearchParams(query);
    const result = {};

    for (const [key, value] of params.entries()) {
        result[key] = value;
    }

    if (result.user) {
        try {
            result.user = JSON.parse(decodeURIComponent(result.user));
        } catch (e) {
            showToast("ERROR USER INIT DATA", "error");
            return {error: true};
        }
    }

    return result;
}
const search = Telegram.WebApp.initData ;
const userUIdata = parseQuery(search);
let isMaintance = false;
if(isMaintance){
    document.getElementById("maintancePage").classList.remove("hide");
}

function settingVideo(videoTag) {
    videoTag.autoplay = true;
    videoTag.loop = true;
    videoTag.muted = true;
    videoTag.playsInline = true;
    videoTag.preload = 'auto';
    videoTag.controls = false;
    videoTag.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback nofullscreen");
    videoTag.setAttribute("webkit-playsinline", "true");

    videoTag.style.pointerEvents = "none";
    videoTag.oncontextmenu = e => e.preventDefault();

    videoTag.addEventListener("pause", () => {
        setTimeout(() => videoTag.play().catch(() => {}), 0);
    });

    videoTag.addEventListener("loadeddata", () => {
        videoTag.play().catch(() => {});
    });

    videoTag.addEventListener("canplay", () => {
        videoTag.play().catch(() => {});
    });
}

settingVideo(emojiVideo)
new DotLottie({
    autoplay: true,
    loop: true,
    canvas: document.getElementById('leader_trophy'),
    src: "./images/leader",
});
let userGiftsInterval;
async function doFetch(path, method, bodyReq = {}, init = false){
    try{
        let initdata = {};
        if(init){
            initdata = {initData: search};
        }
        const body = method === "GET" ? {} : {body: JSON.stringify({...bodyReq, ...initdata})};
        let res = await fetch(`${serverUrl}${path}`, {
            method: method,
            headers: { "Content-Type": "application/json" },
            ...body
        })

        if(res.status === 200){
            res = await res.json();
            return res;
        }
        res = await res.json();
        showToast((res.message || "Server Error: Unable to connect. Please try again later."), "error");
        return {error: true};
    }catch(e) {
        showToast("Server Error: Unable to connect. Please try again later.", "error");
        return {error: true};
    }
}
async function renderUserGifts(openModalGift){
    let i = 0;
    let dataArr = await doFetch("getUsersGifts", "GET");
    dataArr = dataArr.data || [];

    if(dataArr.length > 0){
        usersGiftNotification.classList.add("notification");
        let targ = dataArr[i];
        if(targ.img.endsWith("json")){
            new DotLottie({
                autoplay: true,
                loop: true,
                canvas: emojiCanvas,
                src: targ.img,
            });
            emojiCanvas.classList.remove("hide");
            emojiImg.classList.add("hide");
        } else{

            if(targ.img.endsWith(".webm")){
                emojiVideo.src = targ.img;

                emojiImg.classList.add("hide");
                emojiVideo.classList.remove("hide")
            }
            else{
                emojiImg.src = targ.img;
                emojiImg.classList.remove("hide");
                emojiVideo.classList.add("hide");
            }
            emojiCanvas.classList.add("hide");

        }
        giftsUsersUsername.innerText = targ.username || targ.firstname;
        giftsUsersItemName.innerText = targ.name;
        giftsUsersItemName.onclick = () => {
            openModalGift(targ, true, true);
        }
        i++;
        userGiftsInterval = setInterval(() => {

            targ = dataArr[i];
            if(targ.img.endsWith("json")){
                new DotLottie({
                    autoplay: true,
                    loop: true,
                    canvas: emojiCanvas,
                    src: targ.img,
                });
                emojiCanvas.classList.remove("hide");
                emojiImg.classList.add("hide");
            } else{
                if(targ.img.endsWith(".webm")){
                    emojiVideo.src = targ.img;

                    emojiImg.classList.add("hide");
                    emojiVideo.classList.remove("hide")
                }
                else{
                    emojiImg.src = targ.img;
                    emojiImg.classList.remove("hide");
                    emojiVideo.classList.add("hide");
                }
                emojiCanvas.classList.add("hide");
            }
            giftsUsersUsername.innerText = targ.username || targ.firstname;
            giftsUsersItemName.innerText = targ.name;
            i++;
            if(dataArr.length === i){
                i = 0;
            }

        }, 5000)
    }
}

if(!(userUIdata.error)){
    window.onload = async () => {
        async function renderLeader(){
            let DATA =  await doFetch("getTop20", "GET").then((el) => el.data);

            function el(tag, classes='', attrs={}){
                const e = document.createElement(tag);
                if(classes) e.className = classes;
                for(const k in attrs) e.setAttribute(k, attrs[k]);
                return e;
            }

            const players = DATA.map(p => ({
                name: p.username || p.firstname,
                xp: parseFloat(p.xp || 0),
                avatar: p.userImg || '',
                id: p.id
            })).sort((a,b) => b.xp - a.xp);

            const [first, second, third] = players;
            const others = players.slice(3);

            function createPodium(rank, player, sizeClass){
                const wrapper = el('div','leader_podBlock');
                const xp = el('div','leader_xp');
                xp.textContent = `${rank===1? '🥇': rank===2? '🥈':'🥉'} ${player.xp} XP`;
                wrapper.onclick = () => {
                    renderProfileGifts(true, player.id, "leader");
                }
                wrapper.appendChild(xp);

                const top = el('div','leader_podTop '+sizeClass);
                // subtle floating gradient inside
                const glow = el('div','leader_podGlow');
                top.appendChild(glow);

                const img = el('img','leader_avatar', { src: player.avatar, alt: player.name });
                top.appendChild(img);

                const name = el('div','leader_name');
                name.textContent = player.name;
                top.appendChild(name);

                wrapper.appendChild(top);

                // add entrance delay
                wrapper.classList.add('leader_animateIn');
                wrapper.style.animationDelay = (rank*0.08)+'s';

                // small parallax float via CSS animation on glow for variety
                glow.style.animation = `leader_glowFloat ${(5 + rank*1)}s ease-in-out infinite`;
                glow.style.transformOrigin = '50% 10%';

                return wrapper;
            }

            const podiumRoot = document.getElementById('leader_podium');
            podiumRoot.innerHTML = "";
            if(second) podiumRoot.appendChild(createPodium(2, second, 'leader_pod-2'));
            if(first)  podiumRoot.appendChild(createPodium(1, first,  'leader_pod-1'));
            if(third)  podiumRoot.appendChild(createPodium(3, third,  'leader_pod-3'));

            const styleSheet = document.createElement('style');
            styleSheet.innerHTML = `
      @keyframes leader_glowFloat {
        0% { transform: translateY(0) scale(1); opacity:0.14; }
        50% { transform: translateY(-8px) scale(1.03); opacity:0.22; }
        100% { transform: translateY(0) scale(1); opacity:0.14; }
      }
    `;
            document.head.appendChild(styleSheet);

            const listRoot = document.getElementById('leader_listWrap');
            listRoot.innerHTML = "";
            others.forEach((pl, idx) => {
                const row = el('div','leader_row');
                row.classList.add('leader_animateIn');
                row.style.animationDelay = (0.12 + idx*0.06) + 's';

                const left = el('div','leader_rowLeft');
                const index = el('div','leader_index');
                index.textContent = (idx+4) + '.';
                left.appendChild(index);

                const avat = el('img','leader_smallAvatar', { src: pl.avatar, alt: pl.name });
                left.appendChild(avat);

                const name = el('div','leader_rowName');
                name.textContent = pl.name;
                left.appendChild(name);

                const xp = el('div','leader_rowXP');
                xp.textContent = pl.xp + ' XP';

                row.appendChild(left);
                row.appendChild(xp);
                row.onclick = () => {
                    renderProfileGifts(true, pl.id, "leader")
                }
                listRoot.appendChild(row);
            });

            (function makeParticles(){
                const container = document.getElementById('leader_particles_container');
                const count = 18;
                for(let i=0;i<count;i++){
                    const node = el('div','leader_particle');
                    const size = Math.random()*6 + 3;
                    node.style.width = size + 'px';
                    node.style.height = size + 'px';
                    node.style.left = (Math.random()*100) + '%';
                    node.style.top  = (Math.random()*100) + '%';
                    node.style.animationDuration = (6 + Math.random()*6) + 's';
                    node.style.animationDelay = (Math.random()*3) + 's';
                    node.style.opacity = (0.12 + Math.random()*0.4);
                    container.appendChild(node);
                }
            })();

            document.querySelectorAll('#leader img').forEach(img=>{
                img.addEventListener('error', ()=> {
                    const p = img.parentElement;
                    const tmp = document.createElement('div');
                    tmp.className = img.className;
                    tmp.style.display = 'inline-flex';
                    tmp.style.alignItems = 'center';
                    tmp.style.justifyContent = 'center';
                    tmp.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))';
                    tmp.textContent = (img.alt || 'User').slice(0,2);
                    img.replaceWith(tmp);
                });
            });

            (function podiumTilt(){
                const wrap = document.getElementById('leader_podium');
                if(!wrap) return;
                wrap.addEventListener('mousemove', (e)=>{
                    const rect = wrap.getBoundingClientRect();
                    const cx = rect.left + rect.width/2;
                    const cy = rect.top + rect.height/2;
                    const dx = (e.clientX - cx) / rect.width;
                    const dy = (e.clientY - cy) / rect.height;
                    wrap.style.transform = `perspective(800px) rotateX(${(-dy*3).toFixed(2)}deg) rotateY(${(dx*4).toFixed(2)}deg)`;
                });
                wrap.addEventListener('mouseleave', ()=> wrap.style.transform = 'none');
            })();
        }
        renderLeader();
        async function getInfoGiftOrProfile(){

            if(userUIdata.start_param){
                const startParam = userUIdata.start_param;
                if(startParam.startsWith("gift")){
                    const dataGet = await doFetch("getInfoAbout", "POST", {
                        info: "gift",
                        id: startParam.split("gift_")[1]
                    })
                    if(dataGet.ok && dataGet.data){
                        openModalProfile(dataGet.data, true)
                    } else{

                    }
                }
                if(startParam.startsWith("profile")){
                    renderProfileGifts(true, startParam.split("profile_")[1])
                }
                console.log("start with " +  userUIdata.start_param)
            }
        }

        setTimeout(() => {
            loadingPage.classList.add("hide");
            getInfoGiftOrProfile();
        }, 2000)
        // console.log(userUIdata)
        // openModalProfile({})

        // console.log(dataGet)

        const {photo_url, username, firstname} = userUIdata.user;

        function renderProfileInfo(isNotMyProfile, data){
            userId.innerText = isNotMyProfile ? data.id : userUIdata.user.id;
            userId.onclick = async () => {
                try {
                    await navigator.clipboard.writeText(`https://t.me/Giftopia_bot/Giftopia?startapp=profile_${(isNotMyProfile ? data.id : userUIdata.user.id)}`);
                    showToast("Successfully copied!", "success");
                } catch (err) {
                    showToast("Error copied!", "error");
                }
            }
            shareProfile.onclick = () => {
                const textToShare = encodeURIComponent(`👤 Check out this awesome Giftopia profile!\nClick here to view it:  https://t.me/Giftopia_bot/Giftopia?startapp=profile_${(isNotMyProfile ? data.id : userUIdata.user.id)}`);
                const shareLink = `https://t.me/share/url?url=&text=${textToShare}`;
                Telegram.WebApp.openTelegramLink(shareLink);
            }
            userImg.src = isNotMyProfile ? (data.userImg || "https://raw.githubusercontent.com/hamstermod/giftopia.github.io/refs/heads/main/images/giftopiaDefaultImage.png") : photo_url;
            usernameElm.innerText = isNotMyProfile ? (data.username || data.firstname) : (username || firstname);
        }
        renderProfileInfo();

        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short'
        });
        let currentPage = "";




        function openPage(page){
            if(currentPage === page){
                return;
            }
            currentPage = page;
            main.classList.add("hide");
            market.classList.add("hide");
            profile.classList.add("hide");
            leader.classList.add("hide")
            mainPageButton.classList.remove("active");
            marketPageButton.classList.remove("active");
            profilePageButton.classList.remove("active");
            leaderPageButton.classList.remove("active");

            if(page === "main"){
                renderGift();
                main.classList.remove("hide");
                mainPageButton.classList.add("active");
                usersGiftNotification.classList.remove("hideVis");

                return;
            }
            usersGiftNotification.classList.add("hideVis");

            if(page === "market"){
                market.classList.remove("hide");
                marketPageButton.classList.add("active");
                return;
            }
            if(page === "leader"){
                leader.classList.remove("hide");
                leaderPageButton.classList.add("active");
                renderLeader();
                return;
            }
            if(page === "profile"){
                setUserXP();
                renderProfileGifts();
            }
            profile.classList.remove("hide");
            profilePageButton.classList.add("active");

        }
        openPage("main");
        document.getElementById("closeModal").onclick = function () {
            closeModal()
        };

        function partyEffect(){
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    y: 0.6
                }
            });
        }

        document.getElementById("giftModal").onclick = function (e) {
            if (e.target.id === "giftModal") {
                closeModal()
            }
        };
        let prevImg = "";
        function openModal(el) {
            document.getElementById('giftModal').style.display = 'flex';
            if(el.limit - el.used <= 0){
                buyGiftBtt.classList.add("hide");
            } else{
                buyGiftBtt.classList.remove("hide");
            }
            if(prevImg !== el.img){
                if(el.img.endsWith(".json")){
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: giftCanvasModal,
                        src: el.img,
                    });
                    giftCanvasModal.classList.remove("hide");
                    giftImgModal.classList.add("hide");
                    giftVideoModal.classList.add("hide");
                }else{
                    if(el.img.endsWith(".webm")){
                        giftVideoModal.src = el.img;
                        settingVideo(giftVideoModal)
                        giftImgModal.classList.add("hide");
                        giftVideoModal.classList.remove("hide");
                    }
                    else{
                        giftImgModal.src = el.img;
                        giftImgModal.classList.remove("hide");
                        giftVideoModal.classList.add("hide");
                    }
                    giftCanvasModal.classList.add("hide");

                }
            }
            prevImg = el.img;

            nftNameModal.innerText = el.name;
            giftBadgeModal.innerText = el.status;
            giftBadgeModal.className = `rarity-badge left ${el.status.toLowerCase()}`;
            modalContent.className = `modal-content ${el.status.toLowerCase()}`;
            priceNftModal.forEach(((e) => {
                e.innerText = el.price;
            }));
            statusGiftModal.innerText = el.status;
            availabilityModalGift.innerText = `${formatter.format(Math.max(el.limit - el.used, 0))} of ${formatter.format(el.limit)} left`;
            buyGiftBtt.onclick = async () => {
                const res = await doFetch("buyGift", "POST", {id: el.id}, true);
                if(res.invoice){
                    Telegram.WebApp.openInvoice(res.invoice, async (e) => {
                        if(e === "paid"){
                            showToast("Success", "success");
                            closeModal();
                            renderGift();
                        } else{
                            showToast("Payment Error", "error");
                        }
                    });
                }
            }
        }

        function closeModal() {
            document.getElementById('giftModal').style.display = 'none';
        }

        async function renderGift(){
            const gifts = await doFetch("getGiftsMainMarket", "GET");
            if(gifts.error){
                return;
            }

            giftParent.innerHTML = "";
            giftParentExpired.innerHTML = "";
            expiredGiftH2.classList.add("hide");
            gifts.map((el) => {
                const giftIsEnded = el.limit - el.used <= 0;
                const card = document.createElement('div');
                const card2 = document.createElement('div');
                card2.className = `card ${el.status.toLowerCase()}`;
                card2.onclick = () => openModal(el);
                if(el.releaseDate){
                    card2.style.filter = "brightness(0.5)";
                    card2.onclick = () => {};
                    const p = document.createElement("p");
                    let secondTimout = new Date(el.releaseDate) - new Date();
                    let seconds = Math.floor(secondTimout / 1000);
                    let minutes = Math.floor(seconds / 60);
                    let hours = Math.floor(minutes / 60);
                    let days = Math.floor(hours / 24);
                    const spanDay = document.createElement("span");
                    const spanHour = document.createElement("span");
                    const spanMinutes = document.createElement("span");
                    seconds %= 60;
                    hours %= 24;
                    minutes %= 60;
                    spanDay.innerText = days;
                    spanHour.innerText = hours;
                    spanMinutes.innerText = minutes;
                    const dayText = document.createElement("span");
                    const hourText = document.createElement("span");
                    const minutesText = document.createElement("span");
                    dayText.innerText = "D ";
                    hourText.innerText = "H ";
                    minutesText.innerText = "M ";
                    p.appendChild(spanDay);
                    p.appendChild(dayText);
                    p.appendChild(spanHour);
                    p.appendChild(hourText);
                    p.appendChild(spanMinutes);
                    p.appendChild(minutesText);
                    p.className = "countDownCardPtext";
                    card.appendChild(p);
                }
                const badge = document.createElement('div');
                badge.className = `rarity-badge right ${el.status.toLowerCase()}`;
                badge.textContent = el.status;
                card2.appendChild(badge);

                if(el.img.endsWith(".json")){
                    const canvas = document.createElement('canvas');
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: canvas,
                        src: el.img,
                    });
                    canvas.style.width = "285px";
                    card2.appendChild(canvas);
                }else{
                    if(el.img.endsWith("webm")){
                        const characterVideo = document.createElement('video');
                        characterVideo.className = 'character';
                        characterVideo.src = el.img;
                        characterVideo.alt = 'Character';
                        settingVideo(characterVideo)
                        card2.appendChild(characterVideo);
                    }
                    else{
                        const characterImg = document.createElement('img');
                        characterImg.className = 'character';
                        characterImg.src = el.img;
                        characterImg.alt = 'Character';
                        card2.appendChild(characterImg);
                    }
                }

                const price = document.createElement('div');
                price.className = 'price';

                const starImg = document.createElement('img');
                starImg.src = './images/star.svg';
                starImg.className = 'star';
                starImg.alt = 'Star';
                price.appendChild(starImg);

                price.appendChild(document.createTextNode(el.price));
                card2.appendChild(price);
                card.appendChild(card2);
                if(giftIsEnded){
                    giftParentExpired.appendChild(card);
                    expiredGiftH2.classList.remove("hide");
                }
                else{
                    giftParent.appendChild(card);
                }

            })
        }
        renderGift();
        mainPageButton.onclick = () => {

            openPage('main');
        }
        marketPageButton.onclick = () => openPage('market');
        profilePageButton.onclick = () => {
            openPage('profile');
        }
        leaderPageButton.onclick = () => {
            openPage('leader');
        }


        function closeProfileGift(){
            profileGiftModal.classList.add('hide');
        }
        profileGiftCloseBtn.onclick = closeProfileGift;
        okBtn.onclick = () => {
            closeProfileGift();
        };
        const shareGiftButton = document.getElementById('shareGiftButton');
        const menu = document.getElementById('menu');
        const copyLinkGift = document.getElementById('copyLinkGift');
        shareGiftButton.onclick = () => {
            const textToShare = encodeURIComponent(`🎁 Check out this awesome Giftopia gift!\nClick here to view it: https://t.me/Giftopia_bot/Giftopia?startapp=gift_${currentElementModal.giftId}`);
            menu.classList.add("hide");
            const shareLink = `https://t.me/share/url?url=&text=${textToShare}`;
            Telegram.WebApp.openTelegramLink(shareLink);
        }
        copyLinkGift.onclick = () => {
            menu.classList.add("hide");
            navigator.clipboard.writeText(`https://t.me/Giftopia_bot/Giftopia?startapp=gift_${currentElementModal.giftId}`)
                .then(() => {
                    showToast("✅ Gift link copied to clipboard!", "success");
                })
                .catch(err => {
                    showToast("❌ Failed to copy gift link.", "error");
                });

        }
        let prevImg2 = "";
        const profileButtonsUpgrade = document.getElementById("profileButtonsUpgrade");

        function openModalProfile(el, hideGiftSetting = false, canOpenGiftOwner = true, userInfo = {}){
            currentElementModal = el;
            profileGiftModal.classList.remove('hide');
            mintedNftModalNumber.classList.add('hide');
            if(hideGiftSetting){
                profileButtonsUpgrade.classList.add('hide');
            } else{
                profileButtonsUpgrade.classList.remove('hide');
            }
            if(prevImg2 !== el.img){
                if(el.img.endsWith(".json")){
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: profileGiftCanvas,
                        src: el.img,
                    });
                    profileGiftCanvas.classList.remove("hide");
                    profileGiftImg.classList.add("hide");
                    profileGiftVideo.classList.add("hide")
                }else{
                    if(el.img.endsWith("webm")){
                        profileGiftVideo.src = el.img;
                        profileGiftVideo.alt = 'Character';
                        settingVideo(profileGiftVideo)
                        profileGiftImg.classList.add("hide");
                        profileGiftVideo.classList.remove("hide")
                    }
                    else{
                        profileGiftImg.src = el.img;

                        profileGiftImg.classList.remove("hide");
                        profileGiftVideo.classList.add("hide")
                    }
                    profileGiftCanvas.classList.add("hide");
                }
            }


            prevImg2 = el.img;
            if(el.minted){
                mintedNftModalNumber.innerText = '#' + el.mintedNftNumber;
                mintedNftModalNumber.classList.remove('hide');
                mintPEl.innerText = "Minted";
                mintDivEl.classList.add('disable');
                profileGiftModelDiv.classList.remove('hide');
                profileGiftModelName.innerText = el.mintedNftModel || "???";
            } else{
                profileGiftModelDiv.classList.add('hide');
                mintPEl.innerText = "Mint";
                if(el.mintable){
                    mintDivEl.classList.remove('disable');
                }else{
                    mintDivEl.classList.add('disable');
                }
            }
            profileGiftName.innerText = el.name;
            giftBadgeModal.innerText = el.status;
            giftProfileCard.className = `profileGiftCard  modal-content ${el.status?.toLowerCase()} ${el.minted ? (blackModelsId.includes(currentElementModal.idGift) ? "blackBG" : "") : ""}`;

            profileGiftPrice.innerText = el.price;
            profileGiftStatus.innerText = el.status;
            profileGiftAvilable.innerText = `${formatter.format(Math.max(el.limit - el.used, 0))} of ${formatter.format(el.limit)} left`;
            console.log(el)
            profileUserName.innerText = el.username || el.firstname || userInfo.username || userInfo.firstname || username || firstname;
            if(canOpenGiftOwner && el.userId && el.userId != userUIdata.user.id){
                profileUserName.onclick = () => {
                    closeProfileGift();
                    renderProfileGifts(true, el.userId);

                }
            } else{
                profileUserName.onclick = () => {};
            }
        }
        renderUserGifts(openModalProfile);
        const menuButton = document.getElementById('menuButton');

        function toggleMenu() {
            menu.classList.toggle('hide');
        }
        menuButton.onclick = toggleMenu;
        closeProfileAnotherUserView.onclick = () => {
            profile.classList.add("hide");
            if(beforeProfile === "leader"){
                leader.classList.remove("hide");
            }
           else{
                main.classList.remove("hide")
            }
        }
        window.addEventListener("click", function(e) {
            if (!e.target.closest(".menu-container")) {
                menu.classList.add("hide")
            }
        });

        async function renderProfileGifts(findingUserProfile, profileId, originPage = "main"){
            leader.classList.add("hide");
            beforeProfile = originPage;
            let userInfoForView = findingUserProfile ?  await doFetch("getUserViewerInfo", "POST", {id: profileId}) : {};
            if(!findingUserProfile){
                renderProfileInfo();
                closeProfileAnotherUserView.classList.add("hide");
            } else{
                if(userInfoForView.error){
                    return;
                }
                setUserXP(profileId);
                profile.classList.remove("hide");
                renderProfileInfo(true, userInfoForView)
                closeProfileAnotherUserView.classList.remove("hide");
                main.classList.add("hide")
            }

            const gifts = !findingUserProfile ? await doFetch("getUserGifts", "POST", {}, true) : [];
            profileGifts.innerHTML = "";
            boughtCount.innerText = findingUserProfile ? userInfoForView.gifts.length : gifts.length;
            if(findingUserProfile ? (userInfoForView.gifts.length === 0) : (gifts.length === 0)){
                noGift.classList.remove("hide");
                if(findingUserProfile){
                    youHaveNotGiftText.classList.add("hide")
                } else{
                    youHaveNotGiftText.classList.remove("hide")
                }
            } else{
                noGift.classList.add("hide");
            }
            if(findingUserProfile){
                userInfoForView.gifts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            }
            (findingUserProfile ? userInfoForView.gifts :  gifts).map((el) => {
                const card = document.createElement('div');
                card.className = `card ${el.status.toLowerCase()} ${el.minted ? (blackModelsId.includes(el.idGift) ? "blackBG" : "") : ""}`;
                card.onclick = () => openModalProfile(el, findingUserProfile, false, userInfoForView);
                const badge = document.createElement('div');
                badge.className = `rarity-badge right ${el.status.toLowerCase()}`;
                badge.textContent = el.status;
                card.appendChild(badge);
                if(el.minted){
                    const numNFT = document.createElement('div');
                    numNFT.className = `rarity-badge left legendary`;
                    numNFT.textContent = `#${el.mintedNftNumber}`;
                    card.appendChild(numNFT);
                }

                if(el.img.endsWith(".json")){
                    const canvas = document.createElement('canvas');
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: canvas,
                        src: el.img,
                    });
                    canvas.style.width = "285px";
                    card.appendChild(canvas);
                }else{
                    if(el.img.endsWith("webm")){
                        const characterVideo = document.createElement('video');
                        characterVideo.className = 'character';
                        characterVideo.src = el.img;
                        characterVideo.alt = 'Character';
                        settingVideo(characterVideo)
                        card.appendChild(characterVideo);
                    }
                    else{
                        const characterImg = document.createElement('img');
                        characterImg.className = 'character';
                        characterImg.src = el.img;
                        characterImg.alt = 'Character';
                        card.appendChild(characterImg);
                    }
                }



                const starImg = document.createElement('img');
                starImg.src = './images/star.svg';
                starImg.className = 'star';
                starImg.alt = 'Star';

                profileGifts.appendChild(card);

            })
        }
        // renderProfileGifts();

        new DotLottie({
            autoplay: true,
            loop: true,
            canvas: document.getElementById('lottieMarket'),
            src: "./images/market",
        });
        new DotLottie({
            autoplay: true,
            loop: true,
            canvas: document.getElementById('nogiftCanvas'),
            src: "./images/nogift",
        });







        const upgradeOverlay = document.getElementById('upgradeOverlay');
        const upgradeBackdrop = document.getElementById('upgradeBackdrop');
        const upgradeClose = document.getElementById('upgradeClose');
        const upgradeNftImages = document.getElementById('upgradeNftImages');

        let intervalUpgrade;

        async function openUpgradeModal(){

            let requestImages = await doFetch("getGiftMintData", "POST", {id: currentElementModal.idGift});
            requestImages = requestImages.map((e) => e.imageUrl);
            const images = [currentElementModal.img, ...requestImages]
            let html = document.createElement("div");
            let count = 0;
            upgradeNftImages.innerHTML = '';
            if(blackModelsId.includes(currentElementModal.idGift)){
                upgrade_modal_header.classList.add("blackBG");
            } else{
                upgrade_modal_header.classList.remove("blackBG");
            }
            images.map((el) => {
                if(el.endsWith("json")) {
                    const canvas = document.createElement("canvas");
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: canvas,
                        src: el,
                    });
                    upgradeNftImages.appendChild(canvas);
                } else{
                    const img = document.createElement("img");
                    img.src = el;
                    upgradeNftImages.appendChild(img);
                }
            })


            upgradeNftImages.style.transform = "translateX(0)";

            intervalUpgrade = setInterval(() => {
                if(count > images.length-1){
                    count = 0;
                    upgradeNftImages.style.transform = "translateX(0)";
                }
                else{
                    upgradeNftImages.style.transform = `translateX(-${count * (upgradeNftImages.scrollWidth / images.length)}px)`;
                }
                count++;
            }, 1500)
            upgradeOverlay.classList.add('upgrade-open');
            upgradeOverlay.setAttribute('aria-hidden','false');
            // upgradePage.classList.add('upgrade-blurred');
            upgradeBuy.focus();
        }

        function closeUpgradeModal(){
            upgradeOverlay.classList.remove('upgrade-open');
            upgradeOverlay.setAttribute('aria-hidden','true');
            // upgradePage.classList.remove('upgrade-blurred');
            clearInterval(intervalUpgrade)
        }

        upgradeClose.addEventListener('click', closeUpgradeModal);
        upgradeBackdrop.addEventListener('click', closeUpgradeModal);

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeUpgradeModal();
        });

        upgradeOverlay.addEventListener('click', (ev) => {
            if (ev.target === upgradeOverlay) closeUpgradeModal();
        });

        upgradeBuy.addEventListener('click', async (e) => {
            const btn = e.currentTarget;
            btn.disabled = true;
            const original = btn.textContent;
            btn.textContent = 'Loading ...';
            const res = await doFetch("upgradeGift", "POST", {id: currentElementModal.giftId}, true);
            if(res.invoice){
                Telegram.WebApp.openInvoice(res.invoice, async (e) => {
                    if(e === "paid"){
                        showToast("Success", "success");
                        closeProfileGift();
                        partyEffect();
                        setTimeout(() => {
                            renderProfileGifts();
                            setUserXP();
                        }, 1000)
                    } else{
                        showToast("Payment Error", "error");
                    }
                    setTimeout(() => {
                        btn.textContent = original;
                        btn.disabled = false;
                        closeUpgradeModal();
                    }, 700);
                });
            }
            // const withName = document.getElementById('upgradeWithName').checked;

            // btn.textContent = 'Upgrade ★25';

        });
        mintDivEl.onclick = () => {
            if(mintDivEl.classList.contains('disable')){
                return;
            }
            openUpgradeModal();
        }


        const input = document.getElementById('transferUsernameInput');
        const sendBtn = document.getElementById('transferSendBtn');
        const closeBtn = document.getElementById('transferCloseBtn');
        const blur = document.getElementById('transferBlur');
        const modal = document.getElementById('transferModal');
        const transferGiftButton = document.getElementById('transferGiftButton');
        const divGiftForTransfer = document.getElementById('divGiftForTransfer');
        const transferGiftName = document.getElementById('transferGiftName');


        let typingTimer;
        const delay = 1000;

        input.addEventListener('input', () => {
            clearTimeout(typingTimer);

            const value = input.value.trim();

            if (!value) {
                sendBtn.innerText = "Send for ★ 25";
                sendBtn.disabled = true;
                return;
            }

            sendBtn.innerText = "Loading...";
            sendBtn.disabled = true;

            typingTimer = setTimeout(async () => {
                try {
                    const data = value == +value ? +value : value.replaceAll("@", "");

                    const res = await doFetch("searchUser", "POST", {data: data});
                    if(res.data){
                        sendBtn.disabled = false;
                        transferDataId = res.data.id;
                    } else{
                        sendBtn.disabled = true;
                    }
                    sendBtn.innerText = "Send for ★ 25";


                } catch (err) {
                    sendBtn.innerText = "Send for ★ 25";
                    sendBtn.disabled = true;
                }
            }, delay);
        });
        closeBtn.addEventListener('click', closeModalTransfer);

        blur.addEventListener('click', closeModalTransfer);

        sendBtn.addEventListener('click', async () => {
            const res = await doFetch("sendGift", "POST", {giftId: currentElementModal.giftId, id: +transferDataId}, true);
            if(res.invoice){
                Telegram.WebApp.openInvoice(res.invoice, async (e) => {
                    if(e === "paid"){
                        showToast("Success", "success");
                        closeModal();
                        renderProfileGifts();
                        closeModalTransfer();
                        closeProfileGift();

                    } else{
                        showToast("Payment Error", "error");
                    }
                });
            }
        });

        function closeModalTransfer() {
            modal.classList.add('hide');
            blur.classList.add('hide');
        }
        function openModalTransfer(){
            modal.classList.remove('hide');
            blur.classList.remove('hide');
            divGiftForTransfer.innerHTML = "";
            transferGiftName.innerText = currentElementModal.name;
            if(currentElementModal.img.endsWith("json")){
                const canvas = document.createElement("canvas");
                new DotLottie({
                    autoplay: true,
                    loop: true,
                    canvas: canvas,
                    src: currentElementModal.img,
                });
                divGiftForTransfer.appendChild(canvas);

            } else{
                divGiftForTransfer.innerHTML = `<img src="${currentElementModal.img}" alt="${currentElementModal.name}"/>`;
            }
        }
        transferGiftButton.onclick = openModalTransfer;
        const rating_card = document.getElementById('rating_card');
        const ratingBlurEffect = document.getElementById('ratingBlurEffect');
        const rating_btn = document.getElementById('rating_btn');
        const ratingTextProgress = document.getElementById('ratingTextProgress');
        const fillProgress = document.getElementById('fillProgress');
        const textProcentGo = document.getElementById('textProcentGo');
        const getWidthProgressElm = document.getElementById('getWidthProgressElm');
        const levelUser = document.getElementById('levelUser');
        const maxLevel = 100;
        function openModalRating(min, max, xp, levelUser){
            rating_card.classList.remove('hide');
            ratingBlurEffect.classList.remove('hide');

            let procent = 100 * (xp - min) / (max - min);
            if(levelUser >= maxLevel){
                nextLevelText.innerText = "";
                procent = 100;
                ratingTextProgress.innerText = xp;
            }
            else{
                nextLevelText.innerText = `Level ${levelUser+1}`;
                ratingTextProgress.innerText = `${xp} / ${max}`;
            }
            const maxWidth = getWidthProgressElm.offsetWidth;
            const pxWidth = maxWidth * procent / 100;
            const pxWidthProcentGo = textProcentGo.offsetWidth;
            textProcentGo.classList.add("animateRatingProgressLabel");
            currentLevelText.innerText = `Level ${levelUser}`;

            if(pxWidth < (pxWidthProcentGo / 2)){
                fillProgress.style.width = `${pxWidthProcentGo/2}px`
                textProcentGo.style.left = `${pxWidthProcentGo/2}px`
                return;
            }
            if(pxWidth + (pxWidthProcentGo / 2) > maxWidth){
                fillProgress.style.width = `${maxWidth - pxWidthProcentGo/2}px`
                textProcentGo.style.left = `${maxWidth - pxWidthProcentGo/2}px`
                return;
            }
            // console.dir(textProcentGo.offsetWidth);
            // console.log(getWidthProgressElm.offsetWidth)
            if (procent < 0) procent = 0;
            if (procent > 100) procent = 100;
            fillProgress.style.width = `${procent}%`
            textProcentGo.style.left = `${procent}%`
        }
        async function setUserXP(id) {
            try{
                id = id || userUIdata.user.id;
                const data = await doFetch("getUserXP", "POST", {id: id} );
                if(data.error){
                    return;
                }
                const {previousLevelXp, nextLevelXp, xp, level} = data;
                levelUser.style.backgroundImage = `url("https://raw.githubusercontent.com/hamstermod/giftopiaImages/refs/heads/main/levelsImages/level${level}.png")`
                levelUser.onclick = () => {
                    openModalRating(previousLevelXp, nextLevelXp, +xp, level);
                }
            }
            catch(e){
                console.log(e);
                showToast("SERVER ERROR", "error");
            }
        }
        setUserXP();
        function closeModalRating(){
            rating_card.classList.add('hide');
            ratingBlurEffect.classList.add('hide');
            fillProgress.style.width = "0px";
            textProcentGo.style.left = "0px";
            textProcentGo.classList.remove("animateRatingProgressLabel");
        }
        ratingBlurEffect.onclick = closeModalRating;
        rating_btn.onclick = closeModalRating;
    }
}