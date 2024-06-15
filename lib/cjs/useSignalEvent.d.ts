import React from "react";
import { EventType, Handler, SignalEventBus } from "./SignalEvents";
export declare const SignalEvent: {
    on: typeof OnSignalEvent;
    off: typeof OffSignalEvent;
    emit: typeof emitSignalEvent;
};
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
export declare function useSignalEvent(event: EventType, handler: Handler, signalBus?: SignalEventBus): void;
export declare function useSignalEvent(events: EventType[], handler: Handler, signalBus?: SignalEventBus): void;
export declare function useSignalEvent(handler: Handler, signalBus?: SignalEventBus): void;
declare function emitSignalEvent<T>(event: EventType, data?: T, signalBus?: SignalEventBus): void;
declare function OnSignalEvent(event: EventType, handler: Handler, signalBus?: SignalEventBus): {
    on: typeof OnSignalEvent;
    off: typeof OffSignalEvent;
    emit: typeof emitSignalEvent;
};
declare function OffSignalEvent(event: EventType, handler: Handler, signalBus?: SignalEventBus): {
    on: typeof OnSignalEvent;
    off: typeof OffSignalEvent;
    emit: typeof emitSignalEvent;
};
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
export declare function SignalEventListener({ on, handler, signalBus }: {
    on?: EventType;
    handler: Handler;
    signalBus?: SignalEventBus;
}): React.FunctionComponentElement<{
    children?: React.ReactNode;
}>;
export {};
