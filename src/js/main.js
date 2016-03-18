/**
 * Created by master on 15/03/2016.
 */

var miapp = angular.module("pec01_p7", []);

miapp.controller('MainController', [function() {
    //Buena practica: utilizamos self en lugar de this
    var self = this;
    //Por defecto ponemos 1 para la cantidad
    self.cantidad = 1;
    //Array con los valores para los desplegables
    self.monedas = [
        {label: 'Euro', value: 0},
        {label: 'Dólar', value: 1},
        {label: 'Libra', value: 2}
    ];
    //Array bidimensional que contiene los valores de cambio coincidiendo
    //con los indices asignados como valor en los desplegables dispuestos en
    //las filas y columnas
    self.cambios = [[1,1.2,0.71],[0.83,1,0.59],[1.4,1.68,1]];
    //Por defecto, marcamos el euro como moneda de origen
    self.monedaOrigen = self.monedas[0];
    //Por defecto, marcamos el dolar como moneda de destino
    self.monedaDestino = self.monedas[1];

}]);

//Directiva para el control de valores no numericos como entrada
//Los input type=number no permiten valores no numericos en chrome
//pero no estan controlados en otros navegadores. Mediante esta directiva
//impedimos la introduccion de valores no numericos en la cantidad
miapp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope) {
            scope.$watch('ctrl.cantidad', function(newValue,oldValue) {
                if (isNaN(newValue)) {
                    scope.ctrl.cantidad = oldValue;
                }
            });
        }
    };
});