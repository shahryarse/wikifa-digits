// background.js (Service Worker)
let clipboardHistory = [];

chrome.runtime.onInstalled.addListener(() => {
  console.log('Farsi Digits Converter extension installed.');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveClipboardContent") {
    // Save the current clipboard content
    chrome.scripting.executeScript({
      code: 'navigator.clipboard.readText().then(text => { clipboardHistory.push(text); });'
    });
  } else if (request.action === "restoreClipboardContent") {
    // Restore the original clipboard content
    const originalContent = clipboardHistory.pop();
    if (originalContent) {
      chrome.scripting.executeScript({
        code: `navigator.clipboard.writeText('${originalContent}');`
      });
    }
  }
});
