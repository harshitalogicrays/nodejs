function calc(opr) {
  let n1=parseInt(document.getElementById('num1').value)
  let n2=parseInt(document.getElementById('num2').value)
  document.getElementById("res").innerHTML = eval(n1+opr+n2) 
}


console.log(eval('1-2+3*5%2+3')) 