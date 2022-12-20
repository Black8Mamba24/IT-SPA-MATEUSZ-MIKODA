import API_ROOT from '../config/api';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { NotificationQueue } from '../notifications/notification-queue';
import { Notification } from '../notifications/notification';
import { renderNotification } from '../notifications/render-notification';
import { Section } from '../common/Section';
import { Spinner } from '../common/Spinner';
import { Login } from './Login';
import { Link } from '../common/Link';
import { isEmailValid, login } from '../helpers';
import { Login } from './Login';
import { checkPasswordStrength } from '../helpers';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { Header3 } from '../common/Header3';

export const SignUp = () => {
  const queue = new NotificationQueue();
  queue.addEventListener('notification', renderNotification);

  const loginLink = Link("Zaloguj się", () => {
    const navigateEvent = new CustomEvent('navigate', { detail: Login });
    document.body.dispatchEvent(navigateEvent);
  });

  const section = Section();
  const spinner = Spinner();
  const header = Header3('Zarejestruj się');
  const validationErrorDisplay = ErrorDisplay()
  const validationPasswordDisplay = ErrorDisplay()
  const validationEmailDisplay = ErrorDisplay()
  const emailInput = Input('email', 'email', 'E-mail');
  const passwordInput = Input('password', 'password', 'Hasło');
  const passwordRepeatInput = Input('passwordRepeat', 'password', 'Powtórz hasło');

  emailInput.required = true;
  passwordInput.required = true;
  passwordRepeatInput.required = true;

  const signUpButton = Button('Zarejestruj', () => {
    handleSignUpRequest();
  });

  const validateEmail = () => {
    const emailInputValue = emailInput.querySelector('input').value;
    const emailIsValid = isEmailValid(emailInputValue);

    validationEmailDisplay.innerText = emailIsValid ? '' : 'E-mail jest niepoprawny';
    
    return emailIsValid;
  }

  const validatePassword = () => {
    const passwordInputValue = passwordInput.querySelector('input').value;
    const validation = checkPasswordStrength(passwordInputValue);
    const messages = validation.messages;

    validationPasswordDisplay.innerText = messages.join('\n');

    return validation.isValid;
  }

  const validatePasswordRepeat = () => {
    const passwordInputValue = passwordInput.querySelector('input').value;
    const passwordRepeatInputValue = passwordRepeatInput.querySelector('input').value;

    if (passwordInputValue !== passwordRepeatInputValue) {
      validationErrorDisplay.innerText = 'Hasła nie są takie same!';
    } else {
      validationErrorDisplay.innerHTML = '';
    }
  }

  const handleSignUpRequest = async () => {
    const credentials = {
      email: emailInput.querySelector('input').value,
      password: passwordInput.querySelector('input').value,
      repeatPassword: passwordRepeatInput.querySelector('input').value,
    };

    if (!checkPasswordStrength(credentials.password).isValid) {
      queue.add(new Notification('Hasło nie spełnia wymagań bezpieczeństwa!', 'error'));
      return;
    }

    if (!credentials.email) {
      queue.add(new Notification('E-mail jest pusty!', 'error'));
      return;
    }

    if (!validateEmail()) {
      queue.add(new Notification('E-mail jest niepoprawny!', 'error'));
      return;
    }

    if (!credentials.password) {
      queue.add(new Notification('Nie podałeś hasła!', 'error'));
      return;
    }

    if (!credentials.repeatPassword) {
      queue.add(new Notification('Proszę powtórz hasło!', 'error'));
      return;
    }

    if (credentials.password !== credentials.repeatPassword) {
      queue.add(new Notification('Hasła są różne!', 'error'));
      return;
    }

    section.innerHTML = '';
    section.append(spinner);

    const response = await requestSignUp(credentials);

    if (response.status === 400) {
      queue.add(new Notification('Podany e-mail został już wykorzystany!', 'error'));
      await new Promise(r => setTimeout(r, 2000));
      window.location.reload();
    }

    if (response.status === 200) {
      login('fake-token');
      window.location.reload();
    } else {
      queue.add(new Notification('Próba rejestracji została odrzucona!', 'error'));
    }
  }

  const requestSignUp = async (credentials) => {
    return await fetch(`${API_ROOT}/sign-up`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
  }

  passwordRepeatInput.addEventListener('input', validatePasswordRepeat);
  passwordInput.addEventListener('input', validatePassword);
  emailInput.addEventListener('input', validateEmail);

  section.append(
    header,
    emailInput,
    validationEmailDisplay,
    passwordInput,
    passwordRepeatInput,
    validationErrorDisplay,
    validationPasswordDisplay,
    signUpButton,
    loginLink
  );

  section.style.margin = '0 auto';
  section.style.textAlign = 'center';
  section.style.marginTop = '3rem';

  return section;
}
