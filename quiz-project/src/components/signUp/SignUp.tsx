import { useState } from 'react'
import { SignUpResponse } from '../Interface'

function SignUp() {

    const [username, setUsername] = useState<string>('') 
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const createUser = async () => {
        const url = 'https://jv4lxh2izk.execute-api.eu-north-1.amazonaws.com/auth/signup'
        const settings = {
            method: 'POST',
            body: JSON.stringify({
                username:username,
                password: password
            })
        }
        const response = await fetch(url, settings)
        const data: SignUpResponse = await response.json()

        if( data.success ) {
            setMessage('ANVÄNDARE SKAPADES')
        } else {
            setMessage('NÅGOT GICK FEL')
        }
    }

    return (
        <div className="login">
            <header>
                <h1> QUIZTOPIA </h1>
            </header>

            <label htmlFor='ANVÄNDARNAMN'>
            <input type="text" placeholder="ANVÄNDARNAMN" value={username} onChange={event => setUsername(event.target.value)} />
            </label>
            
            <label htmlFor="LÖSENORD">
            <input type="text" placeholder="LÖSENORD" value={password} onChange={event => setPassword(event.target.value)} />
            </label>

            <button onClick={createUser}> SKAPA ANVÄNDARE</button>
            <p> {message} </p>

        </div>

    )

}

export default SignUp