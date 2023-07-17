const fs = require("fs");

class ProductManager {
    constructor() {
      this.products = [];
      this.productIdCounter = 1;
      this.path = "Products.json";
      this.createFile();
    }


    createFile() {
      if (!fs.existsSync(this.path)) {
          fs.writeFileSync(this.path, JSON.stringify(this.products));
      }
  }

  addProduct(product) {
    if (this.validateCode(product.code)) {
        console.log("Error! El producto ya se encuentra existente");

    } 

    else {
      const producto = {id:this.generateId(), title:product.title, description:product.description, price:product.price, thumbnail:product.thumbnail, code:product.code, stock:product.stock};
      this.products = this.getProducts();
      this.products.push(producto);
      this.saveProducts();
      console.log("Producto agregado correctamente");
    }
  }

  updateProduct (id, product) {
        this.products = this.getProducts();
        let pos = this.products.findIndex(item => item.id === id);

        if (pos > -1) {
            this.products[pos].title = product.title;
            this.products[pos].description = product.description;
            this.products[pos].price = product.price;
            this.products[pos].thumbnail = product.thumbnail;
            this.products[pos].code = product.code;
            this.products[pos].stock = product.stock;
            this.saveProducts();
            console.log("Producto exportado");
        } 
        
        else {
            console.log("Not found");
        }
    }

  }
  
  deleteProduct (id); {
      this.products = this.getProducts();
      let pos = this.products.findIndex(item => item.id === id);

      if (pos > -1) {
          this.products.splice(pos, 1); (0,1)
          this.saveProducts();
          console.log("Producto #" + id + "Producto eliminado");

      } 
        
      else {
          console.log("Not found");
      }
  }

  getProducts(); {
    let products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    
    return products;
  }
    
  getProductById(id); {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    
    return this.products.find(item => item.id === id) || "Not found";
  }

  validateCode(code); {
    return this.products.some(item => item.code === code);
  }

  saveProducts(); {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }


//module.exports = {ProductManager};

//Proceso de Testing 

//const productManager = new ProductManager();
//console.log(productManager.getProducts()); 

//const product = {
  //title: "Producto prueba",
   //description: "Este es un producto prueba",
   //price: 200,
  //thumbnail: "Sin imagen",
   //code: "abc123",
   //stock: 25
// };

//productManager.addProduct(product);
 //console.log(productManager.getProducts());


//productManager.addProduct(product); 

//try {
     //console.log(productManager.getProductById(2));
// } catch (error) {
//   console.log(error.message);
// }
    
// try {
//   console.log(productManager.getProductById(1)); 
//  } catch (error) {
//    console.log(error.message);
// }

