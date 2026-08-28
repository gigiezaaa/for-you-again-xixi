/* ========================================
   ELEMENTS
======================================== */

const screen =
    document.getElementById("screen");

const starsContainer =
    document.getElementById("stars");

const title =
    document.getElementById("title");

const subtitle =
    document.getElementById("subtitle");

const content =
    document.getElementById("content");


/* ========================================
   MESSAGES
======================================== */

const messages = [

    {
        title: "Hola, Max.",
        subtitle: "tap anywhere ✦"
    },

    {
        title: "Yes, you.",
        subtitle: "who else would it be if not you?"
    },

    {
        title: "Finally, we meet again here.",
        subtitle: "but this time, it's different from the last time jeje"
    },

    {
        title: "I've been thinking about us.",
        subtitle: "and how much has changed since we met"
    },

    {
        title: "You brought sooo many changes into my life.",
        subtitle: "more than you probably realize fr."
    },

    {
        title: "I feel like you believe in yourself more now.",
        subtitle: "I don't knowww... maybe it's just me?"
    },

    {
        title: "But I've noticed it.",
        subtitle: "and I really think that's something you should be proud of."
    },

    {
        title: "Because I am.",
        subtitle: "Estoy muy orgulloso de ti."
    },

    {
        title: "I'm seriously not that good at putting my feelings into words.",
        subtitle: "but thank you for putting me so much effort for me."
    },

    {
        title: "I love when you send me things.",
        subtitle: "when you tell me about your day..."
    },

    {
        title: "Or randomly send me videos",
        subtitle: "you always somehow make me happy and laugh (especially the Fortnite one)"
    },

    {
        title: "I made this for you simply because i wanted to.",
        subtitle: "and I care about you (real no fake)."
    },

    {
        title: "And whenever you're feeling tired.",
        subtitle: "you can always come back here and look at this (if you want)."
    },

    {
        title: "Just keep being yourself, okay?",
        subtitle: "I know you can do it."
    },

    {
        title: "And please don't get tired of me...",
        subtitle: "for making things like this for you"
    },

    {
        title: "Good luck ya belajarnya.",
        subtitle: "hehe."
    },

    {
        title: "AND LAST THING.",
        subtitle: "I've actually been thinking about this a lot, ngl."
    },

    {
        title: "Wanna know why your name is Max?.",
        subtitle: "because you've literally maxed out my expectations."
    },

    {
        title: "JAJAJAJA.",
        subtitle: "baiiii guapo."
    },
];


/* ========================================
   STAR FORMATION
======================================== */

/*
   Instead of a heart,
   we're creating a large 5-point star.

   Each point is a final destination
   for one of our stars.
*/


const starPoints = [];


/* Number of stars */

const totalStars = 140;


/* Star geometry */

const outerRadius = 210;

const innerRadius = 90;


/*
   Center of the giant star
*/

const centerX = 50;
const centerY = 49;


/*
   Create the 10 points:
   outer → inner → outer → inner...
*/

for (let i = 0; i < 10; i++) {

    const angle =
        (-Math.PI / 2) +
        (i * Math.PI / 5);

    const radius =
        i % 2 === 0
            ? outerRadius
            : innerRadius;

    const x =
        Math.cos(angle) * radius;

    const y =
        Math.sin(angle) * radius;

    starPoints.push({
        x,
        y
    });

}


/* ========================================
   CREATE POINTS INSIDE THE STAR
======================================== */

/*
   We fill the star with stars.

   This makes the final shape feel
   like a glowing constellation.
*/


function generateStarFormation(count) {

    const points = [];

    for (let i = 0; i < count; i++) {

        /*
           Randomly select a point
           inside the star polygon.
        */

        let x;
        let y;

        let attempts = 0;

        do {

            x =
                (Math.random() * 2 - 1)
                * outerRadius;

            y =
                (Math.random() * 2 - 1)
                * outerRadius;

            attempts++;

        } while (
            !isInsideStar(x, y)
            && attempts < 100
        );


        points.push({

            x:
                centerX + x / 4.2,

            y:
                centerY + y / 4.2

        });

    }

    return points;
}


/* ========================================
   CHECK IF POINT IS INSIDE STAR
======================================== */

