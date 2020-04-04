const toggler = document.getElementById("toggler");

chrome.storage.sync.get(["isActive"], data => (toggler.checked = data.isActive));

toggler.onclick = element => chrome.storage.sync.set({ isActive: element.target.checked });
