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
    var wins = 0;
    var loses = 0;
    // variable to hold interval 
    var showQuestion;

    var game = {
        gameOn: false,
        questions: ["What is my name?", "How old am I?", "How many siblings do I have?"],
        ans: [["James", "Tobi", "Frank", "Tom"],
        [29, 33, 25, 35],
        [0, 2, 3, 4]
        ],
        answers: {
            qOne: ["James", "Tobi", "Frank", "Tom"],
            qTwo: [29, 33, 25, 35],
            qThree: [0, 2, 3, 4]
        },
        answerValue: [1, 0, 2],
        timesUp: false,
        timer: 10,
        // decrease timmer by 1
        decrease: function () {
            game.timer--;
            $(".time-remaining").text("Time Remaining: " + game.timer);
            if (game.timer === 5) {
                console.log("time is up")
                clearInterval(counterId);
                game.timesUp = true;
            }

        },
        timerFunction: function () {
            counterId = setInterval(game.decrease, 1000);
            // console.log(game.decrease() + game.timer)
        }

    };

    var myQuestion = [
        {
            question: "Who is the strongest?",
            answers: ["Superman", "The Terminator", "Waluigi, obviously"], 
            correctAnswer: "Superman"
        },
        {
            question: "What is the best site ever created?",
            answers:["SitePoint","Simple Steps Code","Trick question; they're both the best" ], 
            correctAnswer: "Trick question; they're both the best"
        }
    ];

    


    

    for (var i = 0; i < myQuestion.length; i++) {
        var test = setInterval(console.log("interval: " + myQuestion[i].question), 2000)

    }
    // try and use the .each method to cycle through the questions and answers. 
    // for each object in the array push the question and answers for 30 seconds 
    // if times up - display incorrect and the correct answer - increase loss by 1 
    // if wrong answer selected - display incorrect and the correct answer  - increase loss by 1
    // if correct answer selected - display 'correct' and the correct answer 

    console.log("ans " + game.ans[0][1]);


    $("#button").on('click', function () {

        function displayQuestion(k) {
            
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
   
            };
          
        //    questionIndex++;
           if (questionIndex === myQuestion.length){
               questionIndex = 0;

           };
        };



        game.gameOn = true;
        // set timesup to false so that timer can decrease 
        game.timesUp = false;
        // reset game timer 
        game.timer = 11;
        // Display the current timer to the user 
        $(".time-remaining").html("Time Remaining: " + game.timer);
         
        displayQuestion(questionIndex);

        // showQuestion = setInterval(displayQuestion, 7000);
        // displayQuestion();



        game.timerFunction();

        $(".option").on("click", function () {
            
            // this dont work if ($(".option").attr("data-value") === myQuestion[questionIndex].correctAnswer) {
                // alert("you right")
            if ($(this).attr("data-value") === myQuestion[questionIndex].correctAnswer) {
                $(".answer-body").html("Yay you got it right <br> The correct answer is <br> <hr>" +
                myQuestion[questionIndex].correctAnswer);
                wins++;
                setTimeout(displayQuestion, 3000,questionIndex);

            }
            else {
                loses++;
                $(".answer-body").html("Sorry that is inccorect <br> The correct answer is <br> <hr>" +
                myQuestion[questionIndex].correctAnswer)
            };
            console.log("loses amout: " + loses)
            console.log($(".option").attr("data-value"))
        });



    });





});

