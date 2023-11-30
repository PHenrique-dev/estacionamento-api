import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL
  export async function postFunction(){
    const response = await axios.post(`${API_URL}/auth/user`, {email: '', password:''})
    return response.data
  }
  export async function postFunctio(){
    const response = await axios.post(`${API_URL}/auth/register`, {name:'',email: '', password:'', confirmpassword:''})
    return response.data
  }