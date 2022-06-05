const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
if (process.argv.length < 3) {
  console.log("give password as argument");
  // eslint-disable-next-line no-undef
  process.exit(1);
}
// eslint-disable-next-line no-undef
const password = process.argv[2];

const url = `mongodb+srv://Veerai:${password}@cluster0.hqfiymd.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);
// eslint-disable-next-line no-undef
if (process.argv.length === 5) {
  const person = new Person({
    // eslint-disable-next-line no-undef
    name: process.argv[3],
    // eslint-disable-next-line no-undef
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
