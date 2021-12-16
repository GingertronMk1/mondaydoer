
function openMyWorkWithGetParam(param) {
  window.open(`https://wearesweetltd.monday.com/my_work?dailyupdate=${param}`, "_blank").focus();
}

async function openThings(param) {
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    func: openMyWorkWithGetParam(param)
  });
}


const morning = document.getElementById("morning");
const afternoon = document.getElementById("afternoon");



morning.addEventListener("click", async () => {
  await openThings("morning");
});

afternoon.addEventListener("click", async () => {
  await openThings("afternoon");
});