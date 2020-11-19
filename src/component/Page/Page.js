import React from 'react';
import Interface from "../Interface/Interface";
import {Route} from 'react-router-dom';
import EachInterface from '../EachInterface/EachInterface'

function Page() {
    return (
        <div>
            <Route exact path='/' component={Interface}/>
            <Route exact path='/EachInterface' component={EachInterface}/>
        </div>
    );
}

export default Page;
