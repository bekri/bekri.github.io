var typed = new Typed(".typing", {
    strings: ["Designer", "3D artist", "Digital artist", "Front-end developer", "Freelancer"],
    typeSpeed: 90,
    backSpeed: 50,
    loop: true
});
// owl carousel script
$('.carousel').owlCarousel({
    margin: 20,
    loop: true,
    autoplay: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    responsive: {
        0:{
            items: 1,
            nav: false
        },
        600:{
            items: 2,
            nav: false
        },
        1000:{
            items: 3,
            nav: false
        }
    }
});