# Домашнее задание к занятию «2.6. База данных и хранение данных»

**Правила выполнения домашней работы:** 
* выполняйте домашнее задание в отдельной ветке проекта на GitHub,
* в поле для сдачи работы прикрепите ссылку на ваш проект в Git,
* присылать на проверку можно каждую задачу по отдельности или все задачи вместе, 
* во время проверки по частям ваша домашняя работа будет обозначаться статусом «На доработке»,
* любые вопросы по решению задач задавайте в канале вашей группы.


#### Задание 1
Чтобы в будущем вам было легче работать с **MongoDB**, изучите раздел 
документации об использовании [**CRUD Operations**](https://docs.mongodb.com/manual/crud/).

#### Задание 2
В файле **README.md** написать следующие запросы для **MongoDB**:
 - запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**,
 - запрос для *поиска* полей документов коллекции **books** по полю *title*,
 - запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи.
 
*Каждый документ коллекции **books** должен содержать следующую структуру данных: 
```javascript
{
  title: "string",
  description: "string",
  authors: "string"
}
``` 

#### Решение 

1. запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**

```
db.books.insertMany([
    {
        title: "The Great Gatsby",
        description: "A story of wealth, love, and the American Dream in the 1920s",
        authors: "F. Scott Fitzgerald",
    },
    {
        title: "To Kill a Mockingbird",
        description: "A powerful story of racial injustice and moral growth in the American South",
        authors: "Harper Lee",
    }
])
```

2. запрос для *поиска* полей документов коллекции **books** по полю *title*

```
db.books.find({ title: "The Great Gatsby" })
```

3. запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи

```
db.books.updateOne(
  { _id: db.books.find({ title: "The Great Gatsby" }).limit(1).next()._id },
  {
    $set: { description: "Обновлённое описание" },
    $set: { authors: "Обновленный список авторов" }
  }
)
```

