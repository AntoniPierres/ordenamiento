//inicializando constantes (html) y variables.
const item_content = $('#array-content');
const item = "<div class='item-array' id=':id:'><span class='number'>:number:</span></div>'";
//variables
var numbers = [];
var total = 0;
/*-----------------------------------------------*/
/*-------------- Botones de acción --------------*/
//acción añadir
$('#addnumber').click(function() {
  if (validateNumber()) {
    addElement();
  } else {
    showWrong();
  }
  clearandfocus();
  console.log(numbers);
});
$("input[name='numberin']").keypress(function() {
  if (event.keyCode==13) {
    if (validateNumber()) {
      addElement();
    } else {
      showWrong();
    }
    clearandfocus();
    console.log(numbers);
  }
});
//acción ordenar
$('#order').click(function () {
    var ordernumbs = order(numbers);
    //clearNumbs();
    //addViewElements(ordernumbs);
    console.log(ordernumbs);
});
/*-----------------------------------------------------*/
//almacenar números temporales
function addElement() {
  reset();
  number = $('input[name="numberin"]').val();
  numbers[total] = parseInt(number);
  total++;
  addViewElement(number);
}
/*-----------------------------------------------------*/
/*---------- Añadir elementos al DOM ------------------*/
function addViewElement(numb) {
  var element = item
      .replace(':number:', numb)
      .replace(':id:',numb);
  var $element = $(element);
  item_content.append($element.show());
}
function addViewElements(numbs) {
  numbs.forEach(function(n) {
    addViewElement(n);
  })
}
/*********************************************************/
/************* Limpiar DOM ******************************/
function clearNumbs() {
  //item_content.empty();
}
function clearandfocus() {
  $('input[name="numberin"]').val("").focus();
}
function reset() {
  var formGroup = $('#form-group');
  $('.form-control-feedback', formGroup).remove();
  var input = $('#form-group input[name="numberin"]');
  formGroup.removeClass();
  formGroup.addClass('form-group');
  input.removeClass();
  input.addClass('form-control');
}
/******************************************************/
/************** Ordenamiento de números ***************/
function order(numbs) {
  for (var i = 0; i < (numbs.length-1); i++) {
    for (var j = 0; j < (numbs.length-i); j++) {
      if (numbs[j] > numbs[j+1]) {
        animation(numbs[j],numbs[j+1]);
        aux = numbs[j];
        numbs[j] = numbs[j+1];
        numbs[j+1] = aux;
      }
    }
  }
  return numbs;
}
/************************************************/
/**************** animacion ***************/
function animation(a,b) {
  console.log(a,b);
  $('#'+a).animate({
    "left": "+=100px"
  },'slow');
  $('#'+b).animate({
    "right": "+=100px"
  },'slow');
}
/************************************************/
/**************** validar número ***************/
function validateNumber() {
  n = $('input[name="numberin"]').val();
  n = parseInt(n);
  if (n > 0 && numbers.indexOf(n) < 0 ) {
      return true
  }
  return false;
}
/*************************************************/
/**************** mostrar error *******************/
function showWrong() {
  var formGroup = $('#form-group');
  $('.form-control-feedback', formGroup).remove();
  var input = $('#form-group input[name="numberin"]');
  formGroup.removeClass();
  formGroup.addClass('form-group');
  input.removeClass();
  input.addClass('form-control');
  var feedback = $('<div class="form-control-feedback"></div>');
  formGroup.addClass('has-danger');
  input.addClass('form-control-danger');
  feedback.text("Ingreso erróneo, intente con un número real y no repetido");
  formGroup.append(feedback);
}
