(function() {
  // --- Toggle state ---
  let isVerificationEnabled = true;

  // --- Create toggle button ---
  const toggleButton = document.createElement('button');
  toggleButton.id = 'text-verification-toggle';
  toggleButton.textContent = '✓ Text Verification: ON';
  toggleButton.style.position = 'fixed';
  toggleButton.style.top = '10px';
  toggleButton.style.right = '10px';
  toggleButton.style.zIndex = '10000';
  toggleButton.style.padding = '8px 12px';
  toggleButton.style.backgroundColor = '#4CAF50';
  toggleButton.style.color = 'white';
  toggleButton.style.border = 'none';
  toggleButton.style.borderRadius = '4px';
  toggleButton.style.cursor = 'pointer';
  toggleButton.style.fontSize = '12px';
  toggleButton.style.fontFamily = 'Arial, sans-serif';
  toggleButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  toggleButton.style.transition = 'all 0.3s ease';

  // --- Create the verification overlay ---
  const overlay = document.createElement('div');
  overlay.id = 'text-verification-overlay';
  overlay.style.position = 'absolute';
  overlay.style.zIndex = '9999';
  overlay.style.border = '1px solid #ccc';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.97)';
  overlay.style.padding = '5px';
  overlay.style.boxSizing = 'border-box';
  overlay.style.display = 'none';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '1em';
  overlay.style.lineHeight = '1.2';
  overlay.style.whiteSpace = 'pre-wrap';
  overlay.style.wordWrap = 'break-word';

  const inputArea = document.createElement('textarea');
  inputArea.style.outline = 'none';
  inputArea.style.border = 'none';
  inputArea.style.background = 'transparent';
  inputArea.style.resize = 'none';
  inputArea.style.padding = '0';
  inputArea.style.margin = '0';
  inputArea.style.fontSize = 'inherit';
  inputArea.style.fontFamily = 'inherit';
  inputArea.style.lineHeight = 'inherit';
  inputArea.style.whiteSpace = 'pre-wrap';
  inputArea.style.wordWrap = 'break-word';
  inputArea.style.overflow = 'hidden';
  inputArea.style.width = '100%';
  inputArea.style.height = '100%';
  inputArea.style.color = 'transparent';
  inputArea.style.caretColor = 'black';
  overlay.appendChild(inputArea);

  // Create a separate div for highlighting
  const highlightDiv = document.createElement('div');
  highlightDiv.style.position = 'absolute';
  highlightDiv.style.top = '0';
  highlightDiv.style.left = '0';
  highlightDiv.style.width = '100%';
  highlightDiv.style.height = '100%';
  highlightDiv.style.pointerEvents = 'none';
  highlightDiv.style.fontFamily = 'inherit';
  highlightDiv.style.fontSize = 'inherit';
  highlightDiv.style.lineHeight = 'inherit';
  highlightDiv.style.whiteSpace = 'pre-wrap';
  highlightDiv.style.wordWrap = 'break-word';
  highlightDiv.style.padding = '5px';
  highlightDiv.style.boxSizing = 'border-box';
  overlay.appendChild(highlightDiv);

  // --- Add elements to page ---
  document.body.appendChild(toggleButton);
  document.body.appendChild(overlay);

  let originalText = '';

  // --- Toggle button functionality ---
  function updateToggleState() {
    if (isVerificationEnabled) {
      toggleButton.textContent = '✓ Text Verification: ON';
      toggleButton.style.backgroundColor = '#4CAF50';
    } else {
      toggleButton.textContent = '✗ Text Verification: OFF';
      toggleButton.style.backgroundColor = '#f44336';
      // Hide overlay when disabled
      overlay.style.display = 'none';
    }
  }

  toggleButton.addEventListener('click', () => {
    isVerificationEnabled = !isVerificationEnabled;
    updateToggleState();
  });

  // Initialize toggle state
  updateToggleState();

  // --- Get selected text and its position ---
  document.addEventListener('mouseup', () => {
    // Only process if verification is enabled
    if (!isVerificationEnabled) return;

    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText) {
      originalText = selectedText;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Position the overlay
      overlay.style.top = `${rect.top + window.scrollY}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.width = `${rect.width}px`;
      overlay.style.height = `${rect.height}px`;
      overlay.style.display = 'block';

      // Set initial content and focus
      inputArea.value = '';
      inputArea.focus();
      highlightDiv.textContent = '';
    } else {
      overlay.style.display = 'none';
    }
  });

  // --- Sync scrolling between textarea and highlight div ---
  inputArea.addEventListener('scroll', () => {
    highlightDiv.scrollTop = inputArea.scrollTop;
    highlightDiv.scrollLeft = inputArea.scrollLeft;
  });

  // --- Text comparison and highlighting ---
  inputArea.addEventListener('input', () => {
    // Get the current typed text from textarea
    const typedText = inputArea.value;

    // Create highlighted HTML for the background div
    let highlightedHTML = '';
    for (let i = 0; i < typedText.length; i++) {
      if (i < originalText.length && typedText[i] === originalText[i]) {
        highlightedHTML += `<span style="color: green;">${typedText[i]}</span>`;
      } else {
        highlightedHTML += `<span style="color: red;">${typedText[i]}</span>`;
      }
    }

    // Update only the highlight div, not the input
    highlightDiv.innerHTML = highlightedHTML;
  });

  // --- Make the overlay draggable with Ctrl key ---
  let isDragging = false;
  let offsetX, offsetY;

  overlay.addEventListener('mousedown', (e) => {
    if (e.ctrlKey) {
      isDragging = true;
      offsetX = e.clientX - overlay.getBoundingClientRect().left;
      offsetY = e.clientY - overlay.getBoundingClientRect().top;
      overlay.style.cursor = 'move';
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      overlay.style.left = `${e.clientX - offsetX}px`;
      overlay.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    overlay.style.cursor = 'default';
  });
})();