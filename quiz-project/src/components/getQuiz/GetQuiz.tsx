import { ExistingQuiz } from '../Interface';

async function getExistingQuiz() {

    const [existingQuiz, setExistingQuiz] = useState<ExistingQuiz[]>([])

    const url = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz'
    const settings = {
        method: 'GET',
        headers:  {'Content-Type': 'application/json'}
    }
    const response = await fetch(url, settings)
    const data: ExistingQuiz = await response.json()


    return (
        <div className='getQuiz__container'>
        <button onClick={getExistingQuiz}>Show existing quizes</button>
    </div>
    )
}