const input = document.getElementById('lbsInput');
const output = document.getElementById('output');

//service worker registration

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(function(){
    console.log('service worker registered');
  }, function (err) {
    console.log('sw failed to install', err)
  })
}


output.style.visibility = 'hidden';
input.addEventListener('input', (e) => {
  let lbs = e.target.value;

  output.style.visibility = 'visible';

  let grams = document.getElementById('gOutput');
  grams.innerHTML = lbs/362.021;

  let kiloGrams = document.getElementById('kgOutput');
  kiloGrams.innerHTML = lbs/401.363;

  let ounces = document.getElementById('ozOutput');
  ounces.innerHTML = lbs/469.244;

  e.preventDefault();
});
