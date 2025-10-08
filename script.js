// Sticky Header Functionality
const mainHeader = document.getElementById('mainHeader');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > 100) {
        mainHeader.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScrollPosition = currentScrollPosition;
});

// Mobile Menu Toggles
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const topNav = document.getElementById('topNav');
const mobileNavToggle = document.getElementById('mobileNavToggle');
const mainNav = document.querySelector('.main-nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        topNav.classList.toggle('active');
    });
}

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

// Search Functionality
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const closeSearch = document.getElementById('closeSearch');

searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    searchOverlay.querySelector('.search-input').focus();
});

closeSearch.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        searchOverlay.classList.remove('active');
    }
});

// Tab Switching for Specialities & Procedures
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === targetTab) {
                content.classList.add('active');
            }
        });
    });
});

// Location Tabs for Hospital Network
const locationTabs = document.querySelectorAll('.location-tab');
const hospitalSliderTrack = document.getElementById('hospitalSliderTrack');

let currentSlideIndex = 0;

locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        locationTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        currentSlideIndex = 0;
        updateSliderPosition();
    });
});

// Hospital Slider Controls
const hospitalPrev = document.getElementById('hospitalPrev');
const hospitalNext = document.getElementById('hospitalNext');

function updateSliderPosition() {
    const cardWidth = 370;
    const offset = -(currentSlideIndex * cardWidth);
    hospitalSliderTrack.style.transform = `translateX(${offset}px)`;
}

hospitalPrev.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSliderPosition();
    }
});

hospitalNext.addEventListener('click', () => {
    const totalCards = document.querySelectorAll('.hospital-card').length;
    const visibleCards = Math.floor(hospitalSliderTrack.parentElement.offsetWidth / 370);

    if (currentSlideIndex < totalCards - visibleCards) {
        currentSlideIndex++;
        updateSliderPosition();
    }
});

// No auto-slide - slider only moves on user interaction (location tab clicks or arrow buttons)

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth Scroll for All Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Dropdown Hover Effects for Navigation
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const navLink = dropdown.querySelector('.nav-link');
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.style.display = 'none';
    });
});

// Mobile menu toggles already handled above

// Video Play Button Click Handler
const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Video player would open here');
    });
});

// Hover Effects for Cards
const quickLinkCards = document.querySelectorAll('.quick-link-card');

quickLinkCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.speciality-item, .hospital-card, .story-item');

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Handle Window Resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        currentSlideIndex = 0;
        updateSliderPosition();
    }, 250);
});

// Form Submission Handler for Appointment Form
const appointmentForm = document.querySelector('.appointment-form');
const bookAppointmentBtn = document.querySelector('.btn-book-appointment');

if (bookAppointmentBtn) {
    bookAppointmentBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const doctorInput = document.querySelector('.input-group input[placeholder*="Doctor"]');
        const locationInput = document.querySelector('.input-group input[placeholder*="Location"]');

        if (!doctorInput.value || !locationInput.value) {
            alert('Please fill in all fields to book an appointment');
            return;
        }

        alert(`Appointment booking request:\nDoctor/Specialty: ${doctorInput.value}\nLocation: ${locationInput.value}`);
    });
}

// Emergency Sidebar Click Handler
const emergencySidebar = document.querySelector('.emergency-text');

if (emergencySidebar) {
    emergencySidebar.addEventListener('click', () => {
        alert('Emergency Contact: +91 926 888 0303\n\nAvailable 24/7');
    });
}

// Floating Contact Click Handler
const contactBubble = document.querySelector('.contact-bubble');

if (contactBubble) {
    contactBubble.addEventListener('click', () => {
        window.location.href = 'tel:+919268880303';
    });
}

// Dynamic Year Update
const currentYear = new Date().getFullYear();
const yearElements = document.querySelectorAll('.year');

yearElements.forEach(element => {
    element.textContent = currentYear;
});

// Prevent Default for All Placeholder Links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Console Log for Development
console.log('Max Healthcare Website - JavaScript Loaded Successfully');
console.log('All interactive elements initialized');
