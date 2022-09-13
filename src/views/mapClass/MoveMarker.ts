import Feature from "ol/Feature";
import type { Point } from "ol/geom";
import type Map from "ol/Map";
import type VectorLayer from "ol/layer/Vector";
import type VectorSource from "ol/source/Vector";
import type { Geometry } from "ol/geom";
import { getVectorContext } from "ol/render";
import type { Ref } from "vue";

export class MoveMarker {
  private position: Point;
  private geoMarker: Feature<Point>;
  private animating: Ref<boolean>;
  public map: Map;
  private lastTime: number = 0;
  private speedInput: HTMLInputElement;
  private startButton: HTMLElement;
  private vectorLayer: VectorLayer<VectorSource<Geometry>>;
  private distance: number = 0;
  private route: Geometry;
  private styles: any;
  public moveFeature: (event:any)=>void

  /**
   * 运动的点
   */
  constructor(
    animating: Ref<boolean>,
    startMarker: Feature<Point>,
    map: Map,
    speedInput: HTMLInputElement,
    startButton: HTMLElement,
    vectorLayer: VectorLayer<VectorSource<Geometry>>,
    route: Geometry,
    styles: any
  ) {
    this.animating = animating;
    this.map = map;
    this.speedInput = speedInput;
    this.startButton = startButton;
    this.vectorLayer = vectorLayer;
    this.route = route;
    this.styles = styles
    this.position = startMarker.getGeometry()!.clone();
    this.geoMarker = new Feature({
      type: "geoMarker",
      geometry: this.position,
    });

    this.moveFeature = this.moveFeature_.bind(this)
  }

  startAnimation() {
    this.animating.value = true;
    this.lastTime = Date.now();
    this.startButton.textContent = "Stop Animation";
    this.vectorLayer.on("postrender", this.moveFeature);
    // hide geoMarker and trigger map render through change event
    // this.geoMarker.setGeometry(undefined);
    this.map.render();
  }

  stopAnimation() {
    this.animating.value = false;
    this.startButton.textContent = "Start Animation";

    // Keep marker at current animation position
    // geoMarker.setGeometry(position);
    this.vectorLayer.un("postrender", this.moveFeature);
  }

  moveFeature_(event: any){
    console.log(this)
    const speed = Number(this.speedInput.value);
    const time = event.frameState.time;
    // console.log(
    //   dayjs(time).format('YYYY-MM-DD HH:mm:ss'),
    //   dayjs(lastTime).format('YYYY-MM-DD HH:mm:ss')
    // );

    const elapsedTime = time - this.lastTime;
    this.distance = (this.distance + (speed * elapsedTime) / 1e6) % 2;
    this.lastTime = time;

    const currentCoordinate = this.route.getCoordinateAt(
      this.distance > 1 ? 2 - this.distance : this.distance
    );

    this.position.setCoordinates(currentCoordinate);
    const vectorContext = getVectorContext(event);
    console.log(this.distance);
    vectorContext.setStyle(this.styles.geoMarker);
    vectorContext.drawGeometry(this.position);
    // tell OpenLayers to continue the postrender animation
    this.map.render();
  }


}
