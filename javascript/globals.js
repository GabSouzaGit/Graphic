// Obtendo e gerando todos os objetos necessários.
var globalRegisterCounter = 0;
const HSL_OPCTY = '60%';

const canvas = document.querySelector('canvas');
const historic = document.querySelector("#historic table");
const stats = document.querySelector("#stats");

const sendButton = document.querySelector("#send");
const resetButton = document.querySelector("#clean")

const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;