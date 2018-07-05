var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require('cli-table');
var db = require("./DatabaseHelper.js");

var GetConnection = function ()
{
    var conn = db.conndb();
    return conn;
}

var ListAllProducts = function ()
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
                head: ['Item Id', 'product name', 'price', 'Stock']
            })
            for (ele in data)
            {
                tableToPrint.push([data[ele].item_id, data[ele].product_name, data[ele].price.toString(), data[ele].stock_quantity.toString()]);
            }

            console.log(tableToPrint.toString());

            conn.end();
            ManagerMenu();
        })

    })
};

var ListLowInventory = function ()
{
    var conn = GetConnection();
    conn.connect(function (err)
    {
        if (err) throw err;

        var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5;"
        conn.query(query, function (err, data)
        {
            if (err) throw err;

            var tableToPrint = new table({
                head: ['Item Id', 'product name', 'price', 'Stock']
            })
            for (ele in data)
            {
                tableToPrint.push([data[ele].item_id, data[ele].product_name, data[ele].price.toString(), data[ele].stock_quantity.toString()]);
            }
            console.log("Low Inventory Products")
            console.log(tableToPrint.toString());

            conn.end();
            ManagerMenu();
        })

    })
};

var UpdateStock = function (productId, productQuantity)
{
  
        var conn = GetConnection();
        conn.connect(function (err)
        {
            if (err) throw err;

            var query = `UPDATE products SET stock_quantity = (stock_quantity + ${productQuantity}) WHERE item_id =${productId};`
            conn.query(query, function (err, data)
            {
                if (err)
                {
                    throw err;
                }
                else if (data.length < 1 || data === undefined)
                {
                    console.log("I'm Sorry we can't seem to find that product. Try again")
                    ManagerMenu();
                }
                else
                {
                    console.log("Product stock quantity has successfully been updated")
                }
                conn.end();
                ManagerMenu();
            })
        })
};

//Get Product ID and Qauntity to add to Stock
var AddInventory = function ()
{
    inquirer.prompt([
        {
            name: "productId",
            type: "Input",
            message: "Enter the product Id"
        },
        {
            name: "productStock",
            type: "Input",
            message: "Increase Stock Quanity by: "
        }

    ]).then(function (result)
    {
        UpdateStock(result.productId, result.productStock)
    });
};

var NewProduct = function (name, department, price, stock)
{
    var conn = GetConnection();
    conn.connect(function (err)
    {
        if (err) throw err;

        var query = `INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (${name},${department},${price},${stock});`
        conn.query(query, function (err, data)
        {
            if (err)
            {
                throw err;
            }
            else
            {
                console.log("Product Successfully Added")
            }
            conn.end();
            ManagerMenu();
        })

    })
}

//Get Product ID and Qauntity to add to Stock
var AddNewProduct = function ()
{
    inquirer.prompt([
        {
            name: "Name",
            type: "Input",
            message: "Enter Product Name"
        },
        {
            name: "Department",
            type: "Input",
            message: "Enter Department Name"
        },
        {
            name: "Price",
            type: "Input",
            message: "Enter Price"
        },
        {
            name: "Stock",
            type: "Input",
            message: "Enter Available Stock"
        }

    ]).then(function (result)
    {
        NewProduct(result.Name, result.Department, result.Price, result.Stock);
    });
};

var ManagerMenu = function ()
{
    //Display Choices For manager to choose from
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?\n",
            choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then(function (result)
    {

        switch (result.choice)
        {
            case "View Products":
                ListAllProducts();
                break;
            case "View Low Inventory":
                ListLowInventory();
                break;
            case "Add to Inventory":
                AddInventory();
                break;
            case "Add New Product":
                AddNewProduct();
                break;
        }
    });
}
ManagerMenu();