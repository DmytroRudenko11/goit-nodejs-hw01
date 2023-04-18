const { program } = require("commander");

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      try {
        const allContacts = await contacts.listContacts();
        return console.table(allContacts);
      } catch (error) {}

    case "find":
      try {
        const contactById = await contacts.getContactById(id);
        return console.log(contactById);
      } catch (error) {
        console.log(error.message);
      }

    case "add":
      try {
        const newContact = await contacts.addContact({ name, email, phone });
        return console.log(newContact);
      } catch (error) {
        console.log(error.message);
      }

    case "update":
      try {
        const updatedContact = await contacts.updateContact(id, {
          name,
          email,
          phone,
        });
        return console.log(updatedContact);
      } catch (error) {
        console.log(error.message);
      }

    case "remove":
      try {
        const deleteContact = await contacts.removeContact(id);
        return console.log(deleteContact, "Removed successfully");
      } catch (error) {
        console.log(error.message);
      }

    default:
      return console.log(
        "\x1B[31m Unknown action. Try one of this: 'read', 'find' , 'add', 'update', 'remove'"
      );
  }
};

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n,--name, <type>")
  .option("-e,--email, <type>")
  .option("-ph,--phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
