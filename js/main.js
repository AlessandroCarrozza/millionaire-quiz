const { createApp } = Vue

createApp({
    data() {
        return {
            userPoints: 0,
            gameOver: false,
            clickActive: true, //clickActive è se l'utente puo clickare sulle opzioni
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
                },
                {
                    question: "Qual è l'isola piu grande del mondo?",
                    options: [
                        {
                            text: 'Sardegna',
                            result: false
                        },
                        {
                            text: 'Australia',
                            result: false
                        },
                        {
                            text: 'Groenlandia',
                            result: true
                        },
                        {
                            text: 'Inghilterra',
                            result: false
                        }
                    ]
                },
                {
                    question: "Chi è stato l'ultimo marito di Cleopatra?",
                    options: [
                        {
                            text: 'Giulio Cesare',
                            result: false
                        },
                        {
                            text: 'Luigi XIV',
                            result: false
                        },
                        {
                            text: 'Marco Antonio',
                            result: true
                        },
                        {
                            text: 'El Shaarawy',
                            result: false
                        }
                    ]
                },
                {
                    question: 'Da quale lingua deriva lo spagnolo?',
                    options: [
                        {
                            text: 'Greco',
                            result: false
                        },
                        {
                            text: 'Latino',
                            result: true
                        },
                        {
                            text: 'Romano',
                            result: false
                        },
                        {
                            text: 'Rumeno',
                            result: false
                        }
                    ]
                },
                {
                    question: 'Chi ha vinto la Coppa del Mondo 2014?',
                    options: [
                        {
                            text: 'Olanda',
                            result: false
                        },
                        {
                            text: 'Argentina',
                            result: false
                        },
                        {
                            text: 'Spagna',
                            result: false
                        },
                        {
                            text: 'Germania',
                            result: true
                        }
                    ]
                },
                {
                    question: 'Qual è la galassia piu vicina alla Via Lattea?',
                    options: [
                        {
                            text: 'Galanear',
                            result: false
                        },
                        {
                            text: 'Abell',
                            result: false
                        },
                        {
                            text: 'Andromeda',
                            result: true
                        },
                        {
                            text: 'Magellano',
                            result: false
                        }
                    ]
                },
                {
                    question: 'Quanti stati ci sono negli Stati Uniti?',
                    options: [
                        {
                            text: '30',
                            result: false
                        },
                        {
                            text: '50',
                            result: true
                        },
                        {
                            text: '40',
                            result: false
                        },
                        {
                            text: '60',
                            result: false
                        }
                    ]
                },
                {
                    question: 'In che anno è nato Harry Potter?',
                    options: [
                        {
                            text: '1976',
                            result: false
                        },
                        {
                            text: '1990',
                            result: false
                        },
                        {
                            text: '1999',
                            result: false
                        },
                        {
                            text: '1980',
                            result: true
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
            const levelDom = document.querySelectorAll('#level-track .step');
            const levelTrackDom = document.getElementById('level-track');

            playBtnDom.classList.add('d-none');
            gameDom.classList.remove('d-none');
            levelTrackDom.classList.remove('d-none');

            for (let i = 0; i < levelDom.length; i++) {
                levelDom[i].classList.remove('current-level')
            }

            levelDom[0].classList.add('current-level');

            this.generateQuestionsList();

            this.generateSingleQuestion();
        },
        reStart() {
            const reStartDom = document.getElementById('restart-btn');
            const optionsDom = document.querySelectorAll('.options .text');
            reStartDom.classList.add('d-none');

            for (let i = 0; i < this.currentOptions.length; i++) {
                if (this.currentOptions[i].result == false) {
                    optionsDom[i].classList.remove('red')
                }
            }


            this.userPoints = 0;
            this.gameOver = false;
            this.clickActive = true; //clickActive è se l'utente puo clickare sulle opzioni
            this.questionsToDo = [];
            this.currentQuestion = '';
            this.currentOptions = [];

            this.playStart();
        },
        optionClick(index) { // function del click su un opzione
            const optionsDom = document.querySelectorAll('.options .text');
            const pointsDom = document.getElementById('results');
            if (!this.gameOver && this.clickActive) { // se il game è non è finito e il click attivo
                if (this.currentOptions[index].result == false) {
                    // se click su falso
                    this.clickFalse(index, optionsDom, pointsDom);
                } else {
                    // se click su vero
                    this.clickTrue(index, optionsDom, pointsDom);
                }
            }
        },
        clickFalse(index, optionsDom, pointsDom) {
            const reStartDom = document.getElementById('restart-btn');
            optionsDom[index].classList.add('red')
            for (let i = 0; i < this.currentOptions.length; i++) {
                if (this.currentOptions[i].result) {
                    optionsDom[i].classList.add('green')
                }
            }
            this.gameOver = true;
            reStartDom.classList.remove('d-none');
            pointsDom.innerHTML = `Hai perso con un punteggio di ${this.userPoints}, ti mancavano ${this.questionsToDo.length - this.userPoints} domanda/e!`;
        },
        clickTrue(index, optionsDom, pointsDom) {
            const nextBtnDom = document.getElementById('next-btn');
            const winDom = document.getElementById('win');
            const trophyDom = document.getElementById('trophy');
            const levelDom = document.querySelectorAll('#level-track .step');
            optionsDom[index].classList.add('green')
            this.userPoints++;
            for (let i = 0; i < levelDom.length; i++) {
                levelDom[i].classList.remove('current-level')
            }
            levelDom[this.userPoints].classList.add('current-level')
            nextBtnDom.classList.remove('d-none');
            this.clickActive = false;
            // se il punteggio è uguale alla length delle domande disponibili, lo user vince
            if (this.userPoints == this.questionsToDo.length) {
                nextBtnDom.classList.add('d-none');
                pointsDom.classList.add('d-none');
                winDom.classList.remove('d-none');
                trophyDom.classList.remove('d-none');
            }
        },
        generateSingleQuestion() {
            // generare la singola domanda con le relative opzioni
            const optionsDom = document.querySelectorAll('.options .text');
            const nextBtnDom = document.getElementById('next-btn');
            for (let i = 0; i < optionsDom.length; i++) {
                optionsDom[i].classList.remove('green');
            }
            this.clickActive = true;
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