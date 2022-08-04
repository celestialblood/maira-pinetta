$(document).ready (function() { //documento listo corre por todo el codigo antes

  const products =[ //ARRAY OF PRODUCTS

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

    // function cart() { //contador carrito
    //   //array productos
    //   let productos = [ 
    //     Number(document.getElementById('hidden-place').value),
    //     Number(document.getElementById('iridiscent-dreams').value),
    //     Number(document.getElementById('refugio').value),
    //     Number(document.getElementById('soft').value),
    //     Number(document.getElementById('home').value),
    //     Number(document.getElementById('anhelo').value),

    //   ];
     
    //     // asigno al valor del input (cantidad) el valor del producto
    //   let total = [ 
    //     document.getElementById('hidden-place, home, anhelo').value * 1000,
    //     document.getElementById('iridiscent-dreams, refugio, soft').value * 1500,
    //   ];
    //   // Declaro
    //   let contarproducto = 0;
    //   let totaltotal = 0;
    
    //   contarproducto = parseInt(contarproducto);
    //   totaltotal = parseInt(total);
    
    //   if (isNaN(totaltotal, contarproducto)) {
    
    //     alert('Por favor ingrese números no letras.');
    
    //   }
      
    //   // voy poor cada producto y lo agrego a la lista 
    //   for (let i = 0; i < productos.length; i++){
    //     contarproducto += productos[i];
    //   }
      
    //   // obtengo el total 
    //   for (let j = 0; j < total.length; j++){
    //     totaltotal += total[j];
    //   }
      
    //   document.getElementById('totalProductos').innerHTML = "Productos: " + contarproducto;
    //   document.getElementById('totaltotal').innerHTML = "Total: $" + totaltotal.toFixed(2);
      
    
    // }



  });