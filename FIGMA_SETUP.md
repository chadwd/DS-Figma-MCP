# Figma Integration Setup Guide

This guide walks you through connecting your DS-Figma-MCP codebase with Figma using Design Tokens and Code Connect.

## Quick Start

### 1. Generate Design Tokens
Tokens are auto-generated during build, but you can generate them manually:

```bash
cd apps/web
npm run tokens:generate
```

This creates:
- `public/tokens/tokens.json` - Tokens Studio format (recommended)
- `public/tokens/figma-tokens.json` - Figma Variables format

### 2. Set Up Environment Variables
Create `.env.local` in `apps/web/`:

```bash
FIGMA_TOKEN=your_personal_access_token_here
```

**Get your token:**
1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Click "Personal access tokens"
3. Create new token with scopes: `files:read`, `variables:write`
4. Copy and paste into `.env.local`

### 3. Import Tokens to Figma

#### Option A: Using Tokens Studio (Recommended)
**Best for design-to-code workflow**

1. Install [Tokens Studio for Figma](https://tokens.studio/) plugin
2. Open your Figma design file
3. Plugins → Tokens Studio → Plugins → Settings
4. Under "Sync" section:
   - Set sync source to **"URL"**
   - Enter: `http://localhost:5173/tokens/tokens.json` (local dev)
   - Or: `https://your-domain/tokens/tokens.json` (production)
5. Click "Sync tokens" to import
6. Your Figma variables now match code tokens!

**Benefits:**
- Bi-directional sync capability
- Real-time updates as you develop
- Full Figma Variables UI support
- Supports multiple token sets/themes

#### Option B: Figma Variables Direct Import
**For quick import without additional plugins**

1. In Figma: Assets → Variables → Import
2. Upload `public/tokens/figma-tokens.json`
3. Select import destination
4. Variables are now available in your file

#### Option C: Manual Sync via CI/CD
**For production deployments**

1. Host token files on your production server
2. Use GitHub Actions or similar to regenerate tokens on code changes
3. Configure Tokens Studio in Figma to pull from production URL

## Code Connect Setup

### Installation (Optional)
Code Connect enables "Open in code" links in Figma and automated code preview.

```bash
npm install --save-dev @figma/cli
```

### Authentication
```bash
figma auth
# Login with your Figma account
```

### Configure Code Connect
Edit `figma.config.json`:

```json
{
  "codeConnect": {
    "componentDir": "./src/components",
    "figmaUrl": "https://www.figma.com/design/YOUR_FILE_ID/DS-Figma",
    "useDevServer": true,
    "devServerPort": 5173
  }
}
```

Replace `YOUR_FILE_ID` with your actual Figma file ID (found in Figma URL).

### Create Component Mappings
Example: Map Figma Button component to Vue Button

```typescript
// src/components/__figma__/Button.figma.ts
import { figma } from '@figma/code-connect'
import Button from '../Button.vue'

figma.connect(
  Button,
  'https://www.figma.com/design/YOUR_FILE_ID/DS-Figma?node-id=BUTTON_ID',
  {
    props: {
      variant: figma.enum('Variant', {
        'Filled': 'filled',
        'Outlined': 'outlined',
      }),
      label: figma.string('Label'),
    },
  },
)
```

### Publish Code Connect
```bash
figma publish YOUR_FILE_ID
# Creates "Open in code" links in your Figma file
```

## Development Workflow

### Running Dev Server
```bash
npm run dev
# Server runs at http://localhost:5173
# Token files available at http://localhost:5173/tokens/tokens.json
```

### Updating Tokens
1. Edit `src/assets/tokens.scss`
2. Run `npm run tokens:generate` to export JSON
3. Tokens Studio in Figma auto-syncs (if enabled)
4. Your designs update automatically

### Building for Production
```bash
npm run build
# Generates tokens and builds the app
# Tokens deployed with your site
```

## Directory Structure

```
apps/web/
├── public/tokens/              # Generated token files (served)
│   ├── tokens.json            # Tokens Studio format
│   └── figma-tokens.json      # Figma Variables format
├── src/
│   ├── assets/
│   │   ├── tokens.scss        # Source token definitions
│   │   ├── main.css           # Global styles
│   │   └── base.css           # Reset styles
│   ├── components/
│   │   ├── Button.vue         # Example component
│   │   └── __figma__/         # Code Connect files
│   │       └── Button.figma.ts
│   └── ...
├── scripts/
│   └── generate-figma-tokens.js  # Token export script
├── figma.config.json           # Code Connect config
└── TOKENS.md                   # Token documentation
```

## Token Sync Strategies

### Strategy 1: Design-Driven (Recommended for Teams)
1. Design updates tokens in Figma
2. Use Tokens Studio to export changes
3. Developer pulls exported tokens
4. Update `src/assets/tokens.scss`
5. `npm run tokens:generate` syncs everything

### Strategy 2: Code-Driven (Recommended for Developers)
1. Developer updates `src/assets/tokens.scss`
2. `npm run tokens:generate` exports to JSON
3. Tokens Studio in Figma imports new values
4. Designs automatically update
5. Designer reviews and approves changes

### Strategy 3: Bidirectional (Advanced)
1. Both design and code changes are synced
2. Requires conflict resolution process
3. Use git for change tracking
4. Document token ownership per file

## Troubleshooting

### Tokens not syncing in Figma
- Check Tokens Studio plugin is installed
- Verify token file URL is accessible
- Ensure JSON format is valid: `node scripts/generate-figma-tokens.js`
- Check browser console for CORS errors
- Try manual refresh in Tokens Studio settings

### CSS variables not available in styles
- Verify `src/assets/tokens.scss` is imported in `src/main.ts` ✓
- Check variable names match CSS custom property names
- Open DevTools → Styles → Filter to see `:root` variables
- Run `npm run build` to regenerate

### Code Connect not working
- Ensure `@figma/cli` is installed
- Run `figma auth` to authenticate
- Verify Figma file ID in `figma.config.json`
- Check component file exists at specified path
- Run `figma publish` to create links

### Components not updating in Figma preview
- Ensure dev server is running: `npm run dev`
- Check `figma.config.json` has correct port (5173)
- Verify component file path is correct
- Try refreshing Figma browser tab

## Next Steps

1. **Test token generation**: `npm run tokens:generate`
2. **Start dev server**: `npm run dev`
3. **Import tokens to Figma** using Tokens Studio
4. **Map components** to Figma using Code Connect (optional)
5. **Set up CI/CD** to auto-generate tokens on code changes

## Resources

- [TOKENS.md](./apps/web/TOKENS.md) - Detailed token documentation
- [Tokens Studio Docs](https://docs.tokens.studio/)
- [Figma Variables API](https://help.figma.com/hc/en-us/articles/15145852043927)
- [Code Connect Docs](https://www.figma.com/developers/api#code-connect)
- [Material Design 3](https://m3.material.io/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review `TOKENS.md` for token-specific help
3. See Figma plugin documentation: https://tokens.studio/
4. File an issue: https://github.com/anthropics/DS-Figma-MCP/issues
