let resultaterEl = document.getElementById("resultater");
let fraEl = localStorage.getItem("Fra");
let tilEl = localStorage.getItem("Til");

function reise () {
    fetch('https://api.entur.io/journey-planner/v3/graphql', {
    method: 'POST',
    headers: {
    // Replace this with your own client name:
    'ET-Client-Name': 'alsta-bussen',
    'Content-Type': 'application/json'
    },
    // GraphQL Query
    // https://api.entur.io/graphql-explorer/journey-planner-v3?query=%7B%0A%20%20trip%28%0A%20%20%20%20from%3A%20%7Bplace%3A%20"NSR%3AStopPlace%3A58227"%7D%0A%20%20%20%20to%3A%20%7Bplace%3A%20"NSR%3AStopPlace%3A5920"%7D%0A%20%20%20%20dateTime%3A%20"2023-10-10T13%3A13%3A03.143%2B02%3A00"%0A%20%20%20%20arriveBy%3A%20false%0A%20%20%20%20walkSpeed%3A%201.3%0A%20%20%20%20includePlannedCancellations%3A%20true%0A%20%20%20%20includeRealtimeCancellations%3A%20true%0A%20%20%29%20%7B%0A%20%20%20%20fromPlace%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20toPlace%20%7B%0A%20%20%20%20%20%20name%0A%20%20%20%20%7D%0A%20%20%20%20tripPatterns%20%7B%0A%20%20%20%20%20%20aimedStartTime%0A%20%20%20%20%20%20expectedStartTime%0A%20%20%20%20%20%20aimedEndTime%0A%20%20%20%20%20%20expectedEndTime%0A%20%20%20%20%20%20streetDistance%0A%20%20%20%20%20%20walkTime%0A%20%20%20%20%20%20legs%20%7B%0A%20%20%20%20%20%20%20%20aimedStartTime%0A%20%20%20%20%20%20%20%20expectedStartTime%0A%20%20%20%20%20%20%20%20aimedEndTime%0A%20%20%20%20%20%20%20%20expectedEndTime%0A%20%20%20%20%20%20%20%20line%20%7B%0A%20%20%20%20%20%20%20%20%20%20publicCode%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A&variables=
    body: JSON.stringify({ 
        query: `{
            trip(
                from: {place: ${fraEl}}
                to: {place: ${tilEl}}
                walkSpeed: 1.3
                includePlannedCancellations: true
                includeRealtimeCancellations: true
            ) {
                fromPlace {
                    name
                }
                toPlace {
                    name
                }
                tripPatterns {
                    aimedStartTime
                    expectedStartTime
                    aimedEndTime
                    expectedEndTime
                    streetDistance
                    walkTime
                    legs {
                        aimedStartTime
                        expectedStartTime
                        aimedEndTime
                        expectedEndTime
                        line {
                            publicCode
                        }
                    }
                }
            }
        }`
    }),
    })
    .then(res => res.json())
    .then(stopPlaceData => {
    
        // For alle avanger length
        for (let i = 0; i < estimatedCalls.length; i++) {
            
    };
    textel.innerHTML = `Avganger fra: ${stopPlaceData.data.stopPlace.name}`;
    originaltidEl.innerHTML = "Ruter/Entur API (Testing)";
});
};