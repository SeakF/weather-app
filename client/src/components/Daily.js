import { useRef, useEffect } from 'react'

const Daily = ({data, idx, setWeatherBackground, basicValues, setBasicValues, setWeatherIcon}) => {

    const card = useRef(null)

    let currentDay = new Date()

    const getDayOfTheWeek = (currentDay, idx) => {

        let date = new Date(currentDay.getTime()+(idx*24*60*60*1000))

        switch (date.getDay()) {
            case 0:
                return 'SUNDAY'
            case 1:
                return 'MONDAY'
            case 2:
                return 'TUESDAY'
            case 3:
                return 'WEDNESDAY'
            case 4:
                return 'THURSDAY'
            case 5:
                return 'FRIDAY'
            case 6:
                return 'SATURDAY'
        }
    }

    const computeDate = (givenDate, idx) => {
        let date = new Date(givenDate.getTime()+(idx*24*60*60*1000))
        return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}-${(date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}-${date.getFullYear()}`
    }

    useEffect(() => {
        if (card) {
            if (basicValues.currentDayDisplay == idx) {
                card.current.style.opacity = '1'
                card.current.style.backgroundColor = 'rgba(0, 0, 0, 0.95)'
                setWeatherBackground.background(data.weather[0].id)
            } else {
                card.current.style.opacity = '0.8'
                card.current.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
            }
        }
    }, [basicValues.currentDayDisplay])
    
    return (
        <div ref={card} className='daily-card' onClick={() => setBasicValues(prev => ({...prev, 
                                                                                        icon: data.weather[0].id, 
                                                                                        temp: data.temp.day, 
                                                                                        feels_like: data.feels_like.day, 
                                                                                        humidity: data.humidity, 
                                                                                        wind_speed: data.wind_speed, 
                                                                                        currentDayDisplay: (prev.currentDayDisplay != idx) ? idx : null }))}>
            <div className='daily-icon'>
                <img src={setWeatherIcon(data.weather[0].id)} alt="weather icon" />
            </div>
            <span style={{fontWeight: '700'}}>{idx == 0 ? 'TODAY' : getDayOfTheWeek(currentDay, idx)}</span>
            <span>{Math.round(data.temp.day - 273)}°</span>
            <span>{data.weather[0].description}</span>
            <span>{computeDate(currentDay, idx)}</span>
        </div>        
    )
}

export default Daily