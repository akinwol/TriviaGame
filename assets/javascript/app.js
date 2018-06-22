// Button to start the game 
// Need an array of questions 
// randomly select a question and display it to the user 
// based on the selection, display the list of options 
// Each round player must answer the question within the alotted a time 
// if counter is greater than 0 then user can select an anwer 
// -------Select an answer------
// When an answer is selected, compare the value of the input to the answer 
// if correct - display congratulation message and image to user for x time
// if incorrect - display incorrect message and image to user  for x time
// If selecting random questions then would need a function to remove each question from the list 
// if not random then once then game is over after the last question 
// ------Time remaining-----------
// Initialize a counter 30 seconds 
// have a function to reduce counter by 1 
// Setinterval to run function ever 1 seconds so that the counter can be reduced 
// Counter for time running out 
// if time runs out (counter is o)
// Display correct answer for x amount of time then move to another question 


$(document).ready(function () {
    var counterId;
    var questionIndex = 0;
    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var unansered = 0;

    // variable to hold interval 
    // var showQuestion;
    var game = {
        gameOn: false,
        timesUp: false,
        timer: 10,
        // decrease timmer by 1
        decrease: function () {
            game.timer--;
            $(".time-remaining").text("Time Remaining: " + game.timer);
            if (game.timer === 5) {
                console.log("time is up");
                unansered++;
                clearInterval(counterId);
                game.timesUp = true; 
                $(".answer-body").html(" <h2>TIMES UP!!!! </h2> <br> The correct answer is: <br> " +
                        myQuestion[questionIndex].correctAnswer);
                        questionIndex++;
                        nextEvent();     
            };

        },
        timerFunction: function () {
            counterId = setInterval(game.decrease, 1000);
            // console.log(game.decrease() + game.timer)
        }

    };

    var myQuestion = [
        {
            question: "Which park is the most filmed location in the world?",
            answers: ["Stanley Park - Vancouver", "Central Park - New York", "Hyde Park - London","Park Güell - Barcelona" ],
            correctAnswer: "Central Park - New York"
        },
        {
            question: "Who won more Academy Awards in his/her lifetime than any other person?",
            answers: ["Katharine Hepburn", "Meryl Streep", "Denzel Washington", "Walt Disney"],
            correctAnswer: "Walt Disney"
        },
        {
            question: "'The road to greatness can take you to the edge', is the tagline of which 2014 American drama film? ",
            answers: ["Boyhood", " A walk among the Tombstones", "Whiplash", "Draft day"],
            correctAnswer: "Whiplash"
        },
        {
            question: "What is the favorite food of the Teenage Mutant Ninja Turtles? ",
            answers: ["Pizza", "Burgers", "Chicken", "They are vegan, so anything pant based"],
            correctAnswer: "Pizza"
        }


    ];

    function displayQuestion(k) {
          // reset game timer 
          game.timer = 11;
           // Display the current timer to the user 
        $(".time-remaining").html("Time Remaining: " + game.timer);
        game.timerFunction();


        // Creating container for the question with a new div
        var questionContainer = $("<div>");
        // add class to the new div 
        questionContainer.addClass("card-header");
        // add new div to the game area 
        $(".game-area").html(questionContainer);
        questionContainer.html(" <strong> Your Question: </strong> <br>" + myQuestion[k].question);

        var answerContainer = $("<div>");
        answerContainer.addClass("card-body answer-body");
        $(".game-area").append(answerContainer);

        // For each option from the list of answers 
        for (var i = 0; i < myQuestion[k].answers.length; i++) {
            // create a new DIV
            var option = $("<div>");
            // give it a class of option 
            option.addClass("option");
            // give it a data attribute which has a value of the option 
            option.attr("data-value", myQuestion[k].answers[i]);
            // write the option to the new div 
            option.html(myQuestion[k].answers[i] + " <hr> ");
            // add the option to the body of options 
            $(".answer-body").append(option);
            game.gameOn = true;

        };

        //    questionIndex++;
        if (questionIndex === myQuestion.length) {
            questionIndex = 0;

        };
    };

    function nextEvent(){
        if (questionIndex < myQuestion.length){
            setTimeout(displayQuestion, 3000, questionIndex);
        }
        // have a function to writer game over and allow the user to start over 
        else ( setTimeout(gameOver, 3000,))
        
    };

    // clear time remaining 
    // Message - Game Over  in the header 
    // in the answer section - Here is how you did 
    // correct answers, incorrect answers, unansered amounts 
    // button to start over 
   
    function gameOver(){
        $(".card-header").html("<strong> GAME OVER </strong>")
        $(".answer-body").html("<h3> Here is how you did </h3> <br> Correct Ansers: " + correctAnswer +
        "<br> Incorrect Answers: " + incorrectAnswer + " <br> Unanswered: " + unansered +
            '<div> <a href="#" id="button" class="btn btn-primary">RESTART GAME </a></div>');

    };




    console.log("ans " + myQuestion.length);


    $(document).on('click', "#button", function () { 
        // set timesup to false so that timer can decrease 
        // game.timesUp = false;
         // Areset all the variable for the questions and correct answers 
        questionIndex = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;

        displayQuestion(questionIndex);

        // showQuestion = setInterval(displayQuestion, 7000);
        // displayQuestion();

        
        $(document).on("click", ".option", function () {

            clearInterval(counterId);

           // this dont work if ($(".option").attr("data-value") === myQuestion[questionIndex].correctAnswer) {
            //  alert("you right")
            if ($(this).attr("data-value") === myQuestion[questionIndex].correctAnswer) {
                $(".answer-body").html("Yay you got it right <br> The correct answer is: <br>" +
                    myQuestion[questionIndex].correctAnswer);
                correctAnswer++;
                questionIndex++;
                nextEvent();
    
            }
            else {
                incorrectAnswer++;
                $(".answer-body").html("Sorry that is inccorect <br> The correct answer is:  <br> " +
                    myQuestion[questionIndex].correctAnswer);
                    questionIndex++;
                    nextEvent();
            };
        });

    });

    if (game.gameOn === true){
       
    };

   




});

