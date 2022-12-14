module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.on('friendRequest', (friend, callback) => {
            io.to(friend.receiver).emit('newFriendRequest', {
                from: friend.sender,
                to: friend.receiver
            });
            callback();
        });
    });
}