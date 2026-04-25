const fs = require('fs')
const crypto=require('crypto')

const start=Date.now()

process.env.UV_THREADPOOL_SIZE = 10 // to change the threadpool size which is by default 4
setTimeout(()=> console.log("Hello this is Timer1"),0)
setImmediate(()=> console.log("Hello this is Shubham Immediate"))


fs.readFile('contacts.txt', 'utf-8', (err,res)=>{
    if(err)
        console.log(err)
    else
        console.log(res)
    setTimeout(()=> console.log("Hello this is Timer2"),0)
    setTimeout(()=> console.log("Hello this is Timer3"),5*1000)

    // CPU intensive Tasks
    crypto.pbkdf2('password1','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 1 Done`)
    })
        crypto.pbkdf2('password2','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 2 Done`)
    })
        crypto.pbkdf2('password3','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 3 Done`)
    })
        crypto.pbkdf2('password4','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 4 Done`)
    })
        crypto.pbkdf2('password5','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 5 Done`)
    })
            crypto.pbkdf2('password5','salt1',100000,1024,'sha512',()=>{
        console.log(`${Date.now() - start}ms Password 6 Done`)
    })
})

console.log("Hello Top Level Code")