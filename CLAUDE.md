# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Chrome Console App that creates a text verification overlay for selected text on web pages. The script is designed to be executed directly in the Chrome Developer Console and provides real-time feedback as users retype selected text.

## Key Components

- **type-selected.js**: Main script file that contains the text verification functionality
- **intention.md**: Project requirements and intended behavior
- **GEMINI.md**: Existing documentation about the project structure and usage
- **new_features.md**: Contains planned features (e.g., script activation toggle button)
- **errors_misbehaviors.md**: Tracks known issues and misbehaviors

## Running the Script

1. Open Chrome DevTools (F12 or Ctrl+Shift+I)
2. Navigate to Console tab
3. Copy and paste the entire content of `type-selected.js`
4. Press Enter to execute
5. Select any text on the webpage to activate the verification overlay

## Architecture

The script is wrapped in an Immediately Invoked Function Expression (IIFE) to avoid polluting global scope. Key architectural components:

- **DOM Creation**: Creates a floating overlay div positioned over selected text
- **Event Listeners**:
  - `mouseup` for text selection detection
  - `input` for real-time text comparison and highlighting
  - Mouse events for Ctrl+drag functionality
- **Text Comparison Logic**: Character-by-character comparison with color coding (green for matches, red for mismatches)
- **Caret Position Management**: Complex logic to maintain cursor position during DOM updates

## Code Structure

- Lines 2-22: Overlay and input area creation with styling
- Lines 27-49: Text selection detection and overlay positioning
- Lines 52-95: Real-time text comparison and highlighting
- Lines 98-121: Dragging functionality with Ctrl key

## Known Issues

Refer to `errors_misbehaviors.md` for current issues and limitations.

## Planned Features

See `new_features.md` for upcoming features, most notably:
- Script activation toggle button for easier on/off control