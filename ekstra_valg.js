var byttetidEl = document.getElementById("byttetidid");
var avgangankomstEl = document.getElementById("avgangankomst");
var selectavgangbuttonEl = document.getElementById("selectavgangbutton");
var selectankomstbuttonEl = document.getElementById("selectankomstbutton");

selectavgangbuttonEl.style.display = "block";
selectankomstbuttonEl.style.display = "block";

function avgang() {
    let avgangInputElh1 = document.createElement("p");
    let avgangInputEl = document.createElement("input");
    avgangInputElh1.textContent = "Velg avgangstid";
    avgangInputEl.type = "datetime-local";
    avgangInputElh1.className = "avganginputh1"
    avgangInputEl.className = "avganginput";
    avgangInputEl.setAttribute("id", "avganginput");
    selectavgangbuttonEl.style.display = "none";
    selectankomstbuttonEl.style.display = "none";
    avgangankomstEl.appendChild(avgangInputElh1);
    avgangankomstEl.appendChild(avgangInputEl);
}

function ankomst() {
    let ankomstInputElh1 = document.createElement("p");
    let ankomstInputEl = document.createElement("input");
    ankomstInputElh1.textContent = "Velg ankomsttid";
    ankomstInputEl.type = "datetime-local";
    ankomstInputElh1.className = "ankomstinputh1"
    ankomstInputEl.className = "ankomstinput";
    ankomstInputEl.setAttribute("id", "ankomstinput");
    selectavgangbuttonEl.style.display = "none";
    selectankomstbuttonEl.style.display = "none";
    avgangankomstEl.appendChild(ankomstInputElh1);
    avgangankomstEl.appendChild(ankomstInputEl);
}

function avganger() {
    var avgangInputCheck = document.getElementById("avganginput");
    var ankomstInputCheck = document.getElementById("ankomstinput");
    localStorage.removeItem("avgang");
    localStorage.removeItem("ankomst");
    if (avgangInputCheck) {
        var avgangInputDate = toISOStringWithTimezone(avgangInputCheck.value);
        console.log(avgangInputDate);
        localStorage.setItem("avgang", avgangInputDate);
    }
    if (ankomstInputCheck) {
        localStorage.setItem("ankomst", ankomstInputCheck.value);
    }
    location.replace("reiseplanlegger.html");
}

const toISOStringWithTimezone = date => {
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      diff + pad(tzOffset / 60) +
      ':' + pad(tzOffset % 60);
  };