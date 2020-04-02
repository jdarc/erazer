const STORAGE_KEY = "com.zynaps.extensions.erazer.active";

const toggler = document.getElementById("toggler");

chrome.storage.sync.get([STORAGE_KEY], data => (toggler.checked = data[STORAGE_KEY]));

toggler.onclick = element => chrome.storage.sync.set({ [STORAGE_KEY]: element.target.checked });
