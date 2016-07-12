/**
 * Created by Bhalani on 3/3/2016.
 */
if (window.openDatabase) {
    var mydb = openDatabase("cars_db", "0.1", "A Database of Cars I Like", 1024 * 1024);

    mydb.transaction(function (t) {
        t.executeSql("CREATE TABLE IF NOT EXISTS cars (id INTEGER PRIMARY KEY ASC, make TEXT, model TEXT)");
    });



} else {
    alert("WebSQL is not supported by your browser!");
}


function updateCarList(transaction, results) {
    var listitems = "";
    var listholder = document.getElementById("carlist");

    listholder.innerHTML = "";

    var i;
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);

        listholder.innerHTML += "<li>" + row.make + " - " + row.model + " (<a href='javascript:void(0);' onclick='deleteCar(" + row.id + ");'>Delete Survey</a>)";
    }

}


function outputCars() {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("SELECT * FROM cars", [], updateCarList);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}


function addCar() {
    if (mydb) {
        var make = document.getElementById("carmake").value;
        var model = document.getElementById("carmodel").value;

        if (make !== "" && model !== "") {
            mydb.transaction(function (t) {
                t.executeSql("INSERT INTO cars (make, model) VALUES (?, ?)", [make, model]);

                alert("Your selected Color is: " +make);
                alert("Your entered number is: "+model);
                outputCars();
            });
        } else {
            alert("You must enter a make and model!");
        }
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}



function deleteCar(id) {
    if (mydb) {
        mydb.transaction(function (t) {
            t.executeSql("DELETE FROM cars WHERE id=?", [id], outputCars);
        });
    } else {
        alert("db not found, your browser does not support web sql!");
    }
}

outputCars();