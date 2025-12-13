# Design Tokens & Figma Integration

This document explains the design token system and how to synchronize tokens between code and Figma.

## Overview

The DS-Figma-MCP project uses a centralized design token system based on Material Design 3 that:
- Exports CSS variables for styling components
- Generates JSON files compatible with Figma's variable import
- Provides Code Connect mappings for Figma integration

## Token Categories

### Colors
Primary Material Design 3 color system:
- `primary`, `primary-container`
- `secondary`, `secondary-container`
- `tertiary`, `tertiary-container`
- `error`, `error-container`
- `background`, `surface`, `surface-variant`
- `outline`, `outline-variant`

Semantic colors:
- `success`, `warning`, `info`, `neutral`

**Location**: `src/assets/tokens.scss` (lines 6-28)

### Typography
Material Design 3 type scale with 13 scales:
- Display: Large, Medium, Small
- Headline: Large, Medium, Small
- Title: Large, Medium, Small
- Body: Large, Medium, Small
- Label: Large, Medium, Small

Each scale includes: `size`, `line-height`, `letter-spacing`, `weight`

**Location**: `src/assets/tokens.scss` (lines 30-88)

### Spacing
8px-based spacing scale (0-16):
- `0` = 0px
- `1` = 4px
- `2` = 8px
- `4` = 16px
- `6` = 24px
- etc.

**Location**: `src/assets/tokens.scss` (lines 90-103)

### Border Radius
Semantic radius tokens:
- `none` = 0px
- `xs` = 4px
- `sm` = 8px
- `md` = 12px
- `lg` = 16px
- `xl` = 20px
- `full` = 9999px

**Location**: `src/assets/tokens.scss` (lines 105-113)

### Shadows
Material Design 3 elevation system:
- `elevation-0` through `elevation-5`
- Uses layered shadow values for depth

**Location**: `src/assets/tokens.scss` (lines 115-122)

### Transitions
Animation presets:
- `fast` = 150ms
- `standard` = 300ms
- `decelerate` = 400ms
- `accelerate` = 150ms

**Location**: `src/assets/tokens.scss` (lines 124-129)

## Using Tokens in Code

### CSS Variables
All tokens are exported as CSS variables in the `:root` scope:

```css
/* Colors */
var(--color-primary)
var(--color-success)

/* Spacing */
var(--spacing-4)      /* 16px */
var(--spacing-6)      /* 24px */

/* Border Radius */
var(--radius-md)      /* 12px */

/* Typography */
var(--type-body-large-size)     /* 16px */
var(--type-body-large-weight)   /* 400 */

/* Shadows */
var(--shadow-elevation-2)

/* Transitions */
var(--transition-standard)      /* 300ms cubic-bezier(...) */
```

### SCSS Variables
Use SCSS maps directly in component styles:

```scss
@import '@/assets/tokens.scss'

.my-button {
  background-color: map-get($colors, 'primary')
  padding: map-get($spacing, 4)
  border-radius: map-get($border-radius, 'md')
  transition: background-color map-get($transitions, 'standard')
}
```

## Generating Figma Tokens

### Automatic Generation
Tokens are automatically generated during the build process:

```bash
npm run build
```

This creates:
- `public/tokens/tokens.json` - Tokens Studio format
- `public/tokens/figma-tokens.json` - Figma Variables format

### Manual Generation
To generate tokens without building:

```bash
npm run tokens:generate
```

## Importing to Figma