function isInsideStar(x, y) {

    const angle =
        Math.atan2(y, x);

    let distance =
        Math.sqrt(
            x * x +
            y * y
        );


    /*
       Find nearest star edge
    */

    const normalizedAngle =
        ((angle + Math.PI * 2)
            % (Math.PI * 2));


    const section =
        Math.floor(
            normalizedAngle /
            (Math.PI / 5)
        );


    const localAngle =
        normalizedAngle -
        section * (Math.PI / 5);


    const outer =
        outerRadius;

    const inner =
        innerRadius;


    /*
       Simple star boundary
    */

    const r1 =
        section % 2 === 0
            ? outer
            : inner;

    const r2 =
        section % 2 === 0
            ? inner
            : outer;


    const ratio =
        localAngle /
        (Math.PI / 5);


    const boundary =
        r1 +
        (r2 - r1) * ratio;


    return distance <= boundary;
}


/*
   Generate the final formation
*/

const finalPositions =
    generateStarFormation(totalStars);


/* ========================================
   STATE
======================================== */

let messageIndex = 0;

let starIndex = 0;

let finished = false;


/* ========================================
   CHANGE TEXT
======================================== */

function changeMessage(index) {

    content.classList.add("fade-out");


    setTimeout(() => {

        title.textContent =
            messages[index].title;

        subtitle.textContent =
            messages[index].subtitle;


        content.classList.remove("fade-out");

    }, 450);

}


/* ========================================
   CREATE A STAR
======================================== */

function createMovingStar(
    startX,
    startY,
    destination
) {

    const star =
        document.createElement("div");


    star.classList.add("star");


    /*
       Starting position
    */

    star.style.left =
        startX + "px";

    star.style.top =
        startY + "px";


    /*
       Add it to the page
    */

    starsContainer.appendChild(star);


    /*
       Make it appear first
    */

    requestAnimationFrame(() => {

        star.classList.add("appear");

    });


    /*
       Wait until it appears,
       then move it toward
       the final star.
    */

    setTimeout(() => {

        const rect =
            screen.getBoundingClientRect();


        const targetX =
            (destination.x / 100)
            * rect.width;

        const targetY =
            (destination.y / 100)
            * rect.height;


        /*
           Current location
        */

        const currentX =
            startX;

        const currentY =
            startY;


        /*
           Animate movement
        */

        star.animate(

            [

                {
                    left:
                        currentX + "px",

                    top:
                        currentY + "px"
                },

                {
                    left:
                        targetX + "px",

                    top:
                        targetY + "px"
                }

            ],

            {

                duration: 1800,

                easing:
                    "cubic-bezier(.2,.8,.2,1)",

                fill: "forwards"

            }

        );


        /*
           Start glowing after arriving
        */

        setTimeout(() => {

            star.classList.add("forming");

        }, 1800);


    }, 500);


    return star;
}


/* ========================================
   CLICK
======================================== */

screen.addEventListener(
    "click",
    (event) => {

        if (finished) {
            return;
        }


        /*
           Get next destination
        */

        const destination =
            finalPositions[starIndex];


        /*
           Create star at click
        */

        createMovingStar(

            event.clientX,

            event.clientY,

            destination

        );


        starIndex++;


        /*
           Change message
        */

        if (
            messageIndex <
            messages.length - 1
        ) {

            messageIndex++;

            changeMessage(
                messageIndex
            );

        }


        /*
           Once enough stars
           have appeared...
        */

        if (
            starIndex >=
            totalStars
        ) {

            finished = true;

            setTimeout(
                showFinalMessage,
                2200
            );

        }

    }
);


/* ========================================
   FINAL MESSAGE
======================================== */

function showFinalMessage() {

    content.classList.add(
        "fade-out"
    );


    setTimeout(() => {

        title.textContent =
            "maybe I don't say it as often as you do...";

        subtitle.textContent =
            "but I hope you know. ♡";


        content.classList.remove(
            "fade-out"
        );


        content.classList.add(
            "final-message"
        );


        /*
           Make every star glow stronger
        */

        const stars =
            document.querySelectorAll(
                ".star"
            );


        stars.forEach(star => {

            star.classList.add(
                "final-star"
            );

        });

    }, 800);

}