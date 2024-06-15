var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SignalEvents_exports = {};
__export(SignalEvents_exports, {
  SignalEventBus: () => SignalEventBus
});
module.exports = __toCommonJS(SignalEvents_exports);
class SignalEventBus {
  static {
    __name(this, "SignalEventBus");
  }
  static _singleton = new SignalEventBus();
  static get Global() {
    if (!this._singleton) {
      this._singleton = new SignalEventBus();
    }
    return this._singleton;
  }
  listener = new EventTarget();
  signals = /* @__PURE__ */ new Map();
  handlers = /* @__PURE__ */ new Map();
  constructor() {
  }
  emit(...args) {
    let events = [""];
    let data;
    if (args.length > 0) {
      let [ev, d] = args;
      if (!(ev instanceof Array)) {
        events = [ev];
      } else {
        events = ev;
      }
      data = d;
    }
    for (let event of events) {
      let ev = new CustomEvent(event, { detail: data });
      this.listener.dispatchEvent(ev);
    }
    return true;
  }
  send(data) {
    let ev = new CustomEvent("", { detail: data });
    this.listener.dispatchEvent(ev);
    return true;
  }
  once(...args) {
    let thisBus = this;
    let handler;
    let events = [""];
    if (args.length == 1) {
      let [h] = args;
      handler = h;
    } else {
      let [ev, h] = args;
      if (!(ev instanceof Array)) {
        events = [ev];
      } else {
        events = ev;
      }
      handler = h;
    }
    events.forEach((event) => {
      function oneTime(data) {
        handler(data);
        thisBus.off(event, oneTime);
      }
      __name(oneTime, "oneTime");
      this.on(events, oneTime);
    });
    return this;
  }
  on(...args) {
    if (args.length == 1) {
      let [handler] = args;
      this.subscribe("", handler);
    } else {
      let events = [];
      let [ev, handler] = args;
      if (!(ev instanceof Array)) {
        events = [ev];
      } else {
        events = ev;
      }
      for (let event of events) {
        this.subscribe(event, handler);
      }
    }
    return this;
  }
  off(...args) {
    if (args.length == 1) {
      let [handler] = args;
      this.unsubscribe("", handler);
    } else {
      let events = [];
      let [ev, handler] = args;
      if (!(ev instanceof Array)) {
        events = [ev];
      } else {
        events = ev;
      }
      for (let event of events) {
        this.unsubscribe(event, handler);
      }
    }
    return this;
  }
  offAll(...args) {
    let events = [];
    let [ev] = args;
    if (!(ev instanceof Array)) {
      events = [ev];
    } else {
      events = ev;
    }
    for (let event of events) {
      this.unsubscribeAll(event);
    }
    return this;
  }
  subscribe(event, handler) {
    let h = /* @__PURE__ */ __name((event2) => {
      let e = event2;
      e.preventDefault();
      e.stopPropagation();
      handler(e.detail);
    }, "h");
    this.listener.addEventListener(event, h);
    this.handlers.set(handler, h);
  }
  unsubscribe(event, handler) {
    let h = this.handlers.get(handler);
    if (h) {
      this.listener.removeEventListener(event, h);
    }
  }
  unsubscribeAll(event) {
    let handlers = Array.from(this.handlers.values());
    for (let h of handlers) {
      this.listener.removeEventListener(event, h);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SignalEventBus
});
