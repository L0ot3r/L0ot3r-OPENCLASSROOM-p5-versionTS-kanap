import { Product } from '../types'

const productContainerImg = document.querySelector('.item__img') as HTMLDivElement;
const productName = document.querySelector('#title') as HTMLHeadingElement;
const productPrice = document.querySelector('#price') as HTMLSpanElement;
const productDescription = document.querySelector('#description') as HTMLParagraphElement;
const productColor = document.querySelector('#colors') as HTMLSelectElement;
let productQty = document.querySelector('#quantity') as HTMLInputElement;
const addToCart = document.querySelector('#addToCart') as HTMLButtonElement;

const params = new URLSearchParams(window.location.search).get('id');

const product = {} as Product;
const getProductById = async () => {
  await fetch(`http://localhost:3000/api/products/${params}`)
  .then((res) => res.json())
  .then((data: Product) => {
    product._id = data._id;
    product.name = data.name;
    product.price = data.price;
    product.description = data.description;
    product.imageUrl = data.imageUrl;
    product.colors = data.colors;
  })
};

const renderProduct = async (currentProduct: Product) => {
  await getProductById();
  productName.innerHTML = currentProduct.name;
  productPrice.innerHTML = currentProduct.price.toString();
  productDescription.innerHTML = currentProduct.description;
  productContainerImg.innerHTML = `<img src="${currentProduct.imageUrl}" alt="${currentProduct.name}">`
  currentProduct?.colors?.map(color => {
    productColor.innerHTML += `<option value="${color}">${color}</option>`
  })
}
renderProduct(product);

interface ProductInCart extends Product {
  selectedColor: string,
}
const cart: ProductInCart[] = []
const inLocalStorage = JSON.parse(localStorage.getItem('cart') as string) as ProductInCart[];

addToCart.addEventListener('click', () => {
  const productToCart: ProductInCart = {
    _id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    selectedColor: productColor.value,
    qty: Number(productQty.value)
  }
  if(inLocalStorage) {
    cart.push(...inLocalStorage, productToCart);
  } else {
    cart.push(productToCart);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.href = 'cart.html';
})







