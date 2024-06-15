var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var useSignalEvent_exports = {};
__export(useSignalEvent_exports, {
  SignalEvent: () => SignalEvent,
  SignalEventListener: () => SignalEventListener,
  useSignalEvent: () => useSignalEvent
});
module.exports = __toCommonJS(useSignalEvent_exports);
var import_react = __toESM(require("react"));
var import_SignalEvents = require("./SignalEvents");
const SignalEvent = {
  on: OnSignalEvent,
  off: OffSignalEvent,
  emit: emitSignalEvent
};
function useSignalEvent(...args) {
  let events;
  let handler;
  let signalBus = import_SignalEvents.SignalEventBus.Global;
  if (args[0] instanceof Function) {
    let [h, s] = args;
    events = [""];
    handler = h;
    if (s instanceof import_SignalEvents.SignalEventBus)
      signalBus = s;
  } else if (args[0] instanceof Array) {
    let [ev, h, s] = args;
    events = ev;
    handler = h;
    if (s instanceof import_SignalEvents.SignalEventBus)
      signalBus = s;
  } else {
    let [ev, h, s] = args;
    events = [ev];
    handler = h;
    if (s instanceof import_SignalEvents.SignalEventBus)
      signalBus = s;
  }
  (0, import_react.useEffect)(() => {
    for (let event of events) {
      signalBus.on(event, handler);
    }
    return () => {
      for (let event of events) {
        signalBus.off(event, handler);
      }
    };
  }, [events, handler, signalBus]);
}
__name(useSignalEvent, "useSignalEvent");
function emitSignalEvent(event, data, signalBus = import_SignalEvents.SignalEventBus.Global) {
  signalBus.emit(event, data);
}
__name(emitSignalEvent, "emitSignalEvent");
function OnSignalEvent(event, handler, signalBus = import_SignalEvents.SignalEventBus.Global) {
  useSignalEvent(event, handler, signalBus);
  return SignalEvent;
}
__name(OnSignalEvent, "OnSignalEvent");
function OffSignalEvent(event, handler, signalBus = import_SignalEvents.SignalEventBus.Global) {
  signalBus.off(event, handler);
  return SignalEvent;
}
__name(OffSignalEvent, "OffSignalEvent");
function SignalEventListener({ on = "", handler, signalBus = import_SignalEvents.SignalEventBus.Global }) {
  useSignalEvent(on, handler, signalBus);
  return import_react.default.createElement(import_react.default.Fragment);
}
__name(SignalEventListener, "SignalEventListener");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SignalEvent,
  SignalEventListener,
  useSignalEvent
});