### Option 1: Using Tokens Studio Plugin (Recommended)
1. Install [Tokens Studio for Figma](https://tokens.studio/)
2. In Figma: Plugins → Tokens Studio → Settings
3. Set sync source to JSON file
4. Point to: `https://your-domain.com/tokens/tokens.json`
5. Click "Sync tokens" to import

### Option 2: Manual Import via Figma Variables
1. In Figma: Assets → Variables
2. Import from file: `figma-tokens.json`
3. Maps color, typography, spacing tokens to Figma variables

### Option 3: URL-based Sync
The token files are served from the `public/tokens/` directory and can be accessed at:
- `http://localhost:5173/tokens/tokens.json` (dev)
- `https://your-domain/tokens/tokens.json` (production)

## Syncing Workflow

### Code → Figma (Design System Updates)
1. Update token values in `src/assets/tokens.scss`
2. Run `npm run tokens:generate` or `npm run build`
3. Token files update in `public/tokens/`
4. Figma (via Tokens Studio) pulls latest tokens
5. Designs automatically update to new token values

### Figma → Code (Design Feedback)
1. Designer updates tokens in Figma
2. Export updated tokens from Figma
3. Update `src/assets/tokens.scss` with new values
4. Components automatically reflect changes via CSS variables

## Code Connect Integration

Figma Code Connect automatically links Figma components to Vue components:

```typescript
// src/components/__figma__/Button.figma.ts
figma.connect(Button, 'https://figma.com/...', {
  props: {
    variant: figma.enum('State', { /* ... */ }),
    size: figma.enum('Size', { /* ... */ }),
  },
})
```

This enables:
- "Open code" links in Figma
- Code preview in Figma
- Automated handoff workflows

### Configuring Code Connect
Edit `figma.config.json` to customize:
- Component discovery paths
- Figma file URL
- Dev server settings
- Personal access token (via environment variable)

## Environment Setup

### Required Environment Variables
```bash
FIGMA_TOKEN=your_personal_access_token_here
```

Get your token:
1. Figma Account Settings → Personal access tokens
2. Create new token with `files:read` and `variables:write` scopes
3. Store in `.env.local` (never commit to version control)

### Local Development
```bash
npm run dev
# Dev server runs on http://localhost:5173
# Token files available at http://localhost:5173/tokens/
```

## Maintaining Tokens

### Adding New Tokens
1. Add to the appropriate map in `src/assets/tokens.scss`
2. Run `npm run tokens:generate` to export
3. Commit both `tokens.scss` and generated JSON files
4. Update Figma via Tokens Studio or manual import

### Updating Existing Tokens
1. Modify value in `src/assets/tokens.scss`
2. The CSS variable automatically updates
3. Run `npm run tokens:generate` to sync with Figma
4. Figma variables update on next sync

### Removing Tokens
1. Delete from `src/assets/tokens.scss` map
2. Run `npm run tokens:generate`
3. Remove corresponding variable from Figma
4. Update any components using the token

## Best Practices

1. **Keep SCSS and JSON in sync** - Always regenerate JSON after SCSS changes
2. **Use semantic names** - Token names should describe purpose, not value
3. **Group related tokens** - Organize in maps by category
4. **Document changes** - Update this file when adding/removing tokens
5. **Version tokens** - Consider semantic versioning in generated files
6. **Test before deploy** - Verify token rendering in components
7. **Review Figma updates** - Check Figma designs after syncing new tokens

## Troubleshooting

### Tokens not appearing in Figma
- Verify Tokens Studio plugin is installed and enabled
- Check JSON file is accessible at the URL
- Ensure format is correct: `tokens.json` for Tokens Studio
- Try manual refresh in Tokens Studio settings

### CSS variables not working
- Verify SCSS file is imported in `src/main.ts`
- Check variable names match the `:root` definitions
- Open DevTools → Styles to see computed variables
- Rebuild if changes don't appear: `npm run build`

### Misalignment between code and design
- Regenerate tokens: `npm run tokens:generate`
- Compare SCSS values with Figma variables
- Ensure both systems are using latest token definitions
- Document any intentional divergences

## Resources

- [Tokens Studio Documentation](https://docs.tokens.studio/)
- [Figma Variables Guide](https://help.figma.com/hc/en-us/articles/15145852043927-Guide-to-variables)
- [Code Connect Documentation](https://www.figma.com/developers/api#code-connect)
- [Material Design 3](https://m3.material.io/)
- [Vuetify Tokens](https://vuetifyjs.com/en/features/theme/)
