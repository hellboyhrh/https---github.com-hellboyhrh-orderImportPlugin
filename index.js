


var productDataArray;
    let uploadCsv1BtnJs = document.getElementById("uploadCsv1Btn").addEventListener("click",()=>
    {
        Papa.parse(document.getElementById("uploadCsv1").files[0],{
            download : true,
            header : true,
            complete : function(results){
                console.log(results);
                 productDataArray = results.data;
                 
                
                productDataArray.forEach(element => {
                    console.log(`Product Code=> ${element["product_code"]}   Product Name=> ${element["product_name(do not edit)"]}  Quantity type=> ${element["quantity_type(do not edit)"]}`);
                });
                return productDataArray;
            
            }
        });
    });

//lets say we got the other csv file loaded into array called priceChangeArray

var priceChangeArray = [];

function compareAndAdd (productDataArray, priceChangeArray){
    var arrayToMakeFinalCsv =[];// have to make the object according to the csv fields.
    var arrayWithNotMatchedProducts = []; // this array can be printed on to the console as a start. next it will be shown as a table on the html page. 
    
    priceChangeArray.forEach((e1)=>productDataArray.forEach((e2) =>{
        if(e1.productName === e2["product_name(do not edit)"] && e1.quantity_type === e2.quantity_type){
            let tempHolder = {};
            tempHolder["product_name(do not edit)"] = e2["product_name(do not edit)"];
            tempHolder["product_code"] = e2["product_code"];
            //additional properties for the csv
            arrayToMakeFinalCsv.push(tempHolder);
        }
            let notMatchedProductTemp = {};
            notMatchedProductTemp["Product Name"] = e1.productName;
            notMatchedProductTemp["Product Price"] = e1.product_price; // can be different

            // additional fields such as how many kgs or boxes. 
            arrayWithNotMatchedProducts.push(notMatchedProductTemp);
            
    }));
    //can retrun 2 arrays now :)
}