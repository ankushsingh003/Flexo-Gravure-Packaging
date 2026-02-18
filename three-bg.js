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
            new THREE.BoxGeometry(0.8, 1.2, 0.3),
            new THREE.SphereGeometry(0.4, 24, 24),
            new THREE.TorusGeometry(0.5, 0.2, 16, 100)
        ];

        const colors = [0x2563eb, 0xf59e0b, 0x10b981, 0xef4444, 0x8b5cf6];

        for (let i = 0; i < 45; i++) {
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
                (Math.random() - 0.5) * 50,
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 20 - 10
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
                velocity: {
                    x: (Math.random() - 0.5) * 0.004,
                    y: (Math.random() - 0.5) * 0.004,
                    z: (Math.random() - 0.5) * 0.002
                },
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02,
                originalPos: mesh.position.clone()
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

        // Enhanced Camera Parallax
        this.camera.position.x = this.mouse.x * 2.5;
        this.camera.position.y = -this.mouse.y * 2.5;
        this.camera.lookAt(0, 0, 10);

        // Animate products with mouse influence and anti-clustering
        this.products.forEach((mesh, index) => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;

            // 1. Restoration Force (Return to original position)
            const homeDx = mesh.userData.originalPos.x - mesh.position.x;
            const homeDy = mesh.userData.originalPos.y - mesh.position.y;
            mesh.userData.velocity.x += homeDx * 0.0001;
            mesh.userData.velocity.y += homeDy * 0.0001;

            // 2. Mouse Influence (Disturbance)
            const mouseDx = (this.mouse.x * 15) - mesh.position.x;
            const mouseDy = (-this.mouse.y * 15) - mesh.position.y;
            const distToMouse = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

            if (distToMouse < 8) {
                // Subtle attraction/churning
                const force = (8 - distToMouse) * 0.0005;
                mesh.userData.velocity.x += mouseDx * force;
                mesh.userData.velocity.y += mouseDy * force;
            }

            // 3. Separation/Repulsion (Avoid clustering)
            for (let i = index + 1; i < this.products.length; i++) {
                const other = this.products[i];
                const dx = other.position.x - mesh.position.x;
                const dy = other.position.y - mesh.position.y;
                const dSquared = dx * dx + dy * dy;
                if (dSquared < 9) { // 3 units away
                    const dist = Math.sqrt(dSquared) || 1;
                    const repulsion = (3 - dist) * 0.0002;
                    mesh.userData.velocity.x -= (dx / dist) * repulsion;
                    mesh.userData.velocity.y -= (dy / dist) * repulsion;
                    other.userData.velocity.x += (dx / dist) * repulsion;
                    other.userData.velocity.y += (dy / dist) * repulsion;
                }
            }

            // Apply friction/drag
            mesh.userData.velocity.x *= 0.97;
            mesh.userData.velocity.y *= 0.97;

            mesh.position.x += mesh.userData.velocity.x;
            mesh.position.y += mesh.userData.velocity.y;

            // Pulsing effect
            mesh.userData.pulsePhase += mesh.userData.pulseSpeed;
            const pulse = 1 + Math.sin(mesh.userData.pulsePhase) * 0.05;
            mesh.scale.set(pulse, pulse, pulse);

            // Boundary soft limits
            if (Math.abs(mesh.position.x) > 25) mesh.userData.velocity.x *= -0.5;
            if (Math.abs(mesh.position.y) > 20) mesh.userData.velocity.y *= -0.5;
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
