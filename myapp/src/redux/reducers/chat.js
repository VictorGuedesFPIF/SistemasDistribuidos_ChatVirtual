const chatInitialState = {
    user: {
        ID: 1,
        dp: `https://placeimg.com/50/50/people?${new Date().getTime()}`,
        name: 'Wallan Melo',
        status: 'Online'
    },
    chat: [
        { ID: 1, uid: 1, text: 'testando Chat Virtual' },
        { ID: 2, uid: 0, text: 'Visão meu salafrário' },
        { ID: 3, uid: 1, text: 'Loucura Maluco' }
    ]
};

export function chatReducer(state = chatInitialState, action) {
    switch (action.type) {
        case "CHAT_STATE":
            return { ...state, ...action.state };
        default:
            return state;
    }
}