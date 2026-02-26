# Resident's Management System - AI Agent Guide

## Project Overview

This is a **Resident's Management System** - a frontend dashboard web application designed for property residents to manage their unit information, billing, payments, and service requests. It is a static multi-page website (MPA) built with HTML, CSS, and JavaScript.

### Purpose
- Provide residents with a self-service portal
- Display property/unit information and purchase details
- Track payment history and upcoming bills
- Submit support requests and view FAQs
- Customize unit interior options

---

## Technology Stack

| Category | Technology | Version | Source |
|----------|------------|---------|--------|
| Markup | HTML5 | - | Static files |
| Styling | CSS3 | - | `css/style.css` |
| CSS Framework | Bootstrap | 5.3.2 | CDN |
| Icons | Bootstrap Icons | 1.11.1 | CDN |
| JavaScript | jQuery | 3.7.1 | CDN |
| Slider | Swiper | 11 | CDN |
| Font | Figtree | 300-800 | Google Fonts |

**Note:** This is a pure frontend project with no build system, package manager, or backend integration.

---

## Project Structure

```
dashboard-invoice/
├── .git/                      # Git repository
├── css/
│   └── style.css              # Main stylesheet (~1280 lines)
├── js/
│   └── script.js              # Main JavaScript (jQuery-based)
├── img/                       # Images folder (currently empty)
├── login.html                 # Entry point - Login page
├── otp.html                   # OTP verification page
├── dashboard.html             # Main dashboard with payment overview
├── billing.html               # Billing history and payment table
├── my-unit.html               # Unit details & interior customization
├── requests.html              # FAQ accordion and contact form
├── account-settings.html      # User profile and settings
└── AGENTS.md                  # This file
```

---

## Page Architecture

### Authentication Flow
1. **login.html** - Unit number + password login form
2. **otp.html** - 4-digit OTP verification (simulated)
3. Redirects to dashboard.html after "authentication"

### Dashboard Pages (Require Sidebar Navigation)
All dashboard pages share a common layout with:
- Fixed sidebar navigation (250px width on desktop)
- Mobile-responsive hamburger menu
- Consistent header section with title and subtitle

| Page | Purpose | Key Features |
|------|---------|--------------|
| dashboard.html | Overview | Profile card, recent payments, upcoming payments |
| billing.html | Payments | Payment progress bar, billing table with pagination |
| my-unit.html | Unit Details | Image gallery, interior customization swatches |
| requests.html | Support | FAQ accordion, contact form |
| account-settings.html | Profile | Personal info form, password change |

---

## CSS Architecture

### File Organization (`css/style.css`)
The stylesheet is organized in the following sections:

1. **Base Styles** (lines 1-111): CSS variables, reset, typography utilities
2. **Login/OTP Styles** (lines 113-280): Authentication page specific styles
3. **Dashboard Layout** (lines 282-569): Sidebar, content area, responsive breakpoints
4. **Requests Page** (lines 799-916): FAQ accordion, form styles
5. **Billing Page** (lines 918-1134): Tables, pagination, payment methods
6. **My Unit Page** (lines 1136-1278): Gallery, swatches, cards

### CSS Variables
```css
:root {
    --primary-color: #4e81fb;    /* Main brand blue */
    --text-muted: #888;           /* Secondary text */
    --border-color: #dee2e6;      /* Default borders */
    --bg-light: #fbfcff;          /* Page background */
}
```

### Responsive Breakpoints
- **Desktop**: > 991px (sidebar visible, full layout)
- **Tablet/Mobile**: <= 991px (collapsible sidebar, stacked layout)
- **Small Mobile**: <= 576px (compact login card, adjusted OTP inputs)

### Bootstrap Usage
- Grid system (`container`, `row`, `col-*`)
- Utility classes for spacing, flexbox, display
- Accordion component (requests.html)
- Form controls and buttons

---

## JavaScript Architecture

### File: `js/script.js`

All interactivity is contained in a single jQuery document-ready block.

#### Features Implemented:

1. **Password Toggle** (`#togglePassword`)
   - Toggles between `type="password"` and `type="text"`
   - Switches icon between `bi-eye-slash` and `bi-eye`

2. **Login Form Handler** (`#loginForm`)
   - Basic validation (checks if fields are filled)
   - Redirects to `otp.html` on "success"

3. **OTP Input Logic** (`.otp-input`)
   - Auto-advances to next input after entry
   - Handles backspace to previous input
   - Auto-redirects to `dashboard.html` when all 4 digits entered

4. **Sidebar Toggle** (`#sidebarCollapse`)
   - Opens/closes sidebar on mobile
   - Click-outside-to-close functionality
   - Overlay backdrop for mobile

5. **Mobile Tab Switching** (`.tab-item`)
   - Switches between "Recent" and "Upcoming" payment views
   - Data attribute `data-target` determines content to show

6. **My Unit Interactions**
   - Thumbnail switching (`.thumb-item`)
   - Color swatch selection (`.swatch-item`)

---

## Development Conventions

### HTML Conventions
- Use semantic HTML5 elements
- All pages include consistent `<head>` structure with CDNs
- Comments mark major sections (e.g., `<!-- Sidebar -->`)
- Bootstrap grid classes for layout

