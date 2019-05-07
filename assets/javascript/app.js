//////////////////////////////////
//////// Global Variables ////////
//////////////////////////////////
var timer = 0;
var questionList = [];

///////////////////////////
//////// Functions ////////
///////////////////////////

// Question object constructor.
function question(qNumber, qText, qAns1, qAns2, qAns3, qAns4, correctAns) {
    this.questionNumber = qNumber;
    this.questionText = qText;
    this.questionAnswer1 = qAns1;
    this.questionAnswer2 = qAns2;
    this.questionAnswer3 = qAns3;
    this.questionAnswer4 = qAns4;
    this.correctAnswer = correctAns;
    questionList.push(this);
};

var askQuestion = function() {

}

/////////////////////////
//////// Objects ////////
/////////////////////////

// Question objects getting created.
var question1 = new question(1, "What album was released by rock band Faith No More in 1989?", "Angel Dust", "Undertow", "California", "The Real Thing", 3);

var question2 = new question(2, "How many licks does it take to get to the Tootsie Roll centre of a Tootsie Pop?", "One", "Let's ask Mister Owl", "*Crunch*", "Three", 2);

///////////////////////////
////////  EXECUTE  ////////
///////////////////////////
console.log(question1);
console.log(question2);
console.log(questionList);

// For loop based on length of questionList. Maybe have it select 4 random ones without repeats, eventually.

// For later; how to access object properties for displaying question on screen.
// let bike = {name: 'SuperSport', maker:'Ducati', engine:'937cc'};
// console.log(bike.engine);     //Output: '937cc'
// console.log(bike['maker']);   //Output: 'Ducati'