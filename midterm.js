/**
 * Created by Bhalani on 3/3/2016.
 */
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("midterm", "0.1", "A Database of midterm spring 2016", 1024 * 1024);

    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS survey (id INTEGER PRIMARY KEY ASC, make TEXT, number TEXT)");
    });



} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of survey in the database

function updateCarList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("demo");

    //clear survey list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.color + " - " + row.number + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.id + ");'>Delete Car</a>)";
    }

}

//function to get the list of survey from the database

function outputsurvey() {

    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the survey from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM survey", [], updateCarList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}



function addCar() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the color and number text inputs
        var color = document.getElementById("myColor").value;
        var number = document.getElementById("number").value;

        //Test to ensure that the user has entered both a make and number
        if (color !== "" && number !== "") {
            //Insert the user entered details into the survey table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO survey (color, number) VALUES (?, ?)", [color, number]);
                outputsurvey();
            });
        } else {
            alert("You must enter a color and number!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter

function deleteCar(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the survey from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM survey WHERE id=?", [id], outputsurvey);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputsurvey();