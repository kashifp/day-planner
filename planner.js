// Planner code
'use strict';


window.onload = main;

const entries = [];

function main() {
    document.getElementById("add-btn").onclick = addEntry;

    /* Set Date */
    const daysOfWeek= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let numDate = date.getDate();
    let year = date.getFullYear();
    let ordinalIndicator = "";
    let lastDateDigit = numDate % 10;
    if (lastDateDigit == 1) {
        ordinalIndicator = "st";
    } else if (lastDateDigit == 2) {
        ordinalIndicator = "nd";
    } else if (lastDateDigit == 3) {
        ordinalIndicator = "rd";
    } else {
        ordinalIndicator = "th";
    }
    let displayDate = `${daysOfWeek[day]}, ${monthsOfYear[month]} ${numDate}${ordinalIndicator} ${year}`;
    document.getElementById("title-date").innerHTML = displayDate;
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