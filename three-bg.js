/**
 * FLEXOVERSE - Simple Educational 3D Background
 * Soft floating particles + a few slow-rotating wireframe shapes
 * that evoke learning, precision, and industry — without distraction.
 */

class FlexoBackground {
    constructor() {
        this.container = document.getElementById('canvas-container');
        if (!this.container) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        this.container.appendChild(this.renderer.domElement);

        this.shapes = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.clock = new THREE.Clock();

        this.init();
        this.animate();

        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }

    init() {
        // ── Lighting ──────────────────────────────────────────────
        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambient);

        const dir = new THREE.DirectionalLight(0x0ea5e9, 0.8);
        dir.position.set(5, 8, 5);
        this.scene.add(dir);

        // ── Star field particles ───────────────────────────────────
        this.createStarField();

        // ── Floating wireframe shapes (educational geometry) ───────
        this.createShapes();

        this.camera.position.z = 14;
    }

    createStarField() {
        const count = 1200;
        const geo = new THREE.BufferGeometry();
        const pos = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 80;
            pos[i + 1] = (Math.random() - 0.5) * 60;
            pos[i + 2] = (Math.random() - 0.5) * 40 - 10;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

        const mat = new THREE.PointsMaterial({
            size: 0.06,
            color: 0x38bdf8,   // soft sky-blue
            transparent: true,
            opacity: 0.35,
            sizeAttenuation: true
        });

        this.starField = new THREE.Points(geo, mat);
        this.scene.add(this.starField);
    }

    createShapes() {
        // A small set of subtle wireframe shapes spread across the scene
        const definitions = [
            // [geometry, x, y, z, scale, speedX, speedY]
            [new THREE.IcosahedronGeometry(1.2, 0), -10, 4, -5, 1.0, 0.003, 0.002],
            [new THREE.IcosahedronGeometry(0.7, 0), 12, -3, -8, 1.0, 0.002, 0.004],
            [new THREE.OctahedronGeometry(1.0, 0), 5, 6, -6, 1.0, 0.004, 0.001],
            [new THREE.OctahedronGeometry(0.6, 0), -14, -5, -9, 1.0, 0.002, 0.003],
            [new THREE.TetrahedronGeometry(0.9, 0), 8, -7, -7, 1.0, 0.003, 0.003],
            [new THREE.TetrahedronGeometry(0.55, 0), -6, 8, -10, 1.0, 0.005, 0.002],
            [new THREE.IcosahedronGeometry(0.45, 0), 0, -8, -6, 1.0, 0.004, 0.004],
            [new THREE.OctahedronGeometry(0.8, 0), -9, -9, -12, 1.0, 0.002, 0.005],
        ];

        definitions.forEach(([geo, x, y, z, scale, sx, sy]) => {
            const mat = new THREE.MeshBasicMaterial({
                color: 0x0ea5e9,
                wireframe: true,
                transparent: true,
                opacity: 0.18
            });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(x, y, z);
            mesh.scale.setScalar(scale);
            mesh.userData = {
                speedX: sx,
                speedY: sy,
                baseY: y,
                floatPhase: Math.random() * Math.PI * 2,
                floatSpeed: 0.004 + Math.random() * 0.003
            };
            this.scene.add(mesh);
            this.shapes.push(mesh);
        });
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

        const t = this.clock.getElapsedTime();

        // Smooth mouse parallax — very gentle camera drift
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.04;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.04;

        this.camera.position.x = this.mouse.x * 1.2;
        this.camera.position.y = -this.mouse.y * 1.0;
        this.camera.lookAt(0, 0, 0);

        // Rotate shapes slowly — calm and professional
        this.shapes.forEach(mesh => {
            mesh.rotation.x += mesh.userData.speedX;
            mesh.rotation.y += mesh.userData.speedY;

            // Gentle vertical float
            mesh.userData.floatPhase += mesh.userData.floatSpeed;
            mesh.position.y = mesh.userData.baseY + Math.sin(mesh.userData.floatPhase) * 0.6;
        });

        // Very slow star field drift
        if (this.starField) {
            this.starField.rotation.y = t * 0.008;
            this.starField.rotation.x = t * 0.003;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        new FlexoBackground();
    }
});
