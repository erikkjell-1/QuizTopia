import { useState, useRef, useEffect } from 'react'
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Game.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpa2plbGwiLCJhIjoiY2xsdzJsZ24zMTN3NjNwbnowdnQ0eHEwMSJ9.B2PWYPIiQ9_-HwVynQloIA' as string


function Game() {
    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    const [lat, setLat] = useState<number>(58.6551)
    const [lng, setLng] = useState<number>(17.0583)
    const [zoom, setZoom] = useState<number>(12)

    const [quizTitle, setQuizTitle] = useState<string>('')
    const [quizQ, setQuizQ] = useState<string>('')
    const [quizA, setQuizA] = useState<string>('')

    
    useEffect(() => {
        if( mapRef.current || !mapContainer.current ) return

        mapRef.current = new MapGl({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

    const map: MapGl = mapRef.current
    
    map.on('move', () => {
        interface Position {
            lng: number;
            lat: number;
        }
        const position: Position = map.getCenter()
        setLat(Number(position.lat.toFixed(4)))
        setLng(Number(position.lng.toFixed(4)))
        setZoom(map.getZoom());
    })
    },[lat, lng, zoom])

    return (

        <div>
            <div className='quiz__container'>
                <input className='quiz--input' placeholder='Quiz-Namn' type='text' value={quizTitle} onChange={event => setQuizTitle(event.target.value)}></input>
                <input className='quiz--input' placeholder='Quiz-Fråga?' type='text' value={quizQ} onChange={event => setQuizQ(event.target.value)}></input>
                <input className='quiz--input' placeholder='Quiz-Svar' type='text' value={quizA} onChange={event => setQuizA(event.target.value)}></input>

                <button>Skapa Quiz</button>

            </div>

            <div className='map__map'>
            <div ref={mapContainer} className="map-container" />
			<p> Center position: {lat} lat, {lng} lng </p>
            </div>
        </div>
    )
}
    
   
    export default Game