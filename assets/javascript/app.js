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
var colorArr = ["#FF0505", "#FF3D08", "#FF740C", "#FFA90F", "#FFDD13", "#EEFF17", "#BEFF1A", "#8FFF1E", "#61FF22", "#36FF25", "#29FF47", "#2DFF77", "#30FFA5", "#34FFD2", "#38FFFE"]; // Color array for the timer display
var rightAnswer = new Audio('assets/audio/sfxRightAnswer.mp3');
rightAnswer.volume = 0.2;
var wrongAnswer = new Audio('assets/audio/sfxWrongAnswer.mp3');
wrongAnswer.volume = 0.2;
var endingMsg = "";
var endingComment = "";



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
var question1 = new questionObj(1,"Which of these does not belong?","Soundgarden","Established in Seattle, Washington in 1984.","Alice in Chains","1985, Seattle, Washington.","Nirvana","1987, Aberdeen, Washington.","Iron Maiden","While all these bands were popular around the same time (late 80s into the early 90s), Iron Maiden is definitely the odd one out, as it was established much earlier (1975), but mainly, the others are considered to be some of the staple groups in the history and influence of the grunge genre.",3);
var question2 = new questionObj(2,"What killed the radio star?","Hammertime","Stop!","Video","The hit by the Buggles in 1979! And now it's stuck in your head.","Heroin","While it's likely true that heroin killed *some* radio star somwhere, I think you missed the reference.","Twitter","Sometimes it feels like Twitter has been around forever, doesn't it?",1);
var question3 = new questionObj(3,"Radiohead's debut album, Pablo Honey, was marketed in the US mainly to what demographic?","People who watched Beavis and Butthead","The ad from their US label: 'Radiohead - better than Butt-head! Oxford England's rowdiest new band. Huh-huh-huh, music that doesn't suck. Featuring the self-loathing anthem 'Creep.'","Hippies","It's easy to try to target the hippies for stuff, but it usually doesn't get too far.","The British Army","This one's totally made up.","Video gamers","There may be a correlation there, but nope.",0);
var question4 = new questionObj(4,"What album was released by the band Faith No More in 1989?","Angel Dust","Angel Dust was their fourth studio album released in 1992.","Undertow","This is the first studio album by the rock band Tool released in 1993.","California","California is the name of several other albums but there's only one that comes from one of Faith No More's associated acts. Mr. Bungle is an eclectic experimental metal band led by Faith No More's frontman Mike Patton, and California is their final album released in 1999.","The Real Thing","Faith No More's third studio album with three singles: 'From Out of Nowhere' 'Epic' and 'Falling to Pieces.'",3);
var question5 = new questionObj(5,"How many musicians were key contributors to Nine Inch Nails's early studio albums?","Twelve","Not even close! Pretty Hate Machine was made in Trent Reznor's spare time between work shifts; not likely he would have had a solid schedule that worked with eleven other people.","One","Yep! This is a bit of a trick question. Nine Inch Nails has, throughout its history, been mainly Trent Reznor doing all of the music. He largely only recruits additional people for performing live tours.","Four","Typical nuclear family-style band, a four-piecer. But nope.","Two","Currently, Nine Inch Nails has two main members: Trent Reznor and Atticus Ross. But Atticus wasn't in the picture until around 2016.",1);
var question6 = new questionObj(6,"What did Ozzy bark at?","Sharon","If you saw the TV show, you definitely know this is true. Not the reference we're looking for, though.","His dealer","Yeah, this one's just straight up kooky-dukes.","The Moon","Look it up if you didn't know this one! A true classic.","War Pigs","If you picked this, you were at least on the right track. War Pigs is a song by Black Sabbath, frontmanned by Ozzy himself.",2);
var question7 = new questionObj(7,"Weezer frontman Rivers Cuomo started his first band when he was 14 years old. What was the band called?","Fight for Your Right","This is close - Fight for Your Right is actually the first song Cuomo wrote at the same age.","Undone","This is one of 50 songs Rivers challenged himself to write in December 1991.","Raji","Raji's is the first venue that Weezer ever performed at, located in West LA. That was in 1992.","Fury","Rivers's brother Leaves played guitar; in their first show, they covered three Kiss songs.",3);
var question8 = new questionObj(8,"Which was Michael Jackson's best-selling album?","Thriller","66 million worldwide sales; originially released November of 1982.","Dangerous","32 million sales; released November of 1991.","Bad","35 million sales; September 1987.","Off the Wall","20 million sales; August 1979.",0);
var question9 = new questionObj(9,"Stephan Jenkins is the lead singer and songwriter for what band, a leadership that has led to five albums ranking in the top 40 of Billboard's Sales Charts?","Smash Mouth","Smash Mouth is instead Steve Harwell. And their sales were not quite that successful.","Third Eye Blind","The five albums being Third Eye Blind (1997), Blue (1999), Out of the Vein (2003), Ursa Major (2009), and Dopamine (2015).","Van Halen","Van Halen's lead singer is Eddie. Eddie Van Halen.","Scorpions","Random incorrect answer. xD",1);
var question10 = new questionObj(10,"What popular band from the 1990s played a show in New York in the week following 9/11, making them the only major band who didn't cancel their NYC shows in the week following the attack?","Bon Jovi","I've heard Jon Bon Jovi is like, a really nice guy. Seems like he'd be one to be considerate.","Judas Priest","Yeah, if you answered this, you were going for the obvious answer, it seems like.","Incubus","That's right!","AC/DC","If you picked THIS one... You picked it because of their song, 'Safe in New York City,' didn't you? You sicko.",2);

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
};

