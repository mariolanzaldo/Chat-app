const { RESTDataSource } = require('@apollo/datasource-rest');

class ChatAPI extends RESTDataSource {
    baseURL = 'http://localhost:4500';

    async createMessage(messageInput) {
        return this.post(
            '/api/chat/message/createMessage',
            { body: messageInput },
        );
    };

    async getMessagesOfRoom(_id) {
        return this.get(`api/chat/message/messagesOfRoom/${_id}`);
    };

    async createRoom(roomInput) {
        return this.post(
            '/api/chat/room/createRoom',
            { body: roomInput }
        );
    };

    async getRoom(_id) {
        return this.get(
            `/api/chat/room/${_id}`
        );
    };

    async addMember(_id, member) {
        return this.patch(
            `/api/chat/room/addMember/${_id}`,
            { body: member }
        );
    };
}

module.exports = ChatAPI;