function showData(data){
    activities = data.feed.entry;
    var headers = makeHeaders(cols=5);
    populateTable();
}

function makeHeaders(cols) {
    var table = document.getElementById('table');
    var row = document.createElement('tr');

    for (var i = 0; i < cols; i++) {
        var header = document.createElement('th');
        var item = activities[i].content.$t;
        header.innerHTML = item;
        row.appendChild(header);
        table.appendChild(row);
    }
}

function populateTable() {
    var table = document.getElementById('table');

    for (var i = 5; i < activities.length; i++) {
        if (i % 5 != 0) {
            console.log(i);
            var row = document.createElement('tr');
            var row_data = document.createElement('td');
            var item = activities[i].content.$t;
            row_data.innerHTML = item;
            table.appendChild(row);
            row.appendChild(row_data);
        }
    }
}

function getData() {
    fetch('https://spreadsheets.google.com/feeds/cells/1uWurJW03FnXFvB4yLgKp9PIQytq5cCclCPHrQVZkGjw/1/public/full?alt=json')
    .then(response => response.json())
    .then((jsonData) => {
        showData(jsonData);
        return jsonData;
    })
    .catch((error) => {
        // handle your errors here
        console.error(error)
    })
}
function onload() {
    console.log("loaded page");
}


