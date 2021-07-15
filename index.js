const fs = require('fs');
const superagentsafs = require('superagent');

//Callback hell

/*fs.readFile(`${__dirname}/data.txt`, (err, data)=>{
    console.log(`Breed: ${data}`);
    superagent
        .get(`https://dog.ceo/api/breed/${data}/images/random`)
      .end((err, res)=>{
    if(err) return console.log(err.message)
    console.log(res.body);
    fs.writeFile('dog-img.text', res.body.message, err=>{
        if(err) return console.log(err.message)
        console.log('Random dog image saved')
    })
})
        // instead of .end
        // .then(res=>{
        //     console.log(res.body);
        //     fs.writeFile('dog-img.text', res.body.message, err=>{
        //         if(err) return console.log(err.message)
        //         console.log('Random dog image saved')
        //     })
        // }).catch(err=>{
        //     console.log(err.message);
        // })     
// })
*/

//Using Promises
const readFilePromise = file =>{
    return new Promise ((resolve, reject)=>{
        fs.readFile(file, (err, data)=>{
            if(err) reject('Could not find file 😥')
            resolve(data)
        })
    })
}

const writeFilePromise = (file, response) =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file, response, err=>{
            if(err) reject('Could not Write file 😥')
            resolve('success')
        })
    })
}
/*
readFilePromise(`${__dirname}/data.txt`)
.then(data=>{
    console.log(`Breed: ${data}`);
    return  superagentsafs
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
}).then(res=>{
    console.log(res.body.message);  
    return writeFilePromise('dog-img.text', res.body.message)
}).then(()=>{
    console.log('Image saved to file')
}).catch(err=>{
    console.log(err.message);
}) 
*/


//Using Async await

const getDogPic = async ()=>{
    try{
        const data= await readFilePromise(`${__dirname}/data.txt`)
        console.log(`Breed: ${data}`);

        const res= await superagentsafs.get(`https://dog.ceo/api/breed/${data}/images/random`)
        console.log(res.body.message);

        await writeFilePromise('dog-img.text', res.body.message)
        console.log('Image saved to file')
    } catch(err){
        console.log(err.message);
    }
}
getDogPic()