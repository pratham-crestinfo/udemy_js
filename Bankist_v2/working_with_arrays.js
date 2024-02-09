function checkDogs(dogsJulia,dogsKate)
{
    const correctedJulia=dogsJulia.slice(1,-2);
    console.log(correctedJulia)
    const combined=correctedJulia.concat(dogsKate);
    combined.forEach((element,index) => {
        if(element>=3)
        console.log(`Dog number ${index+1} is an adult,and is ${element} years old`);
        else
        console.log(`Dog Number ${index+1} is still puppy`)
    });
}
checkDogs([3, 5, 2, 12, 7],[4, 1, 15, 8, 3]);

const dogsKate=  [5, 2, 4, 1, 15, 8, 3];
const dogsJulia =  [16, 6, 10, 5, 6, 1, 4];
const calcAverageHumanAge = function(ages){
    const human=ages.map(function(value,index,arr)
    {
        if(value<=2)
        {
            return 2*value
        }
        else
        {
            return 16+value*4;
        }
    })
    return human;
}
console.log(calcAverageHumanAge(dogsJulia));

const excludedogs = function(ages)
{
    const filtered = ages.filter(function(value,index,arr)
    {
        if(value >= 18)
        return value;
    })
    return filtered;
}
console.log(dogsJulia.length)
console.log(excludedogs(dogsJulia));

const humanAvg = function(ages)
{
    const total=ages.reduce(function(acc,value,index,array)
    {
        return acc+value;
    },0);
    return total/ages.length;
}
console.log(humanAvg(excludedogs(calcAverageHumanAge(dogsJulia))));

function bychain(ages)
{
    const total= ages.map((val,index,array)=> val<=2?(2*val):(16+val*4))
    .filter((val)=>val>=18)
    .reduce((acc,val)=>acc+val,0);
    return total/ages.length;
}
console.log(bychain(dogsJulia));

const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
    { weight: 32, curFood: 340, owners: ['Michael'] },
    ];

dogs.forEach((curr,index,array)=>
{
    dogs[index].recommendedFood=dogs[index].weight ** 0.75 * 28;
})
console.log(dogs);

function eats(dog)
{
    if(dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10))
{   
    //  console.log("eats okay");
     return 0;
}    else if(dog.recommendedFood < dog.curFood)
{  
    //   console.log("eats Too much");
      return -1;
}    else
{
        // console.log("eats Too less");
    return 1;
}}


// const sarah_dog = eats(dogs.find((dog)=>dog.owners.includes("Sarah")));

let ownersEatTooMuch =[];
let ownersEatTooLittle =[];

dogs.forEach((dog)=>{
    if(eats(dog)==-1)
    {
        ownersEatTooMuch.push(dog.owners);
    }
    if(eats(dog)==1)
    ownersEatTooLittle.push(dog.owners);
})
let s="";
const much = ownersEatTooMuch.flat().join(" and ").concat("'s dogs eat Too much food");
const less= ownersEatTooLittle.flat().join(" and ").concat("'s dogs eat Too Little food");
console.log(less);
console.log(much);

console.log(dogs.some((dog)=>dog.curFood==dog.recommendedFood));
console.log(dogs.some((dog)=>eats(dog)==0))
const okaydogs= dogs.filter((val,index,array)=>eats(val)==0);
console.log(okaydogs);

console.log(dogs.slice().sort((a,b)=>a.recommendedFood-b.recommendedFood));s
// const little= ownersEatTooLittle.flat();
// console.log(ownersEatTooMuch.flat());
// console.log(ownersEatTooLittle);

// console.log(ownersEatTooMuch.forEach(()))

