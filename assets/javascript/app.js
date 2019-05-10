//////////////////////////////////
//////// Global Variables ////////
//////////////////////////////////
var questionArr = []; // This is the question library.
var isCorrect = false; // Boolean check if the right answer was selected for the round.
var qtyRight = 0; // Count of correct answers.
var qtyWrong = 0; // Count of incorrect answers.
var questionSelector = 0; // Variable that advances and chooses the next question from the questionArr.
var roundQuestion = []; // The given question for the specific round.
var questionsAnswered = 0;
var timer; // Number of seconds for the timer.
var intervalId; // Interval used for round timer.
var colorArr = ["#FF0505","#FF3D08","#FF740C","#FFA90F","#FFDD13","#EEFF17","#BEFF1A","#8FFF1E","#61FF22","#36FF25","#29FF47","#2DFF77","#30FFA5","#34FFD2","#38FFFE"]; // Color array for the timer display
var rightAnswer = new Audio('assets/audio/sfxRightAnswer.mp3');
rightAnswer.volume = 0.2;
var wrongAnswer = new Audio('assets/audio/sfxWrongAnswer.mp3');
wrongAnswer.volume = 0.2;
var bgm = new Audio('assets/audio/bgm.mp3');
bgm.volume = 0.1;

/////////////////////////
//////// Objects ////////
/////////////////////////

// Question object constructor.
function questionObj(qNumber, qText, qAns0, qCom0, qAns1, qCom1, qAns2, qCom2, qAns3, qCom3, correctAns) {
    this.questionNumber = qNumber;
    this.questionText = qText; // Actual question text.
    // Below are the 4 answers for the question and comments for 'em.
    this.questionAnswer0 = qAns0;
    this.questionAnswer0comment = qCom0;
    this.questionAnswer1 = qAns1;
    this.questionAnswer1comment = qCom1;
    this.questionAnswer2 = qAns2;
    this.questionAnswer2comment = qCom2;
    this.questionAnswer3 = qAns3;
    this.questionAnswer3comment = qCom3;
    this.correctAnswer = correctAns; // Of the 4 answers, which is right?
    questionArr.push(this); // Constructor adds each defined question to the library/array.
};

// Question objects getting created using the above constructor; it *should* work so additional questions can be entered here with no changes to the rest of the code.
///////////////////////////////////////////////////////////////
var question1 = new questionObj(1, "What album was released by the band Faith No More in 1989?", "Angel Dust", "Angel Dust was their fourth studio album, released in 1992.", "Undertow", "This is the first studio album by the rock band Tool, released in 1993.", "California", "California is the name of several other albums, but there's only one that comes from one of Faith No More's associated acts. Mr. Bungle is an eclectic, experimental metal band led by Faith No More's frontman, Mike Patton. California is their final album, released in 1999.", "The Real Thing", "Faith No More's third studio album, with three singles: 'From Out of Nowhere,' 'Epic,' and 'Falling to Pieces.'", 3);

var question2 = new questionObj(2, "How many licks does it take to get to the Tootsie Roll centre of a Tootsie Pop?", "One", "Really? One lick? What kinda freaky tongue you got?", "Ask Mr. Owl", "The second best answer! He's wise.", "*Crunch*", "This is pretty much where the sucker ends. Nobody licks it to the center! Come on, now.", "Three", "Yeah, this is what Mr. Owl *says*, but we all know he's full of it.", 2);
///////////////////////////////////////////////////////////////

///////////////////////////
//////// FUNCTIONS ////////
///////////////////////////

// Uses the 'getQuestion' function to get the question from the library; this function will then display all of the components on the screen.
var askQuestion = function (aqInput) {
    roundQuestion = questionArr[aqInput];
    $("#roundQuestion").text("Question " + roundQuestion.questionNumber + " of " + questionArr.length + ": " + roundQuestion.questionText);
    $("#answer-1").text(roundQuestion.questionAnswer0);
    $("#answer-2").text(roundQuestion.questionAnswer1);
    $("#answer-3").text(roundQuestion.questionAnswer2);
    $("#answer-4").text(roundQuestion.questionAnswer3);
    $("#comment-1").text(roundQuestion.questionAnswer0comment);
    $("#comment-2").text(roundQuestion.questionAnswer1comment);
    $("#comment-3").text(roundQuestion.questionAnswer2comment);
    $("#comment-4").text(roundQuestion.questionAnswer3comment);
    console.log(roundQuestion);
};

