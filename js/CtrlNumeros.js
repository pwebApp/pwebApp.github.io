"use strict";
BigNumber.config({DECIMAL_PLACES: 2, ROUNDING_MODE: BigNumber.ROUND_HALF_UP});
var FMT_ENTERO = "0,0",
        FMT_NUMERO = "0,0.00",
        FMT_MONEDA = "$0,0.00",
        FMT_PORCENTAJE = "0.00%",
        forma = document.getElementById("forma"),
        medidor = document.getElementById("medidor"),
        salidaEntero = document.getElementById("salidaEntero"),
        salidaRango = document.getElementById("salidaRango"),
        salidaNumero = document.getElementById("salidaNumero"),
        salidaPorcentaje = document.getElementById("salidaPorcentaje");
Node.prototype.error = function (mensaje) {
  this.className = "error";
  this.textContent = mensaje;
};
Node.prototype.info = function (mensaje) {
  this.className = "";
  this.textContent = mensaje;
};
forma.addEventListener("submit", procesa, false);
forma["limpiar"].addEventListener("click", limpiar, false);
function procesa() {
  var entero = forma["entero"].valueAsNumber ? forma["entero"].valueAsNumber
          : parseInt(forma["entero"].value),
          rango = parseInt(forma["rango"].value),            
          numero = numeral().unformat(forma["numero"].value),
          error = false;
  if (isNaN(entero)) {
    error = true;
    salidaEntero.error("Entero Incorrecto");
  }
  if (isNaN(numero)) {
    error = true;
    salidaEntero.error("Número Incorrecto");
  }
  if (isNaN(rango)) {
    error = true;
    salidaEntero.error("Rango Incorrecto");
  }
  if (!error) {   
    var precio = new BigNumber(numero).times(new BigNumber(2)), 
        numeroEnTexto = numeral(numero).format(FMT_NUMERO),
        porcentaje = entero / rango,
        porcentajeEnTexto = numeral(porcentaje).format(FMT_PORCENTAJE);
    forma["numero"].value = numeroEnTexto;
    medidor.textContent = porcentajeEnTexto;
    medidor.value = Math.min(1, porcentaje);
    salidaEntero.info(numeral(entero).format(FMT_ENTERO));
    salidaNumero.info("Precio: "+ numeral(precio).format(FMT_MONEDA));
    salidaRango.info(numeral(rango).format(FMT_ENTERO));
    salidaEntero.info(porcentajeEnTexto);
  }
}
function limpiar(){
  forma["entero"].value = "";
  forma["numero"].value = "";
  forma["rango"].value = "";
  salidaEntero.textContent="";
  salidaRango.textContent="";
  salidaNumero.textContent="";
  salidaPorcentaje.textContent="";
}