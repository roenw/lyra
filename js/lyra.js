var name = "Name";

window.onload = function firstUpdate() {
    var date = new Date();

    var hour = date.getHours();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var dayOfWeek = date.getDay();

    var timeSimp;
    
    var monthArray = [["January"], ["February"], ["March"], ["April"], ["May"], ["June"], [
    "July"], ["August"], ["September"], ["October"], ["November"], ["December"]];
    var daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if(hour > 12) {
        ampm = "pm";
    } else if(hour == 0) {
        ampm = "pm";
    } else {
        ampm = "am";
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
    
    dateString = daysArray[dayOfWeek] + ", " + monthArray[month] + " " + day + " " + year;

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