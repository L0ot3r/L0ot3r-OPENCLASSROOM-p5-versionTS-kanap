import { Product } from '../types'

const sectionItems = document.querySelector('#items') as HTMLElement

const inLocalStorage = localStorage.getItem('cart');

const getAllProducts = async () => {
  return await fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then(data => {
      return data;
    })
}

const renderAllProducts = async () => {
  const products = await getAllProducts()
  products.map((product: Product) => (
    sectionItems.innerHTML +=
    `<a href="./product.html?id=${product._id}">
      <article>
        <img src=${product.imageUrl} alt=${product.altTxt}>
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
      </article>
    </a>
    `
  ))
}

renderAllProducts();
