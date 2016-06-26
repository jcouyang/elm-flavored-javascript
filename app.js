import {h} from './vdom.js'
import Type from 'union-type'

// MODEL
const {Model} = Type({Model: {
  count: Number,
}});
const model= Model(0)

// ACTION
const Action = Type({
  Inc: [],
  Dec: [],
});

const update = (model, action) =>
        Action.case({
          Inc: () => Model(model.count+1),
          Dec: () => Model(model.count-1),
          _: ()=>model,
        }, action);

// VIEW
function view(address, model) {
  return (
    h('div', {}, [
      h('button', {on: {click: address(Action.Dec())}}, '-'),
      model.count,
      h('button', {on: {click: address(Action.Inc())}}, '+'),
    ])
  )
}

export {model, update, view };
