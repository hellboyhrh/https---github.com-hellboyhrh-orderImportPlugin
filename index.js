

var productDataArray;
    let uploadCsv1BtnJs = document.getElementById("uploadCsv1Btn").addEventListener("click",()=>
    {
        Papa.parse(document.getElementById("uploadCsv1").files[0],{
            download : true,
            header : true,
            complete : function(results){
                console.log(results);
                 productDataArray = results.data;
                 
                
                // productDataArray.forEach(element => {
                //     console.log(`Product Code=> ${element["product_code"]}   Product Name=> ${element["product_name(do not edit)"]}  Quantity type=> ${element["quantity_type(do not edit)"]}`);
                // });
                return productDataArray;
            
            }
        });
    });
    var priceChangeArray = [];
    var priceChangeArrayTemp = [];
    let uploadPdfCsvBtnJs = document.getElementById("uploadPdfCsvBtn").addEventListener("click",()=>{
        Papa.parse(document.getElementById("uploadPdfCsv").files[0],{
            download:true,
            header: false,
            complete: function(results){
                priceChangeArrayTemp = results.data;
                //console.log(priceChangeArrayTemp);
                 priceChangeArray = priceChangeArrayTemp.map(element => {
                    console.log("map")   
                     let currentObj ={};
                   currentObj["product_name(do not edit)"] = element[0];
                   currentObj["quantity_type(do not edit)"] = element[1];
                   currentObj["product_price"] = element[2];
                   currentObj["prproduct_quantity"] = element[3];
                   return currentObj;
                    //console.log(currentObj);
               });
               return priceChangeArray;
            }
        })
    })

let compareAndAddButton = document.getElementById("runCompareAndAdd").addEventListener("click", compareAndAdd(productDataArray,priceChangeArray));

function compareAndAdd (productDataArray, priceChangeArray){
    var arrayToMakeFinalCsv =[];// have to make the object according to the csv fields.
    var arrayWithNotMatchedProducts = []; // this array can be printed on to the console as a start. next it will be shown as a table on the html page. 
    
    priceChangeArray.forEach((e1)=>productDataArray.forEach((e2) =>{
        if(e1["product_name(do not edit)"] === e2["product_name(do not edit)"] && e1["quantity_type(do not edit)"] === e2["quantity_type(do not edit)"]){
            let tempHolder = {};
            tempHolder["product_name(do not edit)"] = e2["product_name(do not edit)"];
            tempHolder["product_code"] = e2["product_code"];
            //additional properties for the csv
            arrayToMakeFinalCsv.push(tempHolder);
    
        }
          
    }));



    // now we have arraytoMakeFinalCsv which contains the exact match for our condition. so if we filter these from the initial array which is priceChangeArray we get the 
    //arrayWithNotmatchedProdcts
    console.log(arrayToMakeFinalCsv);

    console.log(priceChangeArray);



   }
    
  

    //can retrun 2 arrays now :)