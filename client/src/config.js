let BASE_URL = "https://post-it-heroku.herokuapp.com/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000/";
}
let FLASK_URL = "http://localhost:5000/"
export { BASE_URL, FLASK_URL };