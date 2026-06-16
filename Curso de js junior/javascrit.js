
/* 
let nombreEmpresa=prompt("En que empresa trabajas");

let nombre=prompt("cual es tu nombre");
let salario=prompt("cual es tu salario");
let cargo=prompt("cual es tu cargo");

let respuesta=`Hola ${nombre} trabajas en ${nombreEmpresa} tu salario es de ${salario} y desempeñas                                                                                                                                     el cargo de ${cargo} en ${nombreEmpresa}`; 

alert(respuesta)
*/

/*
let edad =prompt("cual es tu edad");
let contrasenaCorrecta = true;
let estaBloqueado = false;

if (edad >= 18 && contrasenaCorrecta && !estaBloqueado) {
  document.write("Acceso permitido");
} else {
  document.write("Acceso denegado");
}
*/

/*
var dia=prompt("que dia es hoy");

if (dia == "lunes") {
    console.log("el dia de hoy lunes hay un descuento del 10%")
}

if (dia == "viernes") {
    console.log("el dia de hoy viernes hay un descuento del 20%")
}

else{
 console.log("el dia de hoy  no hay descuentos")
}
*/

/*
let productos=[ "pan","pollo","arroz","queso","leche"]
document.write("que producto quieres" + "" +  productos[2])
*/

/*
const pcVenta={
  nombre:"pc gamer",
  procesador:"core i9",
  Ram:"62 GB",
  M2:"5T",
  TG:"6090",
  precio:5.000

}

const pcVenta2={
  nombre:"pc gamer",
  procesador:"core 59",
  Ram:"16 GB",
  M2:"1T",
  TG:"6010",
  precio:1.555
}

const pcVenta3={
  nombre:"pc gamer",
  procesador:"core i7",
  Ram:"32 GB",
  M2:"1T",
  TG:"6050",
  precio:3.000

}


console.log(pcVenta)
alert(pcVenta2)
document.write(pcVenta3)

*/


/*

const Estudientes=["ana", "pedro","jose","kevin"]

for (let i = 0; index < array.length; index++) {
  const element = array[index];
  
}

*/

/*manejo y practica de bucle all*/

/*
for (let i = 1; i <= 10; i++) {
  console.log(i);
}

*/


/*
let suma=0;

for (let i = 0; i < 1000; i++) {
  suma += i; 
  
}

console.log("la suma es"+ suma)

*/

/*
let entrada;
do {
  entrada = prompt("Escribe un número o 'salir' para terminar");
  console.log("Escribiste:", entrada);
} while (entrada !== "salir");

*/
/*
let productos = [
  { nombre: "Teclado", precio: 80 },
  { nombre: "Mouse", precio: 120 },
  { nombre: "Monitor", precio: 300 }
];

for (let producto of productos) {
  if (producto.precio > 100) {
    console.log(producto.nombre + " cuesta " + producto.precio);
  }
}
*/

/*
let numero = 0;

while (numero < 20) {

  numero++

  document.write(numero + "<br>"
   )

  if( numero === 15){
    break or continue
  }
}
  */

