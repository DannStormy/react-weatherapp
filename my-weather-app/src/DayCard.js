import React from 'react';



function DayCard (props){
        return (
            <div>
                {
                    //map through this.state.dailyData(eachDay) state to extract values
                    props.eachDay.map((day, i) => {
                        let desc = day.weather[0].description
                        let date = new Date(day.dt * 1000);
                        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                        let name = days[date.getDay()];
                        let celcius = day.main.temp - 273.15
                        let time = day.dt_txt.slice(11, 16)
                        const iconurl = `http://openweathermap.org/img/w/${day.weather[0].icon}.png`
                        return (
                            <div className="outer" key={i}>
                                <div className="component_box">
                                    <h6 style={{ textAlign: "center", color: "grey" }}>{time}</h6>
                                    <div>{name}</div>
                                    <img style={{ height: "3em" }} src={iconurl} alt="weather icon" />
                                    <p style={{ fontSize: "20px" }}>{`${Math.round(celcius)}°C`}  <span style={{ color: "grey" }}>{`${Math.round((celcius * 9 / 5) + 32)}°F`}</span></p>
                                    <p className="component__forecast-box">{desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }


export default DayCard