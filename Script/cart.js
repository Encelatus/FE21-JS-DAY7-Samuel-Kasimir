/**
 * JavaScript Shopping Cart
 */

//  You will create a shopping cart today for a florist that sells a variety of flowers.

// Additionally to the standard features(add to cart, change quantity, remove from cart and showing total sum), you should implement the following:

// 1) showing the amount of items in the cart

// 2) giving and displaying a discount if the amount is over a certain amount (e.g. 10% on EUR 100,- purchase)

// 3) checking the stock price(e.g. if the user wants to purchase 5 roses and there are only 4 in stock, there should be a message saying only 4 are still in stock)
// Step one: create a stock for ONE item and give it random amount.
// Step two: compare stock and user quantity with if() and show message with stock.
// Step three: if it works, copy the code for other items.

function addStock () {
    itemsStock = document.getElementsByClassName('product-stock');
    for ( let i = 0; i < itemsStock.length; i++) {
        let itemStock = itemsStock[i];
        itemStock = Math.floor(Math.random()*21);
        document.getElementsByClassName('product-stock')[i].innerHTML = itemStock;
    }
}
addStock ();


function documentReady() {
    let insertBtns = document.getElementsByClassName('product-button');
    for (let i = 0; i < insertBtns.length; i++) {
        let insertBtn = insertBtns[i];
        insertBtn.addEventListener("click", addItem);
    }

    let plusBtns = document.getElementsByClassName('plus');
    for (let i = 0; i < plusBtns.length; i++) {
        let plusBtn = plusBtns[i];
        plusBtn.addEventListener("click", plusQtt);
    }

    let minusBtns = document.getElementsByClassName('minus');
    for (let i = 0; i < minusBtns.length; i++) {
        let minusBtn = minusBtns[i];
        minusBtn.addEventListener("click", minusQtt);
    }
    let delItemBtns = document.getElementsByClassName('del');
    for (let i = 0; i < delItemBtns.length; i++) {
        let delBtn = delItemBtns[i];
        delBtn.addEventListener("click", delItem);
    }

    let btnPurchase = document.getElementById("btn-purchase");
    btnPurchase.addEventListener("click", purchase);
}
documentReady();


function addItem(e) {
    let item = e.target.parentElement.parentElement;
    let title = item.querySelector('.product-title').innerText;
    let price = item.querySelector('.product-price').innerText.replace("€", "");
    let picSrc = item.querySelector('.product-image').src;
    // console.log(title, price, picSrc);
    rowCreate(title, price, picSrc);
    updateTotal();

}

function rowCreate(title, price, picSrc) {
    let cartItems = document.getElementById('cart-items');
    let cartItemsNames = cartItems.getElementsByClassName('cart-item-title');
    let cartItemQtt = cartItems.getElementsByClassName('cart-quantity');

    // console.log(CartItemQtt);
    // let itemStock = document.getElementsByClassName('product-stock');
    // // for (let i = 0; i < itemStock.length; i++) {
    // //     let qtt = Number(cartItemQtt[i].innerHTML);
    // //     let qttStock = Number(itemStock[i].innerHTML);
    // //         console.log(qttStock);
    // //         if (qtt > qttStock) {   
    // //             alert("ALERT");
    // //         }
    // //     }

    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item already exists in your cart");
            let qtt = Number(cartItemQtt[i].innerHTML);
            cartItemQtt[i].innerHTML = qtt + 1;
            console.log(qtt);
            updateTotal();
            return;//it will stop our script
        }

    }
    let item = `
    <div class="cart-row row d-flex ">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${picSrc}" width="100" height="100">
            <span class="cart-item-title h5 ">${title}</span>
        </div>
        
        <span class="cart-price col-3 h4 my-3">€ ${price}</span>

        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">1</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>         
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>`;
    let cart = document.getElementById('cart-items');
    cart.innerHTML += item;
    documentReady();
}

function updateTotal() {
    // let cart = document.getElementById("cart-items");
    let cartRows = cart.getElementsByClassName("cart-row");
    let total = 0; // it will be calculated from zero each time it is updated
    let discount = 0;
    let totalQuantity = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));//we need the first one
        let qtt = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
        totalQuantity += qtt;
        console.log(price, qtt);
        total += (price * qtt);
        console.log(total);
    }

    if (total >= 60){
        discount = (total*0.1);
        discount = discount.toFixed(2);
        total = total - discount; 
        document.getElementById("targetD").innerHTML = `
                    <strong class="cart-total-title" style="color:red;">Discount10%</strong>
                    <span id="discount" class="cart-discount-total h4">${discount}€</span>
                    `
    } else {
        document.getElementById("targetD").innerHTML = `
                    <strong class="cart-total-title" style="color:red; display:none"></strong>
                    <span id="discount" class="cart-discount-total h4 display:none"></span>
                    `
    }
    total = total.toFixed(2);//toFixed() will help rounding the number to 2 decimals
    let totalQuant = document.getElementById("quantity").querySelector("#quantity-span");
    let totalElement = document.getElementById("total").querySelector('#price');
    // console.log(total);
    totalElement.innerHTML = "€" + total;
    totalQuant.innerHTML = totalQuantity + " stk"; 
}

function plusQtt(e) {
    let itemPlus = e.target.parentElement;
    let qtt = Number(itemPlus.querySelector('.cart-quantity').innerHTML);
    itemPlus.querySelector('.cart-quantity').innerHTML = qtt + 1;
    console.log(qtt);
    updateTotal();
}

function minusQtt(e) {
    let itemMinus = e.target.parentElement.parentElement;
    let qtt = Number(itemMinus.querySelector('.cart-quantity').innerHTML);
    if (qtt == 1) {
        console.log("There shouldn't be 0 products in the cart");
        delItem(e);
    } else {
        itemMinus.querySelector('.cart-quantity').innerHTML = qtt - 1;
        console.log(qtt);
        updateTotal();
    }
}

function delItem(e) {
    let delBtnAction = e.target.parentElement.parentElement.remove();
    updateTotal();
}

function purchase() {
    alert("Thank you for buying with us.");
    let cartItems = document.getElementById('cart-items');
    console.log(cartItems);
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    // cartItems.innerHTML = "";
    updateTotal();
}
