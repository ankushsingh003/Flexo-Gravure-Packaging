// ============================================
// FLEXOLEARN - E-Learning Platform JavaScript
// ============================================

// Course Data
const courses = {
    basic: [
        {
            id: 1,
            title: "Flexography Packaging",
            category: "process",
            icon: "📦",
            description: "Learn the fundamentals of flexography packaging and its applications in various industries.",
            level: "Beginner",
            duration: "4 weeks",
            learners: "1,250",
            modules: [
                "Introduction to Flexography",
                "Packaging Materials",
                "Flexography Process Flow",
                "Quality Standards",
                "Industry Applications"
            ],
            outcomes: [
                "Understand flexography basics",
                "Know different packaging types",
                "Learn quality control measures",
                "Identify packaging defects"
            ]
        },
        {
            id: 2,
            title: "Gravure Packaging",
            category: "process",
            icon: "🎨",
            description: "Master the gravure packaging technique and understand its advantages and limitations.",
            level: "Beginner",
            duration: "3 weeks",
            learners: "890",
            modules: [
                "Gravure Technology Overview",
                "Cylinder Preparation",
                "Ink Systems",
                "Printing Techniques",
                "Comparison with Flexography"
            ],
            outcomes: [
                "Understand gravure principles",
                "Learn cylinder design",
                "Know ink formulations",
                "Compare printing methods"
            ]
        },
        {
            id: 3,
            title: "Flexographic Inks",
            category: "material",
            icon: "🧪",
            description: "Comprehensive guide to flexographic ink formulations, properties, and applications.",
            level: "Intermediate",
            duration: "4 weeks",
            learners: "945",
            modules: [
                "Ink Chemistry Basics",
                "Ink Formulation",
                "Color Management",
                "Ink Drying Technologies",
                "Environmental Compliance"
            ],
            outcomes: [
                "Understand ink composition",
                "Learn color theory",
                "Know drying methods",
                "Ensure regulatory compliance"
            ]
        },
        {
            id: 4,
            title: "Flexographic Materials",
            category: "material",
            icon: "🏭",
            description: "Explore various materials used in flexographic printing and their characteristics.",
            level: "Beginner",
            duration: "3 weeks",
            learners: "1,100",
            modules: [
                "Substrate Types",
                "Film Materials",
                "Adhesive Technology",
                "Material Selection Guide",
                "Sustainability Practices"
            ],
            outcomes: [
                "Know different substrates",
                "Understand material properties",
                "Select appropriate materials",
                "Learn eco-friendly options"
            ]
        },
        {
            id: 5,
            title: "Flexographic Defects",
            category: "quality",
            icon: "⚠️",
            description: "Identify common printing defects and learn how to prevent and correct them.",
            level: "Intermediate",
            duration: "5 weeks",
            learners: "1,050",
            modules: [
                "Common Defects Overview",
                "Defect Causes",
                "Detection Techniques",
                "Corrective Measures",
                "Quality Improvements"
            ],
            outcomes: [
                "Identify printing defects",
                "Know root causes",
                "Apply corrections",
                "Improve print quality"
            ]
        },
        {
            id: 6,
            title: "Flexographic Machines",
            category: "equipment",
            icon: "⚙️",
            description: "Deep dive into flexographic printing equipment, components, and maintenance.",
            level: "Intermediate",
            duration: "6 weeks",
            learners: "820",
            modules: [
                "Machine Components",
                "Printing Units",
                "Drive Systems",
                "Maintenance Procedures",
                "Troubleshooting Guide"
            ],
            outcomes: [
                "Understand machine operation",
                "Know maintenance procedures",
                "Troubleshoot issues",
                "Optimize performance"
            ]
        },
        {
            id: 7,
            title: "Prepress",
            category: "process",
            icon: "📐",
            description: "Master the prepress process including plate design, preparation, and quality control.",
            level: "Intermediate",
            duration: "5 weeks",
            learners: "950",
            modules: [
                "File Preparation",
                "Plate Design",
                "Color Separation",
                "Plate Making",
                "Quality Assurance"
            ],
            outcomes: [
                "Prepare print files correctly",
                "Design quality plates",
                "Perform color separation",
                "Ensure prepress quality"
            ]
        }
    ],
    advanced: [
        {
            id: 8,
            title: "Machine Efficiency",
            category: "efficiency",
            icon: "⚡",
            description: "Optimize flexographic machines for maximum efficiency and productivity.",
            level: "Advanced",
            duration: "6 weeks",
            learners: "650",
            modules: [
                "Efficiency Metrics",
                "Performance Analysis",
                "Optimization Techniques",
                "Data Analytics",
                "Implementation Strategies"
            ],
            outcomes: [
                "Measure machine efficiency",
                "Identify bottlenecks",
                "Implement improvements",
                "Track performance gains"
            ]
        },
        {
            id: 9,
            title: "Handling Output",
            category: "efficiency",
            icon: "📦",
            description: "Advanced techniques for handling, packaging, and distribution of printed materials.",
            level: "Advanced",
            duration: "4 weeks",
            learners: "720",
            modules: [
                "Output Handling Systems",
                "Packaging Automation",
                "Quality Inspection",
                "Logistics Integration",
                "Customer Requirements"
            ],
            outcomes: [
                "Optimize output handling",
                "Automate processes",
                "Ensure quality",
                "Manage logistics efficiently"
            ]
        },
        {
            id: 10,
            title: "Print Quality Control",
            category: "quality",
            icon: "✅",
            description: "Advanced quality control methods and techniques for flexographic printing.",
            level: "Advanced",
            duration: "7 weeks",
            learners: "780",
            modules: [
                "Quality Standards",
                "Measurement Systems",
                "Statistical Analysis",
                "Spectrophotometry",
                "Automated QC Systems"
            ],
            outcomes: [
                "Implement QC systems",
                "Use measurement tools",
                "Perform statistical analysis",
                "Achieve zero defects"
            ]
        },
        {
            id: 11,
            title: "Flexographic Wastage Control",
            category: "efficiency",
            icon: "♻️",
            description: "Minimize waste in flexographic production through smart management and practices.",
            level: "Advanced",
            duration: "5 weeks",
            learners: "610",
            modules: [
                "Waste Identification",
                "Waste Reduction Strategies",
                "Environmental Impact",
                "Recycling Programs",
                "Cost Optimization"
            ],
            outcomes: [
                "Identify waste sources",
                "Reduce material waste",
                "Minimize environmental impact",
                "Lower production costs"
            ]
        }
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Only load courses on home page
    if (document.getElementById('basicCoursesGrid') && document.getElementById('advancedCoursesGrid')) {
        loadCourses();
    }
    setupEventListeners();
    updateNavigation();
});

