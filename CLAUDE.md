# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome Console App that creates a text verification overlay for selected text on web pages. The script is designed to be executed directly in the Chrome Developer Console and provides real-time feedback as users retype selected text with color-coded verification.

## Key Components

- **type-selected.js**: Main script file containing the text verification functionality
- **type-selected_bundle.js**: Minified version of the main script for easier console execution
- **intention.md**: Project requirements and intended behavior
- **GEMINI.md**: Detailed project documentation and usage instructions
- **new_features.md**: Planned features (toggle button has been implemented)
- **errors_misbehaviors.md**: Known issues and their fixes

## Running the Script

### Development Mode
1. Open Chrome DevTools (F12 or Ctrl+Shift+I)
2. Navigate to Console tab
3. Copy and paste the entire content of `type-selected.js`
4. Press Enter to execute
5. Select any text on the webpage to activate the verification overlay

### Production Mode (minified)
Use `type-selected_bundle.js` for a more compact version with the same functionality.

## Architecture

The script is wrapped in an Immediately Invoked Function Expression (IIFE) to avoid polluting global scope. Key architectural components:

- **Toggle Button**: Fixed-position button in top-right corner for enabling/disabling verification
- **DOM Creation**: Creates a floating overlay div positioned over selected text
- **Dual-Layer Input System**:
  - Transparent textarea for user input with visible caret
  - Background div for character-by-character highlighting
- **Event Listeners**:
  - `mouseup` for text selection detection and overlay positioning
  - `input` for real-time text comparison and highlighting
  - `scroll` for synchronizing textarea and highlight div scrolling
  - Mouse events for Ctrl+drag functionality
- **Text Comparison Logic**: Character-by-character comparison with color coding (green for matches, red for mismatches)
- **Style Inheritance**: Automatically inherits font styling from selected text's container

## Code Structure (type-selected.js)

- **Lines 3-23**: Toggle button creation and styling
- **Lines 25-78**: Overlay creation with dual-layer input system (textarea + highlight div)
- **Lines 83-101**: Toggle button functionality and state management
- **Lines 104-144**: Text selection detection, overlay positioning, and style inheritance
- **Lines 147-150**: Scroll synchronization between input layers
- **Lines 153-169**: Real-time text comparison and highlighting logic
- **Lines 172-194**: Ctrl+drag functionality for repositioning the overlay

## Development Notes

- The script uses two overlapping layers: a transparent textarea for input and a background div for highlighting
- Caret position management is handled by keeping the textarea transparent while showing highlights in the background div
- Font styles are inherited from the selected text's container using `window.getComputedStyle()`
- The overlay sizing includes small padding adjustments (+5px width/height, -2px top offset) for proper fit

## Known Issues and Fixes

- **Cursor positioning**: Fixed by using dual-layer approach instead of contentEditable div
- **Input area size**: Fixed by adjusting overlay dimensions and positioning calculations
- **Text format inheritance**: Fixed by copying computed styles from selected text container

Refer to `errors_misbehaviors.md` for detailed issue tracking and resolution history.