#!/usr/bin/env node

/**
 * Generate Figma Variables JSON from design tokens
 * Outputs a JSON file compatible with Figma's token import format
 *
 * Usage: node scripts/generate-figma-tokens.js
 * Output: ./figma-tokens.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define all design tokens here (mirrors tokens.scss)
const tokens = {
  colors: {
    primary: '#6200ea',
    'primary-container': '#eaddff',
    secondary: '#03dac6',
    'secondary-container': '#a2f7e1',
    tertiary: '#018786',
    'tertiary-container': '#a4f1f9',
    error: '#b3261e',
    'error-container': '#f9dedc',
    background: '#fffbfe',
    surface: '#fffbfe',
    'surface-variant': '#e7e0ec',
    outline: '#79747e',
    'outline-variant': '#cac4d0',
  },
  'semantic-colors': {
    success: '#4caf50',
    warning: '#ff9800',
    info: '#2196f3',
    neutral: '#9e9e9e',
  },
  typography: {
    'display-large': {
      size: '57px',
      'line-height': '64px',
      'letter-spacing': '-0.25px',
      weight: '400',
    },
    'display-medium': {
      size: '45px',
      'line-height': '52px',
      'letter-spacing': '0px',
      weight: '400',
    },
    'display-small': {
      size: '36px',
      'line-height': '44px',
      'letter-spacing': '0px',
      weight: '400',
    },
    'headline-large': {
      size: '32px',
      'line-height': '40px',
      'letter-spacing': '0px',
      weight: '400',
    },
    'headline-medium': {
      size: '28px',
      'line-height': '36px',
      'letter-spacing': '0px',
      weight: '400',
    },
    'headline-small': {
      size: '24px',
      'line-height': '32px',
      'letter-spacing': '0px',
      weight: '400',
    },
    'title-large': {
      size: '22px',
      'line-height': '28px',
      'letter-spacing': '0px',
      weight: '500',
    },
    'title-medium': {
      size: '16px',
      'line-height': '24px',
      'letter-spacing': '0.15px',
      weight: '500',
    },
    'title-small': {
      size: '14px',
      'line-height': '20px',
      'letter-spacing': '0.1px',
      weight: '500',
    },
    'body-large': {
      size: '16px',
      'line-height': '24px',
      'letter-spacing': '0.5px',
      weight: '400',
    },
    'body-medium': {
      size: '14px',
      'line-height': '20px',
      'letter-spacing': '0.25px',
      weight: '400',
    },
    'body-small': {
      size: '12px',
      'line-height': '16px',
      'letter-spacing': '0.4px',
      weight: '400',
    },
    'label-large': {
      size: '14px',
      'line-height': '20px',
      'letter-spacing': '0.1px',
      weight: '500',
    },
    'label-medium': {
      size: '12px',
      'line-height': '16px',
      'letter-spacing': '0.5px',
      weight: '500',
    },
    'label-small': {
      size: '11px',
      'line-height': '16px',
      'letter-spacing': '0.5px',
      weight: '500',
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    12: '48px',
    14: '56px',
    16: '64px',
  },
  'border-radius': {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '9999px',
  },
  shadows: {
    'elevation-0': 'none',
    'elevation-1': '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
    'elevation-2': '0px 3px 6px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.12)',
    'elevation-3': '0px 10px 20px rgba(0, 0, 0, 0.15), 0px 3px 6px rgba(0, 0, 0, 0.12)',
    'elevation-4': '0px 15px 30px rgba(0, 0, 0, 0.2), 0px 5px 10px rgba(0, 0, 0, 0.12)',
    'elevation-5': '0px 20px 40px rgba(0, 0, 0, 0.2), 0px 8px 16px rgba(0, 0, 0, 0.12)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    standard: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: '400ms cubic-bezier(0, 0, 0.2, 1)',
    accelerate: '150ms cubic-bezier(0.4, 0, 1, 1)',
  },
}

/**
 * Convert tokens to Figma Variables JSON format
 * Figma expects a specific structure with sets and groups
 */
