**@catsums/signal-event-bus** • [**Docs**](modules.md)

***

# SignalEventBus

A package for adding signal events to your front end code, which can be used in your components or vanilla JS code as a signal handler.

It contains a class called `SignalEventBus` which can be used to subscribe functions to it as handlers and emits data to them if they are listening to the specified event.

It also contains a React hook called `useSignalEvent()` and a component called `<SignalEventListener/>` which can be placed into components to listen to events and handle them. For these components, the events can be listened to from other components and other client based files.

If you have a server component with a SignalEventBus trying to subscribe a function from a client component, this will **not** work unless you import one component into the other.

### `How to use`
Here's how to create a signalbus and use it in a normal function:

```ts

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
import {useState} from "react"
import { SignalEventBus, useSignalEvent } from "@catsums/signal-event-bus"

let closeSignal = new SignalEventBus();

function ChildComponent(){
 function onClick(){
  closeSignal.emit("close");
 }
  return (
   <button onClick={onClick}>Click to close</button>
  )
}

function ParentComponent(){
  let [open, setOpen] = useState(true);

  function onCloseEvent(){
   setOpen(false);
  }

//this allows button in child component to trigger the event to close parent!
  useSignalEvent("close", onCloseEvent, closeSignal);
//you could also do this instead:
 useEffect(()=>{
  closeSignal.on("close", onCloseEvent);
  return () => {
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
