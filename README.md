# Trivia Game

Homework for full stack development bootcamp UT-Austin (UT-VIRT-FSF-PT-11-2019-U-LOL)

Limited time to create game so UI is very plain, but chose advanced assignment

Game link: [Trivia Game](https://williamstephan.github.io/TriviaGame/)

## Specifications

* Create a trivia game that shows only one question until the player answers it or their time runs out.

* If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

* If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

* If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

* On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).

## Items of note

* Added a countdown progress bar
* Created a randimizer for answer display order - reducing logic requirements. The correct answer is always the first array element but elements display randomly on screen.
