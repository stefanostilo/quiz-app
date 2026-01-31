const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ8q1ngIDXQgwebZwwbO14cFWAoDhX-Sssm6aCMh8ybJcB1jc5nseaWlEMI_G27zxl_kN4L68x6Mskk/pub?output=csv";

let domande = [];
let index = 0;
let punteggio = 0;

fetch(sheetURL)
  .then(res => res.text())
  .then(data => {
    const righe = data.split("\n").slice(1);
    domande = righe.map(r => r.split(","));
    mostra();
  });

function mostra() {
  const d = domande[index];
  document.getElementById("quiz").innerHTML = `
    <p>${d[1]}</p>
    <button onclick="risposta('A')">${d[2]}</button><br>
    <button onclick="risposta('B')">${d[3]}</button><br>
    <button onclick="risposta('C')">${d[4]}</button><br>
    <button onclick="risposta('D')">${d[5]}</button>
  `;
}

function risposta(r) {
  if (r === domande[index][6]) punteggio++;
}

function next() {
  index++;
  if (index < domande.length) mostra();
  else document.getElementById("quiz").innerHTML =
    `Fine quiz! Punteggio: ${punteggio}/${domande.length}`;
}