// Timer - clearing and setting interval:
var runTimer = function () {
    clearInterval(intervalId);
    intervalId = setInterval(roundTimer, 1000);
};

// Timer - displaying and ending round if timeout happens:
var roundTimer = function () {
    timer--;
    $("#timerDisplay").attr("style", "color:" + colorArr[timer]);
    $("#timerDisplay").text(timer);
    if (timer === 0) {
        $("#timerDisplay").html("<h2>Time's up!</h2>");
        clearInterval(intervalId);
        roundEnd(isCorrect);
    };
};

/////////////////  MAIN GAME CYCLE FUNCTIONS  ///////////////////

// Runs when a new game is selected from the ending screen.
var freshGame = function () {
    isCorrect = false;
    qtyRight = 0;
    qtyWrong = 0;
    questionSelector = 0;
    roundQuestion = [];
    questionsAnswered = 0;
    endingMsg = "";
    endingComment = "";
};

// This runs before the next round starts, to see if we're at the end of the question array.
var roundCheck = function () {
    if (questionSelector >= questionArr.length) {
        endGame();
    } else { // Otherwise run the game for the next round!
        runGame();
    };
};

// This is the main game function that runs when a round starts, a question is asked, and the answers are presented.
var runGame = function () {
    $('.answer').attr('style', '');
    $("#next").hide(); // Hide the "Next Question" button.
    $(".comment").hide(); // Hide answer comments.
    $(".answer").prop("disabled", false); // Enable answer buttons.
    askQuestion(questionSelector); // Gets the question & answers for this round.
    timer = 15; // Resets the round timer.
    $("#timerDisplay").text(timer); // Update timer display.
    $("#timerDisplay").attr("style", "color:lightblue");
    runTimer(); // Starts the timer.
    $('.answer').unbind().click(function () { // Answer click response.
        if ($(this).attr("value") == roundQuestion.correctAnswer) { // Right answer?
            isCorrect = true;
        } else {
            isCorrect = false;
            ($(this).css({
                "background-color": "red",
                "color": "white"
            })); // Highlight the selected incorrect answer in red.
        };
        ($("button[value=" + roundQuestion.correctAnswer + "]")).css({
            "background-color": "green",
            "color": "white"
        }); // Highlight the correct answer in green.
        clearInterval(intervalId); // Reset the timer interval following the click.
        roundEnd(isCorrect); // Second major function, all the stuff between rounds.
    });
};

// This runs under one of two conditions - either an answer is selected, or the timer runs out.
var roundEnd = function (isCorrect) {
    $(".answer").prop("disabled", true); // Disable the answer buttons.
    if (isCorrect === false) { // If wrong answer, bad sound and increment wrong answer total.
        qtyWrong++;
        wrongAnswer.play();
    } else { // If right answer, good sound and increment right answer total.
        qtyRight++;
        rightAnswer.play();
    };
    questionsAnswered++;
    $("#currentScore").text("Score: " + qtyRight + " / " + questionsAnswered); // Update score display
    questionSelector++; // Next time askQuestion is called, it'll be the next question.
    $("#next").show(); // Enable the "Next Question" button.
    $(".comment").show(); // Show the comments on the answers.
};

var endGame = function () {
    $(".gameContent").hide();
    if (qtyRight / questionArr.length > 0.8) {
        endingMsg = "Wow, you're a rock god! Amazing work!";
    } else if (qtyRight / questionArr.length > 0.6) {
        endingMsg = "Nicely done. Respectable. Keep learning!";
    } else if (qtyRight / questionArr.length > 0.4) {
        endingMsg = "Not bad. Not great, but not horrible. I've seen better. But I've also seen worse. If you made a quiz list of all the people who did the quiz, you'd be right in the middle somewhere."
    } else if (qtyRight / questionArr.length > 0.2) {
        endingMsg = "Hmm... You're either really old... really young... or you just didn't care all that much!"
    } else {
        endingMsg = "Did you just guess every question and get really unlucky?"
    };
    endingComment = "You scored " + qtyRight + " questions correct out of " + questionArr.length + ". " + endingMsg;
    $("#endingComment").text(endingComment);
    $("#ending").show();
};

////////////////////// PAGE LOAD STUFF /////////////////////////

// Change screen upon game start.
var beginGame = function () {
    freshGame();
    $(".gameContent").show();
    $("#ending").hide();
    $("#currentScore").text("Score: 0 / 0"); 
    $(".gameIntro").hide();
    $(".gameHeader").hide();
    runGame();

};

// Displays on page load.
var intro = function () {
    $(".gameContent").hide();
    $("#ending").hide();
};

// On page load.
$("#bgm").prop("volume", 0.1);
$(document).ready(intro());

// TO DO
// Make LOTS more questions, figure out a way to automate, possibly get a random set each play