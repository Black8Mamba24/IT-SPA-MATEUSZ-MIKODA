export const getDaysCount = (startDate, endDate) => {
  const timestampDiff = Math.abs(endDate - startDate);
  return Math.ceil(timestampDiff / (1000 * 60 * 60 * 24));
}

export const isUserAuthenticated = () => {
  const token = localStorage.getItem('API_TOKEN');
  return token;
}

export const logout = () => {
  localStorage.removeItem('API_TOKEN');
}

export const login = (token) => {
  localStorage.setItem('API_TOKEN', token);
}

export const checkPasswordStrength = (password) => {
  let messages = [];

  const noLowerCaseMsg = 'Hasło musi zawierać przynajmniej 1 małą literę.';
  const noUpperCaseMsg = 'Hasło musi zawierać przynajmniej 1 wielką literę.';
  const noNumbers = 'Hasło musi zawierać przynajmniej 1 cyfrę.';
  const badLength = 'Hasło musi być dłuższe niż 8 znaków.';

  let lowerCaseLetters = /[a-z]/g;
  if (password.match(lowerCaseLetters)) {
    messages = messages.filter((e) => e !== noLowerCaseMsg);
  } else {
    messages.push(noLowerCaseMsg);
  }

  let upperCaseLetters = /[A-Z]/g;
  if (password.match(upperCaseLetters)) {
    messages = messages.filter((e) => e !== noUpperCaseMsg);
  } else {
    messages.push(noUpperCaseMsg);
  }

  let numbers = /[0-9]/g;
  if (password.match(numbers)) {
    messages = messages.filter((e) => e !== noNumbers);
  } else {
    messages.push(noNumbers);
  }

  if (password.length >= 8) {
    messages = messages.filter((e) => e !== badLength);
  } else {
    messages.push(badLength);
  }

  return {
    isValid: !messages.length,
    messages: messages
  };
}

export const isEmailValid = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const roundDownMoney = (floatNumber) => {
  return Math.floor(floatNumber * 100)/100
}
