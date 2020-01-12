console.log("asset/javascript/game.js linked");
var cnt = 0
var mix;
var q = "";
var trivArray = [
    ["Who was the first president to be inaugurated in Washington D.C.?", "Thomas Jefferson", "John Adams", "George Washington", "Donald Trump"],
    ["When scientists first saw specimens of this Australian mammal, they thought it was a hoax.", "Platypus", "Kangaroo", "Echidna", "Paul Hogan"],
    ["After the 'Mona Lisa' was stolen from the Louvre in 1911, which famous artist was considered a suspect?", "Pablo Picasso", "Edgar Degas", "Oscar Wild", "Michael Jackson"],
    ["What real-life shipwreck inspired Herman Melville's 'Moby-Dick'?", "The Essex", "The Beagle", "The Two Brothers", "The Valdez"],
    ["According to the United Nations, how many countries are in Africa?", "Fifty Four", "Twenty Three", "Forty Seven", "One"]
];

console.log(trivArray);






//setTimeout(function () {
    startTimer();
//}, 11000);







function startTimer() {
    cnt++;
    if (cnt < trivArray.length) {
        ProgressCountdown(10, 'pageBeginCountdown', 'pageBeginCountdownText').then(value => startTimer());
        $("#answers").empty();
        $("#question").html(trivArray[cnt][0]);
        mix = randomIndex(trivArray.length - 1);
        for (let i = 0; i < (trivArray.length - 1); i++) {
            var a = $('<a></a>').attr("href", "#")
                .attr("class", "list-group-item list-group-item-action")
                .attr("id", "a-" + i)
                .html(trivArray[cnt][mix[i] + 1]);
            $("#answers").append(a);
        }
    }
}