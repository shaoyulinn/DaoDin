const chatModel = require('../Model/chat_model');
const matchModel = require('../Model/match_model');

async function processChat(connection) {

    if (!connection.match) {
        connection.match = await matchModel.getMatch(connection.authorization_id, connection.group_id);
    }

    chatModel.createMessage(connection.match.matched_group_id, connection.body.message, connection.authorization_id);

    return;
}

function filterClients(clients, user_list) {
    return clients.filter(client => user_list.includes(client.authorization_id));
}

function groupFilterer(connection) {
    console.log(connection.match);
    return connection.match.users.map(user => user.id);
}

module.exports = {
    processChat,
    filterClients,
    groupFilterer
}