console.log("asset/javascript/game.js linked");

const myTimer = countDown;




var correct = 0;
var incorrect = 0;

var cnt = 0
var mix;
var timeleft;

var trivArray = [
    ["Who was the first president to be inaugurated in Washington D.C.?", "Thomas Jefferson", "John Adams", "George Washington", "Donald Trump"],
    ["When scientists first saw specimens of this Australian mammal, they thought it was a hoax.", "Platypus", "Kangaroo", "Echidna", "Paul Hogan"],
    ["After the 'Mona Lisa' was stolen from the Louvre in 1911, which famous artist was considered a suspect?", "Pablo Picasso", "Edgar Degas", "Oscar Wild", "Michael Jackson"],
    ["What real-life shipwreck inspired Herman Melville's 'Moby-Dick'?", "The Essex", "The Beagle", "The Two Brothers", "The Valdez"],
    ["According to the United Nations, how many countries are in Africa?", "Fifty Four", "Twenty Three", "Forty Seven", "One"]
];

console.log(trivArray);

document.body.onclick = keyClick;


function keyClick(e) { // looking for clicks  - wheel or on-screen keyboard
    e = window.event ? event.srcElement : e.target;

    if (e.classList.contains('start')) { // start clicked
        console.log("click event: " + e.getAttribute('id') + " was clicked")
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

function gameLoop() {
    if (cnt < trivArray.length) {
        $("#timer-div").empty();
        $("#timer-div").append('<progress value="10" max="10" id="pBar"></progress>');
        $("#timer-div").append('<p> Time Left: <span id="pText">10 </span> seconds</p>');
        const myTimer = countDown(); 
        round();
    } else {
        clearInterval(myTimer); 
        restart();
    }
}

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

function displayRight() {
    $("#timer-div").empty();
    $("#answers").empty();
    $("#answers").append('<p>Nice Job! ' + (trivArray[cnt][1]) + ' is the correct!</p>');
    setTimeout(function() {
        gameLoop();
    }, 1000);
}

function displayWrong() {
    $("#timer-div").empty();
    $("#answers").empty();
    $("#answers").append('<p>Nope! Nice try, the correct answer is: ' + (trivArray[cnt][1]) + '</p>');
    setTimeout(function() {
        gameLoop();
    }, 1000);
}

// function interval() {
//     setInterval(function() {
//         displayWrong();
//         cnt++;
//     }, 5000);
// }



function countDown() {
    var timeleft = 10;
    var myTimer = setInterval(function () {
        document.getElementById("pBar").value = (timeleft - 1);
        --timeleft;
        document.getElementById("pText").textContent = timeleft;
        if (timeleft <= 0) {
            clearInterval(myTimer); 
            displayWrong(); 
            cnt++
        }
    }, 1000);
}



// function countDown() {
//     var timeleft = 10;
//     var myTimer = setInterval(function () {
//         document.getElementById("pBar").value = (timeleft - 1);
//         --timeleft;
//         document.getElementById("pText").textContent = timeleft;
//         if (timeleft <= 0) {
//             displayWrong(); 
//         }
//     }, 1000);
// }








function roundConfirm() {
    setTimeout(function() {
        var nxtRound = confirm( "Continue to the next round?" );
        if ( nxtRound ) {
            gallowsReset();
            newRound();
        } else {
            rotateWheel("0", false)
            start() 
        } 
    }, 3000);
}