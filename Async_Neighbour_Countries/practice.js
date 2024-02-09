const lpromise=new Promise(function(resolve,reject)
{
    if(Math.random()>=0.3)
    {
        resolve("math is goooood");
    }
    else
    {
        reject("english is good");
    }
})

lpromise.then(res=>console.log(res)).catch(err=>console.log(err))


const wait=function(seconds)
{
    return new Promise(function(resolve){
       resolve(seconds);
    })
}
setInterval(function(seconds)
{
    seconds++;
    wait(seconds).then((res)=>console.log(res));
},1000000)