function generateFigmaTokensJson() {
  const figmaTokens = {
    version: '1.0',
    name: 'DS-Figma Design System',
    description: 'Material Design 3 tokens for DS-Figma-MCP',
    variables: {
      'Color': {},
      'Typography': {},
      'Spacing': {},
      'Radius': {},
      'Shadow': {},
      'Transition': {},
    },
    modes: {
      'light': {},
      'dark': {},
    },
  }

  // Process colors
  Object.entries(tokens.colors).forEach(([name, value]) => {
    figmaTokens.variables['Color'][name] = {
      value: value,
      type: 'color',
      description: `Primary color token: ${name}`,
    }
  })

  Object.entries(tokens['semantic-colors']).forEach(([name, value]) => {
    figmaTokens.variables['Color'][name] = {
      value: value,
      type: 'color',
      description: `Semantic color: ${name}`,
    }
  })

  // Process typography
  Object.entries(tokens.typography).forEach(([scale, values]) => {
    figmaTokens.variables['Typography'][`${scale}-size`] = {
      value: values.size,
      type: 'dimension',
      description: `${scale} font size`,
    }
    figmaTokens.variables['Typography'][`${scale}-weight`] = {
      value: values.weight,
      type: 'fontWeight',
      description: `${scale} font weight`,
    }
  })

  // Process spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    figmaTokens.variables['Spacing'][`space-${key}`] = {
      value: value,
      type: 'dimension',
      description: `Spacing scale ${key}`,
    }
  })

  // Process border radius
  Object.entries(tokens['border-radius']).forEach(([name, value]) => {
    figmaTokens.variables['Radius'][name] = {
      value: value,
      type: 'dimension',
      description: `Border radius: ${name}`,
    }
  })

  // Process shadows
  Object.entries(tokens.shadows).forEach(([name, value]) => {
    if (value !== 'none') {
      figmaTokens.variables['Shadow'][name] = {
        value: value,
        type: 'shadow',
        description: `Elevation shadow: ${name}`,
      }
    }
  })

  // Process transitions
  Object.entries(tokens.transitions).forEach(([name, value]) => {
    figmaTokens.variables['Transition'][name] = {
      value: value,
      type: 'animation',
      description: `Transition preset: ${name}`,
    }
  })

  return figmaTokens
}

// Alternative format: Figma Tokens Studio JSON (more compatible)
function generateTokensStudioJson() {
  const output = {
    version: '1.0',
    $themes: [],
    $metadata: {
      tokenSetOrder: [
        'global/colors',
        'global/typography',
        'global/spacing',
        'global/radius',
        'global/shadows',
        'global/transitions',
      ],
    },
  }

  // Global set
  const global = {
    colors: {},
    typography: {},
    spacing: {},
    radius: {},
    shadows: {},
    transitions: {},
  }

  // Colors
  Object.entries(tokens.colors).forEach(([name, value]) => {
    global.colors[name] = {
      value: value,
      type: 'color',
      description: `Primary color token: ${name}`,
    }
  })

  Object.entries(tokens['semantic-colors']).forEach(([name, value]) => {
    global.colors[name] = {
      value: value,
      type: 'color',
      description: `Semantic color: ${name}`,
    }
  })

  // Typography
  Object.entries(tokens.typography).forEach(([scale, values]) => {
    global.typography[`${scale}-size`] = {
      value: values.size,
      type: 'dimension',
    }
    global.typography[`${scale}-weight`] = {
      value: values.weight,
      type: 'fontWeight',
    }
  })

  // Spacing
  Object.entries(tokens.spacing).forEach(([key, value]) => {
    global.spacing[`space-${key}`] = {
      value: value,
      type: 'dimension',
    }
  })

  // Radius
  Object.entries(tokens['border-radius']).forEach(([name, value]) => {
    global.radius[name] = {
      value: value,
      type: 'dimension',
    }
  })

  // Shadows
  Object.entries(tokens.shadows).forEach(([name, value]) => {
    if (value !== 'none') {
      global.shadows[name] = {
        value: value,
        type: 'shadow',
      }
    }
  })

  // Transitions
  Object.entries(tokens.transitions).forEach(([name, value]) => {
    global.transitions[name] = {
      value: value,
      type: 'animation',
    }
  })

  // Set global as default token set
  output.global = global

  return output
}

// Generate both formats
const figmaTokens = generateFigmaTokensJson()
const tokensStudio = generateTokensStudioJson()

// Write files
const outputDir = path.join(__dirname, '..', 'public', 'tokens')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(
  path.join(outputDir, 'figma-tokens.json'),
  JSON.stringify(figmaTokens, null, 2),
)

fs.writeFileSync(
  path.join(outputDir, 'tokens.json'),
  JSON.stringify(tokensStudio, null, 2),
)

console.log('✅ Generated Figma token files:')
console.log('   - public/tokens/figma-tokens.json (Figma Variables format)')
console.log('   - public/tokens/tokens.json (Tokens Studio format)')
