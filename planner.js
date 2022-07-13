// Planner code
'use strict';


window.onload = main;

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
    let displayDate = `${daysOfWeek[day]}, ${monthsOfYear[month]} ${numDate}, ${year}`;
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

    //test
    // li.className = "row"
    //

    // let checkSpan = document.createElement("span");
    // let checkText = document.createTextNode("✓");
    // checkSpan.appendChild(checkText);
    // li.appendChild(checkSpan);


    let entryText = document.createTextNode(newEntry.getEntry());
    let entrySpan = document.createElement("span");
    
    entrySpan.className = "timeName";
    entrySpan.appendChild(entryText);
    li.appendChild(entrySpan);

    li.onclick = () => {
        li.classList.toggle("checkedEntry");
        displayCompletionChart();
    };

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
        displayCompletionChart();
    };
    

    /* Add entry to list */
    document.getElementById("entry-list").appendChild(li);

    /* Clear input fields */
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("activity").value = "";

    /* Rendering the pie chart */
    displayChart();

    /* Rendering the completion chart */
    displayCompletionChart();
}

function displayCompletionChart() {
    let xValues = []
    let yValues = []
    let barColors = [];

    let completeNum = document.getElementsByClassName("checkedEntry").length;
    let tasksNum = document.getElementsByClassName("timeName").length;
    
    if (tasksNum > completeNum) {
        xValues.push("Incomplete");
        yValues.push(tasksNum - completeNum);
        barColors.push("violet")
    }
    if (completeNum > 0) {
        xValues.push("Complete");
        yValues.push(completeNum);
        barColors.push("skyblue")
    }

    let chart = new Chart("compChart", {
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

function displayChart() {
    let xValues = []
    let yValues = []
    let barColors = ["orange", "skyblue", "pink", "rgb(200, 127, 224)", "lightgreen", "rgb(248, 105, 105)"];

    let types = document.getElementsByClassName("activity-type");
    // console.log(types.length);
    for (let tSpan of types) {
        // console.log(tSpan.innerHTML);
        if (tSpan.parentElement.style.display != "none") { //only counting elements that are currently displayed
            let currentValue = tSpan.innerHTML;
            if (!xValues.includes(currentValue)) {
                /* test */
                    tSpan.style.backgroundColor = barColors[xValues.length];
                //
                xValues.push(currentValue);
                yValues.push(1);
            } else {
                let xPosition = xValues.findIndex((currType) => {
                    return currType == currentValue;
                });
                tSpan.style.backgroundColor = barColors[xPosition];
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