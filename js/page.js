/**
 * Page Logic for the VIP Photography Website.
 * Author: Viphakone Monty
 */

function initPageLogic() {
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetSectionId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetSectionId);

            document.querySelectorAll('main section').forEach(section => {
                section.style.display = 'none';
            });

            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    const toggleThemeButton = document.getElementById('toggle-theme');
    let isDarkMode = false;

    toggleThemeButton.addEventListener('click', () => {
        const existingThemeLink = document.querySelector('link[href="css/theme.css"]');

        if (!isDarkMode) {
            if (!existingThemeLink) {
                const themeLink = document.createElement('link');
                themeLink.rel = 'stylesheet';
                themeLink.href = 'css/theme.css';
                document.head.appendChild(themeLink);
            }
            toggleThemeButton.textContent = 'Switch to Light Theme';
        } else {
            if (existingThemeLink) {
                document.head.removeChild(existingThemeLink);
            }
            toggleThemeButton.textContent = 'Switch to Dark Theme';
        }

        isDarkMode = !isDarkMode;
    });
}

document.addEventListener("DOMContentLoaded", initPageLogic);
