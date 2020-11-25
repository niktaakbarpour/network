import React from 'react';
import Interfaces from "../interfaces/Interfaces";
import EachInterface from '../eachinterface/EachInterface'
import {Route} from 'react-router-dom';

function Page() {
    return (
        <div>
            <Route exact path='/' component={Interfaces}/>
            <Route exact path='/EachInterface' component={EachInterface}/>
        </div>
    );
}

export default Page;
