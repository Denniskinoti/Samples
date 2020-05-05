In JavaScript, primitive types like numbers, booleans, and strings are passed by value. This means that when you do something like this:
 //example
let numberOfGuests = 20;

let totalNumberOfGuests = numberOfGuests; // 20
// It is the value 20, which is copied into the new variable, and no link is maintained between the two variables.

//-->This is not the case with objects and arrays, which are passed by reference.<<--
	let artistProfile = {
    name: 'Tau Perkington',
    age: 27,
    available: true
};

let allProfiles = [artistProfile]; // new Array containing the above object

artistProfile.available = false; // changing the object

console.log(allProfiles) // will show { name: 'Tau Perkington', age: 27, available: false }

/*
Even though we created the array and passed it the object before modifying the object, you still see the modification in the array. This is because when using arrays and objects, you are passing references to the objects, as opposed to the value of the data within them. The variables  artistProfile  and  allProfiles  shown above contain references to the object and array in memory.

This can seem a bit tricky to understand, but with practice, you'll get the hang of it!

*/
