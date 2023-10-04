import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import mapboxgl, { Map as MapGl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CreateQuiz, AddQuestion, Position, GetQuiz } from '../Interface'

mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jqb2gwOCIsImEiOiJjbGx6M2pqMXYwZTZ5M2NvNzNscm5rZWtuIn0.C2QkVLDoLFvrae_e65EGpg';

function DisplayQuiz() {
    
    const navigate = useNavigate();
    const [quizname, setQuizname] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer]     = useState<string>('')

    const [quizData, setQuizData] = useState<any>(null);
    const [quizzes, setQuizzes]   = useState<any>([])
    const [clickLat, setClickLat] = useState<number>()
    const [clickLng, setClickLng] = useState<number>()
    const mapContainer = useRef(null)
    const mapRef = useRef<MapGl | null>(null)
    
    const [lat, setLat] = useState<number>(57.7)
    const [lng, setLng] = useState<number>(11.89)
    const [zoom, setZoom] = useState<number>(10)

    const markerRef = useRef<mapboxgl.Marker | null>(null)
    const questionRef = useRef<mapboxgl.Marker | null>(null)
    
    
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
            const position: Position = map.getCenter()
            setLat(Number(position.lat.toFixed(4)))
            setLng(Number(position.lng.toFixed(4)))
            setZoom(map.getZoom());
        })
        
        map.on('click', (e) => {
            setClickLat(e.lngLat.lat)
            setClickLng(e.lngLat.lng)
            if (questionRef.current) {
                questionRef.current.remove()
            }
            
            const popup = new mapboxgl.Popup({offset: 25}).setHTML(
                `
                <div>
                <h3>${e.lngLat.lat}<h3/>
                <p>${e.lngLat.lng}<p/>
                <div/>
                `
                ).addTo(map)
            questionRef.current = new mapboxgl.Marker({}).setLngLat([e.lngLat.lng, e.lngLat.lat]).setPopup(popup)
                
            })
        }, [lat, lng, zoom])
            
        const handleAddQuiz = async () => {
                const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
                const username = localStorage.getItem('username')
                const token = localStorage.getItem('token')
                console.log('token:',token);
                
                const settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: quizname
                    })
                }   
                const response = await fetch(url, settings)
                const data: CreateQuiz = await response.json()
                console.log('quiz created:', data);
            }
        const handleAddQuestion = async() => {
                
                const token = localStorage.getItem('token')
                const lat = clickLat
                const long = clickLng
                const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz/question'
                const settings = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: quizname,
                        question: question,
                        answer: answer,
                        location:{
                            longitude: long,
                            latitude: lat
                        }
                    })
                }
                const response = await fetch(url, settings)
                const data: AddQuestion = await response.json()
                console.log('added question', data);
            }
            
        useEffect(() => {
                async function fetchData() {
                    try {
                        const data = await handleGetQuiz();
                        setQuizzes(data);
                    } catch (error) {
                        console.error('Error fetching quizzes:', error);
                    }
                }
                
                fetchData();
            }, []);
            
        async function handleGetQuiz(): Promise<GetQuiz[]> {
                try {
                    const url = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz";
                    const response = await fetch(url);
                    
                    if (!response.ok) {
                        throw new Error(`Hämtningen av status misslyckades ${response.status}`);
                    }
                    const data = await response.json();
                    console.log(data);
                    return data.quizzes;
                } catch (error) {
                    console.log("Något blev fel:", error);
                    throw error;
                }
            }
            
            const showAllQuiz = (quiz:any) => {
                navigate('/map', {state: quiz})
            }
            
return(
        <div>
            <h1>VEM VET MEST?</h1>
            <Link to='/signup'>SKAPA ANVÄNDARE</Link>
            <Link to='/login'>LOGGA IN</Link>
            <section className="quiz-map" ref={mapContainer}></section>
            <aside>
                <input type="text" value={quizname} onChange={event => setQuizname(event.target.value)}/>
                <button onClick={ handleAddQuiz }>SKAPA QUIZ</button>
            </aside>
            <h1>KLICKA PÅ KARTAN FÖR ATT SKICKA MED KOORDINATER</h1>
                <aside>
                    <input type="text" placeholder="FRÅGA?" value={question} onChange={event => setQuestion(event.target.value)}/>
                    <input type="text" placeholder="SVAR!" value={answer} onChange={event => setAnswer(event.target.value)}/>
                <button onClick={handleAddQuestion}>LÄGG TILL FRÅGA</button>
            </aside>
            <section>
            <h1>FRÅGOR FRÅN HELA VÄRLDEN</h1>
                <ul>
                    {quizzes.map((quiz:any) => (
                        <li key={quiz.quizId.userId}>
                            <p>ANVÄNDARE: {quiz.username}</p>
                            <p>NAMN PÅ QUIZ: {quiz.quizId}</p>
                            <button onClick={() => showAllQuiz(quiz)}>VISA FRÅGOR</button>
                        </li>
                    ))}
                    </ul>
            </section>
        
</div>
)}
                    
export default DisplayQuiz