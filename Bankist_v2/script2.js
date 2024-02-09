

/////////////////////////////////////////////////

// slice 
// does not mutate the original array
// if provide negative param then subtract it from array length and will get the actual arrayindex
// in case of 2 params last param i.e index stated will not be included  but tilll that will be included
let arr=[5,2,7,6,4,1];
console.log(arr);
console.log(arr.slice(2));
console.log(arr.slice(1,3));
console.log(arr.slice(-3)); //6-3=3
console.log(arr.slice(2,-1));
console.log(arr);

//splice
// it mutates the original array
//works exactly as slice till just one argument is passsed elseway in second param wiil be added to first param and that indexes will be removed

console.log(arr.splice(3));
console.log(arr);
console.log(arr.splice(1,2)) // 1+2=3  // indexes 1 and 2 will be removed
console.log(arr);

//concat
// do not mutate the aoriginal one
arr=["a","b","c","d","e"];
let arr2=["f","g","h","i"];
console.log(arr.concat(arr2));
console.log(arr);

//reverse
//mutates the original one
console.log(arr.reverse());
console.log(arr);

// join
//does not mutate the original one
console.log(arr.join("-"));
console.log(arr);


//at methd  -- also supports negative indexes
console.log(arr.at(0));   
console.log(arr.at(-1));   


//ForEach loop    
// you can access array index in foreach in call back function's argument and make sure the order of that as 1. element 2.index 3.array itself
// foreach loop doesn't allow break and continue -- IMP
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function(movement,index,array){
  if(movement>0)
  console.log(`${index}: you deposited ${movement}`);
  else
console.log(`${index}: you withdrew ${Math.abs(movement)}`)
})

//forof
for(const [i,movement] of movements.entries())
{
  console.log(i,movement);
}

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

 currencies.forEach(function(value,key,map)
 {
  console.log( `${key}:${value}`);
 })    


 // set doesn't have index or key but inorder to have similarity for all for each has same syntax for sets too and so key value is just useless as it replicates the value
 const myset=new Set(["INR","USD","YEN","EUR","EUR","INR"]);
 console.log(myset);
 myset.forEach(function(value,key,set){
  console.log( `${key}:${value}`);
 })

 //map method
//takes 3 params just as foreach
 const eurotrans=movements.map(function(mov,index,arr){
    return mov*1.1;
 })
 console.log(eurotrans);


 let a = [1,2,22];
 a=new Array(1,2,3);
 a= new Array(5); //one would expect to have array with single element 5 but instead it creates array of 5 empty elements also no methods would be allowed to opertae on that empty array except "fill"
 console.log(a);

//  a.fill(1);
//  a.fill has 3 params p,q,r  => p = value,q = starting index, r=till index
a.fill(2,1,4);
a.fill(1,3); // works just as slice

const b = Array.from({length:7},(curr,i)=>i+1);
console.log(b);

console.log(+"23")
console.log(parseFloat("2.44554efsv"));
console.log(parseInt("22.34"));
console.log(isNaN(Number("2784f")));
console.log(+"23"); 
console.log(isNaN(23/0));
console.log(isNaN("dlnd"));


console.log(isFinite(23/0));
console.log(isFinite("dnvov"));
console.log(isFinite(+"332"));