# Personal Portfolio Website

## Project Goal

This project is a personal portfolio website for Lennard Kaye, a 25-year-old German expat in Copenhagen graduating with a Master's in Digital Business from CBS. The primary goal is to showcase technical skills for job applications, balancing competence with realistic self-representation.

## Target Audience

Potential employers and technical recruiters.

## Key Content & Narrative

- Showcase 3-4 key projects (full-stack, data processing, ML) with details on architecture, stack, and learnings.
- Include a blog/thoughts section (e.g., "vibe coding" concept, LLM memory persistence).
- Highlight a unique perspective as a tech-savvy business graduate who can build full-stack applications but doesn't fit the traditional CS mold.
- Potentially include a recommendations section (books, videos).

## Design & Structure

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (v3.3)
- **Aesthetic:** Minimalistic, simple, smart, smooth, interesting/artsy (inspired by Anthropic). Avoid feeling overloaded.
- **Theme:** Initial theme based on terracotta architectural visuals (minimal, abstract). Potential future implementation of a dual-theme toggle (Terracotta/Nordic).
- **Layout:** Single-page application feel.
  - **Home:** Non-scrollable intro, socials, and a subtle visual element (animated terracotta graphic?).
  - **Navigation:** Sidebar with smooth vertical swipe-like transitions.
  - **Sections (Projects, Thoughts, Recommendations):** Accessed via sidebar. Content displayed using expanding tiles/previews leading to detailed views.
- **Components:** Custom components built with React/Tailwind (no large pre-built libraries like Shadcn initially).
- **Animations:** Smooth transitions for navigation and potentially subtle effects on the home page visual.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
