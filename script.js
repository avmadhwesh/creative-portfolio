document.addEventListener("DOMContentLoaded", () => {
    // Make sure name appears immediately
    const nameTitle = document.getElementById("name-title");
    nameTitle.style.opacity = "1";

    // === SPLIT-FLAP ANIMATION ===
    // Speed in seconds
    let speed = 0.07;

    // Define words for each row
    const line1Begin = "EJG3848q9ghr".toUpperCase().split("");
    const line1End   = "TECHNOLOGIST".toUpperCase().split("");

    const line2Begin = "rhg848t05".toUpperCase().split("");
    const line2End   = "SCIENTIST".toUpperCase().split("");

    const line3Begin = "vdfiuh3".toUpperCase().split("");
    const line3End   = "CREATOR".toUpperCase().split("");

    // Set up each line of the flipboard
    setupFlapLine("row1", line1Begin, line1End);
    setupFlapLine("row2", line2Begin, line2End);
    setupFlapLine("row3", line3Begin, line3End);

    function setupFlapLine(lineId, beginArr, endArr) {
        // Determine number of flaps needed
        let amountOfFlaps = (beginArr.length >= endArr.length)
            ? beginArr.length
            : endArr.length;

        // Build the flaps in HTML
        let container = document.getElementById(lineId);
        let html = "";
        for (let x = 0; x < amountOfFlaps; x++) {
            html += `
                <div class="splitflap">
                    <div class="top"></div>
                    <div class="bottom"></div>
                    <div class="nextHalf"></div>
                    <div class="nextFull"></div>
                </div>`;
        }
        container.innerHTML = html;

        // Get all the elements
        let a1 = container.querySelectorAll(".top");
        let a2 = container.querySelectorAll(".bottom");
        let b1 = container.querySelectorAll(".nextFull");
        let b2 = container.querySelectorAll(".nextHalf");

        // Set animation speeds
        for (let i = 0; i < a1.length; i++) {
            a2[i].style.animationDuration = speed + "s";
            b2[i].style.animationDuration = speed + "s";
        }

        // Pad arrays with spaces if needed
        if (beginArr.length < amountOfFlaps) {
            for (let i = beginArr.length; i < amountOfFlaps; i++) {
                beginArr.push(" ");
            }
        }
        if (endArr.length < amountOfFlaps) {
            for (let i = endArr.length; i < amountOfFlaps; i++) {
                endArr.push(" ");
            }
        }

        // Characters that can appear in the flap
        let char = [
            'A','B','C','D','E','F','G','H','I','J','K','L',
            'M','N','O','P','Q','R','S','T','U','V','W','X',
            'Y','Z','1','2','3','4','5','6','7','8','9','0',' '
        ];

        let strCount = [];
        let flag = [];
        let flag2 = true;

        // Initialize starting point for each character
        for (let i = 0; i < amountOfFlaps; i++) {
            strCount[i] = char.indexOf(beginArr[i]);
            flag[i] = false;
        }

        // Start flipping animation
        setInterval(function() {
            for (let x = 0; x < amountOfFlaps; x++) {
                if (b1[x].innerHTML === endArr[x]) {
                    dontFlipIt(x);
                } else {
                    flipIt(x);
                }
            }
        }, speed * 1000);

        // Functions to handle the flipping
        function flipIt(x) {
            a1[x].innerHTML = char[(strCount[x] === 0) ? char.length - 1 : strCount[x] - 1];
            a2[x].innerHTML = char[(strCount[x] === 0) ? char.length - 1 : strCount[x] - 1];
            b1[x].innerHTML = char[strCount[x]];
            b2[x].innerHTML = char[strCount[x]];

            a2[x].classList.remove("flip1");
            void a2[x].offsetWidth; // Force reflow
            a2[x].classList.add("flip1");

            b2[x].classList.remove("flip2");
            void b2[x].offsetWidth; // Force reflow
            b2[x].classList.add("flip2");

            if (strCount[x] >= char.length - 1) {
                strCount[x] = 0;
            } else {
                strCount[x]++;
            }
        }

        function dontFlipIt(x) {
            flag[x] = true;
            a2[x].classList.remove("flip1");
            b2[x].classList.remove("flip2");
            // a2[x].style.backgroundColor = "#3BB6EB";
            // b2[x].style.backgroundColor = "#3BB6EB";
            a2[x].style.backgroundColor = "#1c3139"
            b2[x].style.backgroundColor = "#1c3139"
            a1[x].innerHTML = char[(strCount[x] === 0) ? char.length - 1 : strCount[x] - 1];
            a2[x].innerHTML = char[(strCount[x] === 0) ? char.length - 1 : strCount[x] - 1];
        }
    }

    // Rest of the code remains the same...
    // === PROJECT GALLERY ===
    const projects = [
        {
            title: "avniscribbles",
            image: "images/avniscribbles2.jpg",
            blurb: "Exploring the creative writing process with iterative storytelling.",
            link: "https://github.com/avmadhwesh/avniscribbles"
        },
        {
            title: "shimon, gestures for a musical improv robot",
            image: "images/shimon.jpg",
            blurb: "Designing expressive gestures for a robotic musician.",
            link: "https://avmadhwesh.github.io/robotic-gestures/"
        },
        {
            title: "cognitive clustering & the traveling salesman problem",
            image: "images/tsp-option-1.jpg",
            blurb: "Researching clustering strategies to simulate human perception and intuitive solving of the TSP.",
            link: "https://escholarship.org/uc/item/5q76r06x"
        }//,
        // {
        //     title: "VR Storytelling & Spatial Cognition",
        //     image: "images/vr_storytelling.jpg",
        //     blurb: "Investigating how AR/VR influences storytelling through spatial cognition.",
        //     link: "#"
        // }
    ];

    // Insert projects into the gallery
    const gallery = document.getElementById("gallery");
    projects.forEach((project, index) => {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.innerHTML = `
            <a href="${project.link}" class="tile-link">
                <div class="tile-top">
                    <img src="${project.image}" alt="${project.title}" class="tile-image">
                    <div class="tile-overlay">
                        <h2>${project.title}</h2>
                    </div>
                </div>
                <div class="tile-bottom">
                    <p>${project.blurb}</p>
                </div>
            </a>
        `;
        gallery.appendChild(tile);
        
        // GSAP fade-in animation for projects
        gsap.from(tile, { opacity: 0, y: 0, duration: 1, delay: index * 0.2,
            onComplete: function() {
                // Remove inline transform styles so CSS hover can work
                tile.style.transform = '';
            }
         });
    });
});