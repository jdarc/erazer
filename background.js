const STORAGE_KEY = "com.zynaps.extensions.erazer.active";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ [STORAGE_KEY]: true });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.downloads.onChanged.addListener(downloadDelta => {
  if (downloadDelta.state && downloadDelta.state.current === "complete") {
    chrome.storage.sync.get([STORAGE_KEY], data => {
      if (data[STORAGE_KEY]) {
        chrome.downloads.erase({});
      }
    });
  }
});
