//////////////////////////////////
//////// Global Variables ////////
//////////////////////////////////
var timer = 0;
var questionArr = []; // This is the question library.
var roundQuestion = [];

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
    var roundQuestion = getQuestion(aqInput);
    $("#roundQuestion").text(roundQuestion.questionText);
    $("#answer-1").text(roundQuestion.questionAnswer0);
    $("#answer-2").text(roundQuestion.questionAnswer1);
    $("#answer-3").text(roundQuestion.questionAnswer2);
    $("#answer-4").text(roundQuestion.questionAnswer3);
};

// Obtains the question from the library based on the runGame's current 'for' loop value.
var getQuestion = function (gqInput) {
    for (q = 0; q < questionArr.length; q++) {
        if (questionArr[q].questionNumber == gqInput) {
            return questionArr[q];
        };
    };
};

// New Game, main function.
var runGame = function () {
    for (i = 1; i <= questionArr.length; i++) {
        askQuestion(i);
        // start timer and await click answer
        // if timer expires, trigger roundEnd, disable answers, etc.
        // if instead the player clicks an answer, get the index of the answer and see if it matches the correctAnswer variable
        // highlight correct answer, accredit point or wrong answer values, enable "Next" button to move to the next question.
    }
};

///////////////////////////
////////  EXECUTE  ////////
///////////////////////////
console.log(questionArr);

// On page load, then on click of "next" button somewhere
runGame();

// For loop based on length of questionList. Maybe have it select 4 random ones without repeats, eventually.