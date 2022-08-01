'use strict';
const data = JSON.parse(document.currentScript.getAttribute('data'));
const getCookie2 = (cname) => {
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

if (!getCookie2('loaded')) {
    const date = new Date();
    date.setTime(date.getTime() + (60 * 1000));
    // localStorage.setItem("data", document.currentScript.getAttribute('data'));
    document.cookie = `categories=${JSON.stringify(data.categories)};path=/`
    document.cookie = `skills=${JSON.stringify(data.skills)};path=/`
    document.cookie = `certs=${JSON.stringify(data.certs)};path=/`
    document.cookie = `loaded=true; expires=${date.toGMTString()};path=/`;
}
