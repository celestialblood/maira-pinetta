$(document).ready (function() { //documento listo corre por todo el codigo antes

  //seteo storage del carrito lo guardamos en cart //esto va siempre al principio
  // ?? significa que si esto es null o undefined  se va a guardar esto-> [] seteo en 0, si no puedo hacerlo con un if
  const cart= JSON.parse(localStorage.getItem('cart')) ?? []; 
  //el reduce cuenta los elementos y ir acumulando los valores y los suma
  const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);
    
  document.getElementById("cart-total").innerHTML =`${cart.length}`; // modifico su numero por cartlenght (cantidad productos del carro + el storage)
  document.getElementById("subtotal").innerHTML = `${subtotal}`; //Modifico el subtotal
  
  
  //ARRAY OF PRODUCTS
  const products =[

    {class:"horizontal", id:"hidden-place", title:"Hidden place - A4", price:1000, img:"../Assets/Pinetta_Maira__DSC_0396.jpg"},
    {class:"horizontal", id:"iridiscent-dreams", title:"Iridiscent dreams - A3", price:1500, img:"../Assets/20x30_Collage.jpg"},
    {class:"horizontal", id:"refugio", title:"Refugio - A3", price:1500, img:"../Assets/A5_edit2.jpg"},
    {class:"vertical", id:"home", title:"Home - A4", price:1000, img:"../Assets/10x15_6890.jpg" },
    {class:"vertical", id:"anhelo", title:"Anhelo - A4", price:1000, img: "../Assets/Pinetta_Maira_6974.jpg"},
    {class:"vertical", id:"soft", title:"Soft - A3", price:1500, img:"../Assets/MairaPinetta_Balam5.jpg"}

  ]

  products.forEach((product) => { //for each producto del array productos hago las cards en el html desde js
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

  })

  var num=0; //variable contador producto
  var iconfull = document.getElementById("icon-full");
  var iconempty = document.getElementById("icon-empty");
  

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

  });

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
  
  cartIcon.addEventListener('click', () => { //si hay un click sobre el icon-cart disparo esta función

    wholeCartWindow.classList.toggle('hide-it'); //borra clase hide it y la muestra dependiendo el click

  })


  });