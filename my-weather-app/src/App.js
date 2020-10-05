import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather';
import DayCard from './DayCard';


class App extends React.Component {
  constructor(props) {
    super(props)
    //initialize dailyData as empty array for map method
    this.state = {
      dailyData: [],
    }
  }
  render() {
    //check for api response
    if (this.state.loaded) {
      return (
        <div>
          <div>
            <Weather
              description={this.state.description}
              temperature={this.state.temperature}
              switchValue={this.switchValue}
              switchVal={this.switchVal}
              value={this.state.value}
              icon={this.state.icon}
              humidity={this.state.humidity}
              wind={this.state.wind}
              pressure={this.state.pressure}
              location={this.state.location}
              celcius={this.state.celcius}
            />
            <DayCard eachDay={this.state.dailyData} />
          </div>
        </div>
      );
      //return loading simulation if api is not responsive
    } else {
      return (
        <div className="text-center" style={{ marginTop: '20%' }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    const key = process.env.REACT_APP_KEY;
    console.log(key)
    const proxy = "https://cors-anywhere.herokuapp.com/";

    //console.log("APP KEY: ", key);
    //check coordinates of user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        //fetch data from api
        const api = `${proxy}http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;


        fetch(api)
          .then((response) => {
            let data = response.json();
            return data;
          })
          //setstate for whether api has responded or not
          .then((data) => {
            if (data) {
              this.setState({
                loaded: true
              })
            } else {
              this.setState({
                loaded: false
              })
            }
            //recent day
            const description = data.list[0].weather[0].description.charAt(0).toUpperCase() + data.list[0].weather[0].description.slice(1)
            const celcius = data.list[0].main.temp - 273.15
            const fahrenheit = (celcius * 9 / 5) + 32
            const iconcode = data.list[0].weather[0].icon;
            const iconurl = `http://openweathermap.org/img/w/${iconcode}.png`

            this.setState({
              value: Math.round(celcius),
              description: description,
              celcius: Math.round(celcius),
              fahrenheit: Math.round(fahrenheit),
              icon: iconurl,
              humidity: `Humidity: ${data.list[0].main.humidity}%`,
              wind: `Wind: ${Math.round(data.list[0].wind.speed)} mph`,
              pressure: `Pressure: ${data.list[0].main.pressure} mb`,
              location: data.city.name
            })

            //forecast
            //filter only 5 objects from initial objects response
            const dailyData = data.list.filter(reading => {
              return reading.dt_txt.includes("18:00:00")
            }
            )
            this.setState({
              dailyData: dailyData
            })
          })
      })
    }
  }
//update temperature components according to user clicks
  switchValue = (e) => {
    this.setState({
      value: this.state.celcius
    })
  }
  switchVal = () => {
    this.setState({
      value: this.state.fahrenheit,
    })
  }
}

export default App;