/*
for (let i = 0; i <= 50; i++) {  
  if( i % 5 === 0){
    console.log(i)
  }
}
*/
/*
let suma = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 === 0) {
    suma += i;
  }
}

console.log("La suma de los pares del 1 al 100 es:", suma);
*/
/*
let palabra=prompt("introduce el texto que deseas saber cuantas A tiene:");
let contador=0; 
for (texto of palabra) {
  if( texto == "a"){
    contador++
  }
}
 console.log(contador)

 */

 /*
 let inventario = [
  { nombre: "Gorra", stock: 0 },
  { nombre: "Camisa", stock: 5 },
  { nombre: "Pantalón", stock: 2 },
  { nombre: "Zapatos", stock: 0 }
];

for (producto of inventario) {
  if(producto.stock >  0){
    console.log("la cantida disponible " + producto.nombre +"es de:" + producto.stock)
  }
}

 */
 /*
document.write("miniproyecto Empresa")


const empresa = "TechJuan S.A.S";

var sistemaActivo = true;

let empleados = [
  { nombre: "Ana", edad: 25, cargo: "Desarrolladora", salario: 1100000, activo: true },
  { nombre: "Carlos", edad: 19, cargo: "Diseñador", salario: 1350000, activo: true },
  { nombre: "Laura", edad: 32, cargo: "Gerente", salario: 2000000, activo: false },
  { nombre: "Luis", edad: 21, cargo: "Soporte", salario: 1000000, activo: true }
];

for (personal of empleados) {
  if (personal.activo === true) {
    
  if(personal.nombre == "carlos"){
    break
  }
    if (personal.salario < 1200000) {
      let beneficio= personal.salario * 0.10;

      personal.salario += beneficio
          console.log("EL empleado"+" "+personal.nombre + " "+"con el cargo de"+" "+ personal.cargo+" "+"con un salario de" +" "+ personal.salario+" "+"se le aumetara un 10% de beneficio a su salario por su buen desempeño que seria de:" +" "+beneficio )

    }

  
  
  }

}
 */
  
 /* forma conrrecta chatgpt

const empresa = "TechJuan S.A.S";
var sistemaActivo = true;

let empleados = [
  { nombre: "Ana", edad: 25, cargo: "Desarrolladora", salario: 1100000, activo: true },
  { nombre: "Carlos", edad: 19, cargo: "Diseñador", salario: 1350000, activo: true },
  { nombre: "Laura", edad: 32, cargo: "Gerente", salario: 2000000, activo: false },
  { nombre: "Luis", edad: 21, cargo: "Soporte", salario: 1000000, activo: true }
];

// Mostrar empleados activos
console.log("📋 Lista de empleados activos en " + empresa + ":");

for (let empleado of empleados) {
  if (!empleado.activo) continue; // Saltar inactivos

  // Bonificación
  let bonificacion = 0;
  if (empleado.salario < 1200000) {
    bonificacion = empleado.salario * 0.10;
    empleado.salario += bonificacion;
  }

  // Carta
  let carta = `Hola ${empleado.nombre}, tu cargo es ${empleado.cargo} y tu salario actualizado es $${empleado.salario}. `;
  carta += bonificacion > 0 ? "Recibiste una bonificación." : "No aplicaste para bonificación.";

  console.log(carta);

  // Buscar a Carlos
  if (empleado.nombre === "Carlos") {
    console.log("🔎 Se encontró a Carlos. Terminando búsqueda.");
    break;
  }
}
 */

/* Funciones */

/* 
function suma(num1,num2){
  let resultado=num1+num2;
  document.write("la suam de los numero es:"+resultado)
  return resultado
  
}

suma(23,45)

*/

/*
function calcularSalario(salarioBase, bonificacionPorcentaje) {
  let bonificacion = salarioBase * (bonificacionPorcentaje / 100);
  return salarioBase + bonificacion;
}

let salarioTotal = calcularSalario(1200000, 10);
console.log("Salario total con bonificación: $" + salarioTotal);

*/

/* 
let edad=prompt("indicame cual es tu edad")

function validarsistema(edad,permiso,estado){
  if(edad > 18 && permiso == true && estado== true){
    document.write( " ✅Aceso correcto")}
  else{ 
    document.write(" ⛔Aceso no correcto")
  }
}


validarsistema(edad,true,true)

*/
/* 
let nombre=prompt("cual es el nombre del empleado")
let edad=prompt("cual es la edad del empleado")
let cargo=prompt("cual es el cargo del empleado")
let salario=prompt("cual es el salario del empleado")

function ingresarEmpleado(edad,nombre,cargo,salario){
    let newEmpleado={
    nombre: nombre,
    edad: edad,
    cargo: cargo,
    salario: salario
    }

    console.log(newEmpleado)

   return{
    nombre: nombre,
    edad: edad,
    cargo: cargo,
    salario: salario
   }
}

let newEmpleado=ingresarEmpleado(nombre.nombre,edad,cargo,salario)

document.write(newEmpleado.nombre, newEmpleado.edad , newEmpleado.cargo, newEmpleado.salario)

*/

/* CLASS */
/*
class Empleado {
  constructor(nombre, cargo) {
    this.nombre = nombre;
    this.cargo = cargo;
  }
}

let empleado1 = new Empleado("Juan", "Desarrollador");
document.w(empleado1);

*/


/*
class Producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  calcularTotal() {
    return this.precio * this.cantidad;
  }
}

let arroz = new Producto("Arroz", 3000, 5);
console.log("Total a pagar:", arroz.calcularTotal());
*/

/*
class banco{
     constructor(nombre,documento){
      this.nombre=nombre,
      this.documento
     }

}
*/
/*
class clientes{
  constructor(nombre,edad,documento,ciudad){
  this.nombre=nombre;
  this.edad = edad;
  this.documento=documento;
  this.ciudad=ciudad;
 }

}

let Cliente1= new clientes("diana", 23,21239393844,"cali")
console.log(Cliente1)

let Cliente2= new clientes("diego", 33,22334555533,"medellin")
console.log(Cliente2)
*/

