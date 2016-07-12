/**
 * Created by Bhalani on 2/5/2016.
 */
if (window.openDatabase) {
    //Create the database the parameters are 1. the database name 2.version number 3. a description 4. the size of the database (in bytes) 1024 x 1024 = 1MB
    var mydb = openDatabase("finalregform_db", "0.1", "A Database of Registration form", 5 * 1024 * 1024);

    //create the cars table using SQL for the database using a transaction

    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS forms (id INTEGER PRIMARY KEY ASC, firstname TEXT, lastname TEXT, email TEXT, password TEXT, company TEXT, website TEXT, position TEXT, phone TEXT, service TEXT,serviceorproduct VARCHAR, looking TEXT, field_terms TEXT)");

    });



} else {
    alert("WebSQL is not supported by your browser!");
}

//function to output the list of cars in the database

function updateFormList(transaction, results) {
    //initialise the listitems variable
    var listitems = "";
    //get the car list holder ul
    var listholder = document.getElementById("formlist");

    //clear cars list ul
    listholder.innerHTML = "";

    var i;
    //Iterate through the results
    for (i = 0; i < results.rows.length; i++) {
        //Get the current row
        var row = results.rows.item(i);

        listholder.innerHTML += "<li><span><br><h4>FULL NAME:&nbsp&nbsp</h4>" + row.firstname + "&nbsp" + row.lastname + "<br><h4> EMAIL:&nbsp&nbsp&nbsp&nbsp</h4>" + row.email + "<br><h4> PASSWORD:&nbsp&nbsp&nbsp&nbsp</h4>" + row.password + "<br><h4> COMPANY:&nbsp&nbsp&nbsp&nbsp</h4>" + row.company + "<br><h4> WEBSITE:&nbsp&nbsp&nbsp&nbsp</h4>"+ row.website + "<br><h4> POSITION:&nbsp&nbsp&nbsp&nbsp</h4>" + row.position + "<br><h4> Phone#:&nbsp&nbsp&nbsp&nbsp</h4>" + row.phone + "<br><h4> OTHER service or product of Interest:&nbsp&nbsp&nbsp&nbsp</h4>" + row.serviceorproduct + "<br><h4> When are you looking to implement a solution:&nbsp&nbsp&nbsp&nbsp</h4>" + row.looking + "<br> <h4> Want to Receive our offers in mail:&nbsp&nbsp&nbsp&nbsp</h4>" + row.field_terms + " </span><br><span class='deletebtn'><a href='javascript:void(0);' onclick='deleteRecord(" + row.id + ");'>Delete Record</a></span>";
    }

}

//function to get the list of cars from the database

function outputForm() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM forms", [], updateFormList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

//function to add the car to the database

function addForm() {
    //check to ensure the mydb object has been created
    if (mydb) {
        //get the values of the make and model text inputs
        var firstname = document.getElementById("firstname").value;
        var lastname = document.getElementById("lastname").value;
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var company = document.getElementById("company").value;
        var website = document.getElementById("website").value;
        var position = document.getElementById("position").value;
        var phone = document.getElementById("phone").value;
        var service = document.getElementById("service").value;



        var serviceorproduct = document.querySelectorAll('input[name="serorprod"]:checked');

        var aIds = [];

        for(var x = 0, l = serviceorproduct.length; x < l;  x++)
        {
            aIds.push(serviceorproduct[x].value);
        }

        var str = aIds.join(', ');



        var looking = document.getElementById("looking").value;
        var field_terms = document.querySelector('#field_terms:checked').value;

        //Test to ensure that the user has entered both a make and model
        if (firstname !== "" && lastname !== "" && email !== "" && password !== "" && company !== "" && website !== "" && position !== "" && phone !== "" && service !== "" && looking !== "" && field_terms != "") {
            //Insert the user entered details into the cars table, note the use of the ? placeholder, these will replaced by the data passed in as an array as the second parameter
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO forms (firstname, lastname, email, password,company,website,position,phone,service,serviceorproduct,looking,field_terms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [firstname, lastname, email, password,company,website,position,phone,service,str,looking,field_terms]);
                outputForm();
                alert("Thank You!! Your Record Successfully Saved Below the Form!!!");
            });
        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


//function to remove a car from the database, passed the row id as it's only parameter
//
function deleteRecord(id) {
    //check to ensure the mydb object has been created
    if (mydb) {
        //Get all the cars from the database with a select statement, set outputCarList as the callback function for the executeSql command
        mydb.transaction(function (t) {

            t.executeSql("DELETE FROM forms WHERE id=?", [id], outputForm);
            alert("Thank You!! Your Record Successfully Deleted!!!");
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputForm();