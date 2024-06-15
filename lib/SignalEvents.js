"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalEventBus = void 0;
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
class SignalEventBus {
    static _singleton = new SignalEventBus();
    static get Global() {
        if (!this._singleton) {
            this._singleton = new SignalEventBus();
        }
        return this._singleton;
    }
    listener = new EventTarget();
    signals = new Map();
    handlers = new Map();
    constructor() {
    }
    emit(...args) {
        let events = [""];
        let data;
        if (args.length > 0) {
            let [ev, d] = args;
            if (!(ev instanceof Array)) {
                events = [ev];
            }
            else {
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
        }
        else {
            let [ev, h] = args;
            if (!(ev instanceof Array)) {
                events = [ev];
            }
            else {
                events = ev;
            }
            handler = h;
        }
        events.forEach((event) => {
            function oneTime(data) {
                handler(data);
                thisBus.off(event, oneTime);
            }
            this.on(events, oneTime);
        });
        return this;
    }
    on(...args) {
        if (args.length == 1) {
            let [handler] = args;
            this.subscribe("", handler);
        }
        else {
            let events = [];
            let [ev, handler] = args;
            if (!(ev instanceof Array)) {
                events = [ev];
            }
            else {
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
        }
        else {
            let events = [];
            let [ev, handler] = args;
            if (!(ev instanceof Array)) {
                events = [ev];
            }
            else {
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
        }
        else {
            events = ev;
        }
        for (let event of events) {
            this.unsubscribeAll(event);
        }
        return this;
    }
    subscribe(event, handler) {
        let h = (event) => {
            let e = event;
            e.preventDefault();
            e.stopPropagation();
            // e.stopImmediatePropagation();
            handler(e.detail);
        };
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
exports.SignalEventBus = SignalEventBus;
