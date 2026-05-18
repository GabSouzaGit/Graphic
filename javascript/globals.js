// Obtendo e gerando todos os objetos necessários.
let sessionIFPDocuments = [];

let activeEvaluation = {
    name: null,
    color: null,
    made: 0,
    evaluators: 1,
    evaluations: []
}

let evaluating = false;
let allInputsFilled = false;

const GRAPH_STRUCT_COLOR = "#fff";
const HSL_OPCTY = '60%';

const IFP_STORAGE_KEY = "IFP_DOCUMENT";
const IFP_EVALUATING_STORAGE_KEY = "IFP_EVALUATING";
const IFP_EVALUATING_OBJECT_STORAGE_KEY = "IFP_EVALUATING_OBJECT";

const userInputs = document.querySelectorAll(".first-input");
const peopleInput = document.querySelector("#people-input");
const evaluatorsInput = document.querySelector("#people-input");
const remainingEvaluations = document.querySelector("#remaining-evaluations");

const canvas = document.querySelector('canvas');
const historic = document.querySelector("#historic table");
const stats = document.querySelector("#stats");
const slide = document.querySelector("#slide");
const slideClose = document.querySelector("#slide-close")

const sendButton = document.querySelector("#send");
const resetButton = document.querySelector("#clean");
const registersButton = document.querySelector("#registers");
const peopleInfoIcon = document.querySelector("#people-info")

const color = document.querySelector("#identifier");
const colorTrigger = document.querySelector("#identifier-trigger");

const context = canvas.getContext('2d');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;