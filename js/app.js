// -----------Load API Data Start-----------//
const loadProducts = () => {
  fetch('./data.json')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    showProducts(data);

  })
  .catch((error) => console.error('Error loading JSON:', error));

};
// -----------Load API Data End-----------//

// -----------Show All Products In UI-----//
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p>Price: $ ${product.price}</p>
      <p>Rating:  ${product.rating.rate}</p>
      <p>Reviews:  ${product.rating.count}</p>

      <button style="background-color: #FF136F
      ";
      onclick="addToCart(${product.id},${product.price})"  ,id="addToCart-btn"
      class="buy-now btn btn-primary">add to cart</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  // count = count + 1;
  count += 1;
  updatePrice("price", price);
  updateTaxandCharge();
  document.getElementById("total-Products").innerText = count;
};

// Price, Delivery, Tax update
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// Set InnerText Function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// Main Price / Update Price
const updatePrice = (id, value) => {
  const convertOldPrice = getInputValue(id);
  const converPrice = parseFloat(value);
  const total = parseFloat(convertOldPrice + converPrice).toFixed(2);
  document.getElementById(id).innerText = total;
};

// Update Delivery charge, Tax

const updateTaxandCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 80);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

// Grand Total
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

loadProducts();


const cartProductList = document.getElementById("addedItem");
const tr = document.createElement("tr");
tr.innerHTML = `
  <td>description</td>
  <td>price</td>
  <td>
   <button onclick="removeProductBtn()">-</button><span id="productCount">1</span> <button onclick="addProductBtn()">+</button>
  </td>
  <td>total</td>
`;
cartProductList.appendChild(tr);

let x = 0;
function addProductBtn(){
    let count = document.getElementById("productCount");
    x++;
    count.textContent = x;

}

function removeProductBtn(){
  let count = document.getElementById("productCount");
  x--;
  count.textContent = x;

  if (x < 0){
      count.textContent = "null";
      
  }

}

// Add Promo Code Feature
const promoCodes = {
  "ostad10": 0.10, // 10% discount
  "ostad5": 0.05   // 5% discount
};

// Function to apply promo code
document.getElementById("applyPromoCodeBtn").addEventListener("click", () => {
  const promoCodeInput = document.getElementById("promoCodeInput").value.trim();
  const subtotal = getInputValue("price");
  const discountMessage = document.getElementById("promoCodeMessage");

  if (promoCodes[promoCodeInput]) {
    const discountRate = promoCodes[promoCodeInput];
    const discount = subtotal * discountRate;

    setInnerText("discount", discount);
    const finalTotal = subtotal - discount;
    setInnerText("finalTotal", finalTotal);

    discountMessage.textContent = "Promo code applied successfully!";
    discountMessage.classList.remove("text-danger");
    discountMessage.classList.add("text-success");
  } else {
    discountMessage.textContent = "Invalid promo code. Please try again.";
    discountMessage.classList.remove("text-success");
    discountMessage.classList.add("text-danger");
  }
});



// Update Grand Total with Promo Code
const updateTotals = () => {
  const subtotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  const discount = getInputValue("discount");
  const finalTotal = subtotal - discount;

  setInnerText("subtotal", subtotal);
  setInnerText("finalTotal", finalTotal.toFixed(2));
};


