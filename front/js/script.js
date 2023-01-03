var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sectionItems = document.querySelector('#items');
const inLocalStorage = localStorage.getItem('cart');
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then(data => {
        return data;
    });
});
const renderAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield getAllProducts();
    products.map((product) => (sectionItems.innerHTML +=
        `<a href="./product.html?id=${product._id}">
      <article>
        <img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>
    `));
});
renderAllProducts();
export {};
