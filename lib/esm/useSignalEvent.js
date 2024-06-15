var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import React, { useEffect } from "react";
import { SignalEventBus } from "./SignalEvents";
const SignalEvent = {
  on: OnSignalEvent,
  off: OffSignalEvent,
  emit: emitSignalEvent
};
function useSignalEvent(...args) {
  let events;
  let handler;
  let signalBus = SignalEventBus.Global;
  if (args[0] instanceof Function) {
    let [h, s] = args;
    events = [""];
    handler = h;
    if (s instanceof SignalEventBus)
      signalBus = s;
  } else if (args[0] instanceof Array) {
    let [ev, h, s] = args;
    events = ev;
    handler = h;
    if (s instanceof SignalEventBus)
      signalBus = s;
  } else {
    let [ev, h, s] = args;
    events = [ev];
    handler = h;
    if (s instanceof SignalEventBus)
      signalBus = s;
  }
  useEffect(() => {
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
function emitSignalEvent(event, data, signalBus = SignalEventBus.Global) {
  signalBus.emit(event, data);
}
__name(emitSignalEvent, "emitSignalEvent");
function OnSignalEvent(event, handler, signalBus = SignalEventBus.Global) {
  useSignalEvent(event, handler, signalBus);
  return SignalEvent;
}
__name(OnSignalEvent, "OnSignalEvent");
function OffSignalEvent(event, handler, signalBus = SignalEventBus.Global) {
  signalBus.off(event, handler);
  return SignalEvent;
}
__name(OffSignalEvent, "OffSignalEvent");
function SignalEventListener({ on = "", handler, signalBus = SignalEventBus.Global }) {
  useSignalEvent(on, handler, signalBus);
  return React.createElement(React.Fragment);
}
__name(SignalEventListener, "SignalEventListener");
export {
  SignalEvent,
  SignalEventListener,
  useSignalEvent
};
