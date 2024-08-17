import events from 'events'
let  em = new events.EventEmitter()

em.on("clickme",(username,pwd)=>{
    console.log(`click me event raised ${username} ${pwd}`)
})

em.on("clickme",()=>{
    console.log("Welcome to LRA")
})

em.emit("clickme","ram",12345)
em.emit("clickme")
em.emit("clickme")