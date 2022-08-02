$(document).ready (function() { //documento listo corre por todo el codigo antes

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
    
    function carrito() { //contador carrito
      //array productos
      let productos = [ 
        Number(document.getElementById('A3').value),
        Number(document.getElementById('A4').value),
        Number(document.getElementById('A5').value),
      ];
     
        // asigno al valor del input (cantidad) el valor del producto
      let total = [ 
        document.getElementById('A3').value * 2000,
        document.getElementById('A4').value * 1000,
        document.getElementById('A5').value * 500,
      ];
      // Declaro
      let contarproducto = 0;
      let totaltotal = 0;
    
      contarproducto = parseInt(contarproducto);
      totaltotal = parseInt(total);
    
      if (isNaN(totaltotal, contarproducto)) {
    
        alert('Por favor ingrese números no letras.');
    
      }
      
      // voy poor cada producto y lo agrego a la lista 
      for (let i = 0; i < productos.length; i++){
        contarproducto += productos[i];
      }
      
      // obtengo el total 
      for (let j = 0; j < total.length; j++){
        totaltotal += total[j];
      }
      
      document.getElementById('totalProductos').innerHTML = "Productos: " + contarproducto;
      document.getElementById('totaltotal').innerHTML = "Total: $" + totaltotal.toFixed(2);
      
    
    }



  });