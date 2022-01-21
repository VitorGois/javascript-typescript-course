const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputWeight = e.target.querySelector('#weight');
  const inputHeight = e.target.querySelector('#height');

  const weight = Number(inputWeight.value);
  const height = Number(inputHeight.value);

  if (!weight) {
    setResult('Invalid Weight', false);
    return;
  }

  if (!height) {
    setResult('Invalid Height', false);
    return;
  }

  const bmi = calculateBMI(weight, height);
  const bmiRange = getBmiRange(bmi);

  const msg = `Your BMI is ${bmi} (${bmiRange})`;
  setResult(msg, true);
});

function setResult(msg, isValid) {
  const result = document.querySelector('#result');
  result.innerHTML = '';

  const p = createTagP();

  if (isValid) p.classList.add('p-good-result');
  else p.classList.add('p-bad-result');

  p.innerHTML = msg;
  result.appendChild(p);
}

function createTagP() {
  const p = document.createElement('p');
  return p;
}

function calculateBMI(weight, height) {
  const bmi = weight / height ** 2;
  return bmi.toFixed(2);
}

/*
  Underweight     = <18.5
  Normal weight   = 18.5–24.9
  Overweight      = 25–29.9
  Obese Class I   = 30-34.9
  Obese Class II   = 35-39.9
  Obese Class III  = >39.9
*/
function getBmiRange(bmi) {
  const ranges = [
    'Underweight',
    'Normal weight',
    'Overweight',
    'Obese Class I',
    'Obese Class II',
    'Obese Class III',
  ];

  if (bmi > 39.9) return ranges[5];
  if (bmi >= 35) return ranges[4];
  if (bmi >= 30) return ranges[3];
  if (bmi >= 25) return ranges[2];
  if (bmi >= 18.5) return ranges[1];
  if (bmi < 18.5) return ranges[0];
};
