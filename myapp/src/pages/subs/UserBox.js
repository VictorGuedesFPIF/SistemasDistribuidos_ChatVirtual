import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function UserBox(props) {
    return (
        <div className={'userbox flex'}>
            <div className={'you rel flex aic'}>
                <Link className={'user'}>
                    <img src={'https://placeimg.com/50/50/people'} alt=''/>
                </Link>
            </div>
            <div className={'actions rel flex aic'}>
                <button className={'icon-chat s24'}>
                    <FontAwesomeIcon icon={faComments} />
                </button>
                <button className={'icon-more_vert s24'}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                </button>
            </div>
        </div>
    );
}

export default UserBox;