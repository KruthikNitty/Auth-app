import {useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../services/api"

export default function Login(){

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const [error,setError]=useState("")
const [loading,setLoading]=useState(false)

const navigate = useNavigate()

const handleLogin = async ()=>{

if(!username || password.length < 6){
setError("Invalid input")
return
}

try{

setLoading(true)

const res = await API.post("/login",{username,password})

localStorage.setItem("token",res.data.token)

navigate("/")

}catch(err){

setError("Invalid credentials")

}finally{
setLoading(false)
}

}

return(

<div>

<h2>Login</h2>

<input
placeholder="username"
value={username}
onChange={(e)=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>
{loading ? "Loading..." : "Login"}
</button>

<p>{error}</p>

</div>

)

}