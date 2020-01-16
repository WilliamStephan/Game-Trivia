console.log("asset/javascript/game.js linked");

var prevCountDown = null;
var correct = 0;
var incorrect = 0;
var cnt = 0
var mix;
var timeleft = 0;

var trivArray = [
    ["Who was the first president to be inaugurated in Washington D.C.?", "Thomas Jefferson", "John Adams", "George Washington", "Donald Trump"],
    ["When scientists first saw specimens of this Australian mammal, they thought it was a hoax.", "Platypus", "Kangaroo", "Echidna", "Paul Hogan"],
    ["After the 'Mona Lisa' was stolen from the Louvre in 1911, which famous artist was considered a suspect?", "Pablo Picasso", "Edgar Degas", "Oscar Wild", "Michael Jackson"],
    ["What real-life shipwreck inspired Herman Melville's 'Moby-Dick'?", "The Essex", "The Beagle", "The Two Brothers", "The Valdez"],
    ["According to the United Nations, how many countries are in Africa?", "Fifty Four", "Twenty Three", "Forty Seven", "One"]
];

document.body.onclick = keyClick;

// launch point for click events 
function keyClick(e) { // looking for clicks  
    e = window.event ? event.srcElement : e.target;
    if (e.classList.contains('start')) { // start clicked
        $("#btn-start").css("display", "none");
        $("#btn-start").html("New Game"); // sets new game button after start
        gameLoop();
    }
    if (e.classList.contains('list-group-item')) { // answer clicked
        if (trivArray[cnt][1] === e.textContent) {
            displayRight();
            correct++;
        } else {
            displayWrong();
            incorrect++;
        }
        cnt++;
    }
}

// game re-start adjustments 
function restart() {
    $("#answers").empty();
    $("#question").empty();
    $("#timer-div").empty();
    $("#btn-start").css("display", "inline-block");
    $("#answers").append('<p>There were ' + (trivArray.length) + ' questions</p>');
    $("#answers").append('<p>And you got: ' + correct + ' right, for a ratio of: ' + ((correct / (trivArray.length))) * 100 + '%</p>');
    cnt = 0;
    correct = 0;
    incorrect = 0;
}

// kicks off round or re-start
function gameLoop() {
    if (cnt < trivArray.length) {
        $("#timer-div").empty();
        $("#timer-div").append('<progress value="10" max="10" id="pBar"></progress>');
        $("#timer-div").append('<p> Time Left: <span id="pText">10 </span> seconds</p>');
        initCountDown() 
        round();
    } else {
        clearInterval(prevCountDown); 
        restart();
    }
}

// display questions  
function round() {    
    if (cnt < trivArray.length) {
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

// correct answer
function displayRight() {
    timeleft = 0;
    clearInterval(prevCountDown);
    $("#timer-div").empty();
    $("#answers").empty();
    $("#answers").append('<p>Nice Job! ' + (trivArray[cnt][1]) + ' is the correct!</p>');
    setTimeout(function() {
        gameLoop();
    }, 1000);
}

// incorrect answer
function displayWrong() {
    timeleft = 0;
    clearInterval(prevCountDown);
    $("#timer-div").empty();
    $("#answers").empty();
    $("#answers").append('<p>Nope! Nice try, the correct answer is: ' + (trivArray[cnt][1]) + '</p>');
    setTimeout(function() {
        gameLoop();
    }, 1000);
}

// countdown bar and text
function initCountDown() {
    if(prevCountDown) {
        clearInterval(prevCountDown); // clears existing intervals !!! 
    }    
    var timeleft = 10;
    prevCountDown = setInterval(function () {
        document.getElementById("pBar").value = (timeleft - 1);
        --timeleft;
        document.getElementById("pText").textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(prevCountDown);
            displayWrong(); 
            cnt++
        }
    }, 1000);
}

// will randomize [0 to x] positive int sequence, returns array (length.x+1) 
// used for randomizing questions and answer positions 
function randomIndex(arrLength) {
    let randIndex = [];
    let unique = false;
    for (i = 0; i < arrLength; i++) {
        randIndex.push(Math.floor(Math.random() * arrLength));
        while (!unique) { // loops until unique random is created
            unique = true;
            if (i > 0) { // skip first array element (always unique)
                for (k = 0; k < i; k++) {
                    if (randIndex[k] === randIndex[i]) {
                        unique = false
                    }
                }
            }
            if (!unique) {
                randIndex[i] = Math.floor(Math.random() * arrLength)
            }
        }
        unique = false;
    }
    return randIndex === null ? 0 : randIndex;
}