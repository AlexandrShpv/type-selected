- when user input text "123456" into fields const inputArea = document.createElement('div') after the third character input cursor remains between "2" and "3". Final input looks like "126543" (the first unsuccessfull attempt at a fix)

- The cursor positioning issue has been 'fixed', but it's still very much a problem. I'll give another example:
User type "Sometimes" in the input fields appears "Sosemitem"
![alt text](sometimes.png) (fixed)

1. Copy format from selected text to use it in created input fields (fixed)
2. Input area size is smaller than selected text area. The text does not fit in the input field (fixed)
![alt text](input_area_size.png)
After the followint changes, I achieved the desired result.
```javascript
// Position the overlay
      overlay.style.top = `${rect.top + window.scrollY - 2}px`;
      overlay.style.left = `${rect.left + window.scrollX}px`;
      overlay.style.width = `${rect.width + 5}px`;
      overlay.style.height = `${rect.height + 5}px`;
      overlay.style.display = 'block';
```
![alt text](input_area_size_fixed.png)
3. After dragging the input area, it disappears. The input area should be removed only by double clicking. (fixed)
4. When I selected element `/html/body/app-root/ms-app/div/div/div[3]/div/span/ms-prompt-renderer/ms-chunk-editor/section/div/div/ms-chat-session/ms-autoscroll-container/div/ms-chat-turn[3]/div/div[2]/div[2]/ms-prompt-chunk/ms-text-chunk/ms-cmark-node/p[5]/ms-cmark-node/span`
```
<span _ngcontent-ng-c4139270029="" class="ng-star-inserted"> "Man jāatrod starp dzīvokļu īpašniekiem tas, kurš nebaidās no Edgara."</span>
```
this element was generated `/html/body/div[4]/textarea`
`<textarea style="outline: none; border: none; background: transparent; resize: none; padding: 0px; margin: 0px; font-size: inherit; font-family: inherit; line-height: inherit; white-space: pre-wrap; overflow-wrap: break-word; overflow: hidden; width: 100%; height: 100%; color: transparent; caret-color: black;"></textarea>` 
The text in the input field is transparent. Please fix it. (rejected changes)
5. When I select english text input text appears with translation to english. "[EN] This is a sample text for testing the always-visible translation functionality." When I select translation to russian the translation remains english "[RU] This is a sample text for testing the always-visible translation functionality." (fixed)
   - <strong>Problem:</strong> CORS proxy was failing, causing fallback to language code prefixes like "[RU] text" instead of actual translations
   - <strong>Solution:</strong> Removed unreliable CORS proxy `cors-anywhere.herokuapp.com` and implemented direct Google Translate API call with improved fallback dictionary
   - <strong>Result:</strong> Now shows actual translations in Russian, English, and Latvian instead of prefixed fallback text
6. Fixed "inputArea.style.color = 'black';" to "inputArea.style.color = 'transparent';" 