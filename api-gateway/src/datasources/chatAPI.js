const { RESTDataSource } = require('@apollo/datasource-rest');

class ChatAPI extends RESTDataSource {
    baseURL = 'http://localhost:4500';

    async createMessage(messageInput) {
        return this.post(
            '/api/chat/message/createMessage',
            { body: messageInput },
        );
    };

    async deleteMessage(_id) {
        return this.delete(`api/chat/message/deleteMessage/${_id}`);
    };

    async getMessagesOfRoom(_id) {
        return this.get(`api/chat/message/messagesOfRoom/${_id}`);
    };

    async deleteAllRoomMessages(_id) {
        return this.delete(`api/chat/message/deleteAllRoomMessages/${_id}`)
    }



    async createRoom(roomInput) {
        return this.post(
            '/api/chat/room/createRoom',
            { body: roomInput }
        );
    };

    async deleteRoom(roomId) {
        return this.delete(
            `/api/chat/room/deleteRoom/${roomId}`,
        );
    }

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

    async deleteMember(_id, members) {
        return this.patch(
            `/api/chat/room/deleteMember/${_id}`,
            { body: members }
        );
    };
}

module.exports = ChatAPI;