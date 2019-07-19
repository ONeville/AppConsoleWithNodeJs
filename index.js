const io = require("console-read-write");

const questions = [];
let countQuestion = 0;

function Question(id, inputUnit, targetUnit, value, response, output) {
  this.id = id;
  this.inputUnit = inputUnit;
  this.targetUnit = targetUnit;
  this.value = value;
  this.response = response;
  this.output = output;
}

function tempToCelsius(tempKey, tempValue) {
  switch (tempKey) {
    case "F":
      return (tempValue - 32) / 1.8;
    case "K":
      return tempValue - 273.15;
    case "R":
      return (tempValue - 32 - 459.67) / 1.8;
    case "C":
      return tempValue;
    default:
      return;
  }
}

function tempToFahrenheit(tempKey, tempValue) {
  switch (tempKey) {
    case "C":
      return tempValue * 1.8 + 32;
    case "K":
      return tempValue * 1.8 - 459.67;
    case "R":
      return tempValue - 459.67;
    case "F":
      return tempValue;
    default:
      return;
  }
}

function tempToRankine(tempKey, tempValue) {
  switch (tempKey) {
    case "F":
      return tempValue + 459.67;
    case "K":
      return tempValue * 1.8;
    case "C":
      return tempValue * 1.8 + 32 + 459.67;
    case "R":
      return tempValue;
    default:
      return;
  }
}

function tempToKelvin(tempKey, tempValue) {
  switch (tempKey) {
    case "F":
      return (tempValue + 459.67) / 1.8;
    case "R":
      return tempValue / 1.8;
    case "C":
      return tempValue + 273.15;
    case "K":
      return tempValue;
    default:
      return;
  }
}

function processConversionTemp(targetKey, inputKey, value, response) {
  switch (targetKey) {
    case "C":
      const result = tempToCelsius(inputKey, parseInt(value));
      return result
        ? parseInt(result) === parseInt(response)
          ? "Correct"
          : "Incorrect"
        : "Invalid";
    case "F":
      const result1 = tempToFahrenheit(inputKey, parseInt(value));
      return result1
        ? parseInt(result1) === parseInt(response)
          ? "Correct"
          : "Incorrect"
        : "Invalid";
    case "K":
      const result2 = tempToKelvin(inputKey, parseInt(value));
      return result2
        ? parseInt(result2) === parseInt(response)
          ? "Correct"
          : "Incorrect"
        : "Invalid";
    case "R":
      const result3 = tempToRankine(inputKey, parseInt(value));
      return result3
        ? parseInt(result3) === parseInt(response)
          ? "Correct"
          : "Incorrect"
        : "Invalid";
    default:
      return "Invalid";
  }
}

async function main() {
  io.write("How many question do you want to create?");
  countQuestion = await io.read();

  while (!Number.isInteger(countQuestion)) {
    io.write("Please enter a number between 1 and 10");
    countQuestion = await io.read();
    if (
      Number.isInteger(parseInt(countQuestion)) &&
      parseInt(countQuestion) > 0 &&
      parseInt(countQuestion) <= 10
    ) {
      break;
    }
  }

  let i = 0;
  while (i < countQuestion) {
    io.write(`Question ${i + 1}: Input Unit of Measure`);
    const inputUnit = await io.read();

    io.write(`Question ${i + 1}: Target Unit of Measure`);
    const targetUnit = await io.read();

    io.write(`Question ${i + 1}: Input Numerical Value`);
    const inputValue = await io.read();
    questions.push(
        new Question(i + 1, inputUnit, targetUnit, inputValue, "", "")
    );
    i++;
  }

  console.table(questions);

  io.write("Student Assignment");
  for (let y = 0; y < questions.length; y++) {
    io.write(`Give answer for Question ${y + 1}:`);
    const answer = await io.read();
    questions[y].response = answer;
    questions[y].output = processConversionTemp(
      questions[y].targetUnit,
      questions[y].inputUnit,
      questions[y].value,
      answer
    );
  }

  //543.87
  // 84.2  Fahrenheit Rankine
  console.table(questions);
  io.write("Thanks! Now you may leave.");
}

main();
