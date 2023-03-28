const { RESTDataSource } = require('@apollo/datasource-rest');

class ChatAPI extends RESTDataSource {
    baseURL = process.env.API_CHAT;

    constructor(options = {}) {
        super(options);

        this.standarURL = 'api/chat';
    }

    async createMessage(messageInput) {
        return this.post(
            `/${this.standarURL}/message?act=create`,
            { body: messageInput },
        );
    };

    async deleteAllRoomMessages(_id) {
        return this.delete(`/${this.standarURL}/message?act=eraseAll&roomId=${_id}`);
    };

    async deleteMessage(_id) {
        return this.delete(`/${this.standarURL}/message?act=erase&roomId=${_id}`);
    };

    async getMessagesOfRoom(_id) {
        return this.get(`/${this.standarURL}/message/room/${_id}`);
    };

    async createRoom(roomInput) {
        return this.post(
            `/${this.standarURL}/room?act=create`,
            { body: roomInput }
        );
    };

    // async deleteRoom(roomId) {
    //     return this.delete(
    //         `/api/chat/room/room?act=delete&roomId=${roomId}`,
    //     );
    // }

    async getRoom(_id) {
        return this.get(
            `/${this.standarURL}/room/${_id}`
        );
    };

    async addMember(_id, member) {
        return this.patch(
            `/${this.standarURL}/room?act=member&roomId=${_id}`,
            { body: member }
        );
    };

    async deleteMember(_id, members) {
        return this.delete(
            `/${this.standarURL}/room?act=member&roomId=${_id}`,
            { body: members }
        );
    };

    async addAdmin(_id, admin) {
        return this.patch(
            `/${this.standarURL}/room?act=admin&roomId=${_id}`,
            { body: admin }
        );
    };

    async deleteAdmin(_id, admin) {
        return this.delete(
            `/${this.standarURL}/room?act=admin&roomId=${_id}`,
            { body: admin }
        )
    };

    async deleteRoom(_id) {
        return this.delete(
            `/${this.standarURL}/room?act=room&roomId=${_id}`
        );
    }
}

module.exports = ChatAPI;