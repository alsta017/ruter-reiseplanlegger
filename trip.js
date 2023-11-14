let i_h1el = document.getElementById("i_h1");
let stopPlaceDatas = JSON.parse(localStorage.getItem("stopPlaceData"));
let avgangclickus = localStorage.getItem("avgangclicked");
let departuredisplayDiv = document.getElementById("departuredisplay");
let trips = stopPlaceDatas.data.trip.tripPatterns;
let ivalue = "";

console.log(stopPlaceDatas);

for (let i = 0; i < trips.length; i++) {
    if (i == avgangclickus) {
        ivalue = i;
    };
};

let this_departure = trips[ivalue];
console.log(this_departure)

let fullDiv = document.createElement('div');
fullDiv.className = "fullDiv";

let fullTimeDiv = document.createElement('div');
fullTimeDiv.className = "fulltimeDisplay";

let startDiv = document.createElement('div');
startDiv.className = "startDiv";

let startTimeAimDiv = document.createElement('div');
startTimeAimDiv.className = "timeDisplay";
startTimeAimDiv.textContent = new Date(this_departure.aimedStartTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
startDiv.appendChild(startTimeAimDiv);

let startTimeExpDiv = document.createElement('div');
startTimeExpDiv.className = "timeDisplayExp";
startTimeExpDiv.textContent = new Date(this_departure.expectedStartTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
if (startTimeExpDiv.textContent !== startTimeAimDiv.textContent) {
    startTimeAimDiv.className = "timeDisplayEdit";
    startDiv.appendChild(startTimeExpDiv);
};
fullTimeDiv.appendChild(startDiv);

let line = document.createElement('div');
line.className = "linediv";
line.textContent = "-";
fullTimeDiv.appendChild(line);

let endDiv = document.createElement('div');
endDiv.className = "endDiv";

let endTimeAimDiv = document.createElement('div');
endTimeAimDiv.className = "timeDisplay";
endTimeAimDiv.textContent = new Date(this_departure.aimedEndTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
endDiv.appendChild(endTimeAimDiv);

let endTimeExpDiv = document.createElement('div');
endTimeExpDiv.className = "timeDisplayExp";
endTimeExpDiv.textContent = new Date(this_departure.expectedEndTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
if (endTimeExpDiv.textContent !== endTimeAimDiv.textContent) {
    endTimeAimDiv.className = "timeDisplayEdit";
    endDiv.appendChild(endTimeExpDiv);
}
fullTimeDiv.appendChild(endDiv);

let totalTime = document.createElement('div');
totalTime.className = "totalTime";
totalTime.textContent = Math.floor(this_departure.duration/60) + " min";
fullTimeDiv.appendChild(totalTime);

departuredisplayDiv.appendChild(fullDiv);
fullDiv.appendChild(fullTimeDiv);

let legsDiv = document.createElement('div');
legsDiv.className = "legsDiv";

for (c = 0; c < this_departure.legs.length; c++) {

    let legDiv = document.createElement('div');
    legDiv.className = "legDiv";

    let startTimeExpDivLeg = document.createElement('div');
    startTimeExpDivLeg.className = "startTimeAimDivLeg";
    startTimeExpDivLeg.textContent = new Date(this_departure.legs[c].expectedStartTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
    legDiv.appendChild(startTimeExpDivLeg);

    let endTimeExpDivLeg = document.createElement('div');
    endTimeExpDivLeg.className = "startTimeExpDivLeg";
    endTimeExpDivLeg.textContent = new Date(this_departure.legs[c].expectedEndTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
    legDiv.appendChild(endTimeExpDivLeg);


    let lineNumberDiv = document.createElement('div');
    lineNumberDiv.className = "lineNumberDiv";
    lineNumberDiv.textContent = this_departure.legs[c];
    legsDiv.appendChild(legDiv);
}

fullDiv.appendChild(legsDiv);

i_h1el.innerHTML = "Fra " + stopPlaceDatas.data.trip.fromPlace.name + " til " + stopPlaceDatas.data.trip.toPlace.name;