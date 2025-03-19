// Check if the current page is index.html
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    document.addEventListener("DOMContentLoaded", function () {
        const skeleton = document.querySelector('.skeleton');
        const content = document.querySelector('.content');

        // Display skeleton and hide content initially
        skeleton.style.display = 'block';
        content.style.display = 'none';

        // Apply Dark Mode or Light Mode to the skeleton
        applyThemeToSkeleton();
        applyThemeColorFromIndex(); // Apply the theme color from index.html
    });

    window.onload = function () {
        const skeleton = document.querySelector('.skeleton');
        const content = document.querySelector('.content');

        // Apply Dark Mode if it was previously enabled
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('Darkmode');
        }

        // Fade out the skeleton and show the main content
        setTimeout(function () {
            skeleton.style.display = 'none'; // Hide the skeleton
            content.style.display = 'block'; // Show the main content
            document.body.style.opacity = '1'; // Smooth fade-in effect
        }, 3000); // Adjust this delay as needed
    };
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('Darkmode');
    if (document.body.classList.contains('Darkmode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    applyThemeToSkeleton(); // Update skeleton theme when toggling
}

// Apply the current theme to the skeleton
function applyThemeToSkeleton() {
    const skeleton = document.querySelector('.skeleton');
    if (document.body.classList.contains('Darkmode')) {
        skeleton.classList.add('dark-skeleton');
        skeleton.classList.remove('light-skeleton');
    } else {
        skeleton.classList.add('light-skeleton');
        skeleton.classList.remove('dark-skeleton');
    }
}

// Fetch and apply theme color from index.html
function applyThemeColorFromIndex() {
    const skeleton = document.querySelector('.skeleton');
    // Assume you have a meta tag in index.html with the theme color
    const themeColor = getComputedStyle(document.documentElement).getPropertyValue('--theme-color');

    if (themeColor) {
        skeleton.style.backgroundColor = themeColor;
    }
}

// Redirect to "index2.html" Automatically (First Load Only)
function loadIndex() {
    if (!sessionStorage.getItem('redirected')) {
        sessionStorage.setItem('redirected', 'true');
        window.location.href = 'index2.html'; // Redirect to the renamed file
    }
}

// Redirect After 5 Seconds (if needed for specific flows, first load only)
setTimeout(function () {
    if (!sessionStorage.getItem('redirected')) {
        document.body.style.opacity = '0'; // Fade out the page
        setTimeout(loadIndex, 1000); // Wait 1 second before redirecting
    }
}, 5000);
