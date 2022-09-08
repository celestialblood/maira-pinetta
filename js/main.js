$(document).ready (function() { //funcion documento listo corre por todo el codigo antes

  
  //CART SIEMPRE VA AL PRINCIPIO, variable global
  //seteo el storage del carrito lo guardamos en cart // aca traigo si hay algo en el storage al carrito 
  // ?? significa que si esto es null o undefined  se va a guardar esto-> [] seteo en 0, si no puedo hacerlo con un if
  const cart= JSON.parse(localStorage.getItem('cart')) ?? []; 
  //el reduce cuenta los elementos y ir acumulando los valores y los suma
  const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);
    
  document.getElementById("cart-total").innerHTML =`${cart.length}`; // modifico su numero por cartlenght (cantidad products del carro + el storage)
  document.getElementById("subtotal").innerHTML = `${subtotal}`; //Modifico el subtotal


  /*fetch json*/
  const inicializar = async () => {
    const products = await fetchProducts();
    generarInterfaz(products);
    return products;
  };

  const generarInterfaz = (responseFinal) => {
    createCards(responseFinal);
    addProduct(responseFinal);
    renderCart(responseFinal);
    filterBySize(responseFinal);
    check(responseFinal);
  }

  const fetchProducts = async () => {
    const response = await fetch ('../products.json');
    const responseFinal = await response.json();
    return responseFinal
  }


  for (const nodeHTML of document.getElementsByClassName("buttonProduct")){

    //si hay click sobre alguno de esos elementos (nodos) extraigo el atributo "data-size" (a4, a3 etc)
    nodeHTML.addEventListener("click", (event) => {
      const sizeProduct= event.target.getAttribute("data-size");
      //ejecuto la funcion pasandole el parametro de size del elemento que se toco ej :A4 
      filterBySize(sizeProduct);
    });
    async function filterBySize (sizeProduct){
      const products = await fetchProducts();
      const productsBysize= products.filter(product => product.size === sizeProduct);
      generarInterfaz(productsBysize);
    }; 
  }


  
  inicializar();

  /* CARDS */

  function createCards(cargarproducts){
    let cards = "";
    cargarproducts.forEach((product) => { 
      let idButton 
      idButton= `add-cart-${product.id}`
      cards += `<div class="box">
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
          <button href="#" style="--i:1;" id= ${idButton} class="add fas fa-shopping-cart"></button>
          <button href="#" style="--i:2;" class="fas fa-heart"></button>
          <button href="#" style="--i:4;" class="fas fa-search"></button>
        </div>

      </div>`;

    });
    document.getElementById("box-container-shop").innerHTML= cards;
  };


  /* add AL CARRITO */

  function addProduct(cargarproducts) {

    cargarproducts.forEach((product) =>{
      idButton= `add-cart-${product.id}`;
      document.getElementById(idButton).addEventListener('click', () =>{

        cart.push(product); //llevo el product al carro   
        localStorage.setItem('cart', JSON.stringify(cart)); //seteo el carro al storage y cambio el valor a string para llevarlo al storage de nuevo
        //el reduce cuenta los elementos y ir acumulando los valores y los suma
        const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);

        //llevo al html la cantidad de products y el total de estos a cart-total y a subtotal
        document.getElementById("cart-total").innerHTML =`${cart.length}`; // 
        document .getElementById("subtotal").innerHTML = `${subtotal}`; 
        console.log(cart.length)
        renderCart();

      });
    });
  }

  /// CARRITO ICON
  let num=cart.length; //variable contador product

  const cartIcon = document.querySelector('.icon-cart') //selecciono icono del nav 
  const wholeCartWindow = document.querySelector('.whole-cart-window');  //selecciono ventana carrito

  //muestro y oculto carrito 
  cartIcon.addEventListener('click', () => { //si hay un click sobre el icon-cart disparo esta función
    
    renderCart(cart);
    check();
    wholeCartWindow.classList.toggle('hide-it'); //borra clase hide it y la muestra dependiendo el click
  });



  let iconfull = document.getElementById("icon-full");
  let iconempty = document.getElementById("icon-empty");    

  //Funciones
  //modifica icono del carrito si esta vacio o con products
  function check() { //funcion checkear cantidad de products

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


  // rendereo carrito y agregacion de listeners para el borrado 
  function renderCart(cart) {

    document.getElementById("cartWrapper").innerHTML = ''

    cart.forEach((product,index) => {
      removeidButton= `remove-cart-${index}-${product.id}`
      document.getElementById("cartWrapper").innerHTML += `
      <div class="cart-item">
        <img src="${product.img}">
        <div class="details">

          <h4 class="item-name">${product.title}</h4>
          <p>Descripción

            <span class="price"> $${product.price}</span>
          </p>
        </div>
        <div class="cancel "><i id=${removeidButton} class="fa-solid fa-xmark minus"></i></div>
      </div>`;



    });

    cart.forEach((product,index) => {
      removeidButton= `remove-cart-${index}-${product.id}`;
      document.getElementById(removeidButton).addEventListener('click', () =>{
        Swal.fire({ // sweet alert
          title: 'Are you sure?',
          text: "You can add it again if you change your mind",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'The product has been deleted.',
              'success'
            )
            cart.splice(index, 1)
            renderCart(cart)
            localStorage.setItem('cart', JSON.stringify(cart)); 
            const subtotal= cart.reduce((accumulator, product) => accumulator + product.price, 0);
            //llevo al html la cantidad de products y el total de estos a cart-total y a subtotal
            document.getElementById("cart-total").innerHTML =`${cart.length}`; // 
            document .getElementById("subtotal").innerHTML = `${subtotal}`; 
          }
        })
      
      })
    });



  }
  // /* BORRAR products */

  // function borrarproduct(cargarproducts) {
  //   cargarproducts.forEach((product) => {
  //   const idBotonDelete = `delete-cart${product.id}`;
  //   document.getElementById(idBotonDelete).addEventListener("click", () => {
  //     const productAEliminar = productsEnCarrito.findIndex(
  //       (products) => products.id === product.id
  //     );
  //     console.log(productAEliminar + "posición product a eliminar");
  //     if (productAEliminar !== -1) {
  //       productsEnCarrito.splice(productAEliminar, 1);
  //     }
  //     localStorage.setItem("totalCarrito", JSON.stringify(productsEnCarrito));
  //     console.log(productsEnCarrito);
  //     document.getElementById("btnCarritoTotal").innerHTML = `${productsEnCarrito.length}`;
  //     Toastify({
  //         text: "Eliminaste " + `${product.nombre}` + " del carrito",
  //         duration: 3000,
  //         gravity: "bottom",
  //         style: {
  //           background: "rgb(228, 98, 141)",
  //         },
  //       }).showToast();
  //       renderCarrito();
  //       renderTotalCarrito();
  //   });
  //  });
  // };

  // /* CARRITO POPUP */

  // function renderCarrito() {
  //   let cardsPopUp = "";
  //   productsEnCarrito.forEach(({id, nombre, precio, imagen}) => {
  //     cardsPopUp += `<div class="cardTest">
  //               <div>
  //               <img src='${imagen}' class="imagenCardsPopup">
  //               </div>
  //               <h2>${nombre}</h2>
  //               <h4>$${precio}</h4>
  //               </div>`;                       
  //   });
  //   document.getElementById("productsAgregados").innerHTML = cardsPopUp;
  // };

  // /* TOTAL CARRITO POPUP */

  // let totalCarritoPopUp ="";

  // function renderTotalCarrito() {
  //   const totalCarrito = productsEnCarrito.reduce(
  //     (acumulador, product) => acumulador + product.precio, 0
  //     );
  //     totalCarritoPopUp =`<div class="cardTest separador">
  //                       <h2>TOTAL: </h2>  
  //                       <h4>$${totalCarrito}</h4>
  //                       </div>`;
  //   document.getElementById("totalCompra").innerHTML = totalCarritoPopUp;
  // };


});

