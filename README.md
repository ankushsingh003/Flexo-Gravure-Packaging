# Flexoverse - Interactive 3D E-Learning Platform

## 📚 Project Overview

Flexoverse is a comprehensive interactive e-learning platform for flexography packaging courses. It features a home page with a learning path selector, separate pages for basic and advanced courses, and full course management functionality.

## 📁 File Structure

```
mini_project/
├── index.html              # Home page with learning path selector
├── basic-courses.html      # Basic courses page (7 courses)
├── advanced-courses.html   # Advanced courses page (4 courses)
├── styles.css             # Complete styling
├── script.js              # JavaScript functionality
└── README.md              # This file
```

## 🎯 Features

### Home Page (index.html)

- **Hero Section**: Welcome area with "Start Learning" button
- **Explore Modal**: Pop-up that appears when clicking "Start Learning"
  - Shows options for "Basic Courses" and "Advanced Courses"
  - Each option displays course count and key topics
- **Featured Preview Section**: Quick preview cards for both learning paths
- **Statistics**: Platform metrics and learner information
- **Testimonials**: Success stories from learners
- **Contact Form**: For inquiries and support
- **Navigation**: Quick links to all sections

### Basic Courses Page (basic-courses.html)

- **7 Foundation Courses:**
  1. Flexography Packaging
  2. Gravure Packaging
  3. Flexographic Inks
  4. Flexographic Materials
  5. Flexographic Defects
  6. Flexographic Machines
  7. Prepress

- **Features:**
  - Filter courses by category (Materials, Equipment, Process)
  - Click any course to view detailed information
  - Modules and learning outcomes for each course
  - Enrollment system with confirmation
  - Statistics and testimonials

### Advanced Courses Page (advanced-courses.html)

- **4 Expert Courses:**
  1. Machine Efficiency
  2. Handling Output
  3. Print Quality Control
  4. Flexographic Wastage Control

- **Features:**
  - Filter courses by category (Efficiency, Quality)
  - Requirements section highlighting prerequisites
  - Advanced course details and modules
  - Expert testimonials
  - Professional certification info

## 🚀 How to Use

### Starting the Application

1. Open `index.html` in your web browser
2. Click the "Start Learning" button to see the learning path selector
3. Choose between Basic or Advanced courses

### Navigation Flow

```
index.html (Home)
├── Click "Start Learning"
│   ├── Explore Modal appears
│   │   ├── Click "Start Basic" → basic-courses.html
│   │   └── Click "Start Advanced" → advanced-courses.html
│   └── Or use featured preview cards
├── basic-courses.html
│   ├── View all 7 basic courses
│   ├── Filter by category
│   ├── Click course to enroll
│   └── Link to advanced courses
└── advanced-courses.html
    ├── View all 4 advanced courses
    ├── Filter by category
    ├── Click course to enroll
    └── Link back to basic courses
```

### Interacting with Courses

1. **View Courses**: Browse all courses on dedicated pages
2. **Filter Courses**: Use filter buttons to sort by category
3. **Course Details**: Click on any course card to see:
   - Course description
   - Level and duration
   - Number of modules
   - Learning outcomes
4. **Enroll**: Click "Enroll Now" to enroll in a course
5. **Success Message**: See enrollment confirmation

### Contact

- Navigate to the contact section on the home page
- Fill out the contact form to send inquiries

## 🎨 Design Features

### Colors & Theme

- **Primary**: Blue (#2563eb)
- **Secondary**: Dark Blue (#1e40af)
- **Accent**: Amber (#f59e0b)
- **Success**: Green (#10b981)
- **Background**: Light Gray (#f8fafc)

### Responsive Design

- **Desktop**: Full layout with multi-column grids
- **Tablet**: Adjusted grid layout
- **Mobile**: Single column layout

### Animations

- Smooth scrolling navigation
- Card hover effects
- Modal fade-in animations
- Button transitions

## 📱 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## ⚙️ Technical Details

### HTML Pages

- Semantic HTML5 structure
- Responsive meta tags
- External CSS and JavaScript links

### CSS (styles.css)

- CSS Variables for consistent theming
- Flexbox and CSS Grid layouts
- Mobile-first responsive design
- Smooth transitions and animations

### JavaScript (script.js)

- Course data structure with 11 courses
- Modal management (course details, enrollment, explore)
- Filtering functionality
- Navigation updates
- Form handling
- Analytics tracking setup

## 🔧 Customization

### Adding New Courses

Edit `script.js` and add to the `courses` object:

```javascript
{
    id: 12,
    title: "New Course Title",
    category: "category-name",
    icon: "📌",
    description: "Course description",
    level: "Beginner/Intermediate/Advanced",
    duration: "X weeks",
    learners: "number",
    modules: ["Module 1", "Module 2"],
    outcomes: ["Outcome 1", "Outcome 2"]
}
```

### Changing Colors

Modify CSS variables in `styles.css`:

```css
:root {
  --primary-color: #newcolor;
  --secondary-color: #newcolor;
  /* ... other colors */
}
```

### Adding More Sections

Duplicate course pages and modify course loading functions in JavaScript.

## 📊 Course Statistics

- **Total Courses**: 11
- **Basic Courses**: 7
- **Advanced Courses**: 4
- **Total Modules**: 55+
- **Platform Users**: 5000+

## 🎓 Learning Paths

### Basic Path

Best for: Beginners and new learners
Duration: 3-6 weeks per course
Topics: Fundamentals, materials, equipment, processes

### Advanced Path

Best for: Experienced professionals
Duration: 4-7 weeks per course
Topics: Optimization, efficiency, quality control

## 💡 Tips for Best Experience

1. Start with basic courses if you're new to flexography
2. Complete courses sequentially for better understanding
3. Take notes while learning
4. Refer to modules for quick revision
5. Enroll in related courses to deepen knowledge

## 📞 Support

- Contact form available on home page
- 24/7 support mentioned in enrollment details
- Email support available (customizable)

## 📄 License

Educational Platform © 2026 Flexoverse. All rights reserved.

---

**Version**: 1.0
**Last Updated**: January 21, 2026
**Created by**: Flexoverse Team
