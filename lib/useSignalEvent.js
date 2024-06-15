"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalEventListener = exports.useSignalEvent = exports.SignalEvent = void 0;
const react_1 = __importStar(require("react"));
const SignalEvents_1 = require("./SignalEvents");
exports.SignalEvent = {
    on: OnSignalEvent,
    off: OffSignalEvent,
    emit: emitSignalEvent,
};
function useSignalEvent(...args) {
    let events;
    // events = useMemo(() => [""], []);
    let handler;
    let signalBus = SignalEvents_1.SignalEventBus.Global;
    if (args[0] instanceof Function) {
        let [h, s] = args;
        events = [""];
        handler = h;
        if (s instanceof SignalEvents_1.SignalEventBus)
            signalBus = s;
    }
    else if (args[0] instanceof Array) {
        let [ev, h, s] = args;
        events = ev;
        handler = h;
        if (s instanceof SignalEvents_1.SignalEventBus)
            signalBus = s;
    }
    else {
        let [ev, h, s] = args;
        events = [ev];
        handler = h;
        if (s instanceof SignalEvents_1.SignalEventBus)
            signalBus = s;
    }
    (0, react_1.useEffect)(() => {
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
exports.useSignalEvent = useSignalEvent;
function emitSignalEvent(event, data, signalBus = SignalEvents_1.SignalEventBus.Global) {
    signalBus.emit(event, data);
}
function OnSignalEvent(event, handler, signalBus = SignalEvents_1.SignalEventBus.Global) {
    useSignalEvent(event, handler, signalBus);
    return exports.SignalEvent;
}
function OffSignalEvent(event, handler, signalBus = SignalEvents_1.SignalEventBus.Global) {
    signalBus.off(event, handler);
    return exports.SignalEvent;
}
/**
 * This treats the signalbus as a component which can be placed anywhere in any other component to listen to events
 * @param props.handler
 * A handler function to run when the event when emitted
 * @param props.on
 * Event meant to be passed. It can be blank for a nameless event
 * @param props.signalBus
 * Optional signalbus that will be used to emit the signals. Defaults to the global signal bus if no signal bus is passed.
 * @returns
 * A component that can be placed in the application, which does not render anything on the DOM.
 *
 * @example
 * Here is how to trigger the count state of any component that has a listener to a count event
 *
 * ```tsx
 *
 * 	function onClick(){
 * 		SignalEventBus.Global.emit("count");
 * 	}
 *
 * 	//button on click does not need to know about the component its in
 * 	function Btn(){
 * 		return (
 * 			<button onClick={onClick}>
 * 				Count
 * 			</button>
 * 		)
 * 	}
 *
 * 	function Comp(){
 * 		let [count, setCount] = useState(0);
 *
 * 		//only counts up by listening to "count" event, regardless of what triggers it
 * 		function onCount(){
 * 			setCount(count+1);
 * 		}
 *
 * 		return (
 * 			<div>
 * 				<SignalEventListener handler={onCount}/>
 * 				<div>Count: {count}</div>
 * 				<Btn/>
 * 			</div>
 * 		)
 * 	}
 * 	function Comp2(){
 * 		let [count, setCount] = useState(0);
 *
 * 		//this will be triggered too
 * 		function onCount(){
 * 			setCount(count+1);
 * 		}
 *
 * 		return (
 * 			<div>
 * 				<SignalEventListener handler={onCount}/>
 * 				<div>Count: {count}</div>
 * 			</div>
 * 		)
 * 	}
 *
 * ```
 */
function SignalEventListener({ on = "", handler, signalBus = SignalEvents_1.SignalEventBus.Global }) {
    useSignalEvent(on, handler, signalBus);
    return (react_1.default.createElement(react_1.default.Fragment));
}
exports.SignalEventListener = SignalEventListener;
