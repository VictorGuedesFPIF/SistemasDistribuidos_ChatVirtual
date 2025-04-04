import React from 'react';
import { Link } from 'react-router-dom';

function InboxItem(props) {
    return (
        <div className='conversation flex rel aic'>
            <div className={'you rel flex aic'}>
                <Link className={'user'}>
                    <img src={`https://placeimg.com/50/50/people?t=${new Date().getTime()}`} alt=''/>
                </Link>
            </div>
            
            <div className='meta rel flex aic'>
                <div className='info rel flex col'>
                    <h2 className='name s14 b wordwrap'> Wallan Melo</h2>
                    <h2 className='last-msg s13 c333 wordwrap'> Lindo</h2>
                </div>

                <div className='extra rel flex col aic'>
                    <h2 className='stamp s13 c777'>22:35 PM</h2>
                    <div className='badge rel s14 cfff'>
                        +99
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InboxItem;