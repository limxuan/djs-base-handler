const { glob } = require("glob");
const { promisify } = require("util");
const ascii = require('ascii-table')
let table = new ascii("Commands");

table.setHeading('Command', ' Load status');

const globPromise = promisify(glob);

module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];
        const filename = splitted[splitted.length - 1];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
            table.addRow(filename,'✅')
        } else
            table.addRow(filename, '❌ -> Missing a help.name, or help.name is not a string.');
    });

    console.log(table.toString());

    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));
};