### CSS Conventions
- BEM-like naming for custom components (e.g., `.payment-card`, `.profile-section`)
- Utility classes for typography (`.font-xl`, `.bold-2x`, `.semi-bold`)
- Mobile-first media queries
- Use CSS variables for theming consistency

### JavaScript Conventions
- jQuery for DOM manipulation and event handling
- Event delegation for dynamic elements
- ID selectors for unique elements, class selectors for groups
- Mock functionality with comments indicating where backend integration would go

---

## Build and Deployment

### No Build Process
This project has **no build system**. It is ready to deploy as static files.

### Local Development
Serve the files using any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if http-server is installed)
npx http-server

# PHP
php -S localhost:8000

# VS Code Live Server extension
```

Then open `http://localhost:8000/login.html` in your browser.

### Deployment
Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Traditional web hosting (Apache/Nginx)

### File Paths
- Use relative paths (`css/style.css`, `js/script.js`)
- All pages are in the root directory
- Images should be placed in `img/` folder (currently empty)

---

## Mock Data and Limitations

### Current State
- All data is hardcoded in HTML
- Forms simulate submission with client-side redirects
- No actual backend integration
- Authentication is simulated (any non-empty values work)

### Mock User Profile
- Name: Alex J. Kusuma
- Unit: Tower 2, Floor 12, Unit T
- Office Area: 100 M²
- Unit Price: USD 500,000
- Payment Term: 24 Months Instalment
- Total Payment Made: USD 450,000

### To Integrate with Backend
Look for these patterns in the code:
- Form `submit` handlers in `script.js`
- Hardcoded values in HTML tables
- Static image placeholders

---

## Testing Instructions

### Manual Testing Checklist

**Authentication Flow:**
- [ ] Login page displays correctly on desktop and mobile
- [ ] Password visibility toggle works
- [ ] Empty form validation shows alert
- [ ] Successful login redirects to OTP
- [ ] OTP auto-advances between fields
- [ ] OTP completion redirects to dashboard

**Navigation:**
- [ ] Sidebar links work on all dashboard pages
- [ ] Active state highlights current page
- [ ] Mobile hamburger menu opens/closes
- [ ] Clicking outside closes mobile menu
- [ ] Overlay appears behind mobile menu

**Dashboard:**
- [ ] Profile section displays correctly
- [ ] Mobile tabs switch between Recent/Upcoming
- [ ] Payment items styled correctly

**Responsive Design:**
- [ ] Layout adapts at 991px breakpoint
- [ ] Sidebar collapses on mobile
- [ ] Tables are scrollable on small screens
- [ ] Login card adapts at 576px breakpoint

---

## Security Considerations

### Current Limitations (Demo Project)
1. **No HTTPS enforcement** - Implement HTTPS in production
2. **Simulated authentication** - No actual auth backend
3. **Client-side only** - All data is visible in source
4. **No CSRF protection** - Not applicable for static site
5. **No input sanitization** - Required when connecting to backend

### Before Production
- Implement proper backend authentication
- Add server-side session management
- Sanitize all user inputs
- Use HTTPS only
- Add Content Security Policy headers
- Implement rate limiting on login/OTP endpoints

---

## Common Tasks for AI Agents

### Adding a New Page
1. Copy `dashboard.html` as template
2. Update `<title>` and page heading
3. Add sidebar nav link with appropriate `active` class
4. Add page-specific styles to `css/style.css`
5. Link to `js/script.js` at bottom

### Adding New Styles
1. Follow existing naming conventions (BEM-like)
2. Use CSS variables for colors
3. Add responsive styles in appropriate media query
4. Group related styles together
5. Comment section headers

### Adding JavaScript Functionality
1. Use jQuery (already loaded)
2. Add event listeners in `$(document).ready()`
3. Use descriptive IDs and classes
4. Comment mock vs. real functionality
5. Test on mobile viewport sizes

### Adding Images
1. Place files in `img/` folder
2. Reference with relative path: `img/filename.png`
3. Update CSS background-image URLs if needed
4. Optimize images for web (compress, appropriate dimensions)

---

## External Dependencies

All loaded via CDN (requires internet connection):

```html
<!-- Google Fonts -->
https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap

<!-- Bootstrap CSS -->
https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css

<!-- Bootstrap Icons -->
https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css

<!-- Swiper CSS -->
https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css

<!-- jQuery -->
https://code.jquery.com/jquery-3.7.1.min.js

<!-- Bootstrap JS -->
https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js

<!-- Swiper JS -->
https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js
```

---

## Notes for Future Development

1. **Backend Integration**: The login form, OTP, and all data display are currently simulated. When integrating a backend:
   - Replace form `submit` handlers with AJAX calls
   - Implement proper session/token management
   - Move data from HTML to API endpoints

2. **Image Assets**: The `img/` folder is currently empty. Placeholder divs are used throughout. Replace with actual:
   - User profile photos
   - Unit/property images
   - Floor plan diagrams

3. **Accessibility**: Current implementation has basic accessibility. Improvements needed:
   - ARIA labels for interactive elements
   - Focus management for modals/mobile menu
   - Color contrast verification
   - Keyboard navigation testing

4. **Performance**: Consider these optimizations for production:
   - Minify CSS and JS
   - Optimize and lazy-load images
   - Implement caching headers
   - Consider bundling dependencies if many are added
