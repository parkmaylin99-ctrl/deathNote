
// HEADER       

let scrollBefore = 0;
const header = document.querySelector('.header')

window.addEventListener('scroll', () => {
    const scrollAfter = window.pageYOffset;
    if (scrollAfter > scrollBefore && scrollAfter > 1) {
        header.classList.add('hide')
    } else {
        header.classList.remove('hide')
    }
    scrollBefore = scrollAfter
})