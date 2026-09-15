function checkVisibility() {
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const isVisible = rect.top < windowHeight && rect.bottom > 0;
        
        if (isVisible) {
            element.classList.add('reveal_active');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {
    options = {
        path: '/', 
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

const modal = document.getElementById('subscribe-modal');
const closeButton = modal.querySelector('.modal__close');

if (getCookie('modalClosed') !== 'true') {
    modal.classList.add('modal_active');
}

closeButton.addEventListener('click', () => {
    modal.classList.remove('modal_active');
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie('modalClosed', 'true', { expires: date });
});