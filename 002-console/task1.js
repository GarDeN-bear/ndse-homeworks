const yargs = require("yargs");

const { hideBin } = require("yargs/helpers");
const dayjs = require("dayjs");

function handleCurrentCommand(argv) {
  const now = dayjs();
  const { year, month, date } = argv;
  if ([year, month, date].filter(Boolean).length > 1) {
    console.error(
      "Для команды current можно указать только одну опцию: year, month, date"
    );
    return;
  }

  if (year) {
    console.log(now.year());
  } else if (month) {
    console.log(now.month() + 1);
  } else if (date) {
    console.log(now.date());
  } else {
    console.log(now.toISOString());
  }
}

function handleAddSubCommand(argv) {
  const now = dayjs();
  const { year, month, date, _ } = argv;
  const [command] = _;
  if ([year, month, date].filter(Boolean).length > 1) {
    console.error(
      "Для команды current можно указать только одну опцию: year, month, date"
    );
    return;
  }
  console.log(command);

  let newDate = now;
  if (year) {
    newDate =
      command === "add" ? now.add(year, "year") : now.subtract(year, "year");
  } else if (month) {
    newDate =
      command === "add"
        ? now.add(month, "month")
        : now.subtract(month, "month");
  } else if (date) {
    newDate =
      command === "add" ? now.add(date, "date") : now.subtract(date, "date");
  }

  console.log(newDate.toISOString());
}

const argv = yargs(hideBin(process.argv))
  .command(
    "current",
    "Получить текущую дату и время",
    {
      year: {
        type: "boolean",
        alias: "y",
        description: "Показать текущий год",
      },
      month: {
        type: "boolean",
        alias: "m",
        description: "Показать текущий месяц",
      },
      date: {
        type: "boolean",
        alias: "d",
        description: "Показать текущий дату в календарном месяце",
      },
    },
    handleCurrentCommand
  )
  .command(
    "add",
    "Получить даты в будущем",
    {
      year: {
        type: "number",
        alias: "y",
        description: "Количество лет для добавления",
      },
      month: {
        type: "number",
        alias: "m",
        description: "Количество месяцев для добавления",
      },
      date: {
        type: "number",
        alias: "d",
        description: "Количество дней для добавления",
      },
    },
    handleAddSubCommand
  )
  .command(
    "sub",
    "Получить даты в прошлом",
    {
      year: {
        type: "number",
        alias: "y",
        description: "Количество лет для убавления",
      },
      month: {
        type: "number",
        alias: "m",
        description: "Количество месяцев для убавления",
      },
      date: {
        type: "number",
        alias: "d",
        description: "Количество дней для убавления",
      },
    },
    handleAddSubCommand
  ).argv;
