$(document).ready (function() { //funcion documento listo corre por todo el codigo antes

  //seteo storage del carrito lo guardamos en cart //esto va siempre al principio
  // ?? significa que si esto es null o undefined  se va a guardar esto-> [] seteo en 0, si no puedo hacerlo con un if
  const cart= JSON.parse(localStorage.getItem('cart')) ?? []; 
  //el reduce cuenta los elementos y ir acumulando los valores y los suma
  const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);
    
  document.getElementById("cart-total").innerHTML =`${cart.length}`; // modifico su numero por cartlenght (cantidad productos del carro + el storage)
  document.getElementById("subtotal").innerHTML = `${subtotal}`; //Modifico el subtotal
  
  
  //ARRAY OF PRODUCTS
  const products =[

    {class:"horizontal", id:"hidden-place", title:"Hidden place", price:1000, img:"../Assets/Pinetta_Maira__DSC_0396.jpg", size:"A4"},
    {class:"horizontal", id:"iridiscent-dreams", title:"Iridiscent dreams", price:1500, img:"../Assets/20x30_Collage.jpg", size:"A3"},
    {class:"horizontal", id:"refugio", title:"Refugio", price:1500, img:"../Assets/A5_edit2.jpg", size:"A3"},
    {class:"vertical", id:"home", title:"Home", price:1000, img:"../Assets/10x15_6890.jpg", size:"A4"},
    {class:"vertical", id:"anhelo", title:"Anhelo", price:1000, img: "../Assets/Pinetta_Maira_6974.jpg", size:"A4"},
    {class:"vertical", id:"soft", title:"Soft", price:1500, img:"../Assets/MairaPinetta_Balam5.jpg", size:"A3"}

  ]

  //FOR  para generar un array de los elementos con la clasee buttonProduct  con el for.each no se puede ?
  //con esto hago que sea dinamico el evento  en vez de ir por id 
  for (const nodeHTML of document.getElementsByClassName("buttonProduct")){

    //si hay click sobre alguno de esos elementos (nodos) extraigo el atributo "data-size" (a4, a3 etc)
    nodeHTML.addEventListener("click", (event) => {
      const sizeProduct= event.target.getAttribute("data-size");
      //ejecuto la funcion pasandole el parametro de size del elemento que se toco ej :A4 
      filterProducts(sizeProduct);
    });
  }

  
  //FUNCION para filtrar productos
  function filterProducts(sizeProduct) {
    //vacio las cards ya generadas en el html 
    document.getElementById("box-container-shop").innerHTML = " ";

    //en una variable  guardo  la accion producto.filter  para filtrar por el parametro que obtuve anteriormente de "data-size"
    const filteredProducts = products.filter ((product) => product.size === sizeProduct);

    //traigo la variable y  genero las cards a partir del dato de esta
    filteredProducts.forEach((product) => { 
      const idButton = `add-cart${product.id}`
      document.getElementById("box-container-shop").innerHTML += `<div class="box">
        <div class="image">
          <img class="${product.class}" src="${product.img}">
        </div>
  
        <div class="info"> 
          <h3 class="title"> ${product.title}</h3>    
          <div class="subInfo">
            <div class="price">${product.price}<i class="bi bi-flower2"></i></div>                        
          </div>
        </div>
  
        <div class="overlay">
          <a href="#" style="--i:1;" id= ${idButton} class="add fas fa-shopping-cart"></a>
          <a href="#" style="--i:2;" class="fas fa-heart"></a>
          <a href="#" style="--i:4;" class="fas fa-search"></a>
        </div>
        
      </div>`;
    });  
  }

  //for each producto del array productos hago las cards en el html 
  products.forEach((product) => { 
    const idButton = `add-cart${product.id}`
    document.getElementById("box-container-shop").innerHTML += `<div class="box">
      <div class="image">
        <img class="${product.class}" src="${product.img}">
      </div>

      <div class="info"> 
        <h3 class="title"> ${product.title}-${product.size}</h3>    
        <div class="subInfo">
          <div class="price">${product.price}<i class="bi bi-flower2"></i></div>                        
        </div>
      </div>

      <div class="overlay">
        <a href="#" style="--i:1;" id= ${idButton} class="add fas fa-shopping-cart"></a>
        <a href="#" style="--i:2;" class="fas fa-heart"></a>
        <a href="#" style="--i:4;" class="fas fa-search"></a>
      </div>
      
    </div>`;

  })


 //FUNCION AGREGO PRODUCTOS AL CARRITO Y SUMO EL  LOCAL STORAGE y sumo el SUBTOTAL
  products.forEach((product) => {  
    const idButton = `add-cart${product.id}`; //cuando hago click ne el boton se agrega a carrito la cantidad 
    document.getElementById(idButton).addEventListener('click', () =>{
      cart.push(product); //llevo el producto al carro   
      localStorage.setItem('cart', JSON.stringify(cart)); //seteo el carro al storage y cambio el valor a string para llevarlo al storage de nuevo
      //el reduce cuenta los elementos y ir acumulando los valores y los suma
      const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);

      //llevo al html la cantidad de productos y el total de estos a cart-total y a subtotal
      document.getElementById("cart-total").innerHTML =`${cart.length}`; // 
      document .getElementById("subtotal").innerHTML = `${subtotal}`; 
    });

    //FUNCION ELIMINO PRODUCTOS DEL CARRITO 
    // const removeItem = `add-cart${product.id}`;
    // document.getElementById(removeItem).addEventListener('click', () =>{
    //   cart.push(product); //llevo el producto al carro   
    //   localStorage.setItem('cart', JSON.stringify(cart)); //seteo el carro al storage y cambio el valor a string para llevarlo al storage de nuevo
    //   //el reduce cuenta los elementos y ir acumulando los valores y los suma
    //   const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);

    //   //llevo al html la cantidad de productos y el total de estos a cart-total y a subtotal
    //   document.getElementById("cart-total").innerHTML =`${cart.length}`; // 
    //   document .getElementById("subtotal").innerHTML = `${subtotal}`; 
    // });

  });

  //llevo los items al carrito del html
  cart.forEach((product) => {
    document.getElementById("cartWrapper").innerHTML += `
    <div class="cart-item">
      <img src="${product.img}">
      <div class="details">
        <h4 class="item-name">${product.title}</h4>
        <p>Descripción
          <span class="quantity">${cart.length}</span>
          <span class="price"> $${product.price}</span>
        </p>
      </div>
      <div class="cancel "><i id="removeItem" class="fa-solid fa-xmark minus"></i></div>
    </div>`
  });

  let num=0; //variable contador producto
  let iconfull = document.getElementById("icon-full");
  let iconempty = document.getElementById("icon-empty");
  
 //MODIFICO numero de productos del carrito
  $(".minus").click(function() { //para clase minus funcion restar producto
    num=num-1;
    $(".num").text(num);
    check(); //voy a la funcion check
  });

  $(".add").click(function() { //para la clase add funcion agregar producto
    num=num+1;
    $(".num").text(num);
    check(); 
    console.log(num)
  });
  
  //modifico icono del carrito
  function check() { //funcion checkear cantidad de productos
    if (num < 1) { // si el numero es menor a 1 modifico la clase del icono para visualizarlo  vacio
     // $(".fa-solid").removeClass("fa-cart-arrow-down");
      iconempty.classList.remove('iconhidden');
      iconfull.classList.add('iconhidden');

    } else if (num > 0 ) { //si el numero es mayor a 0 modifico la clase del icono para visualizarlo lleno
      iconfull.classList.remove('iconhidden');
      iconempty.classList.add('iconhidden');
     // $(".fa-solid").removeClass("fa-cart-shopping");
     // $(".fa-solid").addClass("fa-cart-arrow-down");
    }
  }
  
  check(); //llamo a la funcion
  $(".num").text(num); //el numero se transforma en texto

  const cartIcon = document.querySelector('.icon-cart') //selecciono icono del nav 
  const wholeCartWindow = document.querySelector('.whole-cart-window');  //selecciono ventana carrito
  
  //muestro y oculto carrito 
  cartIcon.addEventListener('click', () => { //si hay un click sobre el icon-cart disparo esta función

    wholeCartWindow.classList.toggle('hide-it'); //borra clase hide it y la muestra dependiendo el click

  })


});