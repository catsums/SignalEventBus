[**@catsums/signal-event-bus**](README.md) • **Docs**

***

[@catsums/signal-event-bus](modules.md) / SignalEvents

# SignalEvents

## Classes

### SignalEventBus

SignalEventBus

An object that can emit event signals to functions that act as listeners.
This makes use of the `EventTarget` interface allows one to add event listeners, but this simplifies the process.
This can be used inside and outside of elements and components such that you can manage states of objects from anywhere.

It also comes with a singleton where you can subscribe to global events called `SignalEventBus.Global`.

#### Examples

Here's how to create a signalbus and use it in a normal function:

```tsx

//// signal.ts
//create signalbus and export it
export let trigger = new SignalEventBus();

function onTrigger(){
		console.log("triggered signal");
}
function onShoutEvent(count){
		console.log(`SHOUT! (count: ${count})`);
}

//subscribe listener to trigger (which is a nameless event)
trigger.on(onTrigger);

//subscribe listener to event called "shout"
trigger.on("shout", onShoutEvent);

//// main.ts

//import the trigger signalbus from te file it was created
import { trigger } from "./signal"

let shoutCount = 0;
setInterval(()=>{
		//emit nameless event
		trigger.emit();
		
		shoutCount++;
		if(shoutCount > 10){
			//emit "shout" event with a passed parameter
			trigger.emit("shout", shoutCount);
		}
}, 1000)
```

Here's how to use it in a React component, where you can trigger the 
signal from the child component to close the parent component:

```tsx

let closeSignal = new SignalEventBus();

function ChildComponent(){
		return (
			<button onClick={()=>{
				closeSignal.emit("close");
			}}>Click to close</button>
		)
}

function ParentComponent(){
		let [open, setOpen] = useState(true);

		function onCloseEvent(){
			setOpen(false);
		}

		useEffect(()=>{
			//onmount, subscribe to signal
			closeSignal.on("close", onCloseEvent);

			return ()=>{
				//onunmount, unsubscribe to signal
				closeSignal.off("close", onCloseEvent);
			}
		})

		return (
			<div>
				<div>Alert! You have a notification</div>
				<ChildComponent/>
			</div>
		)
}

```

#### Constructors

##### new SignalEventBus()

