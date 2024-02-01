const header = document.querySelector('header');
const main = document.querySelector('#content');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    if (window.scrollY > lastScroll) {
        header.classList.add('scroll');
        console.log("scrolling down");

        if (window.scrollY < main.offsetTop) {
            this.window.scrollTo(0, main.offsetTop);
        }
    }
    else {
        header.classList.remove('scroll');
        console.log("scrolling up");

        if (window.scrollY < main.offsetTop) {
            this.window.scrollTo(0, 0);
        }
    }
    lastScroll = window.scrollY;
    
    

})