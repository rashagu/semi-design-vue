import { defineComponent, ref, h, Fragment, onMounted } from "vue";
import Feature from "ol/Feature";
import Map from "ol/Map";
import Point from "ol/geom/Point";
import Polyline from "ol/format/Polyline";
import VectorSource from "ol/source/Vector";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from "ol/style";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getVectorContext } from "ol/render";
import dayjs from "dayjs";
import { MoveMarker } from "@/views/mapClass/MoveMarker";


interface MapProps {
  name?: string;
}

export const vuePropsType = {
  name: String
};
const MapComp = defineComponent<MapProps>((props, { slots }) => {

  let map: Map;
  onMounted(() => {

    const key = "get_your_own_D6rA4zTHduk6KOKTXzGB99999";
    const attributions =
      "<a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\">&copy; MapTiler</a> " +
      "<a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";

    const center = [-5639523.95, -3501274.52];
    map = new Map({
      target: document.getElementById("map")!,
      view: new View({
        center: center,
        zoom: 10,
        minZoom: 2,
        maxZoom: 19
      }),
      layers: [
        new TileLayer({
          source: new XYZ({
            attributions: attributions,
            url: "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=" + key,
            tileSize: 512
          })
        })
      ]
    });

// The polyline string is read from a JSON similiar to those returned
// by directions APIs such as Openrouteservice and Mapbox.
    fetch("/route.json").then(function(response) {
      response.json().then(function(result) {
        const polyline = result.routes[0].geometry;

        const route = new Polyline({
          factor: 1e6
        }).readGeometry(polyline, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        });
        console.log(route);

        /**
         * 线
         */
        const routeFeature = new Feature({
          type: "route",
          geometry: route
        });
        /**
         * 起点
         */
        const startMarker = new Feature({
          type: "icon",
          geometry: new Point(route.getFirstCoordinate())
        });
        /**
         * 终点
         */
        const endMarker = new Feature({
          type: "icon",
          geometry: new Point(route.getLastCoordinate())
        });
        /**
         * 运动的点
         */
        const position = startMarker.getGeometry()!.clone();
        const geoMarker = new Feature({
          type: "geoMarker",
          geometry: position
        });

        const styles = {
          route: new Style({
            stroke: new Stroke({
              width: 6,
              color: [237, 212, 0, 0.8]
            })
          }),
          icon: new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: "/icon.png"
            })
          }),
          geoMarker: new Style({
            image: new CircleStyle({
              radius: 7,
              fill: new Fill({ color: "black" }),
              stroke: new Stroke({
                color: "white",
                width: 2
              })
            })
          })
        };

        /**
         * 覆盖物集合
         */
        const vectorLayer = new VectorLayer({
          source: new VectorSource({
            features: [routeFeature, geoMarker, startMarker, endMarker]
          }),
          style: function(feature) {
            return styles[feature.get("type")];
          }
        });

        map.addLayer(vectorLayer);

        const speedInput = document.getElementById("speed")! as HTMLInputElement;
        const startButton = document.getElementById("start-animation")!;
        let animating = ref(false);
        let distance = 0;
        let lastTime: number;

        function moveFeature(event) {
          const speed = Number(speedInput.value);
          const time = event.frameState.time;
          // console.log(
          //   dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
          //   dayjs(lastTime).format('YYYY-MM-DD HH:mm:ss')
          // );


          const elapsedTime = time - lastTime;
          distance = (distance + (speed * elapsedTime) / 1e6) % 2;
          lastTime = time;

          const currentCoordinate = route.getCoordinateAt(
            distance > 1 ? 2 - distance : distance
          );

          position.setCoordinates(currentCoordinate);
          const vectorContext = getVectorContext(event);
          console.log(distance);
          vectorContext.setStyle(styles.geoMarker);
          vectorContext.drawGeometry(position);
          // tell OpenLayers to continue the postrender animation
          map.render();
        }

        let moveMarker = new MoveMarker(
          animating,
          startMarker,
          map,
          speedInput,
          startButton,
          vectorLayer,
          route,
          styles
        );
        function startAnimation() {
          moveMarker.startAnimation()
          // moveMarker.startAnimation()
          // animating.value = true;
          // lastTime = Date.now();
          // startButton.textContent = "Stop Animation";
          // vectorLayer.on("postrender", moveFeature);
          // map.render();
          // hide geoMarker and trigger map render through change event
          // geoMarker.setGeometry(undefined);
        }

        function stopAnimation() {
          moveMarker.stopAnimation()
          // animating.value = false;
          // startButton.textContent = "Start Animation";
          //
          // // Keep marker at current animation position
          // // geoMarker.setGeometry(position);
          // vectorLayer.un("postrender", moveFeature);
        }

        startButton.addEventListener("click", function() {
          if (animating.value) {
            stopAnimation();
          } else {
            startAnimation();
          }
        });
      });
    });


  });

  return () => (
    <div>
      <div id={"map"} style={{ width: "100vw", height: "80vh" }} />
      <label htmlFor="speed">
        speed:&nbsp;
        <input id="speed" type="range" min="10" max="999" step="10" value="60" />
      </label>
      <button id="start-animation">Start Animation</button>
    </div>
  );
});

MapComp.props = vuePropsType;

export default MapComp;

