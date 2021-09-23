{
  let getAllNames = () => {
    let body = document.querySelector('body');
    body.style.height = "50000px";
    const divs = document.querySelectorAll("#search-everything-content [id^='pulse-']");
    const entries = [];

    for(let i = 0; i < divs.length; i++) {
      let div = divs[i];
      let name_div = div.querySelector(".cell-component.name-cell .name-cell-text .ds-text-component");
      if(name_div && name_div.innerText != "") {
        let [, pulse_id] = div.id.split('-');
        entries.push({
          id: pulse_id,
          name: name_div.innerText,
        });
      }
    }
    console.table(entries);
    body.style.height = null;

    let text = [
      "MORNING UPDATE",
      entries.map(({id, name}) => `- ${name} ${id}`).join("\n"),
      "RD Hours: ",
      "Concerns: ",
      "From yesterday"
    ].join("\n\n");

    navigator.clipboard.writeText(text).then(function() {
      window.alert(`Copied to clipboard:\n\n${text}`);
    });
  }

  getAllNames();
}
