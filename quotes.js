/* Get a random quote from Andrux API */

var getQuote = function() {
    var quote = document.getElementById("quote");
    var author = document.getElementById("author");
    var newQuote = document.getElementById("new-quote");
    var tweetQuote = document.getElementById("tweet-quote");
    var error = document.getElementById("error");
    var url = "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("X-Mashape-Key", "I3Ab8tTM1gmshcj2qLrIwhoP996dp1Xub4hjsnJ5SFNZJ94FOK");
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.addEventListener("load", function() {
        if(req.status === 200 && req.statusText === "OK") {
            var response = JSON.parse(req.responseText);
            quote.innerHTML = "&ldquo;" + response.quote + "&rdquo;";
            author.innerHTML = "&mdash; " + response.author;
            // Get a new random quote
            newQuote.onclick = function() {
                getQuote();
            };
            // Open a tweet web intent window populated with the current quote and author
            // Encode response.quote and response.author in case they contain JavaScript special characters
            tweetQuote.onclick = function() {
                tweetQuote.setAttribute("href", "https://twitter.com/intent/tweet?text=" + "\"" + encodeURIComponent(response.quote) + "\" - " + encodeURIComponent(response.author) + "");
            };
        } else {
            error.innerHTML = "An error occurred. Please refresh the page and try again.";
            error.style.color = "#f00";
            error.style.border = "solid";
        }
    }); // end event listener
    req.send();
}; // end getQuote


window.onload = function() {
    getQuote();
};
