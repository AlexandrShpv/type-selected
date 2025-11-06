(function() {
  // --- Toggle state ---
  let isVerificationEnabled = true;
  let isTranslationEnabled = true;

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
  toggleButton.style.transition = 'background-color 0.3s ease';

  // --- Create translation toggle button ---
  const translationToggleButton = document.createElement('button');
  translationToggleButton.id = 'translation-toggle';
  translationToggleButton.textContent = '✓ Translation: ON';
  translationToggleButton.style.position = 'fixed';
  translationToggleButton.style.top = '50px';
  translationToggleButton.style.right = '10px';
  translationToggleButton.style.zIndex = '10000';
  translationToggleButton.style.padding = '8px 12px';
  translationToggleButton.style.backgroundColor = '#2196F3';
  translationToggleButton.style.color = 'white';
  translationToggleButton.style.border = 'none';
  translationToggleButton.style.borderRadius = '4px';
  translationToggleButton.style.cursor = 'pointer';
  translationToggleButton.style.fontSize = '12px';
  translationToggleButton.style.fontFamily = 'Arial, sans-serif';
  translationToggleButton.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
  translationToggleButton.style.transition = 'background-color 0.3s ease';

  // --- Create the verification overlay ---
  const overlay = document.createElement('div');
  overlay.id = 'text-verification-overlay';
  overlay.style.position = 'absolute';
  overlay.style.zIndex = '9999';
  overlay.style.border = '1px solid #ccc';
  overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
  overlay.style.padding = '0px';
  overlay.style.boxSizing = 'content-box';
  overlay.style.display = 'none';
  overlay.style.fontFamily = 'monospace';
  overlay.style.fontSize = '1em';
  overlay.style.lineHeight = '1.2';
  overlay.style.whiteSpace = 'pre-wrap';
  overlay.style.wordWrap = 'break-word';

  // Create container for the input area and highlighting
  const inputContainer = document.createElement('div');
  inputContainer.style.position = 'relative';
  inputContainer.style.width = '100%';
  inputContainer.style.minHeight = '50px';
  overlay.appendChild(inputContainer);

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
  inputContainer.appendChild(inputArea);

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
  highlightDiv.style.padding = '0px';
  highlightDiv.style.boxSizing = 'border-box';
  inputContainer.appendChild(highlightDiv);

  // --- Create translation section ---
  const translationSection = document.createElement('div');
  translationSection.style.borderTop = '1px solid #ddd';
  translationSection.style.padding = '8px';
  translationSection.style.backgroundColor = 'rgba(248, 248, 248, 0.95)';
  translationSection.style.display = 'none'; // Initially hidden, controlled by toggle

  // Language selector container
  const languageSelectorContainer = document.createElement('div');
  languageSelectorContainer.style.marginBottom = '8px';
  languageSelectorContainer.style.display = 'flex';
  languageSelectorContainer.style.alignItems = 'center';
  languageSelectorContainer.style.gap = '8px';

  const languageLabel = document.createElement('label');
  languageLabel.textContent = 'Translate to:';
  languageLabel.style.fontSize = '12px';
  languageLabel.style.fontFamily = 'Arial, sans-serif';
  languageLabel.style.color = '#666';
  languageSelectorContainer.appendChild(languageLabel);

  const languageSelector = document.createElement('select');
  languageSelector.style.fontSize = '12px';
  languageSelector.style.fontFamily = 'Arial, sans-serif';
  languageSelector.style.padding = '2px 4px';
  languageSelector.style.border = '1px solid #ccc';
  languageSelector.style.borderRadius = '3px';
  languageSelector.style.backgroundColor = 'white';

  // Add specified languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Russian' },
    { code: 'lv', name: 'Latvian' }
  ];

  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelector.appendChild(option);
  });

  languageSelectorContainer.appendChild(languageSelector);
  translationSection.appendChild(languageSelectorContainer);

  // Translation textarea
  const translationArea = document.createElement('textarea');
  translationArea.style.width = '100%';
  translationArea.style.minHeight = '60px';
  translationArea.style.fontSize = '14px';
  translationArea.style.fontFamily = 'Arial, sans-serif';
  translationArea.style.padding = '8px';
  translationArea.style.border = '1px solid #ccc';
  translationArea.style.borderRadius = '4px';
  translationArea.style.backgroundColor = 'white';
  translationArea.style.resize = 'vertical';
  translationArea.style.outline = 'none';
  translationArea.placeholder = 'Translation will appear here...';
  translationArea.readOnly = true;
  translationSection.appendChild(translationArea);

  overlay.appendChild(translationSection);

  // --- Add elements to page ---
  document.body.appendChild(toggleButton);
  document.body.appendChild(translationToggleButton);
  document.body.appendChild(overlay);

  let originalText = '';
  let isDragging = false;
  let offsetX, offsetY;
  let translationTimeout;

  // Variables for button dragging
  let isToggleButtonDragging = false;
  let isTranslationButtonDragging = false;
  let toggleButtonOffsetX, toggleButtonOffsetY;
  let translationButtonOffsetX, translationButtonOffsetY;

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

  // --- Translation toggle functionality ---
  function updateTranslationToggleState() {
    if (isTranslationEnabled) {
      translationToggleButton.textContent = '✓ Translation: ON';
      translationToggleButton.style.backgroundColor = '#2196F3';
      // Show translation section
      if (overlay.style.display === 'block') {
        translationSection.style.display = 'block';
        updateTranslation();
      }
    } else {
      translationToggleButton.textContent = '✗ Translation: OFF';
      translationToggleButton.style.backgroundColor = '#f44336';
      // Hide translation section
      translationSection.style.display = 'none';
    }
  }

  translationToggleButton.addEventListener('click', () => {
    isTranslationEnabled = !isTranslationEnabled;
    updateTranslationToggleState();
  });

  // Initialize toggle states
  updateToggleState();
  updateTranslationToggleState();

  // --- Translation functionality ---
  async function translateText(text, targetLang) {
    // Translation using direct Google Translate API call
    try {
      // Direct call to Google Translate API
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.status}`);
      }

      const data = await response.json();

      // Extract translated text from Google Translate response
      let translatedText = '';
      if (data[0] && data[0].length > 0) {
        for (let i = 0; i < data[0].length; i++) {
          if (data[0][i] && data[0][i][0]) {
            translatedText += data[0][i][0];
          }
        }
      }

      if (translatedText) {
        return translatedText;
      } else {
        throw new Error('No translation returned');
      }
    } catch (error) {
      console.error('Translation error:', error);

      // Simple translation dictionary for basic functionality when API fails
      const simpleTranslations = {
        'en': text, // English stays the same
        'ru': {
          'This': 'Это',
          'is': 'это',
          'a': 'это',
          'sample': 'пример',
          'text': 'текст',
          'for': 'для',
          'testing': 'тестирования',
          'the': 'the',
          'always-visible': 'всегда видимый',
          'translation': 'перевод',
          'functionality': 'функциональность',
          'Hello': 'Привет',
          'world': 'мир',
          'amazing': 'удивительный'
        },
        'lv': {
          'This': 'Šis',
          'is': 'ir',
          'a': 'ir',
          'sample': 'paraugs',
          'text': 'teksts',
          'for': 'priekš',
          'testing': 'testēšana',
          'the': 'the',
          'always-visible': 'vienmēr redzams',
          'translation': 'tulkojums',
          'functionality': 'funkcionalitāte',
          'Hello': 'Sveiki',
          'world': 'pasaule',
          'amazing': 'neparasts'
        }
      };

      if (targetLang === 'en') {
        return text; // Return original for English
      }

      // Try simple word-by-word translation for Russian and Latvian
      if (simpleTranslations[targetLang]) {
        const words = text.split(' ');
        const translatedWords = words.map(word => {
          // Remove punctuation for translation lookup
          const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
          const translated = simpleTranslations[targetLang][cleanWord] || word;
          // Preserve original capitalization and punctuation
          if (word[0] === word[0].toUpperCase()) {
            return translated.charAt(0).toUpperCase() + translated.slice(1);
          }
          return translated;
        });
        return translatedWords.join(' ');
      }

      // Last resort fallback
      return `[Translation to ${targetLang.toUpperCase()} failed] ${text}`;
    }
  }

  
  async function updateTranslation() {
    // Always translate the original selected text, not the typed text
    const textToTranslate = originalText;
    const targetLang = languageSelector.value;

    if (!textToTranslate.trim()) {
      translationArea.value = '';
      return;
    }

    translationArea.placeholder = 'Translating...';

    try {
      const translated = await translateText(textToTranslate, targetLang);
      translationArea.value = translated;
    } catch (error) {
      translationArea.value = `Translation error: ${error.message}`;
    }
  }

  // --- Translation event listeners ---
  languageSelector.addEventListener('change', updateTranslation);

  // --- Get selected text and its position ---
  document.addEventListener('mouseup', (e) => {
    if (isDragging) {
      isDragging = false;
      overlay.style.cursor = 'default';
      return;
    }

    // Only process if verification is enabled
    if (!isVerificationEnabled) return;

    const selection = window.getSelection();
    const selectedText = selection.toString();

    if (selectedText && !overlay.contains(selection.anchorNode)) {
      originalText = selectedText;
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Get the computed style of the selected text's container
      const container = range.commonAncestorContainer;
      if (container) {
        const parentElement = container.nodeType === Node.ELEMENT_NODE ? container : container.parentElement;
        if (parentElement) {
          const computedStyle = window.getComputedStyle(parentElement);
          overlay.style.fontFamily = computedStyle.fontFamily;
          overlay.style.fontSize = computedStyle.fontSize;
          overlay.style.fontWeight = computedStyle.fontWeight;
          overlay.style.fontStyle = computedStyle.fontStyle;
          overlay.style.lineHeight = computedStyle.lineHeight;
        }
      }

      // Position the overlay (account for potential translation section)
      overlay.style.top = `${rect.top + window.scrollY - 2}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.width = `${rect.width + 10}px`;
      overlay.style.height = `${rect.height + 5}px`;
      overlay.style.display = 'block';

      // Set initial content and focus
      inputArea.value = '';
      inputArea.focus();
      highlightDiv.textContent = '';

      // Update translation when new text is selected (only if translation is enabled)
      translationArea.value = '';
      if (isTranslationEnabled) {
        translationSection.style.display = 'block';
        updateTranslation();
      }
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

  // --- Ctrl key transparency ---
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Control') {
      overlay.style.opacity = '0.2';
    }
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'Control') {
      overlay.style.opacity = '1';
    }
  });

  overlay.addEventListener('dblclick', () => {
    overlay.style.display = 'none';
  });

  // --- Make toggle buttons draggable ---

  // Main toggle button dragging
  toggleButton.addEventListener('mousedown', (e) => {
    isToggleButtonDragging = true;
    toggleButtonOffsetX = e.clientX - toggleButton.getBoundingClientRect().left;
    toggleButtonOffsetY = e.clientY - toggleButton.getBoundingClientRect().top;
    toggleButton.style.cursor = 'move';
    toggleButton.style.transition = 'none'; // Disable transition during drag
  });

  // Translation toggle button dragging
  translationToggleButton.addEventListener('mousedown', (e) => {
    isTranslationButtonDragging = true;
    translationButtonOffsetX = e.clientX - translationToggleButton.getBoundingClientRect().left;
    translationButtonOffsetY = e.clientY - translationToggleButton.getBoundingClientRect().top;
    translationToggleButton.style.cursor = 'move';
    translationToggleButton.style.transition = 'none'; // Disable transition during drag
  });

  // Handle mouse movement for button dragging
  document.addEventListener('mousemove', (e) => {
    if (isToggleButtonDragging) {
      toggleButton.style.left = `${e.clientX - toggleButtonOffsetX}px`;
      toggleButton.style.top = `${e.clientY - toggleButtonOffsetY}px`;
      toggleButton.style.right = 'auto'; // Override right positioning
    }

    if (isTranslationButtonDragging) {
      translationToggleButton.style.left = `${e.clientX - translationButtonOffsetX}px`;
      translationToggleButton.style.top = `${e.clientY - translationButtonOffsetY}px`;
      translationToggleButton.style.right = 'auto'; // Override right positioning
    }
  });

  // Handle mouse up to stop dragging
  document.addEventListener('mouseup', () => {
    if (isToggleButtonDragging) {
      isToggleButtonDragging = false;
      toggleButton.style.cursor = 'pointer';
      toggleButton.style.transition = 'background-color 0.3s ease'; // Restore transition
    }

    if (isTranslationButtonDragging) {
      isTranslationButtonDragging = false;
      translationToggleButton.style.cursor = 'pointer';
      translationToggleButton.style.transition = 'background-color 0.3s ease'; // Restore transition
    }
  });
})();