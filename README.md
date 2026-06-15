# Saurav Bhojak - Premium Developer Portfolio

A highly interactive, visually stunning developer portfolio built with React and Vite. Designed specifically for a Backend Developer, featuring dark mode glassmorphism, a glowing Git Commit timeline, and a fully functional AI Chatbot.

## 🚀 Features

- **Gemini AI Chatbot:** An interactive, animated robot mascot (powered by Google's Gemini 2.5 Flash API) that tracks the user's mouse and answers questions about Saurav's CV.
- **Git Commit Timeline:** A custom-built, responsive Projects section styled to look like a `git log` commit history, complete with nodes and mock hashes.
- **Live Contact Form:** Fully functional contact form integrated with Web3Forms to send emails directly to your inbox.
- **Dynamic Animations:** Built with Framer Motion for buttery-smooth scroll reveals, 3D floating icons, and hover effects.
- **Glassmorphism UI:** Premium dark theme with glowing cyan/purple gradients and translucent blurred panels.
- **Fully Responsive:** Optimized for desktop, tablet, and mobile viewing.

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Vanilla CSS (CSS Variables, Flexbox, Grid)
- **Animations:** Framer Motion, React-Type-Animation
- **Icons:** Lucide React, React Icons
- **AI Integration:** `@google/genai` (Gemini API)

## ⚙️ Installation & Setup

1. **Clone the repository** (if applicable)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_WEB3FORMS_KEY=your_web3forms_access_key_here
   ```
   - Get a Gemini API Key from: [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Get a Web3Forms Key from: [Web3Forms](https://web3forms.com/)

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

5. **Build for Production**
   ```bash
   npm run build
   ```
   This will generate optimized static files in the `dist` folder, ready for deployment on Vercel, Netlify, or GitHub Pages.

## 📁 Project Structure

- `/src/components/` - Reusable UI components (Hero, About, Projects, etc.)
- `/src/components/ChatBot.jsx` - The Gemini AI chatbot logic and animation
- `/src/index.css` - Global styles, CSS variables, and the custom scrollbar
- `/public/` - Static assets like `cv.pdf` and `favicon.svg`
