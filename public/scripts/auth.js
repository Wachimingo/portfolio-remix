/* eslint-disable no-template-curly-in-string */
const status = document.currentScript.getAttribute('status');
const action = document.currentScript.getAttribute('action');
if (status === 'success') {
    if (action === 'signin') {
        document.cookie = "name=${result?.user?.name}; path=/";
        document.cookie = "email=${result?.user?.email}; path=/";
        document.cookie = "token=${result?.token}; path=/";
        document.cookie = "role=${result?.user?.role}; path=/";
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