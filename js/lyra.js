var name = "Name";

window.onload = function firstUpdate() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var ampm;
    var timeSimp;
    
    var monthArray = [["January"], ["February"], ["March"], ["April"], ["May"], ["June"], [
    "July"], ["August"], ["September"], ["October"], ["November"], ["December"]];
    
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if(hour > 12) {
        ampm = "pm";
        dateString = hour - 12 + ":" + minutes + ampm + " - " + monthArray[month] + " " + day + ", " + year;
    } else if(hour == 0) {
        ampm = "pm";
        dateString = "12" + ":" + minutes + ampm + " - " + monthArray[month] + " " + day + ", " + year;
    } else {
        ampm = "am";
        dateString = hour + ":" + minutes + ampm + " - " + monthArray[month] + " " + day + ", " + year;
    }

    if(ampm === "am") {
        if(hour < 12) {
            timeSimp = "morning";
        } else {
            timeSimp = "night";
        }
    } else {
        if(hour < 12) {
            timeSimp = "evening";
        } else {
            timeSimp = "afternoon";
        }
    }

    var ihTime = document.getElementById('grtt');
    ihTime.innerHTML = dateString;

    document.getElementById('greeting').innerHTML = "Good " + timeSimp + ", " + name;

    getQuote();
};

function getQuote() {
    fetch("https://quotes.rest/qod.json?category=inspire") // fetching the quote of the day API
    .then(response => {
        return response.json();
    })
    .then(json => {
        // accesses the quote of the day from JSON API, and injects the quote and author into the HTML
        let qod = json.contents.quotes[0];
        const quoteBox = document.querySelector('#quote');
        const quoteCite = document.querySelector("#quote-author");
        quoteBox.textContent = qod.quote;
        quoteCite.textContent = qod.author;
    })
    .catch(err => {
        const quoteBox = document.querySelector("#quote");
        quoteBox.textContent = "Error:" + err;
    });
}