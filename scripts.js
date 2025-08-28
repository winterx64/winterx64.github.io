// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle with improved functionality
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function initializeTheme() {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");
    localStorage.setItem("theme", currentTheme);

    if (currentTheme === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.classList.contains("dark");
    themeIcon.className = `fa-solid fa-${
        isDark ? "sun" : "moon"
    } text-sm text-secondary`;
}

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }

    updateThemeIcon();
});

// Initialize theme on load
initializeTheme();

// Enhanced mobile menu functionality
const mobileBtn = document.getElementById("mobileBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobile = document.getElementById("closeMobile");
const mobileMenuContent = mobileMenu.querySelector(".mobile-menu");
const hamburger = mobileBtn.querySelector(".hamburger");

function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    hamburger.classList.add("active");
    mobileMenuContent.classList.add("slide-in");
    mobileMenuContent.classList.remove("slide-out");
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeMobileMenu() {
    mobileMenuContent.classList.add("slide-out");
    mobileMenuContent.classList.remove("slide-in");
    hamburger.classList.remove("active");
    document.body.style.overflow = ""; // Restore scrolling

    setTimeout(() => {
        mobileMenu.classList.add("hidden");
    }, 300);
}

mobileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (mobileMenu.classList.contains("hidden")) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

closeMobile.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking backdrop
mobileMenu.addEventListener("click", (e) => {
    if (e.target.classList.contains("mobile-menu-backdrop")) {
        closeMobileMenu();
    }
});

// Close mobile menu when clicking navigation links
document.querySelectorAll(".mobile-nav-item").forEach((link) => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

// Close mobile menu on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        closeMobileMenu();
    }
});

// Role rotation animation
const roles = [
    "Backend Developer",
    "Hardware Enthusiast",
    "IoT Innovator",
    "Open Source Contributor",
    "UI/UX Designer",
];

let roleIndex = 0;
const roleElement = document.querySelector(".type-roles");

function rotateRole() {
    roleElement.style.opacity = "0";
    roleElement.style.transform = "translateY(10px)";

    setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        roleElement.textContent = roles[roleIndex];
        roleElement.style.opacity = "1";
        roleElement.style.transform = "translateY(0)";
    }, 150);
}

// Add transition styles
roleElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";

// Start rotation
setInterval(rotateRole, 3000);

// Enhanced card tilt effects for desktop only
function initCardTilt() {
    if (window.innerWidth > 768) {
        document.querySelectorAll(".card-tilt").forEach((card) => {
            card.addEventListener("mousemove", (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                const rotateY = x * 8;
                const rotateX = -y * 8;

                card.style.transform = `
                                perspective(1000px) 
                                translateZ(0) 
                                rotateX(${rotateX}deg) 
                                rotateY(${rotateY}deg)
                                translateY(-4px)
                            `;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();

            // Smooth scroll to target
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    });
});

// Loading animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("loading");
        }
    });
}, observerOptions);

// Observe all sections for loading animation
document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
});

// Initialize card tilt effects
initCardTilt();

// Reinitialize on window resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCardTilt();
        // Close mobile menu on resize to larger screen
        if (
            window.innerWidth > 768 &&
            !mobileMenu.classList.contains("hidden")
        ) {
            closeMobileMenu();
        }
    }, 150);
});

// Add subtle parallax effect to hero background
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const particles = document.getElementById("particles");
    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});
