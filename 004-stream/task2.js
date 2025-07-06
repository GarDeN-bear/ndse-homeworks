const fs = require("fs");

if (process.argv[2] === undefined || !process.argv[2].endsWith(".txt")) {
  console.log("Первым аргументов должно быть название файла формата .txt");
  return;
}

function handleData(data) {
  const dataForHandle = data
    .trim()
    .split("\n")
    .map((el) => JSON.parse(el));
  console.log(
    "По результатам анализа программа выводит в консоль следующие данные:"
  );
  const countRounds = dataForHandle.length;
  const countWins = dataForHandle.filter(
    (value) => value.Result === true
  ).length;
  const countFails = countRounds - countWins;
  const winRate = (countWins / countRounds) * 100;
  console.log("Общее количество партий: ", countRounds);
  console.log("Количество выигранных партий: ", countWins);
  console.log("Количество проигранных партий: ", countFails);
  console.log("Процентное соотношение выигранных партий: ", winRate);
}

const filePath = [__dirname, process.argv[2]].join("/");
fs.readFile(filePath, "UTF8", (err, data) => {
  if (err) throw Error(err);
  handleData(data);
});
