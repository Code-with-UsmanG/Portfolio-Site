/* -------------- Smooth Scrolling Navigation ----------------------- */
document.addEventListener("DOMContentLoaded", function() {
    // Get all navigation links with hash
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Get the target section
            const targetId = this.getAttribute("href");
            
            // Special handling for certifications to avoid confusion between tab and section
            if (targetId === "#certifications" && this.classList.contains("nav-item")) {
                // This is the main nav link to the certifications section
                const targetSection = document.querySelector("section.certifications-section");
                
                if (targetSection) {
                    // For mobile navigation, close the menu if open
                    if (window.innerWidth <= 767) {
                        const nav = document.querySelector(".nav");
                        if (nav.classList.contains("active")) {
                            nav.classList.remove("active");
                        }
                    }
                    
                    // Add overlay effect
                    const overlay = document.querySelector(".overlay");
                    overlay.classList.add("active");
                    
                    // Get current active section
                    const currentSection = document.querySelector("section.active");
                    
                    // Apply fade-out to current section
                    if (currentSection) {
                        currentSection.classList.add("fade-out");
                    }
                    
                    // Switch sections with animation
                    setTimeout(() => {
                        // Remove active and fade-out classes from current section
                        if (currentSection) {
                            currentSection.classList.remove("active", "fade-out");
                        }
                        // Add active class to target section
                        targetSection.classList.add("active");
                        // Scroll to top
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                        // Remove overlay after fade completes
                        setTimeout(() => {
                            overlay.classList.remove("active");
                        }, 400); // 400ms after section switch for a smoother feel
                    }, 700); // Match this to the fade duration in CSS
                }
            } 
            // Special handling for "Contact Me" button in the About section
            else if (targetId === "#contact" && this.classList.contains("link-item") && !this.classList.contains("nav-item")) {
                // This is the "Contact Me" button in the About section
                const targetSection = document.querySelector("section.contact-section");
                
                if (targetSection) {
                    // Add overlay effect
                    const overlay = document.querySelector(".overlay");
                    overlay.classList.add("active");
                    
                    // Get current active section
                    const currentSection = document.querySelector("section.active");
                    
                    // Apply fade-out to current section
                    if (currentSection) {
                        currentSection.classList.add("fade-out");
                    }
                    
                    // Switch sections with animation
                    setTimeout(() => {
                        // Remove active and fade-out classes from current section
                        if (currentSection) {
                            currentSection.classList.remove("active", "fade-out");
                        }
                        
                        // Add active class to target section
                        targetSection.classList.add("active");
                        
                        // Scroll to top
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                        
                        // Remove overlay
                        overlay.classList.remove("active");
                    }, 300);
                }
            }
            else {
                // Normal handling for other links
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // For mobile navigation, close the menu if open
                    if (window.innerWidth <= 767) {
                        const nav = document.querySelector(".nav");
                        if (nav.classList.contains("active")) {
                            nav.classList.remove("active");
                        }
                    }
                    
                    // If it's a nav-item, handle section switching
                    if (this.classList.contains("nav-item")) {
                        // Add overlay effect
                        const overlay = document.querySelector(".overlay");
                        overlay.classList.add("active");
                        
                        // Get current active section
                        const currentSection = document.querySelector("section.active");
                        
                        // Apply fade-out to current section
                        if (currentSection) {
                            currentSection.classList.add("fade-out");
                        }
                        
                        // Switch sections with animation
                        setTimeout(() => {
                            // Remove active and fade-out classes from current section
                            if (currentSection) {
                                currentSection.classList.remove("active", "fade-out");
                            }
                            
                            // Add active class to target section
                            targetSection.classList.add("active");
                            
                            // Scroll to top
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                            
                            // Remove overlay after fade completes
                            setTimeout(() => {
                                overlay.classList.remove("active");
                            }, 400); // 400ms after section switch for a smoother feel
                        }, 700); // Match this to the fade duration in CSS
                    } else {
                        // For in-page links (not in nav), just smooth scroll
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: "smooth"
                        });
                    }
                }
            }
            
            // Remove 'active' from all nav links
            document.querySelectorAll('.nav ul li a').forEach(link => link.classList.remove('active'));
            // Add 'active' to the clicked link
            this.classList.add('active');
        });
    });
    
    // Function to hide section
    function hideSection() {
        document.querySelector("section.active").classList.toggle("fade-out");
    }
});

/* -------------- Dynamic Typing Effect ----------------------- */
const dynamicTextElement = document.querySelector(".dynamic-text .text-content");
const texts = [
    "Computer Scientist' 2027",
    "Android Developer",
    "Flutter Developer",
    "Google Play Store Contributor",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100; // Delay between each character typing
let erasingDelay = 50; // Delay between each character erasing
let newTextDelay = 2000; // Delay before starting to erase text

function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Remove character
        dynamicTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        // Add character
        dynamicTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentText.length) {
        // Pause before starting to delete
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    setTimeout(typeEffect, typingDelay);
}

/* -------------- Loader ----------------------- */
window.addEventListener("load", () => {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 600);
    
    // Start typing effect
    setTimeout(typeEffect, 1000);
});

