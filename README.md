# 🏥 SSV Nauka - Educational Platform for Surgeons

<div align="center">

![Platform Preview](public/og-image.png)

**Comprehensive online educational platform for gastric cancer surgery training**

[![Build Status](https://github.com/Serg2206/gastric-surgery-course/actions/workflows/deploy.yml/badge.svg)](https://github.com/Serg2206/gastric-surgery-course/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-18+-green)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Live Demo](https://ssvproff.abacusai.app) · [Documentation](https://serg2206.github.io/gastric-surgery-course/) · [Report Bug](https://github.com/Serg2206/gastric-surgery-course/issues) · [Request Feature](https://github.com/Serg2206/gastric-surgery-course/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Course Modules](#-course-modules)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

SSV Nauka is a modern, interactive educational platform designed specifically for surgeons specializing in gastric cancer surgery. The platform combines cutting-edge web technologies with medical education best practices to deliver an engaging learning experience.

### Why SSV Nauka?

- **🎓 Comprehensive Curriculum**: 10 detailed modules covering everything from molecular biology to post-operative care
- **🔬 Interactive Learning**: 3D visualizations, CT simulators, and 360° surgical videos
- **📱 Responsive Design**: Learn on any device - desktop, tablet, or mobile
- **🔐 Secure Authentication**: Google SSO integration for easy and secure access
- **📊 Progress Tracking**: Monitor your learning journey with integrated analytics

---

## ✨ Features

### 🎯 Core Features

- **Interactive 3D Models**: Explore anatomical structures with fully interactive 3D visualizations
- **CT Simulator**: Practice reading CT scans with our advanced simulation tool
- **Endoscopy Marking**: Learn proper endoscopic techniques with interactive marking exercises
- **Surgical Checklist**: Comprehensive pre-operative and intra-operative checklists
- **360° Surgical Videos**: Immersive surgical video experiences
- **Robotic Surgery Demo**: Learn the latest robotic surgical techniques

### 🛠️ Technical Features

- **Server-Side Rendering**: Fast page loads with Next.js 14 App Router
- **TypeScript**: Type-safe code for reliability and maintainability
- **Prisma ORM**: Efficient database management
- **NextAuth.js**: Secure authentication with Google OAuth
- **Google Analytics**: Track user engagement and course effectiveness
- **Responsive UI**: Beautiful design with Tailwind CSS and Radix UI components

---

## 📚 Course Modules

### Module 1: Molecular Biology and Genetics of Gastric Cancer
- H. pylori pathway visualization
- TCGA subtypes explorer
- Genetic landscape mapping

### Module 2: Diagnosis and Staging
- Endoscopy marking exercises
- CT simulator
- Imaging comparison tools

### Module 3: Surgical Anatomy
- 3D anatomy visualization
- Key vessels identification
- Anatomical landmarks

### Module 4: Lymph Node Dissection
- Interactive lymph node mapping
- 3D lymphatic system visualization
- D1, D2, D3 dissection techniques

### Module 5: Surgical Techniques
- Open gastrectomy procedures
- Laparoscopic approaches
- Robotic surgery demonstrations

### Module 6: Reconstruction Methods
- Billroth I & II reconstructions
- Roux-en-Y procedures
- 3D reconstruction animations

### Module 7: Minimally Invasive Surgery
- Laparoscopic techniques
- Robotic surgery advantages
- Port placement strategies

### Module 8: Multimodal Treatment
- Neoadjuvant therapy protocols
- Adjuvant chemotherapy
- Radiation therapy integration

### Module 9: Complications Management
- Early complications
- Late complications
- Emergency management protocols

### Module 10: Post-operative Care and Follow-up
- Recovery protocols
- Nutritional management
- Long-term surveillance

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts, React-Plotly.js

### Backend
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **API Routes**: Next.js API Routes

### DevOps & Tools
- **Package Manager**: Yarn
- **Analytics**: Google Analytics 4
- **Deployment**: Vercel / Custom hosting
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Yarn package manager
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Serg2206/gastric-surgery-course.git
   cd gastric-surgery-course
   ```

2. **Install dependencies**
   ```bash
   cd nextjs_space
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and fill in your credentials (see [Environment Variables](#-environment-variables))

4. **Set up the database**
   ```bash
   yarn prisma generate
   yarn prisma db push
   yarn prisma db seed
   ```

5. **Run the development server**
   ```bash
   yarn dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Create a `.env` file in the `nextjs_space` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ssvnauka"

# NextAuth
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
# Get from: https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Google Analytics
# Get from: https://analytics.google.com/
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### How to Get Credentials

#### Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret

#### Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to Admin → Data Streams → Web
4. Copy the Measurement ID (format: G-XXXXXXXXXX)

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Manual Deployment

```bash
# Build the project
yarn build

# Start production server
yarn start
```

### GitHub Pages Documentation

The project includes a documentation site hosted on GitHub Pages:
- **Documentation URL**: [https://serg2206.github.io/gastric-surgery-course/](https://serg2206.github.io/gastric-surgery-course/)
- **Source**: `docs/index.html`

To enable GitHub Pages:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/docs` folder
4. Save

### CI/CD with GitHub Actions

The repository includes automated workflows in `.github/workflows/deploy.yml`:
- ✅ Automated testing on pull requests
- ✅ Build verification on push to main
- ✅ Deployment notifications
- ✅ Code quality checks

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

Please read our [Contributing Guide](CONTRIBUTING.md) for detailed information on:

- 📋 Code of conduct
- 🚀 Setting up your development environment
- 💻 Development workflow
- 📝 Code style guidelines
- 🔄 Pull request process
- 🐛 Bug reporting

**Quick Start for Contributors:**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Project Maintainer**: Serg2206

**Website**: [https://ssvproff.abacusai.app](https://ssvproff.abacusai.app)

**GitHub**: [@Serg2206](https://github.com/Serg2206)

---

## 🙏 Acknowledgments

- Medical content reviewed by board-certified surgeons
- Interactive components inspired by modern medical education practices
- Built with love for the surgical community

---

<div align="center">

**Made with ❤️ for surgeons, by surgeons**

⭐ Star this repository if you find it helpful!

</div>
