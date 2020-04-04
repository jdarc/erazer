chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ isActive: true });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () =>
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher()],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  );
});

chrome.downloads.onChanged.addListener(downloadDelta => {
  if (downloadDelta.state && downloadDelta.state.current !== "in_progress") {
    const downloadId = downloadDelta.id;
    chrome.storage.sync.get(["isActive"], data => {
      if (data.isActive) {
        chrome.downloads.erase({ id: downloadId });
      }
    });
  }
});