// Timer - clearing and setting interval:
var runTimer = function () {
    clearInterval(intervalId);
    intervalId = setInterval(roundTimer, 1000);
}

// Timer - displaying and ending round if timeout happens:
var roundTimer = function () {
    timer--;
    $("#timerDisplay").attr("style","color:" + colorArr[timer]);
    $("#timerDisplay").text(timer);
    if (timer === 0) {
        $("#timerDisplay").html("<h2>Time's up!</h2>");
        clearInterval(intervalId);
        roundEnd(isCorrect);
    }
}

/////////////////  MAIN GAME CYCLE FUNCTIONS  ///////////////////

// This runs before the next round starts, to see if we're at the end of the question array.
var roundCheck = function () {
    console.log("questionSelector is " + questionSelector + " of " + questionArr.length + " questions");
    if (questionSelector >= questionArr.length) { // Stop the game and go to the ending screen.
        // TO ADD: Ending screen with score and snarky comments.
        console.log("credits");
    } else { // Otherwise run the game for the next round!
        console.log("run game");
        runGame();
    }
}

// This is the main game function that runs when a round starts, a question is asked, and the answers are presented.
var runGame = function () {
    $('.answer').attr('style','');
    $("#next").hide(); // Hide the "Next Question" button.
    $(".comment").hide(); // Hide answer comments.
    $(".answer").prop("disabled", false); // Enable answer buttons.
    askQuestion(questionSelector); // Gets the question & answers for this round.
    console.log("question number " + questionSelector);
    timer = 15; // Resets the round timer.
    $("#timerDisplay").text(timer); // Update timer display.
    $("#timerDisplay").attr("style","color:lightblue");
    runTimer(); // Starts the timer.
    $('.answer').click(function () { // Answer click response.
        if ($(this).attr("value") == roundQuestion.correctAnswer) { // Right answer?
            isCorrect = true;
        } else {
            isCorrect = false;
            ($(this).css({"background-color":"red","color":"white"})); // Highlight the selected incorrect answer in red.
        }
        ($("button[value=" + roundQuestion.correctAnswer + "]")).css({"background-color":"green","color":"white"}); // Highlight the correct answer in green.
        clearInterval(intervalId); // Reset the timer interval following the click.
        roundEnd(isCorrect); // Second major function, all the stuff between rounds.
    });
};

// This runs under one of two conditions - either an answer is selected, or the timer runs out.
var roundEnd = function (isCorrect) {
    $(".answer").prop("disabled", true); // Disable the answer buttons.
    if (isCorrect === false) { // If wrong answer, bad sound and increment wrong answer total.
        console.log("Round End: Bad sound! Increment Wrong answer total.");
        qtyWrong++;
        wrongAnswer.play();
    } else { // If right answer, good sound and increment right answer total.
        console.log("Round End: Good sound! Increment Right answer total.")
        qtyRight++;
        rightAnswer.play();
    }
    questionsAnswered++;
    $("#currentScore").text("Score: " + qtyRight + " / " + questionsAnswered); // Update score display
    questionSelector++; // Next time askQuestion is called, it'll be the next question.
    console.log("new question number is " + questionSelector);
    $("#next").show(); // Enable the "Next Question" button.
    $(".comment").show(); // Show the comments on the answers.
}

////////////////////// PAGE LOAD STUFF /////////////////////////

// Change screen upon game start.
var beginGame = function() {
    $(".gameContent").show();
    $(".gameIntro").hide();
    $(".gameHeader").hide();
    bgm.play();
    runGame();
}

// Displays on page load.
var intro = function() {
    $(".gameContent").hide();
}

// On page load.
$(document).ready(intro());

// TO DO
// Add completion screen after cycling through the questionArr.length
// Add correct answers tracker to top right
    // SOMETHING WRONG WITH THIS - I think the roundEnd function is getting double called or something
// Make LOTS more questions, figure out a way to automate, possibly get a random set each play