import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

function ChatSendBox(props) {
    return (
        <div className='sendbox flex aic'>
            <div className={'actions rel flex aic'}>
                <button className={'icon-insert-emote s24'}>
                    <FontAwesomeIcon icon={faSmile} />
                </button>
                <textarea className='new-message s14 font' placeholder='Type a Message'></textarea>
            </div>
        </div>
    );
}

export default ChatSendBox;