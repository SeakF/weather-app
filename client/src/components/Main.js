import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpecifiedPlace, fetchAllData, status, data, fullData } from '../features/redux'
import { images } from '../images/images'
import Daily from './Daily'
import '../styles/main.css'
import Hourly from './Hourly'
import loadingWheel from '../images/loading.png'


const Main = () => {
    const dispatch = useDispatch()
    const loadingStatus = useSelector(status)
    const dataObject = useSelector(data)
    const fullDataObject = useSelector(fullData)

    const [city, setCity] = useState('London')

    const [basicValues, setBasicValues] = useState({
        icon: null,
        temp: null,
        feels_like: null,
        humidity: null,
        wind_speed: null,
        currentDayDisplay: null
    })
    
    const ndBG = useRef(null)
    const info = useRef(null)
    const hourContainer = useRef(null)

    // weather setup
    const setWeatherIcon = (weather) => {
        //by id range from weather api
        //todo background depended by weather
        switch (true) {
            case weather < 233:
                return images.thunderstorm

            case weather < 321:
                return images.drizzle

            case weather < 532:
                return images.rain

            case weather < 623:
                return images.snow

            case weather <= 782:
                return images.mist

            case weather == 800:
                return images.clear

            case weather < 805:
                return images.clouds

            default: 
                return images.clear
        }        
    }

    const setWeatherBackground = {
        currentBg: null,
        background: function (weather) {
            switch (true) {
                case weather < 233: //thunderstorm
                    this.currentBg = 'linear-gradient(to top, #09203f 0%, #537895 100%)'
                    break

                case weather < 321: //drizzle
                    this.currentBg = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                    break

                case weather < 532: //rain 
                    this.currentBg = 'linear-gradient(to right, #373b44, #4286f4)'
                    break
                    
                case weather < 623: //snow 
                    this.currentBg = 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)'
                    break

                case weather <= 782: //mist 
                    this.currentBg = 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)'
                    break

                case weather == 800: //clear 
                    this.currentBg = 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)'
                    break

                case weather < 805: //clouds
                    this.currentBg = 'linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)'
                    break

                default: //default
                    this.currentBg = 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)'
                    break
            }
            ndBG.current.style.opacity = 0
            ndBG.current.style.display = 'block'
            ndBG.current.style.backgroundImage = this.currentBg
            setTimeout(() => {
                ndBG.current.style.opacity = 1
                setTimeout(() => {
                    ndBG.current.style.display = 'none'
                    ndBG.current.style.opacity = 0
                }, 600)
                setTimeout(() => {
                    document.querySelector('body').style.backgroundImage = this.currentBg
                }, 500)
            }, 100)
            
        }
    }
    
    useEffect(() => {
        dataObject && setWeatherBackground.background(basicValues.icon)

        if (loadingStatus == 'error') {
            alert('error')
        } else if (dataObject) {
            setBasicValues(prev => ({...prev, icon: dataObject.weather[0].id}))
        }
    }, [loadingStatus])

    useEffect(() => {
        dispatch(fetchSpecifiedPlace('London'))
    }, [])

    useEffect(() => {
        dataObject && dispatch(fetchAllData(dataObject.coord))
        dataObject && setBasicValues(prev => ({...prev, temp: dataObject.main.temp, 
                                                feels_like: dataObject.main.feels_like, 
                                                humidity: dataObject.main.humidity, 
                                                wind_speed: dataObject.wind.speed, 
                                                currentDayDisplay: null}))
    }, [dataObject])

    useEffect(() => {
        if (basicValues.currentDayDisplay == null) {
            dataObject && setBasicValues(prev => ({...prev, icon: dataObject.weather[0].id,
                                                            temp: dataObject.main.temp, 
                                                            feels_like: dataObject.main.feels_like, 
                                                            humidity: dataObject.main.humidity, 
                                                            wind_speed: dataObject.wind.speed, 
                                                            currentDayDisplay: null}))
            dataObject && setWeatherBackground.background(dataObject.weather[0].id)

            if (info.current && hourContainer.current) {
                
                hourContainer.current.style.opacity = 1
                hourContainer.current.style.height = 'auto'
                info.current.style.justifyContent = 'flex-end'

                document.querySelectorAll('.current-info > div').forEach(div => {
                    div.style.flexDirection = 'row'
                    div.style.alignItems = 'flex-start'
                })

                document.querySelectorAll('.temp').forEach(span => {
                    span.style.fontSize = 'min(90px, 15vw)'
                })
                document.querySelectorAll('.rest').forEach(span => {
                    span.style.fontSize = 'min(20px, 4vw)'
                })
            }
        } else {
            if (info.current && hourContainer.current) {
                document.querySelectorAll('.current-info > div').forEach(div => {
                    div.style.flexDirection = 'column'
                    div.style.alignItems = 'center'
                })
                document.querySelectorAll('.temp').forEach(span => {
                    span.style.fontSize = 'min(90px, 30vw)'
                })
                document.querySelectorAll('.rest').forEach(span => {
                    span.style.fontSize = 'min(20px, 6vw)'

                })

                info.current.style.justifyContent = 'center'
                hourContainer.current.style.opacity = 0
                hourContainer.current.style.height = '0px'
            }
        }
    }, [basicValues.currentDayDisplay])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchSpecifiedPlace(city))
    }

    return (
    <>
    <div ref={ndBG} className='opacity-background'>
    </div>


    {loadingStatus == true && <div className='loading-state '>
        <div>
            <img src={loadingWheel} alt="loading" />
        </div>    
    </div>}
    <section>

        

        <div className='plate'>
            {/* input */}
            <form onSubmit={handleSubmit}>
                <input className='input' type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
                <button type='submit'>SEARCH</button>
            </form>   


            <article className='main-info'>
                
                {/* weather icon */}
                <div className='weather-icon-container'>
                    {basicValues.icon && <img src={setWeatherIcon(basicValues.icon)} className='main-icon' alt="weather icon" />}
                </div>

                {/* info about current weather */}
                <div ref={info} className='current-weather-info-container'>
                    {/* info at the moment */}
                    {basicValues.temp && <div className='current-info'>
                        <div>
                            <div>
                                <span className='temp'>
                                    {Math.round(basicValues.temp - 273)}°
                                </span>
                            </div>
                            <div>
                                <span className='rest'>
                                    FEELS LIKE: {Math.round(basicValues.feels_like - 273)}° 
                                </span>
                                <span className='rest'>
                                    HUMIDITY: {basicValues.humidity}% 
                                </span>
                                <span className='rest'>
                                    WIND SPEED: {basicValues.wind_speed}m/s
                                </span>
                            </div>

                            <div className='media-image'>
                                <img src={setWeatherIcon(basicValues.icon)} alt="weather icon" />
                            </div>


                        </div>
                    </div>}
                    {/* hourly info */}
                    {fullDataObject && <div ref={hourContainer} className='hourly-info'>
                        {fullDataObject.hourly.map((hour, idx) => idx < 24 && <Hourly key={idx} idx={idx} data={hour} setWeatherIcon={setWeatherIcon}></Hourly> )} 
                    </div>}
                </div>

            </article>



            



            {/* daily info */}
            <article className='daily-info'>
                <div className='daily-cards-container'>
                    {fullDataObject && fullDataObject.daily.map((day, idx) => <Daily key={idx} idx={idx} setWeatherBackground={setWeatherBackground} basicValues={basicValues} setBasicValues={setBasicValues} setWeatherIcon={setWeatherIcon} data={day}></Daily> )}
                </div>
            </article>
        </div>
        
    </section>
    </>
    )
}

export default Main
