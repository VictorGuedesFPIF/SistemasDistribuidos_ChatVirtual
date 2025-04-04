import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBox(props) {
    return (
        <div className={'search flex'}>
            <div className={'sbox flex aic'}>
                <button className={'icon-chat s24'}><FontAwesomeIcon icon={faSearch} /></button>
                <input placeholder={'Search chat or Contacts'} className={'s16 font'}/>
            </div>
        </div>
    );
}

export default SearchBox;