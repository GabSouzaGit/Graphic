// Obtendo e gerando todos os objetos necessários.
var globalRegisterCounter = 0;
const GRAPH_STRUCT_COLOR = "#fff";
const HSL_OPCTY = '60%';

const canvas = document.querySelector('canvas');
const historic = document.querySelector("#historic table");
const stats = document.querySelector("#stats");
const slide = document.querySelector("#slide");
const slideClose = document.querySelector("#slide-close")

const sendButton = document.querySelector("#send");
const resetButton = document.querySelector("#clean");
const registersButton = document.querySelector("#registers");

const color = document.querySelector("#identifier");
const colorTrigger = document.querySelector("#identifier-trigger");

const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;