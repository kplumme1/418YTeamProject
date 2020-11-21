function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function loadCall() {
    eraseCookie("username");
    eraseCookie("role");
    eraseCookie("token");
    alert("Logout complete! Redirecting...");
    window.location.href = "http://kplumme1-ec2.ddns.net:3000/";
}

const Logout = () => window.addEventListener('load', () => loadCall());

export default Logout