(function() {
  // --- Create the verification overlay ---
  const overlay = document.createElement('div');
  overlay.id = 'text-verification-overlay';
  overlay.style.position = 'absolute';
  overlay.style.zIndex = '9999';
  overlay.style.border = '1px solid #ccc';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  overlay.style.padding = '5px';
  overlay.style.boxSizing = 'border-box';
  overlay.style.display = 'none';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '1em';
  overlay.style.lineHeight = '1.2';
  overlay.style.whiteSpace = 'pre-wrap';
  overlay.style.wordWrap = 'break-word';

  const inputArea = document.createElement('div');
  inputArea.contentEditable = 'true';
  inputArea.style.outline = 'none';
  overlay.appendChild(inputArea);
  document.body.appendChild(overlay);

  let originalText = '';

  // --- Get selected text and its position ---
  document.addEventListener('mouseup', () => {
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
      inputArea.innerHTML = '';
      inputArea.focus();
    } else {
      overlay.style.display = 'none';
    }
  });

  // --- Text comparison and highlighting ---
  inputArea.addEventListener('input', () => {
    const typedText = inputArea.innerText;
    let highlightedText = '';
    for (let i = 0; i < typedText.length; i++) {
      if (i < originalText.length && typedText[i] === originalText[i]) {
        highlightedText += `<span style="color: green;">${typedText[i]}</span>`;
      } else {
        highlightedText += `<span style="color: red;">${typedText[i]}</span>`;
      }
    }
    // To preserve the caret position, we need a more complex update
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const startOffset = range.startOffset;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = highlightedText;
    const newNodes = Array.from(tempDiv.childNodes);

    // Clear and append new nodes
    inputArea.innerHTML = '';
    newNodes.forEach(node => inputArea.appendChild(node));

    // Restore caret position
    const newRange = document.createRange();
    if (inputArea.childNodes.length > 0) {
        let currentNodeIndex = 0;
        let cumulativeLength = 0;
        let newOffset = 0;
        while(currentNodeIndex < inputArea.childNodes.length && cumulativeLength + inputArea.childNodes[currentNodeIndex].textContent.length < startOffset) {
            cumulativeLength += inputArea.childNodes[currentNodeIndex].textContent.length;
            currentNodeIndex++;
        }
        if(currentNodeIndex < inputArea.childNodes.length) {
            newOffset = startOffset - cumulativeLength;
            newRange.setStart(inputArea.childNodes[currentNodeIndex].firstChild || inputArea.childNodes[currentNodeIndex], newOffset);
        } else {
             newRange.setStart(inputArea.lastChild, inputArea.lastChild.textContent.length);
        }
    }
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
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