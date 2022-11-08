export default function user(state = null, action) {
    switch (action.type) {
        case "CHANGE_USER":
            console.log('CHANGE')

            return action.payload.user;
        default:
            // console.log('default')
            // console.log(action);
            return state;
    }
};