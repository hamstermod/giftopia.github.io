import { DotLottie } from 'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web/+esm';
const giftParent = document.getElementById("giftParent");
const giftImgModal = document.getElementById("giftImgModal");
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
const profileGiftName = document.getElementById("profileGiftName");
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
const serverUrl = "https://servergiftopia-production.up.railway.app/";
let currentElementModal = {};
let transferDataId = 0;
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
if(!(userUIdata.error)){
    window.onload = () => {
        setTimeout(() => {
            loadingPage.classList.add("hide");
        }, 2000)
        const {photo_url, username, firstname} = userUIdata.user;
        userImg.src = photo_url;
        usernameElm.innerText = username || firstname;

        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact',
            compactDisplay: 'short'
        });
        let currentPage = "";


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
                // console.log(res)
                showToast((res.message || "Server Error: Unable to connect. Please try again later."), "error");
                return {error: true};
            }catch(e) {
                showToast("Server Error: Unable to connect. Please try again later.", "error");
                return {error: true};
            }
        }

        function openPage(page){
            if(currentPage === page){
                return;
            }
            currentPage = page;
            main.classList.add("hide");
            market.classList.add("hide");
            profile.classList.add("hide");
            mainPageButton.classList.remove("active");
            marketPageButton.classList.remove("active");
            profilePageButton.classList.remove("active");

            if(page === "main"){
                main.classList.remove("hide");
                mainPageButton.classList.add("active");
                return;
            }
            if(page === "market"){
                market.classList.remove("hide");
                marketPageButton.classList.add("active");
                return;
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
                }else{
                    giftImgModal.src = el.img;
                    giftCanvasModal.classList.add("hide");
                    giftImgModal.classList.remove("hide");
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
                card.className = `card ${el.status.toLowerCase()}`;
                card.onclick = () => openModal(el);
                const badge = document.createElement('div');
                badge.className = `rarity-badge right ${el.status.toLowerCase()}`;
                badge.textContent = el.status;
                card.appendChild(badge);

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
                    const characterImg = document.createElement('img');
                    characterImg.className = 'character';
                    characterImg.src = el.img;
                    characterImg.alt = 'Character';
                    card.appendChild(characterImg);
                }

                const price = document.createElement('div');
                price.className = 'price';

                const starImg = document.createElement('img');
                starImg.src = './images/star.svg';
                starImg.className = 'star';
                starImg.alt = 'Star';
                price.appendChild(starImg);

                price.appendChild(document.createTextNode(el.price));
                card.appendChild(price);
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
            renderGift();
            openPage('main');
        }
        marketPageButton.onclick = () => openPage('market');
        profilePageButton.onclick = () => {
            renderProfileGifts();
            openPage('profile');

        }


        function closeProfileGift(){
            profileGiftModal.classList.add('hide');
        }
        profileGiftCloseBtn.onclick = closeProfileGift;
        okBtn.onclick = closeProfileGift;
        let prevImg2 = "";
        function openModalProfile(el){
            currentElementModal = el;
            profileGiftModal.classList.remove('hide');
            mintedNftModalNumber.classList.add('hide');
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
                }else{
                    profileGiftImg.src = el.img;
                    profileGiftCanvas.classList.add("hide");
                    profileGiftImg.classList.remove("hide");
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
            giftProfileCard.className = `profileGiftCard  modal-content ${el.status.toLowerCase()}`;

            profileGiftPrice.innerText = el.price;
            profileGiftStatus.innerText = el.status;
            profileGiftAvilable.innerText = `${formatter.format(Math.max(el.limit - el.used, 0))} of ${formatter.format(el.limit)} left`;
            profileUserName.innerText = username || firstname;
        }

        async function renderProfileGifts(){
            const gifts = await doFetch("getUserGifts", "POST", {}, true);
            profileGifts.innerHTML = "";
            boughtCount.innerText = gifts.length;
            gifts.map((el) => {
                const card = document.createElement('div');
                card.className = `card ${el.status.toLowerCase()}`;
                card.onclick = () => openModalProfile(el);
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
                    const characterImg = document.createElement('img');
                    characterImg.className = 'character';
                    characterImg.src = el.img;
                    characterImg.alt = 'Character';
                    card.appendChild(characterImg);
                }



                const starImg = document.createElement('img');
                starImg.src = './images/star.svg';
                starImg.className = 'star';
                starImg.alt = 'Star';

                profileGifts.appendChild(card);

            })
        }
        renderProfileGifts();

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






// const upgradeCard = document.getElementById('upgradeCard');
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
            images.map((el) => {
                if(el.endsWith("png")) {
                    const img = document.createElement("img");
                    img.src = el;
                    upgradeNftImages.appendChild(img);
                } else{
                    const canvas = document.createElement("canvas");
                    new DotLottie({
                        autoplay: true,
                        loop: true,
                        canvas: canvas,
                        src: el,
                    });
                    upgradeNftImages.appendChild(canvas);
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
                // console.log(count)
                // console.log(upgradeNftImages.scrollWidth / images.length)
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
                        renderGift();
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
            if(currentElementModal.img.endsWith("png")){
                divGiftForTransfer.innerHTML = `<img src="${currentElementModal.img}" alt="${currentElementModal.name}"/>`;
            } else{
                const canvas = document.createElement("canvas");
                new DotLottie({
                    autoplay: true,
                    loop: true,
                    canvas: canvas,
                    src: currentElementModal.img,
                });
                divGiftForTransfer.appendChild(canvas);
            }
        }
        transferGiftButton.onclick = openModalTransfer;

    }
}

