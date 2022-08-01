'use strict';
const childDivs = document.querySelectorAll('[class*="menu-child-div"]');
const x = window.matchMedia("(min-width: 400px)");
const signupLink = document.getElementById('signup');
const login_logoutLink = document.getElementById('login_logout');
const media = document.currentScript.getAttribute('media');

if (media === 'none') {
    window.onload = () => {
        const cssList = document.styleSheets;
        const listLength = cssList.length;
        let listIterator = 0;
        for (listIterator; listIterator < listLength; listIterator++) {
            cssList[listIterator].media.mediaText = 'all';
        }
    }
}

const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

if (getCookie('token')) {
    signupLink.remove();
    login_logoutLink.href = "/auth/logout";
    login_logoutLink.innerText = 'Log Out';
} else {
    login_logoutLink.href = "/auth/signin";
    login_logoutLink.innerText = 'Sign In';
}

if (x.matches) {
    childDivs.forEach(div => {
        div.classList.remove("navbar-item-none")
    })
} else {
    childDivs.forEach(div => {
        div.classList.add("navbar-item-none")
    })
}

const resizedWindow = (x) => {
    if (x.matches) {
        childDivs.forEach(div => {
            div.classList.remove("navbar-item-none")
        })
    } else {
        childDivs.forEach(div => {
            div.classList.add("navbar-item-none")
        })
    }
}

const openMenu = () => {
    childDivs.forEach(div => {
        div.classList.toggle("navbar-item-none")
    })
}

x.addEventListener('change', resizedWindow);

const hamBtn = document.getElementById("hamburger-menu");
hamBtn.addEventListener('click', openMenu)