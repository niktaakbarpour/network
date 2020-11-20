import React from 'react';
import Interfaces from "../interfaces/Interfaces";
import {Route} from 'react-router-dom';
import EachInterface from '../eachinterface/EachInterface'

function Page() {
    return (
        <div>
            <Route exact path='/' component={Interfaces}/>
            <Route exact path='/EachInterface' component={EachInterface}/>
        </div>
    );
}

export default Page;
