window.ScrollToSection = (id) => {
    document.querySelector(`#${id}`).scrollIntoView();
}

// animations on scroll into #about article

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;

    return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) *
        (percentageScroll / 100)
    );
};

const handleScrollAnimation = () => {
    document.querySelectorAll(".skillBar, #barContainer").forEach((el) => {
        if (elementInView(el, 95)) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
};

let throttleTimer = false;

const throttle = (callback, time) => {
    if (throttleTimer) return;

    throttleTimer = true;

    window.requestAnimationFrame(() => {
        setTimeout(() => {
            callback();
            throttleTimer = false;
        }, time);
    });
};

window.addEventListener("scroll", () => {
    window.requestAnimationFrame(() => throttle(handleScrollAnimation, 400));
});

// disable scrolling

let winX = -100;
let winY = -100;

window.addEventListener('scroll', function () {
    if (winX !== -100 && winY !== -100) {

        this.document.documentElement.scrollTop = winY;
        this.document.documentElement.scrollLeft = winX;
    }
});

const disableWindowScroll = () => {
    winX = window.scrollX;
    winY = window.scrollY;

    document.querySelector("html").classList.add("hideScroll");
    document.querySelector("body").classList.add("hideScroll");
}

const enableWindowScroll = () => {
    winX = -100;
    winY = -100;
    document.querySelector("html").classList.remove("hideScroll")
    document.querySelector("body").classList.remove("hideScroll")
}


// morphing - contact form

let morphing = null;

window.ShowForm = () => {
    morphing = anime({
        targets: ".morph",
        direction: "alternate",
        d: [
            {
                value: "M0,0V496.781s90.608-143.605,425.688-141.9c314.564-3.419,210.261,314.564,562.455,314.565s315.651-285.5,600.066-285.5,331.66,181.216,331.66,181.216V0Z",
            },
            {
                value: "M0,0V1079.819s94.027-1.71,429.107,0c227.375,3.418,211.971,0,564.164,0s340.379-1.709,569.293,0,357.3,0,357.3,0V0Z",
            },
        ],
        easing: "easeInOutQuint",
        duration: 1500,
        loop: false,
        autoplay: false,
    })

    document.querySelector("#contactMeBttn").classList.add("disabled")
    document.querySelector("#contactWrapper").classList.add("active");
    morphing.restart();
    morphing.finished.then(() => {
        document
            .querySelector("#contactWrapper > div")
            .classList.toggle("active");

        disableWindowScroll()
    });
}


window.BackToPage = () => {

    const contactWrapper = document.querySelector("#contactWrapper");
    document.querySelector("#contactWrapper > div").classList.remove("active");
    contactWrapper.style.pointerEvents = "none";
    morphing.reverse();

    morphing.play();
    morphing.finished.then(() => {
        contactWrapper.classList.remove("active");
        contactWrapper.style.pointerEvents = "all";
        document.querySelector("#contactMeBttn").classList.remove("disabled")

        enableWindowScroll()
    });
}

let toShowCount = 1;

const resolutions = [750, 992];

["resize", "load"].forEach((evt) => {
    window.addEventListener(evt, () => {
        if (window.innerWidth < resolutions[0]) toShowCount = 1;
        else if (
            window.innerWidth >= resolutions[0] &&
            window.innerWidth < resolutions[1]
        )
            toShowCount = 2;
        else toShowCount = 3;


        window.ToggleMoreBttn();
    });
});

window.GetToShowCount = () => {
    return toShowCount;
}

// on projectsContainer render check if number of projects is less than the number to show
window.ToggleMoreBttn = () => {
    const bttn = document.querySelector("#moreBttn");
    if (bttn != null) {
        if (document.querySelectorAll(".projectCard:not(.active)").length < 1 || document.querySelectorAll(".projectCard").length <= toShowCount)
            bttn.classList.add("disabled");
        else
            bttn.classList.remove("disabled");
    }

}




// nav

window.CallbackShowNavEndTransition = (obj) => {
    document.querySelector("nav").addEventListener("transitionend", async () => {
        await obj.invokeMethodAsync("ShowNavBttn");
    })
}

window.CallbackShowNavBttnEndTransition = (obj) => {
    document.querySelector("#showNavBttn").addEventListener("transitionend", async () => {
        await obj.invokeMethodAsync("ShowNavMenu");
    })
}

