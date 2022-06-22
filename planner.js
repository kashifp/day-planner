// Planner code
'use strict';


window.onload = main;
// entries = []
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
    // event.preventDefault();
    let startTime = document.getElementById("startTime").value;
    let endTime = document.getElementById("endTime").value;
    let activity = document.getElementById("activity").value;
    let type = document.getElementById("type").value;

    let newEntry = new Entry(startTime, endTime, activity, type);

    // entries.push(newEntry);

    // document.getElementById("input-form").reset();
    // displayEntries();


    console.log(startTime + endTime + activity + type);

    let li = document.createElement("li");
    let entryText = document.createTextNode(newEntry.getEntry());
    li.appendChild(entryText);

    let typeSpan = document.createElement("span");
    typeSpan.className = "activity-type";
    let typeText = document.createTextNode(newEntry.getType());
    typeSpan.appendChild(typeText);
    li.appendChild(typeSpan);

    let span = document.createElement("span");
    span.className = "delete-entry";
    let xText = document.createTextNode("X");
    span.appendChild(xText);
    li.appendChild(span);
    
    /* Delete function for li element */
    span.onclick = () => {
        li.style.display = "none";
        displayChart();
    }

    /* Add entry to list */
    document.getElementById("entry-list").appendChild(li);

    /* Clear input fields */
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("activity").value = "";

    /* Rendering the pie chart */
    displayChart();
}

// function displayEntries() {
//     document.getElementById("display-entries").innerHTML = "";
//     let newDisplay = "";
//     entries.map((currentValue, index) => {
//         newDisplay += currentValue.getEntryHTML();
//     });
//     document.getElementById("display-entries").innerHTML = newDisplay;

//     displayChart();
// }
// function displayChart() {

// }
function displayChart() {
    let xValues = []
    let yValues = []
    let barColors = ["orange", "navy", "skyblue", "darkyellow", "darkgreen", "darkred"];


    let types = document.getElementsByClassName("activity-type");
    for (let tSpan of types) {
        // console.log(tSpan.innerHTML);
        if (tSpan.parentElement.style.display != "none") { //only counting elements that are currently displayed
            let currentValue = tSpan.innerHTML;
            if (!xValues.includes(currentValue)) {
                xValues.push(currentValue);
                yValues.push(1);
            } else {
                let xPosition = xValues.findIndex((currType) => {
                    return currType == currentValue;
                });
                yValues[xPosition] += 1;
            }
        }
    }
    // console.log(types);

    // entries.map((currentValue, index) => {
    //     if (!xValues.includes(currentValue.getType())) {
    //         xValues.push(currentValue.getType());
    //         yValues.push(1);
    //     } else {
    //         let xPosition = xValues.findIndex((currType) => {
    //             return currType == currentValue.getType();
    //         });
    //         yValues[xPosition] += 1;
    //     }

    // });

    let chart = new Chart("myChart", {
        type: "pie",
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