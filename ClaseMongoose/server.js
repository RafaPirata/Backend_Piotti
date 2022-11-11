const mongoose = require("mongoose");

const Usuarios = require("./models/usuario.model.js");

class Users {
  constructor() {
    this.connect();
  }

  connect() {
    try {
      //const URL = "mongodb://localhost:27017/ecommerce";
      const URL =
        "mongodb+srv://rafaelpiotti:cali6@cluster0.k9fkvuk.mongodb.net/ecommerce?retryWrites=true&w=majority";

      mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Database connected");
    } catch (error) {
      console.log(error);
    }
  }

  /// create a new user
  async createUser(user) {
    try {
      const newUser = new Usuarios(user);
      await newUser.save();
      console.log("User created");
    } catch (error) {
      console.log(error);
    }
  }

  /// get all users
  async getUsers() {
    try {
      const users = await Usuarios.find(
        { password: "123456" },
        { nombre: 1, apellido: 1, email: 1 }
      )
        .sort({ nombre: -1 })
        .skip(1)
        .limit(1);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }

  // update a user
  async updateUser() {
    console.log("actulizando usuario");
    await Usuarios.updateOne({ nombre: "Fede" }, { $set: { nombre: "Juan" } });
    // console.log(userUpdate)
  }
  async deleteUser() {
    console.log("actulizando usuario");
    await Usuarios.deleteOne({ nombre: "Juan" });
    // console.log(userUpdate)
  }
}

const users = new Users();
// users.createUser({nombre: 'Fede1',  apellido: 'Perez1', email: 'fp1@gmail.com', username: 'fedeperez1', password: '123456'})
// users.createUser({nombre: 'Fede2',  apellido: 'Perez2', email: 'fp2@gmail.com', username: 'fedeperez2', password: '123456'})
// users.createUser({nombre: 'Fede3',  apellido: 'Perez3', email: 'fp3@gmail.com', username: 'fedeperez3', password: '123456'})
// users.createUser({nombre: 'Fede4',  apellido: 'Perez4', email: 'fp4@gmail.com', username: 'fedeperez4', password: '123456'})
// users.updateUser()
// users.deleteUser()
users.getUsers();

// CRUD()

// function CRUD() {

// }}

// class server {
//     constructor(){
//         this.app = express()
//         this.port = process.env.PORT
//         this.usersPath = {user:'/api/users', productos: '/api/productos', carrito: '/apí/carrito'}
//         this.connectDB()

//         // Middlewares
//         this.middlewares()

//         // Routes
//         this.routes()
//     }

//     async connectDB(){
//         await dbConnection()
//     }

//     middlewares(){
//         // CORS
//         this.app.use(cors())

//         // Body reading and parsing
//         this.app.use(express.json())

//         // Public directory
//         this.app.use(express.static('public'))
//     }

//     routes(){
//         this.app.use(this.usersPath.user, require('./routes/users.routes'))
//     }

//     listen(){
//         this.app.listen(this.port, () => {
//             console.log(`Server running on port ${this.port}`)
//         })
//     }
// }
