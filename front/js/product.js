var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const productContainerImg = document.querySelector('.item__img');
const productName = document.querySelector('#title');
const productPrice = document.querySelector('#price');
const productDescription = document.querySelector('#description');
const productColor = document.querySelector('#colors');
let productQty = document.querySelector('#quantity');
const addToCart = document.querySelector('#addToCart');
const params = new URLSearchParams(window.location.search).get('id');
const product = {};
const getProductById = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(`http://localhost:3000/api/products/${params}`)
        .then((res) => res.json())
        .then((data) => {
        product._id = data._id;
        product.name = data.name;
        product.price = data.price;
        product.description = data.description;
        product.imageUrl = data.imageUrl;
        product.colors = data.colors;
    });
});
const renderProduct = (currentProduct) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield getProductById();
    productName.innerHTML = currentProduct.name;
    productPrice.innerHTML = currentProduct.price.toString();
    productDescription.innerHTML = currentProduct.description;
    productContainerImg.innerHTML = `<img src="${currentProduct.imageUrl}" alt="${currentProduct.name}">`;
    (_a = currentProduct === null || currentProduct === void 0 ? void 0 : currentProduct.colors) === null || _a === void 0 ? void 0 : _a.map(color => {
        productColor.innerHTML += `<option value="${color}">${color}</option>`;
    });
});
renderProduct(product);
const cart = [];
const inLocalStorage = JSON.parse(localStorage.getItem('cart'));
addToCart.addEventListener('click', () => {
    const productToCart = {
        _id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        selectedColor: productColor.value,
        qty: Number(productQty.value)
    };
    if (inLocalStorage) {
        cart.push(...inLocalStorage, productToCart);
    }
    else {
        cart.push(productToCart);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
});
export {};
