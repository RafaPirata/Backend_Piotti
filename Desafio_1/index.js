// generamos una Class con un constructor y metodos

class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    (this.nombre = nombre),
      (this.apellido = apellido),
      (this.libros = libros),
      (this.mascotas = mascotas);
  }
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
  addMascota(nombre) {
    this.mascotas.push(nombre);
  }
  countMascotas() {
    return `El usuario  ${this.getFullName()} tiene ${
      this.mascotas.length
    } Mascotas`;
  }
  addBook(nombre, autor) {
    let book = { nombre: nombre, autor: autor };
    return this.libros.push(book);
  }
  getBookName() {
    let bookName = this.libros.map((libro) => {
      return libro.nombre;
    });
    return `El usuario ${this.getFullName()} cuenta con los siguientes libros: ${bookName}`;
  }
}
//Fin Class Usuario

// genero una variable, aisgno un usuario a la class Usuario

const usuario1 = new Usuario("Rafael", "Piotti");

// Al usuario1 le cargo y recorro sus atributos utilizando los metodos

usuario1.addMascota("perro") + usuario1.addMascota("gato");
usuario1.addBook("Los Miserables", "Victor Hugo");
usuario1.addBook("El Alquimista", "Paulo Coelho");
usuario1.addBook("El Principito", "Antoine de Saint-Exupéry");

//Muestro por consola a usuario1

console.log(usuario1);
console.log(usuario1.getFullName());
console.log(usuario1.countMascotas());
console.log(usuario1.getBookName());
