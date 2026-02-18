/**
 * FLEXOVERSE - 3D Background Component
 * Uses Three.js to create a rotating 3D background with Flexo packaged products.
 */

class FlexoBackground {
    constructor() {
        this.container = document.getElementById('canvas-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);

        this.products = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    init() {
        // Add Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x2563eb, 0.6);
        this.scene.add(hemisphereLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const pointLight = new THREE.PointLight(0x2563eb, 1);
        pointLight.position.set(-5, -5, 5);
        this.scene.add(pointLight);

        // Create Ambient Particle Field (Data Dust)
        this.createParticles();

        // Create 3D Products
        const geometries = [
            new THREE.BoxGeometry(1, 1.5, 0.4),
            new THREE.CylinderGeometry(0.4, 0.4, 1.2, 32),
            new THREE.BoxGeometry(0.8, 1.2, 0.3)
        ];

        const colors = [0x2563eb, 0xf59e0b, 0x10b981, 0xef4444, 0x8b5cf6];

        for (let i = 0; i < 18; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const material = new THREE.MeshPhongMaterial({
                color: color,
                shininess: 100,
                transparent: true,
                opacity: 0.7
            });

            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 25,
                (Math.random() - 0.5) * 15 - 5
            );

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: {
                    x: (Math.random() - 0.5) * 0.004,
                    y: (Math.random() - 0.5) * 0.004
                },
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02
            };

            this.scene.add(mesh);
            this.products.push(mesh);
        }

        this.camera.position.z = 10;
    }

    createParticles() {
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 40;
            positions[i + 1] = (Math.random() - 0.5) * 40;
            positions[i + 2] = (Math.random() - 0.5) * 30 - 10;

            colors[i] = 1;
            colors[i + 1] = 1;
            colors[i + 2] = 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.4
        });

        this.particleSystem = new THREE.Points(geometry, material);
        this.scene.add(this.particleSystem);
    }

    onMouseMove(e) {
        this.targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
        this.targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth mouse parallax
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        this.camera.position.x = this.mouse.x * 0.5;
        this.camera.position.y = -this.mouse.y * 0.5;
        this.camera.lookAt(0, 0, 0);

        // Animate products
        this.products.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            mesh.position.x += mesh.userData.floatSpeed.x;
            mesh.position.y += mesh.userData.floatSpeed.y;

            // Pulsing effect
            mesh.userData.pulsePhase += mesh.userData.pulseSpeed;
            const pulse = 1 + Math.sin(mesh.userData.pulsePhase) * 0.05;
            mesh.scale.set(pulse, pulse, pulse);

            if (Math.abs(mesh.position.x) > 15) mesh.position.x *= -0.99;
            if (Math.abs(mesh.position.y) > 15) mesh.position.y *= -0.99;
        });

        // Drift particles
        if (this.particleSystem) {
            this.particleSystem.rotation.y += 0.0005;
            this.particleSystem.rotation.x += 0.0002;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when library is loaded
window.addEventListener('load', () => {
    // Check if THREE is defined
    if (typeof THREE !== 'undefined') {
        new FlexoBackground();
    } else {
        console.warn('Three.js not loaded. 3D background disabled.');
    }
});
