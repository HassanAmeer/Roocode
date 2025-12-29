// Main application script for particle background demo
// Global function to initialize particles
window.particlesInit = function () {
    // Initialize particles for elements with [particles] attribute
    const elements = document.querySelectorAll("[particles], [particle-config]");
    setupElementsWithParticles(elements);
};

function setupElementsWithParticles(elements) {
    elements.forEach(el => {
        new ParticleSystem(el);
    });
}


// Original DOMContentLoaded initialization
window.addEventListener('DOMContentLoaded', function () {
    window.particlesInit();

    // Existing code
    document.getElementById('current-year').textContent = new Date().getFullYear();
});


densityValue.textContent = densitySlider.value;
// ... rest of original code
// Keep existing event listeners and logic
// Get current year for footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Get UI elements
// Controls initialized in particlesInit now

// Update density display
densityValue.textContent = densitySlider.value;

// Density slider event
densitySlider.addEventListener('input', function () {
    densityValue.textContent = this.value;

    // Update particle system configuration
    if (window.particleSystem) {
        window.particleSystem.updateConfig({
            density: parseInt(this.value)
        });
    }
});

// Color picker event
colorPicker.addEventListener('input', function () {
    // Update particle system configuration
    if (window.particleSystem) {
        window.particleSystem.updateConfig({
            color: this.value
        });
    }

    // Update global config
    window.particleConfig.color = this.value;
});

// Interaction toggle event
interactionToggle.addEventListener('change', function () {
    // Update particle system configuration
    if (window.particleSystem) {
        window.particleSystem.updateConfig({
            enableInteraction: this.checked
        });
    }

    // Update global config
    window.particleConfig.enableInteraction = this.checked;
});

// Reset button event
resetButton.addEventListener('click', function () {
    if (window.particleSystem) {
        window.particleSystem.reset();
    }
});

// Accessibility: Add keyboard support for sliders and controls
[densitySlider, colorPicker, interactionToggle].forEach(element => {
    element.addEventListener('keydown', function (e) {
        // For screen readers and keyboard users, announce changes
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();

            // Trigger change event programmatically
            this.dispatchEvent(new Event('input'));
        }
    });
});

// Add focus styles for keyboard navigation
document.querySelectorAll('button, input, select').forEach(element => {
    element.addEventListener('focus', function () {
        document.body.classList.add('keyboard-navigation');
    });
});

// Detect if user is using keyboard navigation
document.body.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
});


// Handle reduced motion preference changes
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', function (e) {
    if (window.particleSystem) {
        // The particle system will handle the reduced motion setting internally
        // This ensures the animation stops when reduced motion is enabled
        console.log('Reduced motion preference changed:', e.matches ? 'enabled' : 'disabled');
    }
});