/*
class cuenta{
  constructor(titular){
    this.titular=titular;
    this.saldo=0;
  }
  deposito(monto){
    if (monto>0) this.saldo += monto;
  }

  versaldo(){
    return `saldo actual de:${this.titular} es de ${this.saldo}` 
  }
}


 let cuenta1=new cuenta("juan");
cuenta1.deposito(199990);
console.log(cuenta1.versaldo())
*/

/*
class Cuenta {
  #saldo = 0;

  depositar(monto) {
    if (monto > 0) this.#saldo += monto;
  }

  verSaldo() {
    return this.#saldo;
  }
}

class Empleado {
  constructor(nombre, cargo, salario) {
    this.nombre = nombre;
    this.cargo = cargo;
    this.salario = salario;
    this.cuenta = new Cuenta();
  }

  calcularBono() {
    return 0; // Por defecto, sin bono
  }

  pagarBono() {
    let bono = this.calcularBono();
    this.cuenta.depositar(bono);
    console.log(`${this.nombre} recibió un bono de $${bono}`);
  }

  verCuenta() {
    console.log(`${this.nombre} tiene en cuenta: $${this.cuenta.verSaldo()}`);
  }
}

class Gerente extends Empleado {
  calcularBono() {
    return this.salario * 0.2;
  }
}

class Vendedor extends Empleado {
  calcularBono() {
    return this.salario * 0.1;
  }
}

// Instanciación
let gerente = new Gerente("Juan", "Gerente", 5000000);
let vendedor = new Vendedor("Ana", "Vendedora", 2000000);

gerente.pagarBono();
vendedor.pagarBono();

gerente.verCuenta();
vendedor.verCuenta();
*/

/*
class Empleado {
  constructor(nombre, salario) {
    this.nombre = nombre;
    this.salario = salario;
  }

  mostrarInfo() {
    console.log(`${this.nombre} gana $${this.salario}`);
  }
}

class Gerente extends Empleado {
  constructor(nombre, salario, departamento) {
    super(nombre, salario); // Llama al constructor del padre
    this.departamento = departamento;
  }

  mostrarInfo() {
    super.mostrarInfo();
    console.log(`Departamento: ${this.departamento}`);
  }
}

let empleado = new Empleado("kim kardachan","200000000000")
let gerente = new Gerente("Laura", 6000000, "Tecnología");
gerente.mostrarInfo();
empleado.mostrarInfo()


class Matematicas {
  static sumar(a, b) {
    return a + b;
  }

  static restar(a, b) {
    return a - b;
  }
}

console.log(Matematicas.sumar(10, 5)); // 15
console.log(Matematicas.restar(10, 3)); // 7
*/
/*
class CuentaBancaria {
  #saldo = 0;

  constructor(titular) {
    this.titular = titular;
  }

  get saldo() {
    return this.#saldo;
  }

  set saldo(valor) {
    if (valor >= 0) {
      this.#saldo = valor;
    } else {
      console.log("❌ No se puede asignar saldo negativo");
    }
  }
}

let cuenta = new CuentaBancaria("Juan");
cuenta.saldo = 5000;         // Usa el setter
console.log(cuenta.saldo);   // Usa el getter
cuenta.saldo = -1000;        // Muestra error
*/

/* METODOS DE CADENA  */
/* METODOS DE CADENA  */
/* METODOS DE CADENA  */
/* METODOS DE CADENA  */

/* practica y prueba finalizacion del curso junior */

/* ejercicio 1  pide al usuario dos valores por prompt,
 conviértelos a número y suma. Si uno no es válido, avisa.
 */
/*
 // Pedir los dos valores al usuario
let valor1 = prompt("Ingresa el primer número:");
let valor2 = prompt("Ingresa el segundo número:");

// Convertir los valores a número
valor1 = Number(valor1);
valor2 = Number(valor2);

// Validar si los valores son números válidos
if (isNaN(valor1) || isNaN(valor2)) {
  alert("Uno o ambos valores no son números válidos. Intenta de nuevo.");
} else {
  // Calcular la suma
  let suma = valor1 + valor2;
  alert("La suma de los dos valores es: " + suma);
}
 */

/* Cap.2: crea funciones operaciones básicas (suma, resta, etc.)
 y muestra resultados con templates literales.  */

/*
const sumar=(num1, num2)=>{
  let respusta= num1 + num2;
   return alert(respusta) ;
}


const resta=(num1, num2)=>{
  let respusta= num1 - num2;
   return alert(respusta) ;
}


const multiplicar=(num1, num2)=>{
  let respusta= num1 * num2;
   return alert(respusta) ;
}

let num1=prompt("introduce valor1 para operar")
let num2=prompt("introduce valor2 para operar")
num1=Number(num1)
num2=Number(num2)


sumar(num1,num2)
resta(num1,num2)
multiplicar(num1,num2)
*/

