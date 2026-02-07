# 🚀 Portfolio - Nirush Man Shrestha

A modern, interactive personal portfolio website showcasing projects, skills, and professional experience. Built with cutting-edge web technologies and designed with accessibility, performance, and user experience in mind.

🌐 **Live Site**: [nirushmanshrestha.com.np](https://nirushmanshrestha.com.np)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)

---

## 🎯 Overview

This portfolio website serves as a comprehensive digital presence for showcasing software engineering skills, projects, and professional journey. The site features:

- **Interactive UI/UX**: Smooth animations, 3D effects, and responsive design
- **Performance Optimized**: Static site generation with Next.js App Router
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Modern Architecture**: Component-based with TypeScript for type safety

---

## ✨ Features

### 🏠 Hero Section
- **3D Tilt Profile Image**: Interactive profile picture with physics-based 3D tilt effect
- **Animated Text**: Custom scroll-triggered text animations
- **Quick Links**: GitHub, LinkedIn, Email, and Resume download
- **Professional Stats**: Years of experience, projects completed, and technology proficiencies

### 👤 About Section
- **Personal Journey**: Comprehensive background and career story
- **Philosophy**: Development approach and values
- **Timeline**: Educational and professional milestones
- **Staggered Animations**: Cards fade in sequentially for visual appeal

### 💼 Portfolio Section
Multi-tab interface featuring:

1. **Projects Tab**
   - 6+ featured projects with descriptions, tech stacks, and live links
   - Project cards with hover effects and smooth transitions
   - Technology badges for quick stack identification

2. **Certifications Tab**
   - Professional certifications with issuer and date information
   - Modal image viewer for certificate inspection
   - Keyboard navigation support (ESC to close)

3. **Skills Tab**
   - Interactive tech stack grid with categories:
     - Backend Development (Go, PostgreSQL, RESTful APIs)
     - Frontend Development (React, TypeScript, Tailwind CSS)
     - Tools & Platforms (Git, Docker, VS Code, Figma)
   - Animated star field background effect
   - Responsive skill cards with icons

### 📬 Contact Section
- **Contact Form**: Validated form with name, email, and message fields
- **Form Validation**: Client-side validation with error handling
- **Success/Error States**: Visual feedback for form submission
- **Social Links**: Quick access to GitHub, LinkedIn, and Email

### 🧭 Navigation
- **Sticky Navbar**: Transparent on scroll with active section highlighting
- **Theme Toggle**: Light/Dark mode with smooth transitions and localStorage persistence
- **Mobile Responsive**: Hamburger menu with slide-in animation
- **Smooth Scrolling**: Native smooth scroll to section anchors

### 🎨 Visual Effects
- **Snow Effect**: Canvas-based particle system with physics simulation
  - Device-optimized (different particle counts for mobile/tablet/desktop)
  - Performance-conscious with RAF and DPR optimization
- **Glass Morphism**: Modern frosted glass UI elements
- **Gradient Overlays**: Dynamic color gradients throughout the design

---

## 🛠 Tech Stack

### Core Technologies
- **[Next.js 16.1.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Development Tools
- **ESLint 9** - Code linting and quality enforcement
- **PostCSS** - CSS transformation pipeline
- **Font Awesome** - Icon library for UI elements
- **Google Fonts (Inter)** - Modern sans-serif typography

### Key Dependencies
```json
{
  "next": "16.1.5",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "typescript": "^5",
  "tailwindcss": "^4"
}
```

### Build Configuration
- **Static Export**: Pre-rendered at build time for optimal performance
- **Image Optimization**: Disabled for static hosting compatibility
- **Trailing Slashes**: Enabled for consistent URL structure

---

## 📁 Project Structure

```
Portfolio_Nirush/
├── app/                          # Next.js App Directory
│   ├── components/               # React Components
│   │   ├── AboutSection.tsx      # About me section with timeline
│   │   ├── ContactSection.tsx    # Contact form with validation
│   │   ├── HeroSection.tsx       # Landing section with 3D effects
│   │   ├── Navbar.tsx            # Navigation with theme toggle
│   │   ├── PortfolioSection.tsx  # Projects/Certs/Skills tabs
│   │   ├── SnowEffect.tsx        # Canvas particle animation
│   │   ├── StarField.tsx         # Background star animation
│   │   ├── TechStackGrid.tsx     # Skills grid component
│   │   ├── portfolioData.ts      # Centralized data configuration
│   │   └── index.ts              # Component exports
│   ├── hooks/                    # Custom React Hooks
│   │   └── useTextAnimation.ts   # Intersection Observer animations
│   ├── globals.css               # Global styles and CSS variables
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Home page composition
├── public/                       # Static Assets
│   ├── Certification/            # Certificate images
│   ├── profile/                  # Profile pictures
│   ├── project/                  # Project screenshots
│   ├── skills/                   # Technology icons
│   └── CNAME                     # Custom domain configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js**: Version 18.0 or higher
- **npm/yarn/pnpm/bun**: Package manager of your choice

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ByteNirush/Portfolio_Nirush.git
   cd Portfolio_Nirush
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 💻 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

### Hot Module Replacement (HMR)

The development server supports HMR, so changes to files are reflected immediately without a full page reload. Edit any file in the `app/` directory and see changes instantly.

### Key Development Features

- **TypeScript**: Full type safety across the codebase
- **Auto-imports**: VS Code auto-imports for components and utilities
- **Path Aliases**: Use `@/` to import from the project root
- **CSS Variables**: Theme variables in `globals.css` for easy customization
- **Component Isolation**: Each section is a self-contained component

---

## 🤝 Connect

- **GitHub**: [@ByteNirush](https://github.com/ByteNirush)
- **LinkedIn**: [Nirush Man Shrestha](https://www.linkedin.com/in/nirushmanshrestha/)
- **Email**: [dev.nirush@gmail.com](mailto:dev.nirush@gmail.com)
- **Website**: [nirushmanshrestha.com.np](https://nirushmanshrestha.com.np)

---

<div align="center">
  <p>
  Built with ❤️ by 
  <a href="https://nirushmanshrestha.com.np" target="_blank" rel="noopener noreferrer">
    Nirush Man Shrestha
  </a>
</p>

  <p><strong>Software Engineer | Backend Developer | Open Source Contributor</strong></p>
</div>
