/* eslint-disable no-template-curly-in-string */
const status = document.currentScript.getAttribute('status');
const action = document.currentScript.getAttribute('action');
const user = JSON.parse(document.currentScript.getAttribute('user'));
const token = document.currentScript.getAttribute('token');

if (status === 'success') {
    if (action === 'signin') {
        document.cookie = `name=${user.name}; path=/`;
        document.cookie = `email=${user?.email}; path=/`;
        document.cookie = `token=${token}; path=/`;
        document.cookie = `role=${user?.role}; path=/`;
        window.location.href = "/";
    }
} else {
    if (action === 'logout') {
        document.cookie = "name=; expires='Thu, 01 Jan 1970 00:00:00 UTC'; path=/;";
        document.cookie = "email=; expires='Thu, 01 Jan 1970 00:00:00 UTC'; path=/;";
        document.cookie = "token=; expires='Thu, 01 Jan 1970 00:00:00 UTC'; path=/;";
        document.cookie = "role=; expires='Thu, 01 Jan 1970 00:00:00 UTC'; path=/;";
        window.location.href = "/";
    }
}