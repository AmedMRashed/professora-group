document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       Premium Preloader
    ========================================= */
    const preloader = document.getElementById("preloader");
    const loaderNumber = document.getElementById("loaderNumber");
    const progressBar = document.querySelector(".loader-progress-bar");

    document.body.classList.add("loading");

    let progress = 0;

    const loadingInterval = setInterval(() => {

        // سرعة متغيرة تعطي إحساس تحميل طبيعي
        if (progress < 35) {
            progress += Math.floor(Math.random() * 5) + 2;
        } else if (progress < 75) {
            progress += Math.floor(Math.random() * 4) + 1;
        } else {
            progress += Math.floor(Math.random() * 3) + 1;
        }

        if (progress >= 100) {
            progress = 100;

            clearInterval(loadingInterval);

            setTimeout(() => {

                if (preloader) {
                    preloader.classList.add("hide");
                }

                document.body.classList.remove("loading");

                // تشغيل دخول عناصر الـ Hero
                revealHero();

            }, 450);
        }

        if (loaderNumber) {
            loaderNumber.textContent = progress;
        }

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

    }, 35);


    /* =========================================
       Hero Entrance
    ========================================= */
    function revealHero() {

        const heroElements = document.querySelectorAll(
            ".hero .reveal"
        );

        heroElements.forEach((element, index) => {

            setTimeout(() => {
                element.classList.add("visible");
            }, index * 130);

        });
    }


    /* =========================================
       Header Scroll Effect
    ========================================= */
    const header = document.getElementById("header");

    function handleHeader() {

        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* =========================================
       Scroll Reveal
    ========================================= */
    const revealElements = document.querySelectorAll(
        ".reveal:not(.hero .reveal)"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.13
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================
       Stagger Services Animation
    ========================================= */
    const serviceCards = document.querySelectorAll(
        ".service-card"
    );

    const servicesObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    serviceCards.forEach((card, index) => {

                        setTimeout(() => {
                            card.classList.add("visible");
                        }, index * 100);

                    });

                    servicesObserver.disconnect();
                }

            });

        },
        {
            threshold: 0.1
        }
    );

    if (serviceCards.length) {
        servicesObserver.observe(serviceCards[0]);
    }


    /* =========================================
       Smooth Anchor Scrolling
    ========================================= */
    const anchorLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                const headerHeight =
                    header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* =========================================
       Active Navigation
    ========================================= */
    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    /* =========================================
       WhatsApp
       ضع الرقم الحقيقي هنا لاحقاً
    ========================================= */

    const whatsappNumber = "966500000000";

    const whatsappLinks = document.querySelectorAll(
        ".whatsapp-link"
    );

    whatsappLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const service =
                link.dataset.service ||
                "استفسار عام";

            const message =
                `السلام عليكم، أرغب في الاستفسار عن ${service}`;

            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );
        });
    });


    /* =========================================
       Premium Card Mouse Effect
       Desktop only
    ========================================= */

    if (window.matchMedia("(min-width: 901px)").matches) {

        serviceCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -2;

                const rotateY =
                    ((x - centerX) / centerX) * 2;

                card.style.transform =
                    `perspective(900px)
                     translateY(-10px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =========================================
       Hero Card 3D Movement
    ========================================= */

    const heroVisual =
        document.querySelector(".hero-visual");

    const heroCard =
        document.querySelector(".main-visual-card");

    if (
        heroVisual &&
        heroCard &&
        window.matchMedia("(min-width: 1001px)").matches
    ) {

        heroVisual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                const mouseX =
                    event.clientX - rect.left;

                const mouseY =
                    event.clientY - rect.top;

                const rotateY =
                    ((mouseX / rect.width) - 0.5) * 8;

                const rotateX =
                    ((mouseY / rect.height) - 0.5) * -8;

                heroCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;
            }
        );


        heroVisual.addEventListener(
            "mouseleave",
            () => {

                heroCard.style.transform =
                    "perspective(1000px) rotateY(-4deg) rotateX(2deg)";

            }
        );

    }


    /* =========================================
       Mobile Menu
    ========================================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            nav.classList.toggle("mobile-open");

        });


        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                nav.classList.remove("mobile-open");

            });

        });

    }


    /* =========================================
       Current Year
    ========================================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }

});