<template>
  <div class="container" v-if="weatherdata && Object.keys(weatherdata).length >0">
    <p class="table-heading">Current Weather Condition Of New York</p>
    <table class="col-md-12">
      <thead>
        <tr v-for="constants in weatherContants" :key="constants.id">
          <th scope="col" colspan="2">{{constants.Location}}</th>
          <th scope="col">{{constants.Weather_Desc}}</th>
          <th scope="col">{{constants.Current_Temp}}</th>
          <th scope="col">{{constants.High_Temp}}</th>
          <th scope="col">{{constants.Low_Temp}}</th>
          <th scope="col">{{constants.Wind_Speed}}</th>
          <th scope="col">{{constants.Humidity}}</th>
          <th scope="col">{{constants.Pressure}}</th>
          <th scope="col">{{constants.Sunrise_Time}}</th>
          <th scope="col">{{constants.Sunset_Time}}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="2">
            {{ weatherdata.location.region + '('+ weatherdata.location.country+ ')' }}
          </td>
          <td class="item-stock">{{ weatherdata.item.condition.text }}</td>
          <td class="item-qty">{{ weatherdata.item.condition.temp}} {{units.temperature}}</td>
          <td class="item-price">{{ weatherdata.item.forecast[0].high }} {{units.temperature}}</td>
          <td>{{ weatherdata.item.forecast[0].low }} {{units.temperature}}</td>
          <td>{{ weatherdata.wind.speed }} {{units.speed}}</td>
          <td>{{ weatherdata.atmosphere.humidity }}</td>
          <td>{{ weatherdata.atmosphere.pressure }} {{units.pressure}}</td>
          <td>{{ weatherdata.astronomy.sunrise }}</td>
          <td>{{ weatherdata.astronomy.sunset }}</td>
        </tr>
      </tbody>
    </table>
    <div class="col-md-12">
      <p class="graph-heading mt-4">Graph representng 7 days on x-axis and corresponding day high and low temperature</p>
        <b-button class="mb-5 mt-1" @click="showToggle">{{btntext}} Graph</b-button>
         <transition name="slide-fade">
      <line-chart  v-if="show" :chart-data="datacollection" :options="options"></line-chart>
      </transition>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import LineChart from "./LineChart.js";
import weather from '../constants/weather';
import weatherapi from '../services/weatherapi'    

export default {
  name: "Weather",
  components: {
    LineChart,
  },
  data() {
    return {
      show:false,
      btntext:"Show",
      weatherdata:[],
      forecast: [],
      chartdata: [],
      units:Object,
      options:null,
      datacollection: Object,
      days: [],
      high: [],
      low: [],
      weatherContants:[],
    };
  },
  methods:{
    getContants(){
    this.weatherContants=weather;
  },
getWeatherDetails(){
   weatherapi.getWeatherData()
   .then(res=>{
    this.weatherdata = res.data[0].query.results.channel
   this.setWeatherData()
    }).catch(error=>{
       console.log(error)
    })
    },
   setWeatherData(){
      this.forecast = this.weatherdata.item.forecast;
      this.units=this.weatherdata.units;
      for (var i = 0; i < this.forecast.length; i++) {
         this.days.push(this.forecast[i].day + ' , '+(this.forecast[i].date)+' , '+this.forecast[i].text);
        
        this.high.push(this.forecast[i].high);
        this.low.push(this.forecast[i].low);
      }
       this.datacollection = {
        labels: this.days,
        datasets: [
          {
            label: "High Temperature of day",
            data: this.high,
            borderColor:'#FF0000',
            fill: false,
          },
          {
            label: "Low Temperature of day",
            borderColor:'#00FFFF',
            fill: false,
            data: this.low,
          },
     
        ]
     
    },
    this.options= {
      responsive: true,
      maintainAspectRatio: false,
   

        }
   
   },
   showToggle(){
     this.show=!this.show;
     if(this.show){
      this.btntext="Hide"
     }
     else {
       this.btntext="Show"
     }
    
   },
 

  },
 
   mounted:function(){
     this.getContants();
  this.getWeatherDetails();

 }
};
</script>
<style scoped>
div {
  height: 90%;
  width: auto;
}
.small {
  max-width: 600px;
  margin: 150px auto;
      max-height: 318px;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  color: #4a4a4d;
  font: 14px/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif;
}
th,
td {
  padding: 10px 15px;
  vertical-align: middle;
}
thead {
  background: #395870;
  color: #fff;
}
th:first-child {
  text-align: left;
}
tbody tr:nth-child(even) {
  background: #f0f0f2;
}
td {
  border-bottom: 1px solid #cecfd5;
  border-right: 1px solid #cecfd5;
}
td:first-child {
  border-left: 1px solid #cecfd5;
}
.slide-fade-enter-active {
  transition: all .6s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.graph-heading{
font-size: 1.2rem;
}
.table-heading{
font-size: 1.5rem;
}
</style>