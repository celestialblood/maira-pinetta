$(document).ready(function() { //documento listo corre por todo el codigo antes

    var num=0; //variable contador producto
    var iconfull = document.getElementById("icon-full");
    var iconempty = document.getElementById("icon-empty");

    $(".minus").click(function() { //para clase .minus funcion restar producto
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
  
    function check() {
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
    $(".num").text(num);
    
  });