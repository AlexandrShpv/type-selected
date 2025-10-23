# Project: Text Verification Overlay

## Project Overview

This project consists of a single JavaScript file, `type-selected.js`, designed to be executed in the Chrome Developer Console. Its purpose is to help users verify selected text on a webpage by providing an interactive overlay for re-typing and comparison.

When a user selects text on a page after the script has been executed, an overlay appears over the selected text. As the user types into this overlay, the script provides real-time feedback by coloring the text: green for characters that match the original selected text and red for characters that do not. This is useful for tasks such as transcribing or checking for errors in text.

The overlay is also draggable. By holding down the `Ctrl` key, the user can move the overlay to a different position on the page.

## Building and Running

This is a browser-based script and does not have a build process. To run the script:

1.  **Open Chrome DevTools:** Right-click on any webpage and select "Inspect" or press `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac).
2.  **Navigate to the Console:** In the DevTools panel, select the "Console" tab.
3.  **Load the Script:** Copy the entire content of the `type-selected.js` file and paste it into the console.
4.  **Execute:** Press `Enter`. The script is now active on the page.
5.  **Use:** Select any text on the webpage with your mouse. The verification overlay will appear, ready for you to start typing.

## Development Conventions

The script is written in plain JavaScript and is self-contained within an Immediately Invoked Function Expression (IIFE) to prevent polluting the global scope of the webpage it's running on.

Key features of the implementation include:

*   **DOM Manipulation:** The script dynamically creates and injects a `div` element into the page to serve as the overlay. It's styled to float above the page content.
*   **Event Handling:** It listens for `mouseup` events to detect when text has been selected, `input` events to compare the typed text, and mouse events (`mousedown`, `mousemove`, `mouseup`) combined with the `Ctrl` key for dragging.
*   **Text Comparison:** The script compares the typed text with the original selected text character by character, wrapping each typed character in a `<span>` with the appropriate color.
*   **Caret Position:** The code includes logic to maintain the caret position within the input area after the highlighting is updated, which is crucial for a smooth user experience.