// Load all courses into the grid
function loadCourses() {
    // Load basic courses
    const basicGrid = document.getElementById('basicCoursesGrid');
    courses.basic.forEach(course => {
        basicGrid.appendChild(createCourseCard(course));
    });

    // Load advanced courses
    const advancedGrid = document.getElementById('advancedCoursesGrid');
    courses.advanced.forEach(course => {
        advancedGrid.appendChild(createCourseCard(course));
    });
}

// Create course card HTML
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = `course-card ${course.category}`;
    card.onclick = () => openModal(course);

    const ratingStars = '⭐'.repeat(5);

    card.innerHTML = `
        <div class="course-icon">${course.icon}</div>
        <div class="course-header">
            <h3 class="course-title">${course.title}</h3>
            <span class="course-category">${getCategoryLabel(course.category)}</span>
            <p class="course-description">${course.description}</p>
            <div class="course-meta">
                <span>📚 ${course.duration}</span>
                <span>👥 ${course.learners} learners</span>
            </div>
        </div>
        <div class="course-footer">
            <span class="course-rating">${ratingStars}</span>
            <button class="btn-learn" onclick="event.stopPropagation(); openModal(${course.id})">Learn More</button>
        </div>
    `;

    return card;
}

// Get category label
function getCategoryLabel(category) {
    const labels = {
        material: 'Materials',
        equipment: 'Equipment',
        process: 'Process',
        quality: 'Quality',
        efficiency: 'Efficiency'
    };
    return labels[category] || category;
}

// Filter courses
function filterCourses(filter, level) {
    const gridId = level === 'basic' ? 'basicCoursesGrid' : 'advancedCoursesGrid';
    const grid = document.getElementById(gridId);
    const cards = grid.querySelectorAll('.course-card');

    cards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'block';
            setTimeout(() => card.style.opacity = '1', 10);
        } else {
            if (card.classList.contains(filter)) {
                card.style.display = 'block';
                setTimeout(() => card.style.opacity = '1', 10);
            } else {
                card.style.opacity = '0';
                setTimeout(() => card.style.display = 'none', 300);
            }
        }
    });

    // Update filter button states
    const buttons = event.target.parentElement.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Open explore modal
