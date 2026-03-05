function cookieInit() {
    const cookieMessage = document.querySelector('[data-js="cookie"]');

    if(!cookieMessage) return

    const cookieBtn = cookieMessage.querySelector('[data-js="cookieBtn"]');
    const cookieName = 'cookie_policy'
    const cookieLifespan = 604800000

    let currentCookieValue = document.cookie.match(new RegExp("(?:^|; )" + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));

    if(currentCookieValue) {
        const lastAcept = parseInt(currentCookieValue[1])
        const now = new Date().getTime();

        if(now - lastAcept >= cookieLifespan) {
            cookieMessage.classList.add('active');
        } 

    } else {
        cookieMessage.classList.add('active');
    }

    cookieBtn.addEventListener('click', function () {
        const timestamp = new Date().getTime();
        document.cookie = `${cookieName}=${timestamp}; path=/`;
        cookieMessage.classList.remove('active');
    });
}