> **new SignalEventBus**(): [`SignalEventBus`](SignalEvents.md#signaleventbus)

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

###### Source

[src/SignalEvents.ts:117](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L117)

#### Properties

##### handlers

> `protected` **handlers**: [`HandlerList`](SignalEvents.md#handlerlist)

###### Source

[src/SignalEvents.ts:115](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L115)

##### listener

> `protected` **listener**: `EventTarget`

###### Source

[src/SignalEvents.ts:112](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L112)

##### signals

> `protected` **signals**: [`EventList`](SignalEvents.md#eventlist)

###### Source

[src/SignalEvents.ts:114](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L114)

##### \_singleton

> `static` `protected` **\_singleton**: [`SignalEventBus`](SignalEvents.md#signaleventbus)

###### Source

[src/SignalEvents.ts:104](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L104)

#### Accessors

##### Global

> `get` `static` **Global**(): [`SignalEventBus`](SignalEvents.md#signaleventbus)

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

###### Source

[src/SignalEvents.ts:105](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L105)

#### Methods

##### emit()

###### emit(events, data)

> **emit**\<`T`\>(`events`, `data`?): `boolean`

Emits a signal event to any listeners subscribed to the signal bus.

###### Type parameters

• **T** = `any`

###### Parameters

• **events**: `string`[]

List of events to emit at the same time

• **data?**: `T`

The data to send to the listeners from those events

###### Returns

`boolean`

Returns true if the event exists and any listeners have received the signal.

###### Source

[src/SignalEvents.ts:131](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L131)

###### emit(event, data)

> **emit**\<`T`\>(`event`, `data`?): `boolean`

Emits a signal event to any listeners subscribed to the signal bus for that event.

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

• **data?**: `T`

The data to send to the listeners from those events

###### Returns

`boolean`

Returns true if the event exists and any listeners have received the signal.

###### Source

[src/SignalEvents.ts:141](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L141)

###### emit()

> **emit**\<`T`\>(): `boolean`

Emits a nameless signal event to any listeners subscribed to the signal bus for that event.

###### Type parameters

• **T** = `any`

###### Returns

`boolean`

Returns true if the event exists and any listeners have received the signal.

###### Source

[src/SignalEvents.ts:147](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L147)

##### off()

###### off(event, handler)

> **off**\<`T`\>(`event`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Unsubscribes a listener function from a list of events, which won't be triggered when the events are emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`[]

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:301](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L301)

###### off(event, handler)

> **off**\<`T`\>(`event`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Unsubscribes a listener function from an event, which won't be triggered when the event is emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

The event meant to be unsubscribed from

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:312](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L312)

###### off(handler)

> **off**\<`T`\>(`handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Unsubscribes a listener function from a nameless event, which won't be triggered when the event is emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:321](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L321)

##### offAll()

###### offAll(event)

> **offAll**(`event`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Unsubscribes all listener functions from an event, which won't be triggered when the event is emitted.

###### Parameters

• **event**: `string`

An event meant to be unsubscribed from

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:349](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L349)

###### offAll(events)

> **offAll**(`events`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Unsubscribes all listener functions from a list of events, which won't be triggered when the events are emitted.

###### Parameters

• **events**: `string`[]

List of events meant to be unsubscribed from

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:358](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L358)

##### on()

###### on(events, handler)

> **on**\<`T`\>(`events`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to the list of events, which can be triggered when any of the events are emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **events**: `string`[]

List of events meant to be subscribed to

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:251](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L251)

###### on(event, handler)

> **on**\<`T`\>(`event`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to a specific event, which can be triggered when the event is emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

The event meant to be subscribed to

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:262](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L262)

###### on(handler)

> **on**\<`T`\>(`handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to a nameless event, which can be triggered when the event is emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:271](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L271)

##### once()

###### once(events, handler)

> **once**\<`T`\>(`events`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to the list of events but only handles it once when emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **events**: `string`[]

List of events meant to be subscribed to

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalEventBus object which can be chained.

###### Source

[src/SignalEvents.ts:192](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L192)

###### once(event, handler)

> **once**\<`T`\>(`event`, `handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to an event but only handles it once when emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:203](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L203)

###### once(handler)

> **once**\<`T`\>(`handler`): [`SignalEventBus`](SignalEvents.md#signaleventbus)

Subscribes a listener function to a nameless event but only handles it once when emitted.

###### Type parameters

• **T** = `any`

###### Parameters

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

The handler function which can optionally accept data.

###### Returns

[`SignalEventBus`](SignalEvents.md#signaleventbus)

The SignalBusEvent object which can be chained.

###### Source

[src/SignalEvents.ts:212](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L212)

##### send()

> **send**\<`T`\>(`data`?): `boolean`

Emits a nameless signal event to any listeners subscribed to the nameless event

###### Type parameters

• **T** = `any`

###### Parameters

• **data?**: `T`

Any data meant to be passed to those listeners

###### Returns

`boolean`

Returns true if any listeners have received the signal.

###### Source

[src/SignalEvents.ts:174](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L174)

##### subscribe()

> `protected` **subscribe**\<`T`\>(`event`, `handler`): `void`

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

###### Returns

`void`

###### Source

[src/SignalEvents.ts:373](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L373)

##### unsubscribe()

> `protected` **unsubscribe**\<`T`\>(`event`, `handler`): `void`

###### Type parameters

• **T** = `any`

###### Parameters

• **event**: `string`

• **handler**: [`Handler`](SignalEvents.md#handlert)\<`T`\>

###### Returns

`void`

###### Source

[src/SignalEvents.ts:384](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L384)

##### unsubscribeAll()

> `protected` **unsubscribeAll**(`event`): `void`

###### Parameters

• **event**: `string`

###### Returns

`void`

###### Source

[src/SignalEvents.ts:390](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L390)

## Type Aliases

### EventList

> **EventList**: `Map`\<[`EventType`](SignalEvents.md#eventtype), [`HandlerList`](SignalEvents.md#handlerlist)\>

#### Source

[src/SignalEvents.ts:3](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L3)

***

### EventType

> **EventType**: `string`

#### Source

[src/SignalEvents.ts:2](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L2)

***

### Handler()\<T\>

> **Handler**\<`T`\>: (`d`) => `void`

#### Type parameters

• **T** = `any`

#### Parameters

• **d**: `T`

#### Returns

`void`

#### Source

[src/SignalEvents.ts:6](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L6)

***

### HandlerList

> **HandlerList**: `Map`\<`Function`, `EventListener`\>

#### Source

[src/SignalEvents.ts:4](https://github.com/catsums/SignalEventBus/blob/cf0d0203d904b66d71787de2674a1fa1d0796f15/src/SignalEvents.ts#L4)
