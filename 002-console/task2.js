const { stdout } = require("process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const minRange = 0;
const maxRange = 100;
const exitNumber = -1;
const secretNumber = generateRandomNumber(minRange, maxRange);

console.log(`Загадано число в диапазоне от ${minRange} до ${maxRange}`);

function handleGuessNumber(input) {
  const guessNumber = parseInt(input);
  if (isNaN(guessNumber)) {
    console.log("Пожалуйста, введите число");
    return;
  }

  if (guessNumber === exitNumber) {
    rl.close();
    return;
  }

  if (guessNumber < secretNumber) {
    console.log("Больше");
  } else if (guessNumber > secretNumber) {
    console.log("Меньше");
  } else {
    console.log(`Отгадано число ${secretNumber}`);
    rl.close();
    return;
  }

  rl.question("", handleGuessNumber);
}

rl.question("", handleGuessNumber);

rl.on("close", () => {
  console.log("Игра завершена");
});
