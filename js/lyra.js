var name = "Name";

window.onload = function firstUpdate() {
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    
    var monthArray = [["January"], ["February"], ["March"], ["April"], ["May"], ["June"], [
    "July"], ["August"], ["September"], ["October"], ["November"], ["December"]];
    
    if(minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if(hour > 12) {
        hour = hour - 12;
        dateString = hour + ":" + minutes + "pm" + " - " + monthArray[month] + " " + day + ", " + year;
    } else if(hour == 0) {
        hour = 12;
        dateString = hour + ":" + minutes + "pm" + " - " + monthArray[month] + " " + day + ", " + year;
    } else {
        dateString = hour + ":" + minutes + "am" + " - " + monthArray[month] + " " + day + ", " + year;
    }

    var ihTime = document.getElementById('grtt');
    ihTime.innerHTML = dateString;

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