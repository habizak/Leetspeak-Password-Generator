# 1337Pa$$ - Leet Speak Password Generator

A lightweight, progressive web app that converts words into leet speak passwords using vanilla HTML, CSS, and JavaScript.

## Features

- **Leet Speak Conversion**: Converts alphabetic text to leet speak using common substitutions
- **Input Validation**: Validates input (8-24 characters, alphabet-only)
- **Random Word Generator**: Generates random words for quick testing
- **Copy to Clipboard**: One-click copy with visual feedback
- **Password Visibility Toggle**: Show/hide the generated password
- **Progressive Web App**: Works offline with service worker caching
- **Responsive Design**: Optimized for mobile and desktop
- **Debug Mode**: Runtime logging for development (add `?debug=1` to URL)

## File Structure

```
1337pass/
├── index.html          # Main HTML structure
├── manifest.json       # PWA manifest
├── sw.js              # Service worker for offline support
├── css/
│   └── style.css      # All styles
├── js/
│   ├── app.js         # Main application controller (ES6 module)
│   ├── converter.js   # Leet speak conversion logic
│   ├── validator.js   # Input validation (IIFE scoped)
│   ├── generator.js   # Random word generation (IIFE scoped)
│   ├── clipboard.js   # Copy-to-clipboard functionality
│   ├── debug.js       # Debug utility (ES6 module)
│   └── constants.js   # Shared constants (ES6 module)
└── assets/
    ├── icon-192.png   # PWA icon (192x192)
    └── icon-512.png   # PWA icon (512x512)
```

## Setup

1. **IMPORTANT: Use a Local Server**
   - **DO NOT** open `index.html` directly via `file://` protocol
   - This will cause CORS errors and service worker failures
   - Use one of these methods:
     - `python3 -m http.server 8000` (or `python -m http.server 8000`)
     - `npx serve`
     - VS Code Live Server extension
     - Any local development server

2. Add PWA icons:
   - Create `icon-192.png` (192x192 pixels)
   - Create `icon-512.png` (512x512 pixels)
   - Place them in the `assets/` folder

3. Open in browser:
   - Navigate to `http://localhost:8000` (or your server's port)
   - For debug mode: `http://localhost:8000/?debug=1`

## Usage

1. Enter a word (8-24 alphabetic characters) or click "Random"
2. Click "Convert" to generate the leet speak password
3. Use "Show/Hide" to toggle password visibility
4. Click the copy button to copy the password to clipboard

## Debug Mode

Enable debug mode by adding `?debug=1` to the URL. This will:
- Log all debug messages to console
- Track initialization, user actions, and errors
- Use `dumpDebug()` in console to see logs as a table and copy JSON
- Use `clearDebugLogs()` to clear all logs

**Debug Functions (available in console when debug mode is enabled):**
- `dumpDebug()` - Show all logs as a table and copy JSON to clipboard
- `clearDebugLogs()` - Clear all debug logs and console

## Constraints

- Input must be 8-24 characters
- Only alphabetic characters (a-z, A-Z) are allowed
- No external dependencies (except Material Symbols font via CDN)
- Offline-first functionality via service worker

## Browser Support

- Modern browsers with ES6+ support
- Service Worker support for PWA features
- Clipboard API for copy functionality (with fallback)

## Troubleshooting

### Random Button Not Working
- Ensure you're using a local server (not `file://`)
- Check browser console for errors
- Enable debug mode (`?debug=1`) to see detailed logs
- Verify `generator.js` is loaded before `app.js`

### CORS Errors
- Always use a local development server
- Never open files directly from file system

### Service Worker Errors
- Must be served over `http://` or `https://` (not `file://`)
- Clear browser cache and reload

## License

MIT
