const cartItems = document.querySelector('#cart__items');
const totalQty = document.querySelector('#totalQuantity');
const totalPrice = document.querySelector('#totalPrice');
const orderBtn = document.querySelector('#order');
const cart = JSON.parse(localStorage.getItem('cart'));
const itemTemplate = (product) => {
    return `<article class="cart__item" data-id=${product._id} data-color=${product.selectedColor}>
  <div class="cart__item__img">
    <img src=${product.imageUrl} alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.selectedColor}</p>
      <p>${product.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : ${product.qty}</p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${product.qty}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>
  `;
};
// Affichage des produits dans le panier
!cart
    ? (cartItems.innerHTML = `<p>Votre panier est vide</p>`)
    : cart.map((product) => {
        cartItems.innerHTML += itemTemplate(product);
    });
// Affichage du nombre total de produits dans le panier
let totalQtyInCart = cart === null || cart === void 0 ? void 0 : cart.map((product) => product.qty).reduce((a, b) => a + b, 0);
// S'il n'y a pas de produit dans le panier, on affiche 0 sinon on affiche le nombre total de produits dans le panier
totalQty.innerHTML = !totalQtyInCart ? '0' : `${totalQtyInCart}`;
// Affichege du prix total du panier
let totalPriceInCart = cart === null || cart === void 0 ? void 0 : cart.map((product) => product.price * product.qty).reduce((a, b) => a + b, 0);
// S'il n'y a pas de produit dans le panier, on affiche 0 sinon on affiche le prix total du panier
totalPrice.innerHTML = !totalPriceInCart
    ? '0'
    : `${totalPriceInCart === null || totalPriceInCart === void 0 ? void 0 : totalPriceInCart.toLocaleString('fr-FR')}`; // formatage de la valeur avec séparateur de milliers
orderBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'index.html';
});
export {};
