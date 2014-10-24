/**
 * Listens for the app launching, then creates the window.
 *
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
      id: 'mainWindow2',
      innerBounds: {
        width: 520,
        height: 620,
        minWidth: 200,
        minHeight: 300
      }
    }
  );
});

