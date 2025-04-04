import React from 'react';

function ChatBubble(props) {
    const {dir, meta, user} = props;
    const {ID, uid, text} = meta;
    const {name} = user;
    
    return (
        <div className={`bubble flex rel ${dir === 1 ? 'mine' : ''}`}>
            <div className={`ballon rel`}>
                <h2 className='name s13 b'>{name}</h2>
                {text && <p className='text s13'>{text}</p>}
                <h2 className={`stamp s11 abs c ${text ? "777" : "fff"}`}>00:44 PM</h2>
            </div>
        </div>
    );
}

export default ChatBubble;