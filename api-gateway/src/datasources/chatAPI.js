const { RESTDataSource } = require('@apollo/datasource-rest');

class ChatAPI extends RESTDataSource {
    baseURL = 'http://localhost:4500';

    async createMessage(messageInput) {
        return this.post(
            '/api/chat/message/createMessage',
            { body: messageInput },
        );
    };

    async createRoom(roomInput) {
        return this.post(
            '/api/chat/room/createRoom',
            { body: roomInput }
        );
    };

    async addMember(_id, creator) {
        return this.post(
            `/api/chat/room/addMember/${_id}`,
            { body: creator }
        );
    }
}

module.exports = ChatAPI;