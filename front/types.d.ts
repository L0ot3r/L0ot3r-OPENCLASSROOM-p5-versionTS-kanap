export type Product = {
  _id: string,
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  altTxt?: string,
  colors?: string[],
  qty?: number,
}