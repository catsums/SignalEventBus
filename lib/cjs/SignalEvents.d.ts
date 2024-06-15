export type EventType = string;
export type EventList = Map<EventType, HandlerList>;
export type HandlerList = Map<Function, EventListener>;
export type Handler<T = any> = (d: T) => void;
/**
 *
 * @class SignalEventBus
 *
 * An object that can emit event signals to functions that act as listeners.
 * This makes use of the `EventTarget` interface allows one to add event listeners, but this simplifies the process.
 * This can be used inside and outside of elements and components such that you can manage states of objects from anywhere.
 *
 * It also comes with a singleton where you can subscribe to global events called `SignalEventBus.Global`.
 *
 * @example
 * Here's how to create a signalbus and use it in a normal function:
 *
 * ```tsx
 *
 * //// signal.ts
 * //create signalbus and export it
 * export let trigger = new SignalEventBus();
 *
 * function onTrigger(){
 * 		console.log("triggered signal");
 * }
 * function onShoutEvent(count){
 * 		console.log(`SHOUT! (count: ${count})`);
 * }
 *
 * //subscribe listener to trigger (which is a nameless event)
 * trigger.on(onTrigger);
 *
 * //subscribe listener to event called "shout"
 * trigger.on("shout", onShoutEvent);
 *
 * //// main.ts
 *
 * //import the trigger signalbus from te file it was created
 * import { trigger } from "./signal"
 *
 * let shoutCount = 0;
 * setInterval(()=>{
 * 		//emit nameless event
 * 		trigger.emit();
 *
 * 		shoutCount++;
 * 		if(shoutCount > 10){
 * 			//emit "shout" event with a passed parameter
 * 			trigger.emit("shout", shoutCount);
 * 		}
 * }, 1000)
 * ```
 *
 * @example
 * Here's how to use it in a React component, where you can trigger the
 * signal from the child component to close the parent component:
 *
 * ```tsx
 *
 * let closeSignal = new SignalEventBus();
 *
 * function ChildComponent(){
 * 		return (
 * 			<button onClick={()=>{
 * 				closeSignal.emit("close");
 * 			}}>Click to close</button>
 * 		)
 * }
 *
 * function ParentComponent(){
 * 		let [open, setOpen] = useState(true);
 *
 * 		function onCloseEvent(){
 * 			setOpen(false);
 * 		}
 *
 * 		useEffect(()=>{
 * 			//onmount, subscribe to signal
 * 			closeSignal.on("close", onCloseEvent);
 *
 * 			return ()=>{
 * 				//onunmount, unsubscribe to signal
 * 				closeSignal.off("close", onCloseEvent);
 * 			}
 * 		})
 *
 * 		return (
 * 			<div>
 * 				<div>Alert! You have a notification</div>
 * 				<ChildComponent/>
 * 			</div>
 * 		)
 * }
 *
 * ```
 *
 *
 */
declare class SignalEventBus {
    protected static _singleton: SignalEventBus;
    static get Global(): SignalEventBus;
    protected listener: EventTarget;
    protected signals: EventList;
    protected handlers: HandlerList;
    constructor();
    /**
     * Emits a signal event to any listeners subscribed to the signal bus.
     * @param events
     * List of events to emit at the same time
     * @param data
     * The data to send to the listeners from those events
     *
     * @returns
     * Returns true if the event exists and any listeners have received the signal.
     */
    emit<T = any>(events: EventType[], data?: T): boolean;
    /**
     * Emits a signal event to any listeners subscribed to the signal bus for that event.
     * @param events
     * The event to emit
     * @param data
     * The data to send to the listeners from those events
     * @returns
     * Returns true if the event exists and any listeners have received the signal.
     */
    emit<T = any>(event: EventType, data?: T): boolean;
    /**
     * Emits a nameless signal event to any listeners subscribed to the signal bus for that event.
     * @returns
     * Returns true if the event exists and any listeners have received the signal.
     */
    emit<T = any>(): boolean;
    /**
     * Emits a nameless signal event to any listeners subscribed to the nameless event
     * @param data
     * Any data meant to be passed to those listeners
     * @returns
     * Returns true if any listeners have received the signal.
     */
    send<T = any>(data?: T): boolean;
    /**
     * Subscribes a listener function to the list of events but only handles it once when emitted.
     * @param events
     * List of events meant to be subscribed to
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalEventBus object which can be chained.
     */
    once<T = any>(events: EventType[], handler: Handler<T>): SignalEventBus;
    /**
     * Subscribes a listener function to an event but only handles it once when emitted.
     * @param events
     * An event meant to be subscribed to
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    once<T = any>(event: EventType, handler: Handler<T>): SignalEventBus;
    /**
     * Subscribes a listener function to a nameless event but only handles it once when emitted.
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    once<T = any>(handler: Handler<T>): SignalEventBus;
    /**
     * Subscribes a listener function to the list of events, which can be triggered when any of the events are emitted.
     * @param events
     * List of events meant to be subscribed to
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    on<T = any>(events: EventType[], handler: Handler<T>): SignalEventBus;
    /**
     * Subscribes a listener function to a specific event, which can be triggered when the event is emitted.
     * @param event
     * The event meant to be subscribed to
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    on<T = any>(event: EventType, handler: Handler<T>): SignalEventBus;
    /**
     * Subscribes a listener function to a nameless event, which can be triggered when the event is emitted.
     * @param handler
     * The handler function which can optionally accept data.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    on<T = any>(handler: Handler<T>): SignalEventBus;
    /**
     * Unsubscribes a listener function from a list of events, which won't be triggered when the events are emitted.
     * @param events
     * List of events meant to be unsubscribed from
     * @param handler
     * The handler function.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    off<T = any>(event: EventType[], handler: Handler<T>): SignalEventBus;
    /**
     * Unsubscribes a listener function from an event, which won't be triggered when the event is emitted.
     * @param event
     * The event meant to be unsubscribed from
     * @param handler
     * The handler function.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    off<T = any>(event: EventType, handler: Handler<T>): SignalEventBus;
    /**
     * Unsubscribes a listener function from a nameless event, which won't be triggered when the event is emitted.
     * @param handler
     * The handler function.
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    off<T = any>(handler: Handler<T>): SignalEventBus;
    /**
     * Unsubscribes all listener functions from an event, which won't be triggered when the event is emitted.
     * @param event
     * An event meant to be unsubscribed from
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    offAll(event: EventType): SignalEventBus;
    /**
     * Unsubscribes all listener functions from a list of events, which won't be triggered when the events are emitted.
     * @param events
     * List of events meant to be unsubscribed from
     *
     * @returns
     * The SignalBusEvent object which can be chained.
     */
    offAll(events: EventType[]): SignalEventBus;
    protected subscribe<T = any>(event: EventType, handler: Handler<T>): void;
    protected unsubscribe<T = any>(event: EventType, handler: Handler<T>): void;
    protected unsubscribeAll(event: EventType): void;
}
export { SignalEventBus };
