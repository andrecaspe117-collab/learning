// ==============================
// LESSON DATA
// ==============================

const lessons = {

    1: {
        title: "Introduction to HTML",

        description:
            "Learn the basic structure of a website using HTML.",

        topics: [
            "HTML structure",
            "Headings and paragraphs",
            "Links and images",
            "Lists"
        ],

        text:
            "HTML stands for HyperText Markup Language. " +
            "It is used to create the structure and content " +
            "of a web page. HTML uses elements called tags " +
            "to tell the browser what each part of the page is.",

        example:
`<h1>My Website</h1>

<p>
    Welcome to my website.
</p>`
    },


    2: {
        title: "CSS Fundamentals",

        description:
            "Learn how CSS controls colors, fonts, spacing and layouts.",

        topics: [
            "CSS selectors",
            "Colors and fonts",
            "Margins and padding",
            "Website layouts"
        ],

        text:
            "CSS stands for Cascading Style Sheets. " +
            "CSS is used to control the appearance of HTML elements. " +
            "You can use CSS to change colors, fonts, sizes, spacing " +
            "and the overall layout of a website.",

        example:
`p {
    color: blue;
    font-size: 18px;
    margin: 10px;
}`
    },


    3: {
        title: "JavaScript Basics",

        description:
            "Learn how JavaScript makes websites interactive.",

        topics: [
            "Variables",
            "Functions",
            "Events",
            "DOM interaction"
        ],

        text:
            "JavaScript is a programming language that can add " +
            "interaction and behavior to a website. It can respond " +
            "to user actions such as clicking a button and can " +
            "change the content of a web page.",

        example:
`button.addEventListener("click", function() {

    alert("Hello!");

});`
    }

};


// ==============================
// QUIZ QUESTIONS
// ==============================

const questions = [

    {
        question:
            "What does HTML primarily provide on a website?",

        options: [
            "Structure and content",
            "Only colors",
            "Only animations",
            "Internet access"
        ],

        answer: 0
    },


    {
        question:
            "What is CSS mainly used for?",

        options: [
            "Styling and layout",
            "Storing passwords",
            "Creating databases",
            "Sending emails"
        ],

        answer: 0
    },


    {
        question:
            "Which language is commonly used to add interaction to a web page?",

        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],

        answer: 2
    },


    {
        question:
            "Which HTML element is commonly used for the main heading?",

        options: [
            "<p>",
            "<h1>",
            "<img>",
            "<ul>"
        ],

        answer: 1
    },


    {
        question:
            "What can JavaScript respond to?",

        options: [
            "User events such as clicks",
            "Only printed documents",
            "Only images",
            "Only CSS files"
        ],

        answer: 0
    }

];


// ==============================
// PAGE NAVIGATION
// ==============================

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// OPEN LESSON
// ==============================

function openLesson(lessonNumber) {

    const lesson = lessons[lessonNumber];

    document.getElementById("lessonTitle").textContent =
        lesson.title;

    document.getElementById("lessonDescription").textContent =
        lesson.description;

    document.getElementById("lessonText").textContent =
        lesson.text;

    document.getElementById("lessonExample").textContent =
        lesson.example;


    const topicList =
        document.getElementById("lessonTopics");

    topicList.innerHTML = "";

    lesson.topics.forEach(topic => {

        const li = document.createElement("li");

        li.textContent = topic;

        topicList.appendChild(li);

    });


    showPage("lessonDetails");
}


// ==============================
// CREATE QUIZ
// ==============================

function loadQuiz() {

    const container =
        document.getElementById("quizQuestions");

    container.innerHTML = "";


    questions.forEach((question, index) => {

        const card =
            document.createElement("div");

        card.className = "question-card";


        const title =
            document.createElement("h3");

        title.textContent =
            `${index + 1}. ${question.question}`;

        card.appendChild(title);


        question.options.forEach((option, optionIndex) => {

            const button =
                document.createElement("button");

            button.className = "option";

            button.textContent =
                `${String.fromCharCode(65 + optionIndex)}. ${option}`;


            button.onclick = function() {

                const options =
                    card.querySelectorAll(".option");

                options.forEach(btn => {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");

                button.dataset.selected =
                    optionIndex;
            };


            card.appendChild(button);

        });


        container.appendChild(card);

    });

}


// ==============================
// SUBMIT QUIZ
// ==============================

function submitQuiz() {

    const cards =
        document.querySelectorAll(".question-card");

    let score = 0;

    let answered = 0;


    cards.forEach((card, index) => {

        const selected =
            card.querySelector(".selected");


        if (selected) {

            answered++;

            const selectedAnswer =
                Number(selected.dataset.selected);

            if (
                selectedAnswer ===
                questions[index].answer
            ) {

                score++;

            }

        }

    });


    if (answered < questions.length) {

        alert(
            "Please answer all questions before submitting."
        );

        return;
    }


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    document.getElementById("score").textContent =
        `${score}/${questions.length}`;


    document.getElementById("percentage").textContent =
        `${percentage}%`;


    let message;


    if (percentage >= 80) {

        message = "Excellent work!";

    } else if (percentage >= 60) {

        message = "Good effort!";

    } else {

        message = "Keep practicing!";

    }


    document.getElementById("resultMessage").textContent =
        message;


    showPage("results");
}


// ==============================
// LOAD QUIZ WHEN PAGE OPENS
// ==============================

loadQuiz();