let i_h1el = document.getElementById("i_h1");
let stopPlaceDatas = JSON.parse(localStorage.getItem("stopPlaceData"));
let avgangclickus = localStorage.getItem("avgangclicked");
let departuredisplayDiv = document.getElementById("departuredisplay");
let trips = stopPlaceDatas.data.trip.tripPatterns;
let ivalue = "";

let map = L.map('map').setView([51.505, -0.09], 13); // Set the initial coordinates and zoom level
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

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

let lineDiv = document.createElement('div');
lineDiv.className = "lineDiv";
lineDiv.textContent = "-";
fullTimeDiv.appendChild(lineDiv);

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

    let legDivLine1 = document.createElement('div');
    legDivLine1.className = "legDivLine1";

    let startTimeExpDivLeg = document.createElement('div');
    startTimeExpDivLeg.className = "startTimeAimDivLeg";
    startTimeExpDivLeg.textContent = new Date(this_departure.legs[c].expectedStartTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
    legDivLine1.appendChild(startTimeExpDivLeg);

    let lineDivLeg = document.createElement('div');
    lineDivLeg.className = "lineDivLeg";
    lineDivLeg.textContent = "-";
    legDivLine1.appendChild(lineDivLeg);

    let endTimeExpDivLeg = document.createElement('div');
    endTimeExpDivLeg.className = "startTimeExpDivLeg";
    endTimeExpDivLeg.textContent = new Date(this_departure.legs[c].expectedEndTime).toLocaleTimeString('no-NO', {hour: '2-digit', minute: '2-digit'});
    legDivLine1.appendChild(endTimeExpDivLeg);

    if (this_departure.legs[c].fromEstimatedCall !== null) {

        let lineNumberDiv = document.createElement('div');
        lineNumberDiv.className = "lineNumberDiv";
        lineNumberDiv.textContent = this_departure.legs[c].line.publicCode;

        if (this_departure.legs[c].line.publicCode > 0 && this_departure.legs[c].line.publicCode < 10 && this_departure.legs[c].line.publicCode.length < 2) {
            lineNumberDiv.className = lineNumberDiv.classList + ' orange';
        } else if (this_departure.legs[c].line.publicCode > 9 && this_departure.legs[c].line.publicCode < 20) {
            lineNumberDiv.className = lineNumberDiv.classList + ' blue';
        } else if (this_departure.legs[c].line.publicCode.length > 1 && this_departure.legs[c].line.publicCode.replace(/\D/g,'') > 19 && this_departure.legs[c].line.publicCode.replace(/\D/g,'') < 99){
            lineNumberDiv.className = lineNumberDiv.classList + ' red';
        } else if (this_departure.legs[c].line.publicCode.length > 1 && this_departure.legs[c].line.publicCode.replace(/\D/g,'') > 99 && this_departure.legs[c].line.publicCode.replace(/\D/g,'') < 4000) {
            lineNumberDiv.className = lineNumberDiv.classList + ' green';
        } else {
            lineNumberDiv.className = lineNumberDiv.classList + ' other';
        };
        
        let lineTextDiv = document.createElement('div');
        lineTextDiv.className = "lineTextDiv";
        lineTextDiv.textContent = this_departure.legs[c].fromEstimatedCall.destinationDisplay.frontText;

        legDivLine1.appendChild(lineNumberDiv);
        legDivLine1.appendChild(lineTextDiv);

    } else if (this_departure.legs[c].mode == "foot") {

        let walkDiv = document.createElement('img');
        walkDiv.className = "walkDiv2";
        walkDiv.src = "Images/walk.png"

        legDivLine1.appendChild(walkDiv);
    }

    let legDivLine2 = document.createElement('div');
    legDivLine2.className = "legDivLine2";

    let startPlaceDiv = document.createElement('div');
    startPlaceDiv.className = "startPlaceDiv"
    startPlaceDiv.textContent = this_departure.legs[c].fromPlace.quay.name + " - " + this_departure.legs[c].toPlace.quay.name;
    legDivLine2.appendChild(startPlaceDiv);

    legDiv.appendChild(legDivLine1);
    legDiv.appendChild(legDivLine2);
    legsDiv.appendChild(legDiv);

}

fullDiv.appendChild(legsDiv);

i_h1el.innerHTML = "Fra " + stopPlaceDatas.data.trip.fromPlace.name + " til " + stopPlaceDatas.data.trip.toPlace.name;