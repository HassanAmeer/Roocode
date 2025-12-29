/**
 * Interactive Particle Background System
 * Creates a canvas-based particle animation that responds to user interactions
 * with smoothly animated effects and customizable parameters.
 */

class Particle {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 10;
        this.config = config;
        this.color = config.color;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(mouseX, mouseY) {
        // Calculate distance to mouse
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Apply mouse interaction if enabled
        if (this.config.enableInteraction && distance < 150) {
            // Move away from mouse
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;

            // Strength of repulsion based on distance
            let maxDistance = 150;
            let force = (maxDistance - distance) / maxDistance;

            // Apply force (inverted to create repulsion)
            this.x -= forceDirectionX * force * 5;
            this.y -= forceDirectionY * force * 5;
        } else {
            // Return to original position with spring-like effect
            let dx = this.baseX - this.x;
            let dy = this.baseY - this.y;

            // Damping factor for smooth movement
            let damping = 0.05;
            this.x += dx * damping;
            this.y += dy * damping;
        }

        // Update particle size based on mouse proximity
        if (this.config.enableInteraction && distance < 80) {
            this.size = 3 + (80 - distance) / 20;
        } else {
            this.size = Math.random() * 2 + 1;
        }
    }
}

class ParticleSystem {
    constructor() {
        // Get canvas and context
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');

        // Initialize particles array
        this.particles = [];

        // Mouse position
        this.mouse = {
            x: undefined,
            y: undefined
        };

        // Configuration
        this.config = window.particleConfig || {
            density: 100,
            color: '#007bff',
            enableInteraction: true,
            defaultCount: 80
        };

        // Animation frame ID
        this.animationId = null;

        // Reduced motion flag
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Handle window events
        this.init();
    }

    init() {
        // Set canvas size
        this.resizeCanvas();

        // Create particles
        this.createParticles();

        // Set up event listeners
        this.setupEventListeners();

        // Start animation loop
        this.animate();
    }

    resizeCanvas() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Set canvas dimensions
        this.canvas.width = width;
        this.canvas.height = height;

        // Adjust particles if canvas resized
        if (this.particles.length > 0) {
            this.particles.forEach(particle => {
                particle.baseX = Math.random() * this.canvas.width;
                particle.baseY = Math.random() * this.canvas.height;
                particle.x = particle.baseX;
                particle.y = particle.baseY;
            });
        }
    }

    createParticles() {
        // Clear existing particles
        this.particles = [];

        // Calculate particle count based on density and screen size
        const screenWidth = this.canvas.width;
        const screenHeight = this.canvas.height;
        const screenArea = screenWidth * screenHeight;

        // Base particle count on screen area
        let particleCount = this.config.defaultCount;

        // Adjust for density setting
        particleCount = Math.floor(particleCount * (this.config.density / 100));

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            // Random position
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;

            // Create particle
            this.particles.push(new Particle(x, y, this.config));
        }
    }

    setupEventListeners() {
        // Mouse move event
        window.addEventListener('mousemove', (e) => {
            // Update mouse position
            this.mouse.x = e.x;
            this.mouse.y = e.y;

            // For touch devices, also update on touchmove
            if ('ontouchstart' in window) {
                // Prevent scrolling when interacting with canvas
                e.preventDefault();
            }
        });

        // Touch move event for mobile devices
        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                // Update mouse position with first touch point
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
            // Prevent scrolling when interacting with canvas
            e.preventDefault();
        }, { passive: false });

        // Window resize event
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        // Reduced motion preference change
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addEventListener('change', (e) => {
            this.reducedMotion = e.matches;
            // Reduce animation complexity if reduced motion is preferred
            if (this.reducedMotion) {
                this.config.density = Math.min(this.config.density, 50);
                this.createParticles();
            }
        });
    }

    connect() {
        // Draw lines between nearby particles
        for (let a = 0; a < this.particles.length; a++) {
            for (let b = a + 1; b < this.particles.length; b++) {
                // Calculate distance between particles
                let dx = this.particles[a].x - this.particles[b].x;
                let dy = this.particles[a].y - this.particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                // Draw line if particles are close enough and not in reduced motion mode
                if (distance < 120 && !this.reducedMotion) {
                    // Calculate opacity based on distance (closer = more opaque)
                    let opacity = 1 - distance / 120;

                    // Only draw if opacity is above threshold
                    if (opacity > 0.1) {
                        this.ctx.globalAlpha = opacity * 0.5;
                        this.ctx.strokeStyle = this.config.color;
                        this.ctx.lineWidth = 1;
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[a].x, this.particles[a].y);
                        this.ctx.lineTo(this.particles[b].x, this.particles[b].y);
                        this.ctx.stroke();
                        this.ctx.globalAlpha = 1.0; // Reset
                    }
                }
            }
        }
    }

    animate() {
        // Request next animation frame
        this.animationId = requestAnimationFrame(() => this.animate());

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            // Update particle position based on mouse interaction
            this.particles[i].update(this.mouse.x, this.mouse.y);

            // Draw the particle
            this.particles[i].draw(this.ctx);
        }

        // Draw connections between particles
        this.connect();

        // Apply reduced motion settings
        if (this.reducedMotion) {
            // Cancel animation if reduced motion is preferred
            // This prevents the animation from running unnecessarily
            this.stop();

            // Draw static version for reduced motion
            this.drawStatic();
        }
    }

    drawStatic() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles without animation
        this.particles.forEach(particle => {
            particle.x = particle.baseX;
            particle.y = particle.baseY;
            particle.draw(this.ctx);
        });
    }

    stop() {
        // Cancel animation frame
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    updateConfig(config) {
        // Update configuration
        Object.assign(this.config, config);

        // Recreate particles with new settings
        this.createParticles();
    }

    reset() {
        // Reset mouse position
        this.mouse.x = undefined;
        this.mouse.y = undefined;

        // Recreate particles
        this.createParticles();
    }
}

// Initialize particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global particle system instance
    window.particleSystem = new ParticleSystem();
});