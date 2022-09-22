class Producto {
  constructor() {
    this.items = [];
  }
  get getProducts() {
    if (this.items.length === 0)
      return { Mensaje: "No se encuentran productos en base" };
    return this.items;
  }
  add(product) {
    try {
      const nuevoItem = {
        ...product,
        id: this.items.length ? this.items[this.items.length - 1].id + 1 : 1,
      };
      this.items.push(nuevoItem);
      return nuevoItem;
    } catch (error) {
      throw new Error(error);
    }
  }
  getProductById(id) {
    this.getProducts;
    const item = this.items.find((product) => product.id == Number(id)) || {
      error: "Producto no existe",
    };
    return item;
  }

  delete(id) {
    this.getProducts;
    const item = this.items.find((product) => product.id === Number(id)) || {
      error: "Product no existe.",
    };
    this.items = this.items.filter((item) => item.id !== Number(id));
    return item;
  }
  update(product, id) {
    this.getProducts;
    try {
      const { title, price, thumbnail } = product;
      const item = this.items.find((prod) => prod.id === Number(id));
      if (item) {
        item.title = title;
        item.price = price;
        item.thumbnail = thumbnail;
        return item;
      } else {
        return { error: "NO actualizado" };
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
module.exports = new Producto();
