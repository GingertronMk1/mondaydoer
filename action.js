{
  const showing_links = false;
  const base_url = "https://wearesweetltd.monday.com";
  let getAllNames = () => {
    let body = document.querySelector('body');
    body.style.height = "50000px";
    const text = [
      "MORNING UPDATE"
    ];

    const tasks = [];

    const headers = document.querySelectorAll(".section-header-wrapper");

    let today_header = null;

    for(let i = 0; i < headers.length; i++) {
      if(headers[i].innerText.toLowerCase().includes('today')) {
        today_header = headers[i];
        break;
      }
    }

    let task = today_header.nextElementSibling;

    while (task.classList.contains("pulse-component-wrapper")) {
      let task_classes = [...task.classList];
      let board_regex = /board-id-(\d+)/;
      let board_id = null;
      for(let i = 0; i < task_classes.length; i++) {
        let match = task_classes[i].match(board_regex);
        if(match) {
          board_id = task_classes[i].replace(board_regex, "$1");
          break;
        }
      }
      let pulse_id = task.querySelector("[id^=pulse-").id.split("-")[1];

      let pulse_link = [
        base_url,
        "boards",
        board_id,
        "pulses",
        pulse_id
      ].join("/");

      let task_text = task.querySelector(".ds-editable-component > .ds-text-component").innerText
      if(showing_links) {
        tasks.push(`- ${task_text}\n  ${pulse_link}`);
      } else {
        tasks.push(`- ${task_text} ${pulse_id}`);
      }
      task = task.nextElementSibling;
    }

    text.push(tasks.join("\n"));

    text.push("RD Hours: ");
    text.push("Concerns: ");

    if((new Date()).getDay() === 1) {
      text.push("From last week: ");
    } else {
      text.push("From yesterday: ");
    }

    navigator.clipboard.writeText(text.join("\n\n")).then(function() {
      window.open(`${base_url}/overviews/4130993`, "_blank").focus();
    });
  }

  getAllNames();
}