function openExploreModal() {
    const modal = document.getElementById('exploreModal');
    modal.classList.add('show');
}

// Close explore modal
function closeExploreModal() {
    const modal = document.getElementById('exploreModal');
    modal.classList.remove('show');
}

// Redirect to another page
function redirectTo(page) {
    window.location.href = page;
}

// Open course modal
function openModal(courseOrId) {
    let course;
    
    if (typeof courseOrId === 'number') {
        // Find course by ID
        course = [...courses.basic, ...courses.advanced].find(c => c.id === courseOrId);
    } else {
        course = courseOrId;
    }

    if (!course) return;

    document.getElementById('modalTitle').textContent = course.title;
    document.getElementById('modalCategory').textContent = getCategoryLabel(course.category);
    document.getElementById('modalLevel').textContent = course.level;
    document.getElementById('modalDuration').textContent = course.duration;
    document.getElementById('modalLearners').textContent = course.learners;
    document.getElementById('modalDescription').textContent = course.description;

    // Load modules
    const modulesList = document.getElementById('modalModules');
    modulesList.innerHTML = '';
    course.modules.forEach(module => {
        const li = document.createElement('li');
        li.textContent = module;
        modulesList.appendChild(li);
    });

    // Load outcomes
    const outcomesList = document.getElementById('modalOutcomes');
    outcomesList.innerHTML = '';
    course.outcomes.forEach(outcome => {
        const li = document.createElement('li');
        li.textContent = outcome;
        outcomesList.appendChild(li);
    });

    // Store current course for enrollment
    window.currentCourse = course;

    // Show modal
    const modal = document.getElementById('courseModal');
    modal.classList.add('show');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('courseModal');
    modal.classList.remove('show');
}

// Close modals when clicking outside
document.addEventListener('click', function(event) {
    const courseModal = document.getElementById('courseModal');
    const exploreModal = document.getElementById('exploreModal');
    
    if (event.target === courseModal) {
        closeModal();
    }
    if (event.target === exploreModal) {
        closeExploreModal();
    }
});

// Enroll in course
function enrollCourse() {
    const user = JSON.parse(localStorage.getItem('flexoUser'));
    if (!user || user.isGuest) {
        // Not logged in or guest, redirect to login and mark as from course
        sessionStorage.setItem('loginFromCourse', 'true');
        window.location.href = 'login.html';
        return;
    }

    if (window.currentCourse) {
        closeModal();
        
        // Show enrollment confirmation
        const enrollmentModal = document.getElementById('enrollmentModal');
        document.getElementById('enrolledCourseTitle').textContent = window.currentCourse.title;
        enrollmentModal.classList.add('show');

        // Simulate enrollment process
        console.log('Enrolled in:', window.currentCourse.title);
        
        // Show success notification
        showNotification('Successfully enrolled in ' + window.currentCourse.title);
    }
}

// Close enrollment modal
function closeEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.classList.remove('show');
}

// Handle contact form
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    // Simulate form submission
    console.log('Contact form submitted:', { name, email, message });
    
    showNotification('Message sent successfully! We will contact you soon.', 'success');
    event.target.reset();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Setup event listeners
function setupEventListeners() {
    // Close modal with ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
            closeEnrollmentModal();
            closeExploreModal();
        }
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', updateNavigation);
}

// Update navigation active state based on scroll
function updateNavigation() {
    const sections = ['home', 'basic', 'advanced', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    let current = 'home';

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search courses (future enhancement)
function searchCourses(query) {
    const allCourses = [...courses.basic, ...courses.advanced];
    const results = allCourses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}

// Get featured courses
function getFeaturedCourses() {
    return [courses.basic[0], courses.basic[2], courses.advanced[0]];
}

// Analytics tracking (for future implementation)
function trackCourseView(courseId) {
    console.log('Course view tracked:', courseId);
}

function trackCourseEnroll(courseId) {
    console.log('Course enrollment tracked:', courseId);
}

function trackPageVisit(page) {
    console.log('Page visit tracked:', page);
}

// Export functions for external use
window.FlexoLearn = {
    searchCourses,
    getFeaturedCourses,
    trackCourseView,
    trackCourseEnroll,
    trackPageVisit,
    openModal,
    closeModal,
    enrollCourse
};

console.log('FlexoLearn platform loaded successfully!');
