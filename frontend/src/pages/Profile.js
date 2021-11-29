import '../App.css';
import React from "react";

export default function Profile({auth, handleChange}) {

    if (!auth) {
        return(
            <div className='App-header'>
                Please login to continue, budular
            </div>
        )
    }
    else {
        return(
            <div className='App-header'>
                You are logged in, bud
            </div>
        )
    }
}