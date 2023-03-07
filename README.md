# Getting Started with Create React App

Demo for the project [York app](https://york.vercel.app/)

### To run the project

- clone from the repo using the command

` git clone https://github.com/Mykmicheals/York.git `

- Change directory using 

` cd york `

- install all necessary dependecies using the command

 ` npm install `
 
 ### Environment Variables
 
 - Signup with mapbox to get your api key [mapbox](https://account.mapbox.com/auth/signup/)

 - Signup with open weather api to get your api key [mapbox](https://openweathermap.org/api)

 - Create a .env file in the root of your project and add your api keys

```
REACT_APP_WEATHER_API_KEY = xxxxxxxxxxxxxxxxxxxx

REACT_APP_MAPBOX_ACCESS_TOKEN = xxxxxxxxxxxxxxxxx

```

- Then run the app using the command

` npm install `


### The HomePage

![Screenshot from 2023-03-06 21-58-18](https://user-images.githubusercontent.com/88559940/223353943-9a140020-6648-457a-aa4d-24797f2405a4.png)


### The Weather Modal

![Screenshot from 2023-03-06 22-07-52](https://user-images.githubusercontent.com/88559940/223354027-83d3bb73-d3da-4652-b4a1-2c818830a6f4.png)


### The Mobile View


![Screenshot from 2023-03-06 22-14-02](https://user-images.githubusercontent.com/88559940/223354120-89c0cc60-c4b5-4669-9b79-01eca7fed120.png)



### The Entry code



![Screenshot from 2023-03-06 22-35-42](https://user-images.githubusercontent.com/88559940/223354197-62e573f5-2f6e-43d4-9f3a-fabc1e5c8a1a.png)


The entry code contains two components, the Header and the HomeScreen. The homeScreen contains the map and the modal



```

### The map components

import Map, { Popup, Marker } from "react-map-gl";

         <div className="mx-20 lg:mx-20 mt-10">
              <Map
                style={{ height: "54vh", width: "100%" }}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                longitude={lng}
                latitude={lat}
                zoom={zoom}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                <Marker
                  onClick={() => setShowPopup(true)}
                  longitude={lng}
                  latitude={lat}
                  anchor="bottom"
                >
                  <HiLocationMarker size={32} color="blue" />
                </Marker>
         
              </Map>
            </div>


````

The map component shows the map container, the Marker component shows the icon, the popup component shows the modal


### Fetch Weather Logic


```
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=51.5074&lon=0.1278&exclude=minutely,hourly&units=metric&appid=${weatherApiKey}`
    );
    const data = await response.json();
    setForecast(data?.daily.slice(0, 2));
  };


```
