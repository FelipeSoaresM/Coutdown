// guarda informações da configuração de horário no Local Storage
if (localStorage.length) {
  var local = localStorage.getItem('dataTimeValue')
  document.querySelector('#meeting-time').value = local;
  setDataTime();
}

// menu
var menuToggle = document.querySelector('.menu-toggle');
var navigation = document.querySelector('.navigation');
menuToggle.onclick = () => {
  navigation.classList.toggle('open');

  var listItemsText = document.querySelectorAll('.text');
  listItemsText.forEach(item => {
    item.classList.toggle('hide');
  });
}

// theme switcher

var elementToggle = document.getElementById('bolinha');
elementToggle.addEventListener("click", toggleTheme);

function toggleTheme() {
  var bolinha = document.getElementById('bolinha').classList.toggle('on');

  var theme = document.getElementById('container').className;
  if (theme == 'theme-light') {
    document.getElementById('container').classList.remove('theme-light');
    document.getElementById('container').classList.add('theme-dark');
  } else {
    document.getElementById('container').classList.remove('theme-dark');
    document.getElementById('container').classList.add('theme-light');
  }

}

// configuração
var btn = document.querySelector('.btn-set-cowntdown');
btn.addEventListener('click', () => {
  setDataTime();
  alert('Countdown Iniciado!');
  location.reload();
})


// coutdown
'use strict';
var formatarDigito = (digito) => `0${digito}`.slice(-2);

var atualizar = (tempo) => {
  var dias = document.getElementById('dias');
  var horas = document.getElementById('horas');
  var minutos = document.getElementById('minutos');
  var segundos = document.getElementById('segundos');

  var qtdDias = Math.floor(tempo / (60 * 60 * 24));
  var qtdHoras = Math.floor((tempo % (60 * 60 * 24)) / (60 * 60));
  var qtdMinutos = Math.floor((tempo % (60 * 60)) / 60);
  var qtdSegundos = tempo % 60;

  segundos.textContent = formatarDigito(qtdSegundos);
  minutos.textContent = formatarDigito(qtdMinutos);
  horas.textContent = formatarDigito(qtdHoras);
  dias.textContent = formatarDigito(qtdDias);
}

function contagemRegressiva(tempo) {

  var pararContagem = () => clearInterval(id);

  var contar = () => {
    if (tempo == 0) {
      pararContagem();
      localStorage.removeItem("dataTimeValue");
    }
    atualizar(tempo);
    tempo--;
  }
  var id = setInterval(contar, 1000);
}

function tempoRestante(dataEvento) {
  var hoje = Date.now();
  return Math.floor((dataEvento - hoje) / 1000);
}

function setDataTime() {

  var dataTimeValue = document.querySelector('#meeting-time').value;
  var dataTimeValueMili = Date.parse(dataTimeValue);

  contagemRegressiva(tempoRestante(dataTimeValueMili));

  localStorage.setItem('dataTimeValue', dataTimeValue);
}



