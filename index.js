let fraEl = document.getElementById("i_ifra");
let tilEl = document.getElementById("i_til");
let tilElinput = document.getElementById("i_itil");
let velgEl = document.getElementById("velg");
let iplEl = document.getElementById("i_pl");
var searchTimeout;
var velgEnArr = [];
var navnArr = [];
fraEl.disabled = false;
fraEl.onkeydown = function () {
    velgEnArr = [];
    velgEl.textContent = "";
    // Element mens den laster inn
    if (!loadingelement) {
        var loadingelement = document.createElement("p");
        loadingelement.className = "loadingtextindex";
        loadingelement.textContent = "Laster inn...";
        velgEl.appendChild(loadingelement);
    }
    // Delay så den ikke sender inn autocomplete API requests hele tiden
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(valg, 500);
}
function valg () {
    fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${fraEl.value}`, {
            headers: {
                "ET-Client-Name": "alsta-bussen",
            },
        })
        .then(response => response.json())
        .then(data => {
            navnArr = [];
            velgEnArr = [];
            velgEl.textContent = "";
            a = 0;
            // For lengden av stasjoner
            for (x = 0; x < data.features.length; x++) {
                if (data.features[x].properties.id.includes("NSR:StopPlace")) {
                    a++
                    // lage ny p element og knappen med class og id og alt
                    var stasjonspelement = document.createElement('p');
                    var stasjonsbutton = document.createElement('button');
                    stasjonspelement.className = "stasjonspelement";
                    stasjonsbutton.className = "stasjonsbutton";
                    stasjonsbutton.setAttribute("id", `${a}`)
                    stasjonspelement.setAttribute("id", `${a}`)
                    stasjonspelement.setAttribute("onclick", "buttonclicked(this.id)")
                    stasjonspelement.textContent = data.features[x].properties.name + ", " + data.features[x].properties.locality;
                    var velgEnArrel = data.features[x].properties.id;
                    stasjonsbutton.textContent = "Velg";
                    var stasjonsnavn = data.features[x].properties.name + ", " + data.features[x].properties.locality;
                    stasjonspelement.appendChild(stasjonsbutton);
                    velgEl.appendChild(stasjonspelement)
                    velgEnArr.push(velgEnArrel);
                    navnArr.push(stasjonsnavn);
                }
            }
            // skjekk lasting eller ingen resultater
            if (velgEnArr.length === 0) {
                var nodataelement = document.createElement("p");
                nodataelement.className = "loadingtextindex";
                if (fraEl.value.length == 0) {
                    nodataelement.textContent = "";
                } else {
                    nodataelement.textContent = "Ingen resultater.";
                };
                velgEl.appendChild(nodataelement);
            }
        })
        .catch(error => {
            // hvis error
            console.error("Error fetching data:", error);
        });
    }
function buttonclicked(clicked_id) {
    fraEl.disabled = true;
    fraEl.value = navnArr[clicked_id - 1];
    localStorage.setItem("Fra", velgEnArr[clicked_id - 1])
    velgEnArr = [];
    velgEl.textContent = "";
    iplEl.textContent = "Til:"
    let fraform = document.createElement('input');
    fraform.type = "text";
    fraform.id = "i_itil";
    tilEl.appendChild(fraform);
};
tilEl.onkeydown = function () {
    velgEnArr = [];
    velgEl.textContent = "";
    // Element mens den laster inn
    if (!loadingelement) {
        var loadingelement = document.createElement("p");
        loadingelement.className = "loadingtextindex";
        loadingelement.textContent = "Laster inn...";
        velgEl.appendChild(loadingelement);
    }
    // Delay så den ikke sender inn autocomplete API requests hele tiden
    if (searchTimeout != undefined) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(valg2, 500);
}
function valg2 () {
    tilElinput = document.getElementById("i_itil");
    fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${tilElinput.value}`, {
            headers: {
                "ET-Client-Name": "alsta-bussen",
            },
        })
        .then(response => response.json())
        .then(data => {
            navnArr = [];
            velgEnArr = [];
            velgEl.textContent = "";
            a = 0;
            // For lengden av stasjoner
            for (x = 0; x < data.features.length; x++) {
                if (data.features[x].properties.id.includes("NSR:StopPlace")) {
                    a++
                    // lage ny p element og knappen med class og id og alt
                    var stasjonspelement = document.createElement('p');
                    var stasjonsbutton = document.createElement('button');
                    stasjonspelement.className = "stasjonspelement";
                    stasjonsbutton.className = "stasjonsbutton";
                    stasjonsbutton.setAttribute("id", `${a}`)
                    stasjonspelement.setAttribute("id", `${a}`)
                    stasjonspelement.setAttribute("onclick", "buttonclicked2(this.id)")
                    stasjonspelement.textContent = data.features[x].properties.name + ", " + data.features[x].properties.locality;
                    var velgEnArrel = data.features[x].properties.id;
                    stasjonsbutton.textContent = "Velg";
                    var stasjonsnavn = data.features[x].properties.name + ", " + data.features[x].properties.locality;
                    stasjonspelement.appendChild(stasjonsbutton);
                    velgEl.appendChild(stasjonspelement)
                    velgEnArr.push(velgEnArrel);
                    navnArr.push(stasjonsnavn);
                }
            }
            // skjekk lasting eller ingen resultater
            if (velgEnArr.length === 0) {
                var nodataelement = document.createElement("p");
                nodataelement.className = "loadingtextindex";
                if (fraEl.value.length == 0) {
                    nodataelement.textContent = "";
                } else {
                    nodataelement.textContent = "Ingen resultater.";
                };
                velgEl.appendChild(nodataelement);
            }
        })
        .catch(error => {
            // hvis error
            console.error("Error fetching data:", error);
        });
    }
    function buttonclicked2(clicked_id) {
        tilElinput.disabled = true;
        tilElinput.value = navnArr[clicked_id - 1];
        localStorage.setItem("Til", velgEnArr[clicked_id - 1])
        velgEnArr = [];
        velgEl.textContent = "";
        window.location.replace("reiseplanlegger.html")
    };