// Obtendo e gerando todos os objetos necessários.
var globalRegisterCounter = 0;
const HSL_OPCTY = '60%';
const APPEARANCE_SCALE = [
    "Horrivel 🤮",
    "Muito feia 🤢",
    "Feia 😔",
    "Feinha 🤨",
    "Mais ou menos 🤔",
    "Bonitinha 👀",
    "Bonita 😏",
    "Gata 🥵",
    "Linda 😍",
    "Perfeição ✨"
]

const SYMPATHY_SCALE = [
    "Procure um médico 🤡",
    "Terrível 🤮",
    "Muito chata 😒",
    "Chatinha 🙄",
    "Suportável 😑",
    "Dá para melhorar 🤔",
    "Pessoa normal 🙂",
    "Pessoa incrível 😆",
    "Espetacular 😍",
    "1 em 1.000.000 💖"
]

const linearAreas = ["A++", "A+", "A", "B", "C", "A", "C", "E", "F"]

const canvas = document.querySelector('canvas');
const historic = document.querySelector("#historic table");
const sendButton = document.querySelector("#send");
const resetButton = document.querySelector("#clean")

const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;