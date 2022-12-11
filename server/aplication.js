import mysql from "mysql";
import express from "express";
import cors from "cors";
let app = express();
app.use(cors());
const corsOption = {
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

// Use  body parser as middle ware to extract info from html
app.use(express.urlencoded({ extended: true }));

//user info
const connection = mysql.createConnection({
  host: "localhost",
  user: "myDBuser",
  password: "123456",
  database: "mydb",
});
// connect to mysql

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to my sql1");
  }
});

//Install: Create the tables
app.get("/install", (req, res) => {
  let message = "Tables Created";
  let createProducts = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
        product_url varchar(255) NOT NULL,
        product_name varchar(255) NOT NULL,
        PRIMARY KEY (product_id)
     )`;
  connection.query(createProducts, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("product created");
    }
  });
  let createProductDescription = `CREATE TABLE if not exists ProductDescription(
        description_id int auto_increment,
        product_id int(11) not null,
        product_brief_description varchar(600) NOT NULL,
        product_description varchar(600) NOT NULL,
        product_img varchar(600) NOT NULL,
        product_link varchar(600) NOT NULL,
        PRIMARY KEY (description_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id) 
    )`;
  connection.query(createProductDescription, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("production description created");
    }
  });
  let createProductPrice = `CREATE TABLE if not exists ProductPrice(
        price_id int auto_increment,
        product_id int(11) NOT NULL,    
        starting_price varchar(255) NOT NULL,
        price_range varchar(255) NOT NULL,
        PRIMARY KEY (price_id),
        FOREIGN KEY (product_id) REFERENCES Products(product_id)
      )`;
  connection.query(createProductPrice, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("production price created");
    }
  });
  let userinformation = `CREATE TABLE if not exists User(
        user_id int NOT NULL auto_increment,
        User_name varchar(255) NOT NULL,    
        User_password varchar(100) NOT NULL,
        PRIMARY KEY (user_id )
        
      )`;
  connection.query(userinformation, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("userinformation created");
    }
  });
  let Ordersinfo = `CREATE TABLE if not exists Orders(
        order_id int NOT NULL auto_increment,
        product_id int NOT NULL,    
        user_id int NOT NULL,
        PRIMARY KEY (order_id ),
        FOREIGN KEY (product_id) REFERENCES Products(product_id),
        FOREIGN KEY (user_id) REFERENCES User(user_id)
        
      )`;
  connection.query(Ordersinfo, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log("orderinfo created");
    }
  });
  res.end(message);
});

app.post("/addproduct", (req, res) => {
  console.log(req.body);
  // let id = req.body.product_id
  let prourl = req.body.product_url;
  let proname = req.body.product_name;
  let brDescription = req.body.product_brief_Description;
  let prodescription = req.body.product_description;
  let proimg = req.body.product_img;
  let prolink = req.body.product_link;
  let strprice = req.body.starting_price;
  let prange = req.body.price_range;
  let usern = req.body.user_name;
  let userpswd = req.body.user_password;
  let order = req.body.orders;

  // insert product table
  let sqlAddToProducts = `INSERT INTO Products (product_url, product_name) VALUES (?)`;
  let value = [prourl, proname];
  connection.query(sqlAddToProducts, [value], (err, result) => {
    if (err) throw err;
    console.log("1 record inserted");
  });

  //select product data
  let reqirdid = `SELECT * FROM Products WHERE product_url =(?)`;
  let proURL = [prourl];
  connection.query(reqirdid, [proURL], (err, rows, fields) => {
    console.table(rows);
    let addedProductId = rows[0].product_id;
    console.log(addedProductId);
    if (err) console.log(err);
    //insert ProductDescription
    let q = `INSERT INTO ProductDescription(product_id, product_brief_description, product_description, product_img, product_link ) VALUES (?)`;
    let value = [
      addedProductId,
      brDescription,
      prodescription,
      proimg,
      prolink,
    ];
    connection.query(q, [value], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Product Description Inserted !");
      }
    });

    // product price
    let propricee = `INSERT INTO ProductPrice(product_id, starting_price,price_range) VALUES (?)`;
    let provalue = [addedProductId, strprice, prange];
    connection.query(propricee, [provalue], (err) => {
      if (err) console.log(err);
      else {
        console.log("product price created");
      }
    });
    //inser in to user
    // let quser = `INSERT INTO User(User_name, User_password) VALUES (?)`;
    // let userValue = [usern, userpswd];
    // connection.query(quser, [userValue], (err) => {
    //   if (err) console.log(err);
    //   else {
    //     console.log("User Iserted !");
    //     let userIDQuery = `SELECT * from User WHERE User_name = (?)`;
    //     let userName = [usern];

    //     connection.query(userIDQuery, [userName], (err, row, fields) => {
    //       if (err) console.log(err);
    //       else {
    //         let userID = row[0].user_id;
    //         console.log(userID);
    //         // insert in to orders
    //         let qOrdre = `INSERT INTO Orders (product_id, user_id) VALUES (?)`;
    //         let OrderValue = [addedProductId, userID];

    //         connection.query(qOrdre, [OrderValue], (err) => {
    //           if (err) console.log(err);
    //           else {
    //             console.log("Order Created !");
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  });

  res.end("data inserted in to table");
});

//Get all iphones
app.get("/iphones", (req, res) => {
  connection.query(
    "SELECT * FROM Products JOIN ProductDescription JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
    (err, rows, fields) => {
      let iphones = { products: [] };
      iphones.products = rows;
      var stringIphones = JSON.stringify(iphones);
      if (!err) res.end(stringIphones);
      else console.log(err);
    }
  );
});

app.listen(200, () => {
  console.log(`lisining and running on http://localhost:200`);
});
