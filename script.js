
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

let weather ={
    apikey : "b82138b41af1dcf730c53c2c4a55e538",
    fetchWeather : function(city){
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&appid=" 
        +this.apikey 
        + "&units=metric&appid="
        )
        .then((response)=>response.json())
        .then((data) => this.displayWeather(data));
        },
   
    displayWeather : function(data){
        const {name} = data;
        const { icon  , description } = data.weather[0];
        const { temp , humidity }  = data.main;
        const { speed } = data.wind;

        console.log(name,icon,description,temp,humidity,speed);


        document.querySelector('.city-name').innerText ="Weather Today in "+ name;
       
        //For ICON add .src
        document.querySelector('.w-icon').src ="http://openweathermap.org/img/wn/"+ icon +".png";

        document.querySelector('.w-description').innerText = description ;
        document.querySelector('.w-temp').innerText = temp  +  "°C" ;
        
        document.querySelector('.w-humidity').innerText ="Humidity : " +humidity+"%";
        document.querySelector('.w-wind').innerText = "Wind : " +speed +" km/h";

        document.querySelector('.w-info').classList.remove("loading")
    } , 

    search : function(){
        if(document.querySelector('.w-search-text').value == null || document.querySelector('.w-search-text').value == ""){
            document.querySelector('.w-message').innerText = 'City / Zipcode is empty';
        }else{
            this.fetchWeather(document.querySelector('.w-search-text').value);
        }
        
    },

    clearSearch : function(){
        document.querySelector('.w-search-text').value = '';
        document.querySelector('.w-info').innerHTML = '';
        document.querySelector('.w-message').innerText = '';
        document.querySelector('.city-name').innerHTML = 'Weather Today';
    }
};


document
    .querySelector('.w-search')
    .addEventListener("click", function(){
        weather.search();
    });

document
    .querySelector('.w-search-text')
    .addEventListener("keyup", function(event){
        if(event.key == "Enter" )
                weather.search();
    });


document.
    querySelector('.w-clear').
    addEventListener("click", function(){
        weather.clearSearch();
    });

