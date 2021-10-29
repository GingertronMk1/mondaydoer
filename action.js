{
  const showing_links = false;
  let getAllNames = () => {
    let body = document.querySelector('body');
    body.style.height = "50000px";
    const divs = document.querySelectorAll("#search-everything-content [id^='pulse-']");
    const entries = [];

    const titles = document.querySelectorAll("span.section-type-title");
    let today_div = null;

    for(let i = 0; i < titles.length; i++) {
      if (titles[i].innerText.includes("Today")) {
        today_div = titles[i].parentElement;
        console.log(today_div);
        if(today_div.classList) {
          while (![...today_div.classList].includes("deadline-tasks-section-component")) {
            today_div = today_div.parentElement;
          }
          break;
        }
      }
    }
    console.log(today_div);

    let today_tasks = today_div.querySelectorAll("div.deadline-task-component");

    let text = [
      "MORNING UPDATE"
    ];
    let tasks = [];
    for (let i = 0; i < today_tasks.length; i++) {
      const task = today_tasks[i];
      const task_text_wrapper = task.querySelector("div.pulse-name-wrapper");
      const task_link = "wearesweetltd.monday.com/" + task_text_wrapper.querySelector("a.full-width.button_link").getAttribute("href");
      const task_text = task_text_wrapper.querySelector("span.pulse-name-text").innerText;
      if(showing_links) {
        tasks.push(`- ${task_text}: ${task_link}`);
      }
      else {
        tasks.push(`- ${task_text}`);
      }
    }

    text.push(tasks.join("\n"));

    text.push("RD Hours: ");
    text.push("Concerns: ");

    if((new Date()).getDay() === 1) {
      text.push("From last week: ");
    } else {
      text.push("From yesterday: ");
    }

    text = text.join("\n\n");

    navigator.clipboard.writeText(text).then(function() {
      window.open("https://wearesweetltd.monday.com/overviews/4130993", "_blank").focus();
    });
  }

  getAllNames();
}
