const fs = require("fs");
const readline = require("readline");

if (process.argv[2] === undefined || !process.argv[2].endsWith(".txt")) {
  console.log("Первым аргументов должно быть название файла формата .txt");
  return;
}

const filePath = [__dirname, process.argv[2]].join("/");
fs.writeFile(filePath, "", (err) => {
  if (err) throw Error(err);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const minNumber = 1;
const maxNumber = 2;
const exitNumber = 0;
secretNumber = generateRandomNumber(minNumber, maxNumber);
let countRounds = 0;
function handleGuessNumber(input) {
  const guessNumber = parseInt(input);
  let isWin = false;

  if (isNaN(guessNumber)) {
    console.log("Введите число");
  }
  if (guessNumber === secretNumber) {
    console.log("Поздравляю! Вы выиграли)");
    isWin = true;
  } else if (guessNumber === exitNumber) {
    rl.close();
    return;
  } else {
    console.log("Вы проиграли(");
    isWin = false;
  }

  fs.writeFile(
    filePath,
    JSON.stringify({
      Round: ++countRounds,
      SecretNumber: secretNumber,
      Result: isWin,
    }) + "\n",
    { flag: "a" },
    (err) => {
      if (err) throw Error(err);
    }
  );
  secretNumber = generateRandomNumber(minNumber, maxNumber);
  rl.question("\nОрёл - 1, Решка - 2\n", handleGuessNumber);
}

rl.question("\nОрёл - 1, Решка - 2\n", handleGuessNumber);

rl.on("close", () => {
  console.log("Игра завершена");
});
