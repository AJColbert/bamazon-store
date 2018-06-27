var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require('cli-table');
var db = require("./DatabaseHelper.js");

var GetConnection = function ()
{
    var conn = db.conndb();
    return conn;
}

var ListProducts = function ()
{
    var conn = GetConnection();
    conn.connect(function (err)
    {
        if (err) throw err;

        var query = "SELECT item_id, product_name, price, stock_quantity FROM products;"
        conn.query(query, function (err, data)
        {
            if (err) throw err;

            var tableToPrint = new table({
                head: ['Item Id', 'product name', 'price']
            })
            for (ele in data)
            {
                tableToPrint.push([data[ele].item_id, data[ele].product_name, data[ele].price.toString()]);
            }

            console.log(tableToPrint.toString());

            conn.end();
            PurchaseProducts();
        })
    })
};

var GetProduct = function (productId, productQuantity)
{
    var conn = GetConnection();

    conn.connect(function (err)
    {
        if (err) { console.log(err) }

        var query = `SELECT * FROM products WHERE item_id= '${productId}';`
        conn.query(query, function (err, data)
        {
            if (err) throw err;
            if (data.length < 1 || data === undefined)
            {
                console.log("I'm Sorry we can't seem to find that product. Try again")
                //add in delay to then re print products
            } else
            {
                if (data[0].stock_quantity == 0)
                {
                    console.log("I'm sorry we're out of stock, try again next week.")
                } else
                {
                    if (productQuantity > data[0].stock_quantity)
                    {
                        console.log("Insufficient Quantity!")
                    }
                    else
                    {
                        cus.productID.push(productId);

                        //Display Bill

                        //Update DB for minus quantity cusotmer took
                        ProductSale(productId, productQuantity);
                    }
                }
            }
            conn.end();
        })
    })
};

var ProductSale = function (productId, productQuantity)
{
    var conn = GetConnection();
    conn.connect(function (err)
    {
        if (err) throw err;

        var query = `UPDATE products SET stock_quantity = (stock_quantity - ${productQuantity}) WHERE item_id =${productId};`
        conn.query(query, function (err, data)
        {
            if (err) throw err;
        })
        var query = `SELECT item_id, product_name, price from products WHERE item_id = ${productId};`
        conn.query(query, function (err, data)
        {
            if (err) throw err;

            console.log("---------------------------")

            console.log("Item ID: " + data[0].item_id);
            console.log("Product Name: " + data[0].product_name);
            console.log("Unit Price: " + data[0].price);
            console.log("Order Amount: " + productQuantity);
            var total = data[0].price * productQuantity;
            console.log("Your Total Cost: $" + total)

            conn.end();
        })
    })
};




var cus;
function Customer(name, productID)
{
    this.name = name;
    this.productID = productID || [];

};

inquirer.prompt([
    {
        name: "name",
        type: "Input",
        message: "What is your name?"
    }
]).then(function (result)
{
    cus = new Customer(result.name)
    console.log("\nHello " + cus.name + "! Lets star shopping!")
    //List all products
    ListProducts();
});

var PurchaseProducts = function ()
{
    inquirer.prompt([
        {
            name: "productId",
            type: "Input",
            message: "Enter the product Id you wish to purchase"
        },
        {
            name: "productStock",
            type: "Input",
            message: "How many do you wish to purchase"
        }

    ]).then(function (result)
    {
        //valdate product exists
        //validate ther is enough stock
        GetProduct(result.productId, result.productStock)

    });
};

