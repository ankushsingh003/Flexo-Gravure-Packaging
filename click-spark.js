/**
 * FLEXOVERSE - Click Spark Effect
 * Creates a burst of colorful particles on click and handles delayed redirection.
 */

class ClickSpark {
    constructor() {
        this.container = document.body;
        this.colors = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ffffff'];
        this.init();
    }

    init() {
        // Universal click listener for sparkles
        document.addEventListener('click', (e) => {
            if (this.shouldSpark(e.target)) {
                this.createSpark(e.pageX, e.pageY);
            }
        });

        // Global redirection wrapper
        window.sparkRedirect = (url) => {
            // Find current mouse position or use center if not available
            // In many cases we trigger this from an inline onclick which has access to 'event'
            const event = window.event;
            if (event && event.pageX) {
                this.createSpark(event.pageX, event.pageY);
            }

            setTimeout(() => {
                window.location.href = url;
            }, 400);
        };
    }

    shouldSpark(target) {
        // Spark on buttons, links, or elements with specific classes
        return target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('.course-card') ||
            target.closest('.explore-option');
    }

    createSpark(x, y) {
        const particleCount = 12;
        const burstRadius = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-spark-particle';

            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            const size = Math.random() * 8 + 4;
            const angle = (i / particleCount) * Math.PI * 2;
            const velocity = Math.random() * 3 + 2;

            const destX = Math.cos(angle) * burstRadius * velocity;
            const destY = Math.sin(angle) * burstRadius * velocity;

            Object.assign(particle.style, {
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '9999',
                boxShadow: `0 0 10px ${color}`,
                transition: 'all 0.6s cubic-bezier(0.1, 0.8, 0.3, 1)',
                opacity: '1'
            });

            this.container.appendChild(particle);

            // Animate
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
                particle.style.opacity = '0';
            });

            // Cleanup
            setTimeout(() => {
                particle.remove();
            }, 700);
        }
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    window.sparkManager = new ClickSpark();
});
