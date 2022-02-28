const loadLight = () => {
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.id = 'lightcss'
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'assets/css/style_light.css';
    head.appendChild(link);
}

const loadTheme = () => {
    let theme = window.localStorage.getItem('theme');
    if (theme && theme == "light") {
        loadLight();
    }
};

const changeTheme = () => {
    let theme = window.localStorage.getItem('theme');
    if (theme == "light") {
        let element = document.querySelector("#lightcss");
        element.parentNode.removeChild(element);
        window.localStorage.setItem('theme', 'dark');
    } else {
        loadLight();
        window.localStorage.setItem('theme', 'light');
    }
};

loadTheme();