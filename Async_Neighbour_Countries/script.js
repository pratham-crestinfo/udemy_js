'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
function renderCountry(data, className="")
{
    // console.log(data);
    const html=` <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population/10000000).toFixed(1) +"M"}</p>
      <p class="country__row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
      <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name + " ( " + Object.values(data.currencies)[0].symbol + " )"}</p>
    </div>
  </article>`

  countriesContainer.insertAdjacentHTML("beforeend",html);
  countriesContainer.style.opacity=1;
}
function getcountryAndNeighbour(country)
{
const request = new XMLHttpRequest();
request.open("GET",`https://restcountries.com/v3.1/name/${country}`);
request.send();
request.addEventListener("load",function()
{
    const [data]=JSON.parse(this.responseText);
    renderCountry(data);

    // const neigbour=data.borders?.[0];   
    const neighbour=data.borders; 
    if(!neighbour) return;
    neighbour.forEach(element => {
        const request2 = new XMLHttpRequest();
        request2.open("GET",`https://restcountries.com/v3.1/alpha/${element}`);
        request2.send();
        request2.addEventListener("load",function(){
        const [data]=JSON.parse(this.responseText);
        renderCountry(data , "neighbour");
    })
});
})
}
// getcountryAndNeighbour("Russia");


const getCountryDetails=function(country)
{
  fetch(`https://restcountries.com/v3.1/name/${country}`)
  .then((response)=>{
    if(!response.ok)
    throw new Error(`Country not Found ${response.status}`)
    
    return response.json()})
  .then(data => {
   renderCountry(data[0])
   let neighbour = data[0].borders;
    if(!neighbour) throw new Error(`No Neighbour Found`);
    // neighbour=["CAA"];
    neighbour.forEach(element=>{
       fetch(`https://restcountries.com/v3.1/alpha/${element}`)
      .then(response =>{
        if(!response.ok)
        throw new Error(`Neighbouring Country not Found ${response.status}`)
        return response.json()})
      .then(data=>renderCountry(data[0],"neighbour"))
      .catch(err=>alert(err))
}
)})
.catch(err=>alert(err))
}
getCountryDetails("Bharat")
function where(){
  navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=107260093051191e15896135x101274`)
      .then(response=>{
          // console.log(response)
          return response.json()})
      .then(data=>{
        getCountryDetails(data.country)
        console.log(`you are at ${data.region},${data.country} `)})
      .catch(err=>console.log(err))
})}

document.querySelector(".btn-country").addEventListener("click",()=>
{
  where();
})