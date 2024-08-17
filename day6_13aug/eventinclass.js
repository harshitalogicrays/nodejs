// import events from 'events'
// class Person extends events.EventEmitter{}

// const p = new Person()
// p.on('greet',()=>{console.log("Hello Welcome BAck!!!")})

// p.emit('greet')


import {EventEmitter} from 'events'
class Person extends EventEmitter{
    classfun(){
        console.log("classfun called")
        this.emit('greet')
    }
}

const p = new Person()
p.on('greet',()=>{console.log("Hello Welcome BAck!!!")})
p.classfun()

// p.emit('greet')