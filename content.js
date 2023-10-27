// content.js
document.addEventListener("keydown", function(event) {
  if (event.altKey && event.key === "a") {
    // Save the original clipboard content
    chrome.runtime.sendMessage({ action: "saveClipboardContent" }, function(response) {
      const selectedText = window.getSelection().toString().trim();
      if (selectedText) {
        const farsiDigits = selectedText.replace(/\d/g, function(digit) {
          const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
          return persianDigits[digit];
        });

        // Copy the modified text to clipboard
        document.execCommand('copy');
        
        // Paste the modified text back to the active element
        document.execCommand('insertText', false, farsiDigits);
        
        // Restore the original clipboard content
        chrome.runtime.sendMessage({ action: "restoreClipboardContent" });
      }
    });
  }
});
