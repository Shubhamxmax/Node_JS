const fs= require('fs')

// Sync...
// fs.writeFileSync('./test.txt','Hello World, there')

 // ASync...
//  fs.writeFile('./test.txt','Hello World, there',(err)=>{}) // (err)=>{} parameter pass must in async operation
//Async fs.writeFile() override the test.txt file created by fs.writeFileSync()


// Sync...
//  const res=fs.readFileSync('./contacts.txt',"utf-8")
//  console.log(res)

  // ASync...
//  fs.readFile('./contacts.txt',"utf-8", (err, result)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log(result)
//  }) 

// Remember we need argument for async operation

 fs.appendFileSync("./test.txt",`\n ${Date.now()} Heee`);

 fs.cpSync("./test.txt","./copy.txt") // to make a copy of file

 fs.unlinkSync("./copy.txt") // to delete a file
 console.log(fs.statSync("./test.txt")) // give the information of the test file
 fs.mkdirSync('my-doc/a',{recursive: true})
