# 🎮 GamePortal

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, responsive gaming web application built with **React + TypeScript + Vite**, featuring interactive mini-games, user authentication, game history tracking, and a sleek UI powered by **Tailwind CSS** and **shadcn/ui components**.

---

## ✨ Features

### 🔐 **User Authentication**
- Secure login & registration system
- Form validation with error handling
- Context-based state management
- Protected routes and user sessions

### 🎲 **Interactive Mini Games**
- **Memory Clicker** - Test your memory skills
- **Lucky Box** - Try your luck with random rewards  
- **Tap Counter** - Speed and endurance challenge

### 🕹️ **Game Management**
- Comprehensive game library with preview cards
- Real-time game history tracking
- Score persistence and statistics
- Custom React hooks for game state

### 📱 **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Device orientation detection and prompts
- Smooth animations and transitions
- Cross-browser compatibility

### 🔔 **User Experience**
- Toast notifications for feedback
- Loading states and error boundaries
- Intuitive navigation and routing
- Accessibility-focused components

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript 5.0 |
| **Build Tool** | Vite 5.4 |
| **Styling** | Tailwind CSS, PostCSS |
| **UI Library** | shadcn/ui, Lucide React |
| **State Management** | React Context API |
| **Routing** | React Router DOM |
| **Code Quality** | ESLint, Prettier |

---

## 📂 Project Structure

```
gameportal/
├── public/
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/
│   │   ├── auth/              # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── games/             # Game components
│   │   │   ├── MemoryClicker.tsx
│   │   │   ├── LuckyBox.tsx
│   │   │   └── TapCounter.tsx
│   │   ├── history/           # Game history
│   │   │   └── GameHistory.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── RotateDevice.tsx
│   │   └── ui/                # Reusable UI (shadcn/ui)
│   ├── contexts/              # Global state
│   │   ├── AuthContext.tsx
│   │   └── ToastContext.tsx
│   ├── hooks/                 # Custom hooks
│   │   ├── useGameHistory.ts
│   │   └── useLocalStorage.ts
│   ├── lib/                   # Utilities
│   │   └── utils.ts
│   ├── pages/                 # Route components
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── GameLibrary.tsx
│   │   └── GamePage.tsx
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gameportal.git
   cd gameportal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
4. **Open your browser**
   ```
   Navigate to http://localhost:8080
   ```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000
VITE_API_VERSION=v1

# Game Settings
VITE_DEFAULT_GAME_TIME=60
VITE_MAX_SCORE_HISTORY=50

# Development
VITE_DEV_MODE=true
```

### Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Fonts**: Update Google Fonts in `index.html`
- **Games**: Add new games in `src/components/games/`
- **Routes**: Configure routing in `App.tsx`

---

## 🎮 Game Features

### Memory Clicker
- Pattern memorization and reproduction
- Increasing difficulty levels
- Score tracking and timer

### Lucky Box
- Random reward system
- Probability-based outcomes
- Streak counters

### Tap Counter
- Speed and endurance challenges
- Real-time tap counting
- Personal best tracking

---

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Enhanced experience on tablets
- **Desktop**: Full-featured desktop interface
- **Orientation**: Automatic landscape/portrait detection

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed

---

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/gameportal/issues) page
2. Create a new issue with detailed description
3. Include browser/device information
4. Provide steps to reproduce

---

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler |

---

## 📈 Performance

- ⚡ **Fast loading** with Vite's HMR
- 🎯 **Code splitting** for optimal bundle size
- 📦 **Tree shaking** to eliminate unused code
- 🗜️ **Asset optimization** for faster delivery

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing framework
- [Vite](https://vitejs.dev/) for lightning-fast development
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Lucide](https://lucide.dev/) for the icon library

---

<div align="center">

**Made with ❤️ by [ Uday Bari]**


</div>

---

⭐ **Star this repo if you found it helpful!** ⭐