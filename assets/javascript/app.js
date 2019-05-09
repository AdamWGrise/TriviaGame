//////////////////////////////////
//////// Global Variables ////////
//////////////////////////////////
var questionArr = []; // This is the question library.
var isCorrect = false;
var qtyRight = 0;
var qtyWrong = 0;
var questionSelector = 0; // Variable that advances and chooses the next question from the questionArr.
var roundQuestion = []; // The given question for the specific round.
var timer;
var intervalId;

/////////////////////////
//////// Objects ////////
/////////////////////////

// Question object constructor.
function questionObj(qNumber, qText, qAns0, qAns1, qAns2, qAns3, correctAns) {
    this.questionNumber = qNumber;
    this.questionText = qText;
    this.questionAnswer0 = qAns0;
    this.questionAnswer1 = qAns1;
    this.questionAnswer2 = qAns2;
    this.questionAnswer3 = qAns3;
    this.correctAnswer = correctAns;
    questionArr.push(this);
};

// Question objects getting created using the above constructor; it *should* work so additional questions can be entered here with no changes to the rest of the code.
///////////////////////////////////////////////////////////////
var question1 = new questionObj(1, "What album was released by rock band Faith No More in 1989?", "Angel Dust", "Undertow", "California", "The Real Thing", 3);

var question2 = new questionObj(2, "How many licks does it take to get to the Tootsie Roll centre of a Tootsie Pop?", "One", "Let's ask Mister Owl", "*Crunch*", "Three", 2);
///////////////////////////////////////////////////////////////

///////////////////////////
//////// Functions ////////
///////////////////////////

// Uses the 'getQuestion' function to get the question from the library; this function will then display all of the components on the screen.
var askQuestion = function (aqInput) {
    roundQuestion = questionArr[aqInput];
    $("#roundQuestion").text(roundQuestion.questionText);
    $("#answer-1").text(roundQuestion.questionAnswer0);
    $("#answer-2").text(roundQuestion.questionAnswer1);
    $("#answer-3").text(roundQuestion.questionAnswer2);
    $("#answer-4").text(roundQuestion.questionAnswer3);
    console.log(roundQuestion);
};

var roundEnd = function (isCorrect) {
    $(".answer").prop("disabled", true);
    if (isCorrect === false) {
        console.log("Round End: Bad sound! Increment Wrong answer total.")
        // Bad sound
        // Highlight right answer in green, wrong answer in red
        // Increment wrong answers
    } else {
        console.log("Round End: Good sound! Increment Right answer total.")
        // Good sound
        // Highlight correct answer in green
        // Increment correct answers
    }
    questionSelector++;
    console.log("new question number is " + questionSelector);
    $("#next").show();
}

var roundCheck = function() {
    console.log("questionSelector is " + questionSelector + " of " + questionArr.length + " questions");
    if (questionSelector >= questionArr.length) {
        console.log("credits");
    } else {
        console.log("run game");
        runGame();
    }
}

var runTimer = function() {
    clearInterval(intervalId);
    intervalId = setInterval(roundTimer, 1000);
}

var roundTimer = function() {
    timer--;
    $("#timerDisplay").html("<h3>" + timer + "</h3>");
    if (timer === 0) {
        clearInterval(intervalId);
        roundEnd(isCorrect);
    }
}

var runGame = function () {
    $("#next").hide();
    $(".answer").prop("disabled", false);
    askQuestion(questionSelector);
    console.log("question number " + questionSelector);
    timer = 15;
    $("#timerDisplay").html("<h3>" + timer + "</h3>");
    runTimer();
    $('.answer').click(function () {
        if ($(this).attr("value") == roundQuestion.correctAnswer) {
            isCorrect = true;
        } else {
            isCorrect = false;
        }
        console.log("isCorrect: " + isCorrect);
        // clearTimeout(roundTimer);
        clearInterval(intervalId);
        roundEnd(isCorrect);
    });
    // start timer and await click answer
    // if timer expires, trigger roundEnd, disable answers, etc.
    // if instead the player clicks an answer, get the index of the answer and see if it matches the correctAnswer variable
    // highlight correct answer, accredit point or wrong answer values, enable "Next" button to move to the next question.
    // Add responses to the answers
    // Add completion screen after cycling through the questionArr.length
    // Add timer to screen display
};

///////////////////////////
////////  EXECUTE  ////////
///////////////////////////
console.log(questionArr);

// On page load, then on click of "next" button somewhere
runGame();

// For loop based on length of questionList. Maybe have it select 4 random ones without repeats, eventually.