{
  const base_url = "https://wearesweetltd.monday.com";
  const makeBold = (text) => `*${text}*`;

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

  const getAllTasks = () => {
    const body = document.querySelector('body');
    body.style.height = "50000px";
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
      let task_text = task.querySelector(".ds-editable-component > .ds-text-component").innerText
      let pulse_link = [
        base_url,
        "boards",
        board_id,
        "pulses",
        pulse_id
      ].join("/");
      tasks.push({text: task_text, link: pulse_link});
      task = task.nextElementSibling;
    }

    return tasks;
  }

  const morning = () => {
    const text = [
      makeBold("MORNING UPDATE"),
      makeBold("Rows To Do")
    ];


    const is_monday = (new Date()).getDay() === 1;

    let tasks = getAllTasks();

    text.push(tasks.map(({text, link}) => `1. [${text}](${link})`).join("\n"));

    text.push(makeBold("Unprioritised/Scheduled Tasks"));

    text.push("RD Hours: ");
    text.push("Comments/Concerns: ");
    text.push("Fixed dates today: ");

    if(is_monday) {
      text.push("From last week: ");
    } else {
      text.push("From yesterday: ");
    }

    navigator.clipboard.writeText(text.join("\n\n")).then(function() {
      window.open(`${base_url}/overviews/4130993`, "_blank").focus();
    });
  }

  const afternoon = () => {
    let text = [
      makeBold("UPDATE UPDATE"),
      makeBold("Complete by EOD:")
    ]

    let tasks = getAllTasks();

    text.push(tasks.map(({text, link}) => `- [${text}](${link})`).join("\n"));

    text = text.concat([
      makeBold("Incomplete by EOD:"),
      makeBold("Comments/Concerns:"),
      makeBold("Screenshot")
    ]);

    navigator.clipboard.writeText(text.join("\n\n")).then(function() {
      alert("Copied to clipboard");
    });
  }

  console.log("Waiting 10 seconds");
  switch(findGetParameter("dailyupdate")) {
    case "morning": setTimeout(morning, 10000); break;
    case "afternoon": setTimeout(afternoon, 10000); break;
  };
}
