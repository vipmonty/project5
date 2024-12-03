// JavaScript for showing and hiding sections based on menu clicks
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Get the target section ID from the data-target attribute
        const targetSectionId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetSectionId);
        
        // Hide all sections
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
        });
        
        // Show the target section
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

// Toggle theme functionality
const toggleThemeButton = document.getElementById('toggle-theme');
let themeLink;

toggleThemeButton.addEventListener('click', () => {
    if (!themeLink) {
        // If theme is not applied, create link element and add it to head
        themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.href = 'css/theme.css';
        document.head.appendChild(themeLink);
        toggleThemeButton.textContent = 'Switch to Light Theme';
    } else {
        // If theme is applied, remove link element
        document.head.removeChild(themeLink);
        themeLink = null;
        toggleThemeButton.textContent = 'Switch to Dark Theme';
    }
});
