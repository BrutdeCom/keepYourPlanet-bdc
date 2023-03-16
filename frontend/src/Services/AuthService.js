import * as axios from 'axios'

let urlApi = 'http://localhost:8000/user'
let urlAuth = 'http://localhost:8000/auth'
let urlResult = 'http://localhost:8000/result'

const choiseServer = () => {
  if (process.env.NODE_ENV === 'production') {
    urlApi = 'https://keep-your-planet.herokuapp.com/user'
    urlAuth = 'https://keep-your-planet.herokuapp.com/auth'
    urlResult = 'https://keep-your-planet.herokuapp.com/result'
  }
}

choiseServer()

const api = axios.create({
  baseURL: urlApi
})

const auth = axios.create({
  baseURL: urlAuth
})

const result = axios.create({
  baseURL: urlResult
})


// SIGNUP NEW USER
export const insertUser = user => api.post('/add', user)

// LOGIN USER
export const signinUser = user => auth.post('/signin', user)

// LOGOUT USER
export const signoutUser = () => auth.get('/signout')

// ISAUTHENTICATED 
export const isAuthenticated = () => auth.get('/authenticated', { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// RESET PASSWORD
export const passwordReset = user => api.post('/reset', user, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// ADD EVALUATION 
export const addEvaluation = (evaluation) => result.post('/add', evaluation, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// REQUEST GOOGLE API
export const requestResult = (itinerary) => result.post('/google-api', itinerary, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// REQUEST CURRENT EVALUATION
export const requestCurrentEvaluation = (evaluationId) => result.post('/evaluation-result', { _id: evaluationId }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })


export const addFuelType = (vehicleDatas) => api.post('/add-fuel-type', vehicleDatas, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// REQUEST USER PROFILE DATAS
export const getUser = (year) => api.post('/get-user-data', { year: year }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// REQUEST REGISTRATION VEHICLE DATAS
export const getRegistration = (registration) => api.post('/get-registration', { registration: registration }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

export const getUsers = () => api.get('/list', { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// DELETE USER
export const deleteUser = (idUser) => api.post('/delete', idUser, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

// UPDATE USER
export const updateUser = (user) => api.post('/update', user, { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } })

const AuthService = {
  isAuthenticated,
  insertUser,
  signinUser,
  signoutUser,
  passwordReset,
  addEvaluation,
  requestResult,
  requestCurrentEvaluation,
  addFuelType,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  getRegistration
}

export default AuthService