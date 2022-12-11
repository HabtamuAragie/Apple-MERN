import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Productpage() {
  const [products, setproducts] = useState([]);
  console.log(useParams());
  const { productID } = useParams();
  useEffect(() => {
    fetch("/iphones.json")
      .then((res) => res.json())
      .then((data) => {
        const productList = data.products;
        const singleProduct = productList.filter(
          (item) => item.product_url === productID
        );
        setproducts(singleProduct);
      })
      .catch(() => console.log("Error :Unable to fetch"));
  }, [productID]);
  return (
    <div>
      <section className="internal-page-wrapper top-100">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-12">
              <br />
              <br />
              <br />
              <div className="title-wraper bold">Iphones</div>
              <div className="brief-description">
                The best for the brightest.
              </div>
            </div>
          </div>
          {products?.map((product) => {
            let id = product.product_url;
            let title = product.product_name;
            let img = product.product_img;
            let Brief = product.product_brief_description;
            let StartPrice = product.starting_price;
            let PriceRange = product.price_range;
            let productPage = "/iphone/" + id;
            let details = product.product_description;

            let productDiv = (
              <div
                key={id}
                className="row justify-content-center text-center product-holder h-100"
              >
                <div className={`col-sm-12 col-md-6 my-auto `}>
                  <div className="product-title">{title}</div>
                  <div className="product-brief">{Brief}</div>
                  <div className="starting-price">
                    {`Starting at ${StartPrice}`}
                  </div>
                  <div className="monthly-price">{PriceRange}</div>
                  <div className="product-details">{details}</div>
                  
                    
                </div>

                <div className={`col-sm-12 col-md-6 `}>
                  <div className="prodict-image">
                    <img src={img} alt="product" />
                  </div>
                </div>
              </div>
            );
            return productDiv;
          })}
        </div>
      </section>
    </div>
  );
}

export default Productpage;
