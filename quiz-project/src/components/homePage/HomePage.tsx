import { Link } from 'react-router-dom'

function HomePage() {
    return (
        <div>
            <Link to={`/SignUp`}>SKAPA ANVÄNDARE</Link>
            <Link to={`/LogIn`}>LOGGA IN</Link>
            <Link to={`/Game`}>SPELA SOM GÄST</Link>
        </div>
    )


}

export default HomePage