import React, { useState } from 'react';


function Weather(props) {
    //useState() to set current day and time
    const [day] = useState(new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1'));
    const [time] = useState(new Date().toLocaleString('en-us', { weekday: 'long' }));

    return (
        <div className="container">
            <div>
                <p style={{ fontSize: "25px" }}>{props.location}</p>
                <p>{day} {time}</p>
                <p>{props.description}</p>
            </div>
            <div>
                <p style={{ marginTop: "15px" }}>
                    <img style={{ height: "3em" }} src={props.icon} alt="weather icon" />
                    <span style={{ fontSize: "50px" }}><strong>{props.value}</strong></span>
                    {props.value !== props.celcius ? <button style={{ borderRight: "1px solid black" }} className="temp" onClick={props.switchValue}>°C </button> : <button style={{ color: "blue", border: "none", backgroundColor: "whitesmoke", outline: "none", borderRight: "1.5px solid black" }} onClick={props.switchValue}>°C</button>}
                    <button className="temp" onClick={props.switchVal}>°F</button>
                </p>
                <span style={{ float: "right", position: "absolute", right: 20, bottom: 15 }}>
                    <div>
                        <p>{props.humidity}</p>
                        <p>{props.wind}</p>
                        <p>{props.pressure}</p>
                    </div>
                </span>
            </div>
        </div>
    );
}


export default Weather