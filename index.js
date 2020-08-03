

var productDataArray;
let uploadCsv1BtnJs = document
	.getElementById('uploadCsv1Btn')
	.addEventListener('click', () => {
		Papa.parse(document.getElementById('uploadCsv1').files[0], {
			download: true,
			header: true,
			complete: function (results) {
				console.log(results);
				productDataArray = results.data;

				// productDataArray.forEach(element => {
				//     console.log(`Product Code=> ${element["product_code"]}   Product Name=> ${element["product_name(do not edit)"]}  Quantity type=> ${element["quantity_type(do not edit)"]}`);
				// });
				return productDataArray;
			},
		});
	});
var priceChangeArray = [];
var priceChangeArrayTemp = [];
let uploadPdfCsvBtnJs = document
	.getElementById('uploadPdfCsvBtn')
	.addEventListener('click', () => {
		Papa.parse(document.getElementById('uploadPdfCsv').files[0], {
			download: true,
			header: false,
			complete: function (results) {
				priceChangeArrayTemp = results.data;
				//console.log(priceChangeArrayTemp);
				priceChangeArray = priceChangeArrayTemp.map((element) => {
					let currentObj = {};
					currentObj['product_name(do not edit)'] = element[0];
					currentObj['quantity_type(do not edit)'] = element[1];
					currentObj['product_price'] = element[2];
					currentObj['product_quantity'] = element[3];
					return currentObj;
					//console.log(currentObj);
				});
				return priceChangeArray;
			},
		});
	});

let compareAndAddButton = document
	.getElementById('runCompareAndAdd')
	.addEventListener('click', () => {
		compareAndAdd(productDataArray, priceChangeArray);
	});

function compareAndAdd(productDataArray, priceChangeArray) {
	var arrayToMakeFinalCsv = []; // have to make the object according to the csv fields.
	var arrayWithNotMatchedProducts = []; // this array can be printed on to the console as a start. next it will be shown as a table on the html page.

	priceChangeArray.forEach((e1) =>
		productDataArray.forEach((e2) => {
			if (
				e1['product_name(do not edit)'] === e2['product_name(do not edit)'] &&
				e1['quantity_type(do not edit)'] === e2['quantity_type(do not edit)']
			) {
				let tempHolder = {};
				tempHolder['product_name(do not edit)'] =
					e2['product_name(do not edit)'];
                tempHolder['product_code'] = e2['product_code'];
                tempHolder['product_price'] = e1['product_price'];
                tempHolder['product_quantity'] = e1['product_quantity'];
				//additional properties for the csv
				arrayToMakeFinalCsv.push(tempHolder);
			}
		})
	);

	// now we have arraytoMakeFinalCsv which contains the exact match for our condition. so if we filter these from the initial array which is priceChangeArray we get the
	//arrayWithNotmatchedProdcts
	console.log(arrayToMakeFinalCsv);
	console.log(priceChangeArray);

	var priceChangeArrayCopy = JSON.parse(JSON.stringify(priceChangeArray)); // making a deep copy of the priceChangeArray

	let removeAddedProductsFromPriceChangeArray = (
		priceChangeArrayCopy,
		arrayToMakeFinalCsv
	) => {
		arrayToMakeFinalCsv.forEach((e) => {
			priceChangeArrayCopy.forEach((e2, index) => {
				if (
					e['product_name(do not edit)'] === e2['product_name(do not edit)']
				) {
					priceChangeArrayCopy.splice(index, 1);
				}
			});
		});
	};

	removeAddedProductsFromPriceChangeArray(
		priceChangeArrayCopy,
		arrayToMakeFinalCsv
	);
	arrayWithNotMatchedProducts = priceChangeArrayCopy;
	console.log(arrayWithNotMatchedProducts);




   var exportCsvTest = arrayToMakeFinalCsv.map((e)=>{
        let tempHolder ={"Order Reference Id" :"",
        "Venue Group" :"",//customer name 
        "Venue" : "",
        "Venue Department" : "",
        "Venue Department Customer Code":'', //customer code
        "Distributor Group":'',
        "Distributor":'',
        "Submitted Date":'',
        "Expected Delivery Date":'', //current date
        "Order Notes":'',
        "Line Item Unique Reference":'',
        "SKU":'', //product code
        "Item Name":'', // product name
        "Item Notes":'',
        "QTY":'', // product quantity
        "Unit":'',
        "Price":'', // product price
        "Price Unit":'',
        "Sub Total":'',
        "Tax":'',
        "Total":''
    };
        tempHolder["SKU"] = (e['product_code']).replace(/'/g,"");
        tempHolder["Item Name"] = e['product_name(do not edit)'];
        tempHolder["QTY"] = e['product_quantity'];
        tempHolder["Price"] = e['product_price'];
        tempHolder["Venue Group"] = "Wastage";
        tempHolder["Venue Department Customer Code"] = 10259;
        tempHolder["Expected Delivery Date"] = "03/08/2020";

        return tempHolder;

    });

    let headerRow = {"Order Reference Id" :"" ,
        "Venue Group" :"",//customer name 
        "Venue" : "",
        "Venue Department" : "",
        "Venue Department Customer Code":'', //customer code
        "Distributor Group":'',
        "Distributor":'',
        "Submitted Date":'',
        "Expected Delivery Date":'', //current date
        "Order Notes":'',
        "Line Item Unique Reference":'',
        "SKU":'', //product code
        "Item Name":'', // product name
        "Item Notes":'',
        "QTY":'', // product quantity
        "Unit":'',
        "Price":'', // product price
        "Price Unit":'',
        "Sub Total":'',
        "Tax":'',
        "Total":''}

        exportCsvTest.splice(0,0,headerRow);
        exportCsvTest.push({end:""});
            
console.log(exportCsvTest);

//unparsing to csv file is done here.

let csv = Papa.unparse(exportCsvTest,{
	quotes: false, //or array of booleans
	quoteChar: '"',
	escapeChar: '"',
	delimiter: ",",
	header: true,
	newline: "\r\n",
	skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
	columns: null //or array of strings
}
    
);
console.log(csv);

}
//can retrun 2 arrays now :)


function createExprotCsv (arraytoMakeFinalCsv){
    let headerRow = {"Order Reference Id" :"" ,
        "Venue Group" :"",//customer name 
        "Venue" : "",
        "Venue Department" : "",
        "Venue Department Customer Code":'', //customer code
        "Distributor Group":'',
        "Distributor":'',
        "Submitted Date":'',
        "Expected Delivery Date":'', //current date
        "Order Notes":'',
        "Line Item Unique Reference":'',
        "SKU":'', //product code
        "Item Name":'', // product name
        "Item Notes":'',
        "QTY":'', // product quantity
        "Unit":'',
        "Price":'', // product price
        "Price Unit":'',
        "Sub Total":'',
        "Tax":'',
        "Total":''

    }}