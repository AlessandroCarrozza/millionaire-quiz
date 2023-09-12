const { createApp } = Vue

createApp({
    data() {
        return {
            currentQuestion: '',
            currentOptions: [],
            datas: [
                {
                    question: 'Qual è la capitale della Spagna?',
                    options: {
                        optionOne: {
                            text: 'Valencia',
                            result: false
                        },
                        optionTwo: {
                            text: 'Barcellona',
                            result: false
                        },
                        optionThree: {
                            text: 'Madrid',
                            result: true
                        },
                        optionFour: {
                            text: 'Ibiza',
                            result: false
                        }
                    }
                },
                {
                    question: 'In che anno Cristoforo Colombo sbarcò in America?',
                    options: {
                        optionOne: {
                            text: '1538',
                            result: false
                        },
                        optionTwo: {
                            text: '1492',
                            result: true
                        },
                        optionThree: {
                            text: '1945',
                            result: false
                        },
                        optionFour: {
                            text: '1388',
                            result: false
                        }
                    }
                },
                {
                    question: 'Di che colore è il Golden Bridge di San Francisco?',
                    options: {
                        optionOne: {
                            text: 'Rosso',
                            result: true
                        },
                        optionTwo: {
                            text: 'Oro',
                            result: false
                        },
                        optionThree: {
                            text: 'Giallo',
                            result: false
                        },
                        optionFour: {
                            text: 'Blu',
                            result: false
                        }
                    }
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
        },
        generateUniqueRandomNumber() {

        }
    }
}).mount('#app')