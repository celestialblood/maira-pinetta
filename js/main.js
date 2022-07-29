$(document).ready(function() { //documento listo corre por todo el codigo

    var num=0; //variable contador producto
  
    $(".minus").click(function() { //para clase .minus funcion restar producto
      num=num-1;
      $(".num").text(num);
      check(); //voy a la funcion check
    });
  
    $(".add").click(function() { //para la clase add funcion agregar producto
      num=num+1;
      $(".num").text(num);
      check(); 
    });
  
    function check() {
      if (num < 1) { // si el numero es menor a 1 modifico la clase del icono para visualizarlo  vacio
        $(".icon-bag").removeClass("no-empty scale");
      } else if (num > 0 ) { //si el numero es mayor a 0 modifico la clase del icono para visualizarlo lleno
        $(".icon-bag").removeClass("cart basket scale scale-cart scale-basket");
        $(".icon-bag").addClass(" scale no-empty");
      }
    }
    
    check();
    $(".num").text(num);
    
  });