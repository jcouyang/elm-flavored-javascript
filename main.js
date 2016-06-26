import {model, update, view} from './app.js'
import {patch} from './vdom.js'
import flyd from 'flyd'

function mailbox() {
  let stream = flyd.stream();
  return {
    address: action=>()=>stream(action),
    signal: stream,
  }
}

function start(model, update, view){
  let container = document.getElementById('content');
  const actions = mailbox();
  const models =flyd.scan(update, model, actions.signal);
  const main = flyd.on(model=>{
    container = patch(container, view(actions.address, model))
  }, models);
}

start(model, update, view);
