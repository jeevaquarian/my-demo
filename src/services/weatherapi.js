import axios from 'axios';

export default{
  async getWeatherData(){
    return await axios.get('http://localhost:3000/weather')
    .then(response=>{
      return response
    })

  }
}