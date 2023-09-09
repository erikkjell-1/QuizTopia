import './map.css'
  import { useState, useRef, useEffect } from 'react'
  import { useLocation } from 'react-router-dom';
  import mapboxgl, { Map as MapGl } from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { Position, GetQuiz, AddQuestion, Question } from '../Interface';
  import { Link } from 'react-router-dom';

	mapboxgl.accessToken = 'pk.eyJ1IjoiamFjb2Jqb2gwOCIsImEiOiJjbGx6M2pqMXYwZTZ5M2NvNzNscm5rZWtuIn0.C2QkVLDoLFvrae_e65EGpg';


 	function DisplayMap() {
	const location = useLocation()
	const currentQuiz = location.state
	 const mapContainer = useRef(null)
	 const mapRef = useRef<MapGl | null>(null)
	 const [lat, setLat] = useState<number>(57)
	 const [lng, setLng] = useState<number>(11)
	 const [zoom, setZoom] = useState<number>(10)
	 const [quizzes, setQuizzes]   = useState<any>([])

	 const markerRef = useRef<mapboxgl.Marker | null>(null)
	 const marker = useRef<mapboxgl.Marker | null>(null)

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
		 markerRef.current = new mapboxgl.Marker({}).setLngLat([lng, lat]).addTo(map)

			const quizId = currentQuiz.quizId;
			const username = currentQuiz.username;

			 currentQuiz.questions.forEach((question: Question) => {
				const lat =+question.location.latitude
				const lng =+question.location.longitude
			marker.current = new mapboxgl.Marker()
			  .setLngLat([lng, lat])
			   // Replace with actual coordinates
			  .setPopup(new mapboxgl.Popup({ offset:25 }).setHTML(
				`
				<div>
					<h3>
					${question.question}
					<h3/>
					<p>${question.answer}<p/>
				<div/>
				`
			  ))
			  .addTo(map);
			 });
		  		
	 }, [lat, lng, zoom])

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

	return (
	<div>
			<header>
                <Link to='/quiz'>TILLBAKA TILL QUIZ</Link>
			</header>
				<section >
			 		<div ref={mapContainer} className="quiz-map" />
					<p> Center position: {lat} lat, {lng} lng </p>
				</section>
                
 		</div>
 	)
	} 

	export default DisplayMap