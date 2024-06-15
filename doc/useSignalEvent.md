[**@catsums/signal-event-bus**](README.md) • **Docs**

***

[@catsums/signal-event-bus](modules.md) / useSignalEvent

# useSignalEvent

## Variables

### SignalEvent

> `const` **SignalEvent**: `object`

#### Type declaration

##### emit()

> **emit**: \<`T`\>(`event`, `data`?, `signalBus`) => `void` = `emitSignalEvent`

###### Type parameters

• **T**

###### Parameters

• **event**: `string`

• **data?**: `T`

• **signalBus?**: [`SignalEventBus`](SignalEvents.md#signaleventbus)= `SignalEventBus.Global`

###### Returns

`void`

##### off()

> **off**: (`event`, `handler`, `signalBus`) => \{ on: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; off: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; emit: \<T\>(event: string, data?: T, signalBus?: SignalEventBus) =\> void; \} = `OffSignalEvent`

###### Parameters

• **event**: `string`

• **handler**: [`Handler`](SignalEvents.md#handlert)

• **signalBus**: [`SignalEventBus`](SignalEvents.md#signaleventbus)= `SignalEventBus.Global`

###### Returns

\{ on: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; off: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; emit: \<T\>(event: string, data?: T, signalBus?: SignalEventBus) =\> void; \}

##### on()

> **on**: (`event`, `handler`, `signalBus`) => \{ on: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; off: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; emit: \<T\>(event: string, data?: T, signalBus?: SignalEventBus) =\> void; \} = `OnSignalEvent`

###### Parameters

• **event**: `string`

• **handler**: [`Handler`](SignalEvents.md#handlert)

• **signalBus**: [`SignalEventBus`](SignalEvents.md#signaleventbus)= `SignalEventBus.Global`

###### Returns

\{ on: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; off: (event: string, handler: Handler, signalBus?: SignalEventBus) =\> ...; emit: \<T\>(event: string, data?: T, signalBus?: SignalEventBus) =\> void; \}

#### Source

src/useSignalEvent.ts:4

## Functions

### SignalEventListener()

> **SignalEventListener**(`__namedParameters`): `FunctionComponentElement`\<`object`\>

This treats the signalbus as a component which can be placed anywhere in any other component to listen to events

#### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters.handler**: [`Handler`](SignalEvents.md#handlert)

• **\_\_namedParameters.on?**: `string`= `""`

• **\_\_namedParameters.signalBus?**: [`SignalEventBus`](SignalEvents.md#signaleventbus)= `SignalEventBus.Global`

#### Returns

`FunctionComponentElement`\<`object`\>

A component that can be placed in the application, which does not render anything on the DOM.

##### children?

> `optional` **children**: `ReactNode`

#### Example

Here is how to trigger the count state of any component that has a listener to a count event

```tsx

	function onClick(){
		SignalEventBus.Global.emit("count");
	}

	//button on click does not need to know about the component its in
	function Btn(){
		return (
			<button onClick={onClick}>
				Count
			</button>
		)
	}

	function Comp(){
		let [count, setCount] = useState(0);

		//only counts up by listening to "count" event, regardless of what triggers it
		function onCount(){
			setCount(count+1);
		}

		return (
			<div>
				<SignalEventListener handler={onCount}/>
				<div>Count: {count}</div>
				<Btn/>
			</div>
		)
	}
	function Comp2(){
		let [count, setCount] = useState(0);

		//this will be triggered too
		function onCount(){
			setCount(count+1);
		}

		return (
			<div>
				<SignalEventListener handler={onCount}/>
				<div>Count: {count}</div>
			</div>
		)
	}

```

#### Source

src/useSignalEvent.ts:187

***

### useSignalEvent()

#### useSignalEvent(event, handler, signalBus)

> **useSignalEvent**(`event`, `handler`, `signalBus`?): `void`

A React hook that lets you subscribe a listener to a event on mount and unsubscribes the event on unmount.
It allows you to subscribe to a specific SignalEventBus as well, giving you more control.

##### Parameters

• **event**: `string`

An event that is meant to be subscribed to

• **handler**: [`Handler`](SignalEvents.md#handlert)

A listener that will run when the event is emitted.

• **signalBus?**: [`SignalEventBus`](SignalEvents.md#signaleventbus)

Optional SignalEventBus that will handle the signal emitting. If not specified, you can use the Global event bus.

##### Returns

`void`

##### Example

Here is how to trigger the count state of any component that has a listener to a count event

```tsx

	function onClick(){
		SignalEventBus.Global.emit("count");
	}

	//button on click does not need to know about the component its in
	function Btn(){
		return (
			<button onClick={onClick}>
				Count
			</button>
		)
	}

	function Comp(){
		let [count, setCount] = useState(0);

		//only counts up by listening to "count" event, regardless of what triggers it
		useSignalEvent("count", ()=>{
			setCount(count + 1);
		})

		return (
			<div>
				<div>Count: {count}</div>
				<Btn/>
			</div>
		)
	}
	function Comp2(){
		let [count, setCount] = useState(0);

		//this will be triggered too
		useSignalEvent("count", ()=>{
			setCount(count + 1);
		})

		return (
			<div>
				<div>Count: {count}</div>
			</div>
		)
	}

```

##### Source

src/useSignalEvent.ts:72

#### useSignalEvent(events, handler, signalBus)

> **useSignalEvent**(`events`, `handler`, `signalBus`?): `void`

##### Parameters

• **events**: `string`[]

• **handler**: [`Handler`](SignalEvents.md#handlert)

• **signalBus?**: [`SignalEventBus`](SignalEvents.md#signaleventbus)

##### Returns

`void`

##### Source

src/useSignalEvent.ts:73

#### useSignalEvent(handler, signalBus)

> **useSignalEvent**(`handler`, `signalBus`?): `void`

##### Parameters

• **handler**: [`Handler`](SignalEvents.md#handlert)

• **signalBus?**: [`SignalEventBus`](SignalEvents.md#signaleventbus)

##### Returns

`void`

##### Source

src/useSignalEvent.ts:74
