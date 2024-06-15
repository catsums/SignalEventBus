import React, { useEffect } from "react";
import { EventType, Handler, SignalEventBus } from "./SignalEvents";

export const SignalEvent = {
	on: OnSignalEvent,
	off: OffSignalEvent,
	emit: emitSignalEvent,
}

/**
 * A React hook that lets you subscribe a listener to a event on mount and unsubscribes the event on unmount.
 * It allows you to subscribe to a specific SignalEventBus as well, giving you more control.
 * 
 * 
 * @param event 
 * An event that is meant to be subscribed to
 * @param handler
 * A listener that will run when the event is emitted.
 * @param signalBus
 * Optional SignalEventBus that will handle the signal emitting. If not specified, you can use the Global event bus.
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
 * 		useSignalEvent("count", ()=>{
 * 			setCount(count + 1);
 * 		})
 * 
 * 		return (
 * 			<div>
 * 				<div>Count: {count}</div>
 * 				<Btn/>
 * 			</div>
 * 		)
 * 	}
 * 	function Comp2(){
 * 		let [count, setCount] = useState(0);
 * 
 * 		//this will be triggered too
 * 		useSignalEvent("count", ()=>{
 * 			setCount(count + 1);
 * 		})
 * 
 * 		return (
 * 			<div>
 * 				<div>Count: {count}</div>
 * 			</div>
 * 		)
 * 	}
 * 
 * ```
 */
export function useSignalEvent(event:EventType, handler:Handler, signalBus?:SignalEventBus) : void;
export function useSignalEvent(events:EventType[], handler:Handler, signalBus?:SignalEventBus) : void;
export function useSignalEvent(handler:Handler, signalBus?:SignalEventBus) : void;
export function useSignalEvent(...args:any[]){

	let events:EventType[];
	// events = useMemo(() => [""], []);
	let handler:Handler;
	let signalBus:SignalEventBus = SignalEventBus.Global;

	if(args[0] instanceof Function){
		let [h, s] = args as [Handler, SignalEventBus];
		events = [""];
		handler = h;
		if(s instanceof SignalEventBus) signalBus = s;
	}else if(args[0] instanceof Array){
		let [ev, h, s] = args as [EventType[], Handler, SignalEventBus];
		events = ev;
		handler = h;
		if(s instanceof SignalEventBus) signalBus = s;
	}else{
		let [ev, h, s] = args as [EventType, Handler, SignalEventBus];
		events = [ev];
		handler = h;
		if(s instanceof SignalEventBus) signalBus = s;
	}

	useEffect(()=>{
		for(let event of events){
			signalBus.on(event, handler);
		}
		return ()=>{
			for(let event of events){
				signalBus.off(event, handler);
			}
		}
	},[events, handler, signalBus]);
}

function emitSignalEvent<T>(event:EventType, data?:T, signalBus:SignalEventBus=SignalEventBus.Global){
	signalBus.emit(event, data, );
}

function OnSignalEvent(event:EventType, handler:Handler, signalBus:SignalEventBus=SignalEventBus.Global){
	useSignalEvent(event, handler, signalBus);
	return SignalEvent;
}
function OffSignalEvent(event:EventType, handler:Handler, signalBus:SignalEventBus=SignalEventBus.Global){
	signalBus.off(event, handler);
	return SignalEvent;
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
export function SignalEventListener({on="", handler, signalBus=SignalEventBus.Global}:{
	on?: EventType,
	handler: Handler,
	signalBus?: SignalEventBus;
}){

	useSignalEvent(on, handler, signalBus);

	return (
		React.createElement(React.Fragment)
	)
}
