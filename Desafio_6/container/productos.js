class Container {
  constructor() {
    this.productos = [];
    this.id = 0;
  }

  mostrarPorId(id) {
    const prod = this.productos.find((prod) => prod.id == id);
    return prod || { error: "producto no encontrado" };
  }

  MostrarTodos() {
    return [...this.productos];
  }

  guardarProducto(producto) {
    const newProd = { ...producto, id: ++this.id };
    this.productos.push(newProd);
    return newProd;
  }

  actualizar(prod, id) {
    const newProd = { id: Number(id), ...prod };
    const index = this.productos.findIndex((p) => p.id == id);
    if (index !== -1) {
      this.productos[index] = newProd;
      return newProd;
    } else {
      return { error: "producto no encontrado" };
    }
  }

  eliminar(id) {
    const index = this.productos.findIndex((prod) => prod.id == id);
    if (index !== -1) {
      return this.productos.splice(index, 1);
    } else {
      return { error: "producto no encontrado" };
    }
  }
}

module.exports = Container;
