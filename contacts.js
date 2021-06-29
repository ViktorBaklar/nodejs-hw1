const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, '../db/contacts.json');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    } catch (error) {
        error.message = 'Error: contacts file is damaged or missing';
        return error.message;
    }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => contact.id === contactId);
    if (!contactById) {
      throw new Error(`Error: contact with id ${contacntId} is not found`);
    }
    return contactById;
  } catch (error) {
    return error.message;
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const index = contacts.find(contact => contact.id === contactId);
    if (index === -1) throw new Error(`Error: contact with id ${contacntId} is not found`);
    const newContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return `Contact (id: ${contactId}) was successfully deleted`;
  } catch (error) {
    return error.message;
  }
};

const { v1 } = require('uuid');

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: v1(),
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    return error.message;
  }
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}