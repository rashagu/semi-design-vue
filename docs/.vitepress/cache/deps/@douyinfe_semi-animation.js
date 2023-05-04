import {
  require_src
} from "./chunk-XADEZ2D6.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/getEasing.js
var import_bezier_easing = __toESM(require_src());
function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}
function parseEasingParameters(string) {
  const match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(",").map((p) => parseFloat(p)) : [];
}
function elastic() {
  let amplitude = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 1;
  let period = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.5;
  const a = minMax(amplitude, 1, 10);
  const p = minMax(period, 0.1, 2);
  return (t) => t === 0 || t === 1 ? t : -a * Math.pow(2, 10 * (t - 1)) * Math.sin((t - 1 - p / (Math.PI * 2) * Math.asin(1 / a)) * (Math.PI * 2) / p);
}
var easingMap = (() => {
  const names = ["Quad", "Cubic", "Quart", "Quint", "Sine", "Expo", "Circ", "Back", "Elastic"];
  const curves = {
    In: [
      [0.55, 0.085, 0.68, 0.53],
      [0.55, 0.055, 0.675, 0.19],
      [0.895, 0.03, 0.685, 0.22],
      [0.755, 0.05, 0.855, 0.06],
      [0.47, 0, 0.745, 0.715],
      [0.95, 0.05, 0.795, 0.035],
      [0.6, 0.04, 0.98, 0.335],
      [0.6, -0.28, 0.735, 0.045],
      elastic
      /* inElastic */
    ],
    Out: [
      [0.25, 0.46, 0.45, 0.94],
      [0.215, 0.61, 0.355, 1],
      [0.165, 0.84, 0.44, 1],
      [0.23, 1, 0.32, 1],
      [0.39, 0.575, 0.565, 1],
      [0.19, 1, 0.22, 1],
      [0.075, 0.82, 0.165, 1],
      [0.175, 0.885, 0.32, 1.275],
      (a, p) => (t) => 1 - elastic(a, p)(1 - t)
      /* outElastic */
    ],
    InOut: [
      [0.455, 0.03, 0.515, 0.955],
      [0.645, 0.045, 0.355, 1],
      [0.77, 0, 0.175, 1],
      [0.86, 0, 0.07, 1],
      [0.445, 0.05, 0.55, 0.95],
      [1, 0, 0, 1],
      [0.785, 0.135, 0.15, 0.86],
      [0.68, -0.55, 0.265, 1.55],
      (a, p) => (t) => t < 0.5 ? elastic(a, p)(t * 2) / 2 : 1 - elastic(a, p)(t * -2 + 2) / 2
      /* inOutElastic */
    ]
  };
  const eases = {
    linear: [0.25, 0.25, 0.75, 0.75]
  };
  for (const coords of Object.keys(curves)) {
    curves[coords].forEach((ease, i) => {
      eases["ease" + coords + names[i]] = ease;
    });
  }
  return eases;
})();
function getEasing(easing) {
  if (typeof easing === "function") {
    return easing;
  }
  if (!easing || typeof easing !== "string") {
    easing = "linear";
  } else {
    easing = easing.trim();
  }
  let name = easing.split("(")[0];
  const args = parseEasingParameters(easing);
  let ease;
  if (name === "cubic-bezier" || name === "cubicBezier") {
    return (0, import_bezier_easing.default)(...args.length ? args : easingMap.linear);
  } else {
    if (!name || typeof name !== "string" || typeof name === "string" && easingMap[name] == null) {
      name = "linear";
    }
    ease = easingMap[name];
    if (typeof ease === "function") {
      return ease(...args);
    } else if (args.length) {
      return (0, import_bezier_easing.default)(...args);
    } else {
      return (0, import_bezier_easing.default)(...ease);
    }
  }
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/constants.js
var events = ["start", "frame", "pause", "resume", "stop", "rest"];

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/utils/Event.js
var Event = class {
  constructor() {
    this._eventMap = /* @__PURE__ */ new Map();
  }
  on(event, callback) {
    if (event && typeof callback === "function") {
      this._eventMap.has(event) || this._eventMap.set(event, []);
      this._eventMap.get(event).push(callback);
    }
    return this;
  }
  once(event, callback) {
    var _this = this;
    if (event && typeof callback === "function") {
      const fn = function() {
        callback(...arguments);
        _this.off(event, fn);
      };
      this.on(event, fn);
    }
  }
  off(event, callback) {
    if (event) {
      if (typeof callback === "function") {
        const callbacks = this._eventMap.get(event);
        if (Array.isArray(callbacks) && callbacks.length) {
          let index = -1;
          while ((index = callbacks.findIndex((cb) => cb === callback)) > -1) {
            callbacks.splice(index, 1);
          }
        }
      } else if (callback == null) {
        this._eventMap.delete(event);
      }
    }
    return this;
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (!this._eventMap.has(event)) {
      return false;
    }
    this._eventMap.get(event).forEach((callback) => callback(...args));
    return true;
  }
};

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/shouldUseBezier.js
function shouldUseBezier(config) {
  return Boolean(config && typeof config === "object" && (config.duration > 0 || typeof config.easing === "string" || typeof config.easing === "function"));
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/shouldStopAnimation.js
function shouldStopAnimation(currentStyle, style, currentVelocity, startTime, nowTime) {
  for (const key of Object.keys(style)) {
    const styleValue = style[key];
    const value = typeof styleValue === "number" ? styleValue : styleValue.val;
    if (typeof styleValue === "object" && styleValue.done) {
      continue;
    }
    if (shouldUseBezier(styleValue) && startTime && nowTime && styleValue.duration) {
      if (styleValue.duration + startTime <= nowTime || value !== currentStyle[key]) {
        return false;
      }
    } else if (typeof currentVelocity[key] === "number" && currentVelocity[key] !== 0) {
      return false;
    }
    if (currentStyle[key] !== value) {
      return false;
    }
  }
  return true;
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/stripStyle.js
function stripStyle(style) {
  const ret = {};
  for (const key in style) {
    if (!Object.prototype.hasOwnProperty.call(style, key)) {
      continue;
    }
    ret[key] = typeof style[key] === "number" ? style[key] : style[key].val;
  }
  return ret;
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/stepper.js
var reusedTuple = [0, 0];
function stepper(secondPerFrame, x, v, destX, k, b, precision) {
  const Fspring = -k * (x - destX);
  const Fdamper = -b * v;
  const a = Fspring + Fdamper;
  const newV = v + a * secondPerFrame;
  const newX = x + newV * secondPerFrame;
  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
    reusedTuple[0] = destX;
    reusedTuple[1] = 0;
    return reusedTuple;
  }
  reusedTuple[0] = newX;
  reusedTuple[1] = newV;
  return reusedTuple;
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/mapToZero.js
function mapToZero(obj) {
  const ret = {};
  const objKeys = obj && Object.keys(obj) || [];
  for (const key of objKeys) {
    ret[key] = 0;
  }
  return ret;
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/presets.js
var presets_default = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
};

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/wrapValue.js
var defaultConfig = Object.assign(Object.assign({}, presets_default.default), {
  precision: 0.01
});
function wrapValue(val) {
  let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (shouldUseBezier(config)) {
    const easing = getEasing(config.easing);
    const duration = typeof config.duration === "number" && config.duration > 0 ? config.duration : 1e3;
    config = Object.assign(Object.assign({}, config), {
      easing,
      duration
    });
  }
  let wrapped = Object.assign(Object.assign(Object.assign({}, defaultConfig), config), {
    done: false
  });
  if (val && typeof val === "object" && "val" in val) {
    if (shouldUseBezier(val)) {
      const easing = getEasing(val.easing);
      const duration = typeof val.duration === "number" && val.duration > 0 ? val.duration : parseInt(config.duration) || 1e3;
      val = Object.assign(Object.assign({}, val), {
        easing,
        duration
      });
    }
    wrapped = Object.assign(Object.assign({}, wrapped), val);
  } else {
    wrapped = Object.assign(Object.assign({}, wrapped), {
      val
    });
  }
  return wrapped;
}

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/Animation.js
var now = () => Date.now();
var msPerFrame = 1e3 / 60;
var Animation = class extends Event {
  constructor() {
    let props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    let config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super();
    this._props = Object.assign({}, props);
    this._config = Object.assign({}, config);
    this.initStates();
  }
  _wrapConfig(object, config) {
    config = config && typeof config === "object" ? config : this._config;
    const ret = {};
    for (const key of Object.keys(object)) {
      ret[key] = wrapValue(object[key], config);
    }
    return ret;
  }
  initStates(props, config) {
    props = props && typeof props === "object" ? props : this._props;
    config = config && typeof config === "object" ? config : this._config;
    const {
      from,
      to
    } = props;
    this._from = {};
    if (from && typeof from) {
      for (const key of Object.keys(from)) {
        this._from[key] = typeof from[key] === "object" && from[key].val ? from[key].val : from[key];
      }
    }
    this._to = this._wrapConfig(to, config);
    this._delay = parseInt(config.delay) || 0;
    const currentStyle = this._from && stripStyle(this._from) || stripStyle(this._to);
    const currentVelocity = mapToZero(currentStyle);
    this._currentStyle = Object.assign({}, currentStyle);
    this._currentVelocity = Object.assign({}, currentVelocity);
    this._lastIdealStyle = Object.assign({}, currentStyle);
    this._lastIdealVelocity = Object.assign({}, currentVelocity);
    this.resetPlayStates();
    this._frameCount = 0;
    this._prevTime = 0;
  }
  animate() {
    if (this._timer != null) {
      return;
    }
    this._timer = requestAnimationFrame((timestamp) => {
      const nowTime = now();
      if (shouldStopAnimation(this._currentStyle, this._to, this._currentVelocity, this._startedTime || nowTime, nowTime) || this._ended || this._stopped) {
        if (this._wasAnimating && !this._ended && !this._stopped) {
          this._timer = setTimeout(() => {
            clearTimeout(this._timer);
            this._timer = null;
            this._ended = true;
            this.emit("rest", this.getCurrentStates());
          }, msPerFrame);
        }
        this.resetPlayStates();
        return;
      }
      if (!this._started) {
        this._started = true;
        this.emit("start", this.getCurrentStates());
      }
      this._stopped = false;
      this._paused = false;
      this._wasAnimating = true;
      if (this._startedTime === 0) {
        this._startedTime = nowTime;
      }
      const currentTime = nowTime;
      const timeDelta = currentTime - this._prevTime;
      this._prevTime = currentTime;
      if (currentTime - this._startedTime < this._delay) {
        this._timer = null;
        this.animate();
      }
      const newLastIdealStyle = {};
      const newLastIdealVelocity = {};
      const newCurrentStyle = {};
      const newCurrentVelocity = {};
      const toKeys = this._to && Object.keys(this._to) || [];
      for (const key of toKeys) {
        const styleValue = this._to[key];
        this._accumulatedTime[key] = typeof this._accumulatedTime[key] !== "number" ? timeDelta : this._accumulatedTime[key] + timeDelta;
        const from = this._from[key] != null && typeof this._from[key] === "object" ? this._from[key].val : this._from[key];
        const to = styleValue.val;
        if (typeof styleValue === "number") {
          newCurrentStyle[key] = styleValue;
          newCurrentVelocity[key] = 0;
          newLastIdealStyle[key] = styleValue;
          newLastIdealVelocity[key] = 0;
        } else {
          let newLastIdealStyleValue = this._lastIdealStyle[key];
          let newLastIdealVelocityValue = this._lastIdealVelocity[key];
          if (shouldUseBezier(this._config) || shouldUseBezier(styleValue)) {
            const {
              easing,
              duration
            } = styleValue;
            newLastIdealStyleValue = from + easing((currentTime - this._startedTime) / duration) * (to - from);
            if (currentTime >= this._startedTime + duration) {
              newLastIdealStyleValue = to;
              styleValue.done = true;
            }
            newLastIdealStyle[key] = newLastIdealStyleValue;
            newCurrentStyle[key] = newLastIdealStyleValue;
          } else if (to != null && to === this._currentStyle[key]) {
            newCurrentStyle[key] = to;
            newCurrentVelocity[key] = 0;
            newLastIdealStyle[key] = to;
            newLastIdealVelocity[key] = 0;
          } else {
            const currentFrameCompletion = (this._accumulatedTime[key] - Math.floor(this._accumulatedTime[key] / msPerFrame) * msPerFrame) / msPerFrame;
            const framesToCatchUp = Math.floor(this._accumulatedTime[key] / msPerFrame);
            for (let i = 0; i < framesToCatchUp; i++) {
              [newLastIdealStyleValue, newLastIdealVelocityValue] = stepper(msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.tension, styleValue.friction, styleValue.precision);
            }
            const [nextIdealX, nextIdealV] = stepper(msPerFrame / 1e3, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.tension, styleValue.friction, styleValue.precision);
            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
            newLastIdealStyle[key] = newLastIdealStyleValue;
            newLastIdealVelocity[key] = newLastIdealVelocityValue;
            this._accumulatedTime[key] -= framesToCatchUp * msPerFrame;
          }
        }
      }
      this._timer = null;
      this._currentStyle = Object.assign({}, newCurrentStyle);
      this._currentVelocity = Object.assign({}, newCurrentVelocity);
      this._lastIdealStyle = Object.assign({}, newLastIdealStyle);
      this._lastIdealVelocity = Object.assign({}, newLastIdealVelocity);
      if (!this._destroyed) {
        this.emit("frame", this.getCurrentStates());
        this.animate();
      }
    });
  }
  start() {
    this._prevTime = now();
    this._startedTime = now();
    this.animate();
  }
  end() {
    if (!this._ended) {
      this._ended = true;
      this._currentStyle = this.getFinalStates();
      this.emit("frame", this.getFinalStates());
      this.emit("rest", this.getFinalStates());
    }
    this.destroy();
  }
  pause() {
    if (!this._paused) {
      this._pausedTime = now();
      this._paused = true;
      this.emit("pause", this.getCurrentStates());
      this.destroy();
      this._destroyed = false;
    }
  }
  resume() {
    if (this._started && this._paused) {
      const nowTime = now();
      const pausedDuration = nowTime - this._pausedTime;
      this._paused = false;
      this._startedTime += pausedDuration;
      this._prevTime += pausedDuration;
      this._pausedTime = 0;
      this.emit("resume", this.getCurrentStates());
      this.animate();
    }
  }
  stop() {
    this.destroy();
    if (!this._stopped) {
      this._stopped = true;
      this.emit("stop", this.getInitialStates());
      this.initStates();
    }
  }
  destroy() {
    cancelAnimationFrame(this._timer);
    clearTimeout(this._timer);
    this._timer = null;
    this._destroyed = true;
  }
  resetPlayStates() {
    this._started = false;
    this._stopped = false;
    this._ended = false;
    this._paused = false;
    this._destroyed = false;
    this._timer = null;
    this._wasAnimating = false;
    this._accumulatedTime = {};
    this._startedTime = 0;
    this._pausedTime = 0;
  }
  reset() {
    this.destroy();
    this.initStates();
  }
  reverse() {
    this.destroy();
    const props = Object.assign({}, this._props);
    const [from, to] = [props.to, props.from];
    props.from = from;
    props.to = to;
    this._props = Object.assign({}, props);
    this.initStates();
  }
  getCurrentStates() {
    return Object.assign({}, this._currentStyle);
  }
  getInitialStates() {
    return Object.assign({}, stripStyle(this._props.from));
  }
  getFinalStates() {
    return Object.assign({}, stripStyle(this._props.to));
  }
};

// node_modules/.pnpm/@douyinfe+semi-animation@2.34.0/node_modules/@douyinfe/semi-animation/lib/es/src/interpolate.js
function interpolate(from, to) {
  let ratio = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let parser = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  let formatter = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
  if (typeof parser === "function") {
    from = parser(from);
    to = parser(to);
  }
  if (typeof from === "string" || typeof from === "number") {
    from = [parseFloat(from)];
  }
  if (typeof to === "string" || typeof to === "number") {
    to = [parseFloat(to)];
  }
  const result = [];
  if (Array.isArray(from) && Array.isArray(to)) {
    from.forEach((fromVal, idx) => {
      fromVal = parseFloat(fromVal);
      const toVal = parseFloat(to[idx]);
      result.push((toVal - fromVal) * ratio + fromVal);
    });
  }
  if (typeof formatter === "function") {
    return formatter(result);
  } else {
    return result;
  }
}
export {
  Animation,
  easingMap,
  events,
  getEasing,
  interpolate,
  presets_default as presets
};
//# sourceMappingURL=@douyinfe_semi-animation.js.map
