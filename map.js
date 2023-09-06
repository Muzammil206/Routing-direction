
// function displayMap(){
//     require([
//         "esri/config",
//         "esri/Map",
//         "esri/views/MapView",
  
//         "esri/Graphic",
//         "esri/rest/route",
//         "esri/rest/support/RouteParameters",
//         "esri/rest/support/FeatureSet"
  
//       ], function(esriConfig, Map, MapView, Graphic, route, RouteParameters, FeatureSet) {

//         esriConfig.apiKey = "AAPKcf508bd0094d4357b2cd73b87e0a558fPBbDqsRIKS9Gkr31H_TA7fPpXUqts5SqaNfOhDMTplGq3FDq2CTrIgFTBvv7i1Zh";
    
//         const map = new Map({
//             basemap: "arcgis-topographic" // Basemap layer service
//             });
    
//             const view = new MapView({
//             map: map,
//             center: [longitude, latitude], // Longitude, latitude
//             zoom: 13, // Zoom level
//             container: "viewDiv" // Div element
//             });
    
    
//         });


//         const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

//     view.on("click", function(event){

//       if (view.graphics.length === 0) {
//         addGraphic("origin", event.mapPoint);
//       } else if (view.graphics.length === 1) {
//         addGraphic("destination", event.mapPoint);

//         getRoute(); // Call the route service

//       } else {
//         view.graphics.removeAll();
//         addGraphic("origin",event.mapPoint);
//       }

//     });

//     function addGraphic(type, point) {
//       const graphic = new Graphic({
//         symbol: {
//           type: "simple-marker",
//           color: (type === "origin") ? "white" : "black",
//           size: "8px"
//         },
//         geometry: point
//       });
//       view.graphics.add(graphic);
//     }

//     function getRoute() {
//       const routeParams = new RouteParameters({
//         stops: new FeatureSet({
//           features: view.graphics.toArray()
//         }),

//         returnDirections: true

//       });

//       route.solve(routeUrl, routeParams)
//         .then(function(data) {
//           data.routeResults.forEach(function(result) {
//             result.route.symbol = {
//               type: "simple-line",
//               color: [5, 150, 255],
//               width: 3
//             };
//             view.graphics.add(result.route);
//           });

//           // Display directions
//          if (data.routeResults.length > 0) {
//            const directions = document.createElement("ol");
//            directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
//            directions.style.marginTop = "0";
//            directions.style.padding = "15px 15px 15px 30px";
//            const features = data.routeResults[0].directions.features;

//            // Show each direction
//            features.forEach(function(result,i){
//              const direction = document.createElement("li");
//              direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
//              directions.appendChild(direction);
//            });

//           view.ui.empty("top-right");
//           view.ui.add(directions, "top-right");

//          }

//         })

//         .catch(function(error){
//             console.log(error);
//         })

//     }


        

      
        
        
// } 

// function getLocation() {
//     if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//     console.log("Geolocation is not supported by this browser.");
//     }
// }

// function showPosition(position) {
//     latitude = position.coords.latitude;
//     longitude = position.coords.longitude;
//     console.log("Latitude: " + latitude + ", Longitude: " + longitude);

   
//     displayMap()

    

    
// }



    


let longitude;
let latitude;

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("Latitude: " + latitude + ", Longitude: " + longitude);


    
}


getLocation()



require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/Graphic",
    "esri/rest/route",
    "esri/rest/support/RouteParameters",
    "esri/rest/support/FeatureSet"

  ], function(esriConfig, Map, MapView, Graphic,  route, RouteParameters, FeatureSet) {

  esriConfig.apiKey = "AAPKcf508bd0094d4357b2cd73b87e0a558fPBbDqsRIKS9Gkr31H_TA7fPpXUqts5SqaNfOhDMTplGq3FDq2CTrIgFTBvv7i1Zh";

  const map = new Map({
    basemap: "arcgis-navigation" //Basemap layer service
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [longitude,latitude], //Longitude, latitude
    zoom: 12
  });

  const routeUrl = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World";

  view.on("click", function(event){

    if (view.graphics.length === 0) {
      addGraphic("origin", event.mapPoint);
    } else if (view.graphics.length === 1) {
      addGraphic("destination", event.mapPoint);

      getRoute(); // Call the route service

    } else {
      view.graphics.removeAll();
      addGraphic("origin",event.mapPoint);
    }

  });

  function addGraphic(type, point) {
    const graphic = new Graphic({
      symbol: {
        type: "simple-marker",
        color: (type === "origin") ? "white" : "black",
        size: "8px"
      },
      geometry: point
    });
    view.graphics.add(graphic);
  }

  function getRoute() {
    const routeParams = new RouteParameters({
      stops: new FeatureSet({
        features: view.graphics.toArray()
      }),

      returnDirections: true

    });

    route.solve(routeUrl, routeParams)
      .then(function(data) {
        data.routeResults.forEach(function(result) {
          result.route.symbol = {
            type: "simple-line",
            color: [5, 150, 255],
            width: 3
          };
          view.graphics.add(result.route);
        });

        // Display directions
       if (data.routeResults.length > 0) {
         const directions = document.createElement("ol");
         directions.classList = "esri-widget esri-widget--panel esri-directions__scroller";
         directions.style.marginTop = "0";
         directions.style.padding = "15px 15px 15px 30px";
         const features = data.routeResults[0].directions.features;
            
         // Show each direction
         features.forEach(function(result,i){
           const direction = document.createElement("li");
           direction.innerHTML = result.attributes.text + " (" + result.attributes.length.toFixed(2) + " miles)";
           directions.appendChild(direction);
           direction.classList.add("custom-direction")
         });
          ///to use my own custom class
         const directionsPanel = document.querySelector(".custom-directions-panel");
         directionsPanel.appendChild(directions);

         ///to use defualt coustom class
        // view.ui.empty("top-right");
        // view.ui.add(directions, "top-right");

       }

      })

      .catch(function(error){
          console.log(error);
      })

  }

 

});





  