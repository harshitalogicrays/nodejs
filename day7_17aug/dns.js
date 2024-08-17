import dns from 'dns'
// dns.lookup("google.com",(err,address,family)=>{
//     console.log(`IP address ${address} ${family}`)
// })

// dns.resolve('google.com','A',(err,addresses)=>{
//     if(err) throw err
//     console.log(addresses)
// })

// dns.resolveMx('google.com',(err,addresses)=>{
//     if(err) throw err
//     console.log(addresses)
// })

// dns.reverse("2404:6800:4009:813::200e",(err,hostname)=>{
//     console.log(`${hostname}`)
// })

dns.reverse("93.184.216.34",(err,hostname)=>{
    console.log(`${hostname}`)
})


