// Planner code
'use strict';


window.onload = main;

const entries = [];

function main() {
    document.getElementById("add-btn").onclick = addEntry;
}

function addEntry(event) {
    event.preventDefault();
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;
    let activity = document.getElementById("activity").value;
    let type = document.getElementById("type").value;

    let newEntry = new Entry(startTime, endTime, activity, type);

    entries.push(newEntry);

    document.getElementById("input-form").reset();
    displayEntries();    

    // console.log(startTime + endTime + activity + type);
}

function displayEntries() {
    document.getElementById("display-entries").innerHTML = "";
    let newDisplay = "";
    entries.map((currentValue, index) => {
        newDisplay += currentValue.getEntryHTML() + "\n";
    });
    document.getElementById("display-entries").innerHTML = newDisplay;

    displayChart();
}

function displayChart() {
    let xValues = []
    let yValues = []
    let barColors = ["orange", "navy", "skyblue", "yellow", "green", "darkred"];
    entries.map((currentValue, index) => {
        if (!xValues.includes(currentValue.getType())) {
            xValues.push(currentValue.getType());
            yValues.push(1);
        } else {
            let xPosition = xValues.findIndex((currType) => {
                return currType == currentValue.getType();
            });
            yValues[xPosition] += 1;
        }

    });

    let chart = new Chart("myChart", {
        type: "doughnut",
        data: {
          labels: xValues,
          datasets: [{
            backgroundColor: barColors,
            data: yValues
          }]
        },
        options: {
          title: {
            display: true,
            text: "Activity Types"
          }
        }
    });
}