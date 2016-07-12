        console.log(19 == '19');
        console.log(19 === '19');
        function placeOrder(orderNumber){
            console.log("Order Number of a Customer :: ",orderNumber);


            deliverFood(function(){
                console.log("Food Delivered of Order Number :: ", orderNumber);
            });
        }

        function deliverFood(callback){

            setTimeout(callback,5000);
        }

        placeOrder(1);
        placeOrder(2);
        placeOrder(3);
        placeOrder(4);
        placeOrder(5);