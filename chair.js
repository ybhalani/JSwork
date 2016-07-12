/**
 * Created by Bhalani on 2/10/2016.
 */

var findLastSurvivingChair = function(noOfChairs) {
    noOfChairs = noOfChairs || 100;

    //create an empty chair array
    var chairArray = [];

    // loop from 1 to number of chairs (100) to create array of chairs #1 - #100
    for (var i = 1; i <= noOfChairs; i++) {
        chairArray.push(i);
    }

    // Skip starts at 1 and increments by 1 each time a chair is removed
    // Continue to remove chairs in while loop until chair array contains one lone surviving chair
    var currentIndex = 0;
    var skip = 0;
    while (chairArray.length > 1) {
        chairArray.splice(currentIndex, 1);
        skip += 1;
        currentIndex += skip;

        //if current index becomes greater than number of remaining chairs,
        //then set current index to remainder from current index / number of chairs
        currentIndex %= chairArray.length;
    }

    return chairArray[0];

};
