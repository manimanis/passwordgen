import '../styles/index.scss';

const chkUpper = document.querySelector('#chars-uppercase');
const chkDigits = document.querySelector('#chars-digits');
const chkSymbols = document.querySelector('#chars-symbols');

const txtPwdSize = document.querySelector('#pwd-size');

const btnGenerate = document.querySelector('#pwd-gen button');

const txtPwd = document.querySelector('#password');

const pwdOptions =  {
  lower: true,
  upper: true,
  digits: true,
  symbols: true,
  size: 8
};

const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const allChars = [
  symbols,
  digits,
  upperCase,
  lowerCase
];

const random = (min, max) => {
  return Math.floor(min + Math.random() * (max - min));
};

const getCharsTypes = (options) => {
  const charTypes = [0, 0, 0, 0];
  let size = options.size;
  if (options.symbols) {
    let v = random(1, options.size / 3);
    size -= v;
    charTypes[0] = v;
  }
  if (options.digits) {
    let v = random(1, options.size / 3);
    size -= v;
    charTypes[1] = v;
  }
  if (options.upper) {
    let v = random(Math.floor(size / 4), Math.floor(size * 2 / 3));
    size -= v;
    charTypes[2] = v;
  }
  charTypes[3] = size;
  console.log(charTypes);
  return charTypes;
};

const generatePassword = (options) => {
  let pwd = [];
  const charTypes = getCharsTypes(options);
  do {
    const idx = Math.floor(Math.random() * charTypes.length);
    if (charTypes[idx] == 0) {
      continue;
    }
    pwd.push(allChars[idx][Math.floor(Math.random() * allChars[idx].length)]);
    charTypes[idx]--;
  } while (charTypes.reduce((prev, curr) => prev + curr, 0) != 0);
  return pwd.join('');
};

const updatePassword = (options) => {
  const pwd = generatePassword(pwdOptions);
  txtPwd.value = pwd;
};

const updateForm = (options) => {
  chkUpper.checked = options.upper;
  chkDigits.checked = options.digits;
  chkSymbols.checked = options.symbols;
  txtPwdSize.value = options.size;
  updatePassword(options);
};

[
  [chkUpper, 'upper'], 
  [chkDigits, 'digits'], 
  [chkSymbols, 'symbols']
].forEach((item) => {
  const [chk, property] = item;
  chk.addEventListener('click', (e) => {
    pwdOptions[property] = chk.checked;
    updatePassword(pwdOptions);
  });
});
 
txtPwdSize.addEventListener('change', e => {
  pwdOptions['size'] = +txtPwdSize.value;
  updatePassword(pwdOptions);
});

btnGenerate.addEventListener('click', e => {
  e.preventDefault();
  updatePassword(pwdOptions);
});

updateForm(pwdOptions);

