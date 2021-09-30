const Hourly = ({data, setWeatherIcon, idx}) =>  {
    let currentHour = new Date().getHours()

    const computeHour = (hour, idx) => {
        if ((hour + idx) > 23) {
            hour+idx-24
            return (hour+idx-24) < 10 ? '0' + (hour+idx-24) : hour+idx-24
        } else {
            return (hour + idx) < 10 ? '0' + (hour + idx) : hour + idx
        }
    }

    return (
        <div className='hour-card'>
            <div className='hour-icon'>
                <img src={setWeatherIcon(data.weather[0].id)} alt="weather icon" />
            </div>
            <span>{Math.round(data.temp - 273)}°</span>
            <span>{data.weather[0].main}</span>
            <span>{computeHour(currentHour, idx)}:00</span>
        </div> 
    )
}

export default Hourly