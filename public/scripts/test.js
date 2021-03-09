const arr = [1,2,2,3,4,2,4,2,1];
const result = [];

arr.sort(function(a, b){

  return a - b;
  });

for (let i = 0; i < arr.length; i++){

  let hit = false;

    for (let j = i + 1; j < arr.length; j++) {

      if(arr[i] === arr[j]) {

        hit = true;
      }
    }

    if(!hit) {
      result.push(arr[i]);
    }
}



const bundleCartItems = (array, value) => {

  let counter = 0;
  for (const item of array) {

    if (item === value){
      counter++;
    }
  }

  return counter;
}


for (const res of result) {

  let quantity = bundleCartItems(arr, res);

  console.log(`${res} === ${quantity}`);

}

