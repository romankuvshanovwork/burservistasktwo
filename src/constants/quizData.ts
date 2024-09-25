export const QUIZ_DATA = {
  questions: [
    {
      id: 0,
      type: "checkbox",
      question: "Что из нижеперечисленного является языком программирования?",
      options: ["HTML", "JavaScript", "XML", "Python", "CSS"],
      rightAnswer: ["JavaScript", "Python"],
      points: 2,
    },
    {
      id: 1,
      type: "radio",
      question: "Какой протокол используется для передачи веб-страниц?",
      options: ["HTTP(S)", "FTP", "SSH", "SMTP"],
      rightAnswer: "HTTP(S)",
      points: 1,
    },
    {
      id: 2,
      type: "checkbox",
      question:
        "Какие из нижеперечисленных технологий используются для фронтенд-разработки?",
      options: ["React", "Node.js", "Angular", "MongoDB", "Vue.js"],
      rightAnswer: ["React", "Angular", "Vue.js"],
      points: 3,
    },
    {
      id: 3,
      type: "checkbox",
      question:
        "Какая из нижеперечисленных технологий является системой управления базами данных (СУБД)?",
      options: ["MySQL", "JavaScript", "HTML", "CSS"],
      rightAnswer: ["MySQL"],
      points: 1,
    },
    {
      id: 4,
      type: "radio",
      question: "Какой язык используется для работы с базами данных?",
      options: ["SQL", "Java", "C++", "Python"],
      rightAnswer: "SQL",
      points: 1,
    },
  ],
  paragraph:
    "Вопросы, касающиеся основ программирования и веб-разработки, охватывают несколько ключевых тем. Среди языков программирования выделяются такие как JavaScript и Python, в то время как HTML и CSS не являются языками программирования. Для передачи веб-страниц используется протокол HTTP(S), а для фронтенд-разработки применяются технологии, такие как React, Angular и Vue.js. В качестве системы управления базами данных (СУБД) можно назвать MySQL, а для работы с базами данных чаще всего используется язык SQL.",
};
