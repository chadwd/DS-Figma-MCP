# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**DS-Figma-MCP** is a Design System documentation web application built as a proof-of-concept for maintaining internal design system documentation. The site serves as a reference for design tokens and components, with planned integration to Figma libraries through MCP (Model Context Protocol).

The project is a Vue 3 single-page application (SPA) with Material Design 3 components, designed for designers, engineers, PMs, and marketing teams to access design system primitives and component documentation.

## Technology Stack

- **Vue 3** (Composition API with `<script setup>`)
- **TypeScript 5.9**
- **Vite 7** (build tool and dev server)
- **Vuetify 3** (Material Design 3 components)
- **Pinia** (state management)
- **Vue Router 4** (client-side routing)
- **Vitest** (unit testing)
- **ESLint + Prettier** (code quality)

**Node.js requirement:** `^20.19.0 || >=22.12.0`

## Commands

All commands are run from the `apps/web/` directory:

```bash
# Development
npm install              # Install dependencies
npm run dev            # Start development server with HMR

# Building
npm run build          # Type-check and build for production
npm run build-only     # Build without type-checking
npm run preview        # Preview production build locally

# Code Quality
npm run lint           # ESLint with auto-fix
npm run format         # Prettier formatting
npm run type-check     # TypeScript type checking only

# Testing
npm run test:unit      # Run all unit tests
npm run test:unit -- src/components/__tests__/Button.spec.ts  # Run single test
```

## Architecture

The application follows a component-based SPA architecture with the following key patterns:

### Directory Structure

```
apps/web/src/
├── assets/           # Global CSS and SVG assets
├── components/       # Reusable Vue components
│   ├── __tests__/    # Component unit tests using Vitest + @vue/test-utils
│   └── icons/        # Icon components
├── router/           # Vue Router configuration with 4 main routes
├── stores/           # Pinia stores for state management
├── views/            # Page-level components
├── App.vue           # Root shell with navigation drawer and app bar
└── main.ts           # Application entry point
```

### Key Routes

- `/` - Home view (design system overview)
- `/tokens` - Design tokens gallery (colors, typography)
- `/components` - Component examples (buttons, etc.)
- `/about` - Project information and tech stack

### Application Shell

The `App.vue` component provides:
- Permanent navigation drawer with links to main routes
- App bar with title and branding
- Responsive Material Design 3 layout using Vuetify

### Component Development Patterns

Components use Vue 3 Composition API with `<script setup lang="ts">`:
- Type-safe props and emits
- Reactive state with `ref()` and `computed()`
- Scoped styling with `<style scoped>`
- Components should be tested with Vitest in `__tests__/ComponentName.spec.ts`

Vuetify components are auto-imported via Vite configuration, so no explicit imports needed (e.g., `<v-button>` works without import).

### Styling

- **CSS Framework**: Vuetify 3 Material Design 3 blueprint
- **Code style**: Prettier (single quotes, no semicolons, 100 char line width)
- **Spacing**: 2-space indentation throughout
- **Icons**: Material Design Icons via `@mdi/font`

### Configuration Files

- **`vite.config.ts`**: Vite build config with Vue plugin, Vuetify auto-import, and `@` path alias
- **`tsconfig.app.json`**, **`tsconfig.node.json`**, **`tsconfig.vitest.json`**: TypeScript configurations for different contexts
- **`eslint.config.ts`**: ESLint rules for Vue, TypeScript, Vitest
- **`.prettierrc.json`**: Prettier formatting options
- **`vitest.config.ts`**: Vitest with jsdom environment for DOM testing

## Development Tips

- **Path aliases**: Use `@/` to import from `src/` directory (e.g., `@/components/Button.vue`)
- **Vuetify theming**: Material Design 3 tokens are configured in the Vuetify blueprint
- **Hot Module Replacement**: Changes to components, stores, and styles refresh instantly in dev mode
- **Type safety**: Always run `npm run type-check` before submitting; the build command does this automatically
- **Testing**: Use `@vue/test-utils` for mounting components; jsdom provides DOM APIs in tests
- **IDE extensions**: VS Code is configured with Vue, ESLint, Prettier, Vitest Explorer, and EditorConfig extensions

## Future Integration Points

The project is designed to eventually integrate with:
- Figma libraries (via MCP tools)
- Additional design system repositories
- Contribution guidelines for maintainers

Currently, the app demonstrates the intended documentation structure and user experience for accessing design tokens and components.
