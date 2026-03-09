import {useEffect,useState} from "react"
import {useNavigate} from "react-router-dom"
import API from "../services/api"

export default function Dashboard(){

const [profile,setProfile]=useState(null)
const navigate = useNavigate()

useEffect(()=>{

API.get("/profile")
.then(res=>{
setProfile(res.data)
})
.catch(()=>{
navigate("/login")
})

},[])

const logout = async ()=>{

await API.post("/logout")

localStorage.removeItem("token")

navigate("/login")

}

if(!profile) return <p>Loading...</p>

return(

<div>

<h2>Dashboard</h2>

<p>Username: {profile.username}</p>
<p>{profile.message}</p>

<button onClick={logout}>Logout</button>

</div>

)

}