/* -------------- Mobile Navigation ----------------------- */
document.addEventListener("DOMContentLoaded", () => {
    // For mobile navigation
        const navLinks = document.querySelectorAll(".nav-item");
        const nav = document.querySelector(".nav");
    const navToggler = document.querySelector(".nav-toggler");
    
    if (navToggler) {
        // Toggle navigation when clicking the nav toggler
navToggler.addEventListener("click", () => {
            nav.classList.toggle("active");
            navToggler.classList.toggle("active");
        });
        
        // Close navigation when clicking a link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("active");
                navToggler.classList.remove("active");
            });
        });
    }
    
    /* -------------- Company Tabs for Certifications ----------------------- */
    const companyTabs = document.querySelectorAll(".company-tab");
    const companyContents = document.querySelectorAll(".company-content");
    
    companyTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs
            companyTabs.forEach(t => t.classList.remove("active"));
            
            // Add active class to clicked tab
            tab.classList.add("active");
            
            // Get the company data attribute
            const company = tab.getAttribute("data-company");
            
            // Hide all content sections
            companyContents.forEach(content => {
                content.classList.remove("active");
            });
            
            // Show the selected content section
            document.getElementById(`${company}-certifications`).classList.add("active");
        });
    });
});

/* -------------- About Tabs ----------------------- */
document.addEventListener("DOMContentLoaded", function() {
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");
    
    if (tabsContainer) {
        tabsContainer.addEventListener("click", function(event) {
            if (event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
                const target = event.target.getAttribute("data-target");
                
                // Deactivate existing active tab
        tabsContainer.querySelector(".active").classList.remove("active");
                
                // Activate new tab
                event.target.classList.add("active");
                
                // Deactivate existing active tab content
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
                
                // Activate new tab content
        aboutSection.querySelector(target).classList.add("active");
            }
        });
    }
});

/* -------------- Certificate Popup ----------------------- */
document.addEventListener("DOMContentLoaded", function() {
    // Get all view certificate buttons
    const viewCertificateButtons = document.querySelectorAll(".view-certificate-btn");
    const certificatePopup = document.querySelector(".certificate-popup");
    const certificatePopupContent = document.querySelector(".certificate-popup-content");
    
    // Add click event listener to each button
    viewCertificateButtons.forEach(button => {
        button.addEventListener("click", function() {
            const certificatePath = this.getAttribute("data-certificate");
            if (certificatePath) {
                // Simple and reliable approach
                if (certificatePath.toLowerCase().endsWith('.pdf')) {
                    certificatePopupContent.innerHTML = `
                        <div class="certificate-popup-close"><i class="fas fa-times"></i></div>
                        <div class="certificate-popup-pdf-container">
                            <embed src="${certificatePath}" type="application/pdf" width="100%" height="100%">
                        </div>
                    `;
                } else {
                    certificatePopupContent.innerHTML = `
                        <div class="certificate-popup-close"><i class="fas fa-times"></i></div>
                        <div class="certificate-popup-img-container">
                            <img src="${certificatePath}" alt="Certificate" class="certificate-popup-img">
                        </div>
                    `;
                }
                
                // Show popup
                certificatePopup.classList.add("open");
                document.body.classList.add("hide-scrolling");
            }
        });
    });
    
    // Close certificate popup when clicking close button or outside
    certificatePopup.addEventListener("click", function(e) {
        if (e.target.closest(".certificate-popup-close") || e.target.classList.contains("certificate-popup-inner")) {
            certificatePopup.classList.remove("open");
            document.body.classList.remove("hide-scrolling");
        }
    });
});

/* -------------- Portfolio Item Popup ----------------------- */
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-project-btn")) {
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0, 0);
        portfolioItemDetails(e.target.parentElement);
    }
});

function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

//hide popup on clicking outside
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
});


function portfolioItemDetails(portfolioItem) {
    const projectTitle = portfolioItem.querySelector(".portfolio-item-title").innerHTML;
    const popup = document.querySelector(".portfolio-popup");
    const landscapeProjects = ["TimSort Algorithm Simulator", "TubeDown", "Treasure Hunting Game", "Chess Game"];

    if (landscapeProjects.includes(projectTitle)) {
        popup.classList.add("landscape-popup");
    } else {
        popup.classList.remove("landscape-popup");
    }

    const galleryImages = portfolioItem.getAttribute("data-gallery-images").split(",");
    const galleryImgs = document.querySelectorAll(".pp-gallery img");

    // Hide all images first
    galleryImgs.forEach(img => {
        img.style.display = "none";
    });

    // Show only as many images as needed
    galleryImages.forEach((src, idx) => {
        if (galleryImgs[idx]) {
            galleryImgs[idx].src = src.trim();
            galleryImgs[idx].style.display = "block";
        }
    });

    document.querySelector(".pp-header h3").innerHTML =
        projectTitle;

    document.querySelector(".pp-body").innerHTML =
        portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

/* -------------- Animation on Scroll for Awards ----------------------- */
document.addEventListener("DOMContentLoaded", function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Function to handle scroll animations
    function handleScrollAnimations() {
        // For award items
        const awardItems = document.querySelectorAll('.award-item');
        awardItems.forEach((item, index) => {
            if (isInViewport(item)) {
                item.style.animationDelay = `${0.1 * (index + 1)}s`;
                item.style.animationPlayState = 'running';
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Initial check
    setTimeout(handleScrollAnimations, 300);
});

/* -------------- Dark Mode Toggle ----------------------- */
document.addEventListener("DOMContentLoaded", function() {
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add a subtle transition effect when changing themes
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
});