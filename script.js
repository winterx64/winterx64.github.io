document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        ".about-section, .skills-section, .projects-section, .experience-section, .certifications-section, .contact-section"
    );

    // Intersection Observer setup
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible", "section-active");

                    sections.forEach((section) => {
                        if (section !== entry.target) {
                            section.classList.remove("section-active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "-10% 0px",
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });

    // Simple scroll indicator click handler
    document
        .querySelector(".scroll-indicator")
        .addEventListener("click", () => {
            const aboutSection = document.querySelector(".about-section");
            aboutSection.scrollIntoView({ behavior: "smooth" });
        });

    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "-50px",
        }
    );

    timelineItems.forEach((item) => {
        timelineObserver.observe(item);
    });

    // Select all cards that need animations
    const animatedCards = document.querySelectorAll(
        ".project-card, .skill-category, .certificate-card"
    );

    // Create observer for cards
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "-10% 0px",
        }
    );

    // Observe each card
    animatedCards.forEach((card) => {
        cardObserver.observe(card);
    });

    // Add this with your other observers
    const contactItems = document.querySelectorAll(".contact-item");

    const contactObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: "-10% 0px",
        }
    );

    contactItems.forEach((item) => {
        contactObserver.observe(item);
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navLinksItems = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinksItems.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar")) {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }
    });
});
