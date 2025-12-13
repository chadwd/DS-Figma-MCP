# DS-Figma-MCP

A Design System documentation web application built with Vue 3 and Material Design 3. This serves as a reference for design tokens and components, with planned integration to Figma libraries through MCP (Model Context Protocol).

Perfect for designers, engineers, PMs, and marketing teams to access design system primitives and component documentation in one place.

## Quick Start

### Prerequisites

- **Node.js**: `^20.19.0` or `>=22.12.0` ([download](https://nodejs.org/))
- **npm**: comes with Node.js

### Setup (5 minutes)

```bash
# 1. Clone the repository
git clone <repo-url>
cd DS-Figma-MCP

# 2. Navigate to the web app directory (IMPORTANT!)
cd apps/web

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open your browser to **http://localhost:5173** and you should see the design system documentation live!

> **⚠️ Important:** All npm commands must be run from the `apps/web/` directory, not the root.

## Available Commands

All commands run from the `apps/web/` directory:

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run preview          # Preview production build locally

# Building & Deployment
npm run build            # Type-check and build for production
npm run build-only       # Build without type-checking

# Code Quality
npm run lint             # Run ESLint (auto-fixes issues)
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types only

# Testing
npm run test:unit        # Run all unit tests
npm run test:unit -- src/components/__tests__/Button.spec.ts  # Run specific test

# Tokens (Figma Integration)
npm run tokens:generate  # Generate design token files manually
```

## Project Structure

```
DS-Figma-MCP/
├── apps/web/              # Main Vue 3 SPA application
│   ├── src/
│   │   ├── components/    # Reusable Vue components
│   │   ├── views/         # Page-level components
│   │   ├── stores/        # Pinia state management
│   │   ├── router/        # Vue Router configuration
│   │   ├── assets/        # CSS and design tokens
│   │   ├── App.vue        # Root component with navigation
│   │   └── main.ts        # Application entry point
│   ├── public/            # Static assets (served as-is)
│   ├── vite.config.ts     # Vite build configuration
│   ├── tsconfig.app.json  # TypeScript configuration
│   └── package.json       # Dependencies and scripts
├── CLAUDE.md              # Guidance for Claude Code
├── FIGMA_SETUP.md         # Figma integration guide
└── README.md              # This file
```

## Routes

The application has four main sections:

- **`/`** — Home view with design system overview
- **`/tokens`** — Design tokens gallery (colors, typography, spacing, etc.)
- **`/components`** — Component examples and patterns
- **`/about`** — Project information and tech stack

## Technology Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Vue** | 3.5+ | UI framework |
| **TypeScript** | 5.9+ | Type safety |
| **Vite** | 7+ | Build tool & dev server |
| **Vuetify** | 3.11+ | Material Design 3 components |
| **Pinia** | 3+ | State management |
| **Vitest** | 4+ | Unit testing |
| **ESLint** | 9+ | Code linting |
| **Prettier** | 3.6+ | Code formatting |

## Development Workflow

### Running the dev server

```bash
npm run dev
```

- Hot Module Replacement (HMR) enabled — changes save instantly
- Dev server runs on **http://localhost:5173**
- Open `src/components/` to start building

### Creating a new component

```typescript
<!-- src/components/MyComponent.vue -->
<script setup lang="ts">
interface Props {
  label: string
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <button :disabled="disabled">
    {{ label }}
  </button>
</template>

<style scoped>
button {
  padding: 8px 16px;
}
</style>
```

Components use Vue 3's Composition API with `<script setup>` syntax. Vuetify components are auto-imported (no explicit imports needed).

### Writing tests

Create a test file next to your component:

```typescript
<!-- src/components/__tests__/MyComponent.spec.ts -->
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '../MyComponent.vue'

describe('MyComponent', () => {
  it('renders label prop', () => {
    const wrapper = mount(MyComponent, {
      props: { label: 'Click me' }
    })
    expect(wrapper.text()).toContain('Click me')
  })
})
```

Run tests with:

```bash
npm run test:unit
```

### Code style

The project uses Prettier and ESLint for consistent formatting:

```bash
# Format all files
npm run format

# Check and auto-fix linting issues
npm run lint

# Check types (before committing)
npm run type-check
```

## Building for Production

Before deploying, run the full build:

```bash
npm run build
```

This will:
1. Generate design token files
2. Run TypeScript type checking
3. Build optimized production bundle

The output is in `dist/` and ready to deploy.

Preview the production build locally:

```bash
npm run preview
```

## Design Tokens

Design tokens (colors, typography, spacing, etc.) are centrally managed and auto-generated for use in both the web app and Figma.

### Generating tokens

Tokens are automatically generated during `npm run build`, but you can generate them manually:

```bash
npm run tokens:generate
```

This creates:
- `public/tokens/tokens.json` — Tokens Studio format (for Figma)
- `public/tokens/figma-tokens.json` — Figma Variables format

### Accessing tokens in components

CSS custom properties are automatically available in all styles:

```vue
<style scoped>
.button {
  background-color: var(--primary);
  color: var(--on-primary);
  border-radius: var(--rounded-md);
}
</style>
```

## Figma Integration

This project is designed to sync design tokens between your codebase and Figma designs. See [FIGMA_SETUP.md](./FIGMA_SETUP.md) for:

- Setting up Figma API credentials
- Importing tokens into Figma
- Using Tokens Studio plugin
- Setting up Code Connect for component linking

## Troubleshooting

### Port 5173 already in use

```bash
# Kill the process using the port
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### TypeScript errors not showing in IDE

Make sure your IDE has TypeScript support enabled. If using VS Code, install the [Volar extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

### Build fails with "File not found" error

Clear cache and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Tests timing out

Increase timeout or run specific tests:

```bash
npm run test:unit -- --testTimeout=10000
npm run test:unit -- src/components/__tests__/specific.spec.ts
```

## Common Tasks

### Add a new page

1. Create a new Vue file in `src/views/MyPage.vue`
2. Add a route in `src/router/index.ts`
3. Add a navigation link in `src/App.vue`

### Update design tokens

1. Edit token definitions in `apps/web/scripts/generate-figma-tokens.js`
2. Run `npm run tokens:generate`
3. Commit the changes

### Deploy to production

```bash
npm run build     # Creates dist/ folder
# Upload dist/ to your hosting service
```

## IDE Setup

**VS Code recommended plugins:**

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) — Vue 3 support
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vitest Explorer](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

## Performance Tips

- Use path aliases: `@/components/Button.vue` instead of `../../../components/Button.vue`
- Leverage Vue 3 reactive APIs: `ref()`, `computed()`, `watch()`
- Lazy-load routes when needed (see `src/router/index.ts`)
- Run `npm run preview` to test production bundle size

## Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and test: `npm run test:unit`
3. Format and lint: `npm run format && npm run lint`
4. Check types: `npm run type-check`
5. Commit and push: `git commit -m "feat: add my feature"`

## Resources

- [Vue 3 Docs](https://vuejs.org/)
- [Vite Docs](https://vitejs.dev/)
- [Vuetify 3 Docs](https://vuetifyjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material Design 3](https://m3.material.io/)

## Getting Help

- Check existing documentation:
  - `CLAUDE.md` — Guidance for AI-assisted development
  - `FIGMA_SETUP.md` — Figma integration details
- Review component examples in `src/components/`
- Check test files in `src/components/__tests__/`
- Open an issue on the repository

---

**Happy building!** 🚀
