const childDivs = document.querySelectorAll('[class*="menu-child-div"]'), x = window.matchMedia("(min-width: 768px)"), signupLink = document.getElementById("signup"), login_logoutLink = document.getElementById("login_logout"), getCookie = e => { let c = e + "=", d = decodeURIComponent(document.cookie).split(";"); for (let b = 0; b < d.length; b++) { let a = d[b]; for (; " " == a.charAt(0);)a = a.substring(1); if (0 == a.indexOf(c)) return a.substring(c.length, a.length) } }; getCookie("token") ? (signupLink.remove(), login_logoutLink.href = "/auth/logout", login_logoutLink.innerText = "Log Out") : (login_logoutLink.href = "/auth/signin", login_logoutLink.innerText = "Sign In"), x.matches ? childDivs.forEach(a => { a.classList.remove("navbar-item-none") }) : childDivs.forEach(a => { a.classList.add("navbar-item-none") }); const resizedWindow = a => { a.matches ? childDivs.forEach(a => { a.classList.remove("navbar-item-none") }) : childDivs.forEach(a => { a.classList.add("navbar-item-none") }) }, openMenu = () => { childDivs.forEach(a => { a.classList.toggle("navbar-item-none") }) }; x.addEventListener("change", resizedWindow); const hamBtn = document.getElementById("hamburger-menu"); hamBtn.addEventListener("click", openMenu)