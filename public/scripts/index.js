const childDivs = document.querySelectorAll('[class*="menu-child-div"]');
const x = window.matchMedia("(min-width: 768px)");
const signupLink = document.getElementById('signup');
const login_logoutLink = document.getElementById('login_logout');

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