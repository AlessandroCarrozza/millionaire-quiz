const { createApp } = Vue

createApp({
    data() {
        return {
            userPoints: 0,
            gameOver: false,
            clickActive: true,
            questionsToDo: [],
            currentQuestion: '',
            currentOptions: [],
            datas: [
                {
                    question: 'Qual è la capitale della Spagna?',
                    options: [
                        {
                            text: 'Valencia',
                            result: false
                        },
                        {
                            text: 'Barcellona',
                            result: false
                        },
                        {
                            text: 'Madrid',
                            result: true
                        },
                        {
                            text: 'Ibiza',
                            result: false
                        }
                    ]
                },
                {
                    question: 'In che anno Cristoforo Colombo sbarcò in America?',
                    options: [
                        {
                            text: '1538',
                            result: false
                        },
                        {
                            text: '1492',
                            result: true
                        },
                        {
                            text: '1945',
                            result: false
                        },
                        {
                            text: '1388',
                            result: false
                        }
                    ]
                },
                {
                    question: 'Di che colore è il Golden Bridge di San Francisco?',
                    options: [
                        {
                            text: 'Rosso',
                            result: true
                        },
                        {
                            text: 'Oro',
                            result: false
                        },
                        {
                            text: 'Giallo',
                            result: false
                        },
                        {
                            text: 'Blu',
                            result: false
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        playStart() {
            const playBtnDom = document.getElementById('play-btn');
            const gameDom = document.querySelector('.game');

            playBtnDom.classList.add('d-none');
            gameDom.classList.remove('d-none');

            this.generateQuestionsList();

            this.generateSingleQuestion();

        },
        optionClick(index) {
            const optionsDom = document.querySelectorAll('.options .text');
            const nextBtnDom = document.getElementById('next-btn');
            const pointsDom = document.getElementById('results');
            if (!this.gameOver && this.clickActive) {
                if (this.currentOptions[index].result == false) {
                    console.log('falso')
                    optionsDom[index].classList.add('red')
                    for (let i = 0; i < this.currentOptions.length; i++) {
                        if (this.currentOptions[i].result) {
                            optionsDom[i].classList.add('green')
                        }
                    }
                    this.gameOver = true;
                    pointsDom.innerHTML = `Hai perso, ti mancavano ${this.questionsToDo.length - this.userPoints} domanda/e!`;

                } else {
                    console.log('vero')
                    optionsDom[index].classList.add('green')
                    this.userPoints++;
                    nextBtnDom.classList.remove('d-none');
                    this.clickActive = false;

                    const winDom = document.getElementById('win');
                    if (this.userPoints == 3) {
                        nextBtnDom.classList.add('d-none');
                        pointsDom.classList.add('d-none');
                        winDom.classList.remove('d-none');
                    }
                }
            }
        },
        generateSingleQuestion() {
            const optionsDom = document.querySelectorAll('.options .text');
            for (let i = 0; i < optionsDom.length; i++) {
                optionsDom[i].classList.remove('green');
            }
            this.clickActive = true;
            const nextBtnDom = document.getElementById('next-btn');
            nextBtnDom.classList.add('d-none');
            this.currentOptions = [];
            if (!this.gameOver) {
                this.currentQuestion = this.questionsToDo[this.userPoints].question;
                for (let i = 0; i < this.questionsToDo[this.userPoints].options.length; i++) {
                    this.currentOptions.push(this.questionsToDo[this.userPoints].options[i]);
                }
            }
        },
        generateQuestionsList() {
            // array delle domande selezionate randomicamente
            const questions = [];
            // ciclo per la selezione delle domande
            while (questions.length < this.datas.length) {
                let singleQuestion = this.datas[this.generateRandomNumber(0, this.datas.length - 1)];
                if (!questions.includes(singleQuestion)) {
                    questions.push(singleQuestion);
                }
            }

            this.questionsToDo = questions;
        },
        generateRandomNumber(min, max) {
            if (min >= max) {
                throw new Error('Il valore minimo deve essere inferiore al valore massimo.');
            }

            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            return randomNumber;
        }
    }
}).mount('#app')