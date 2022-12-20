import API_ROOT from '../config/api';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { NotificationQueue } from '../notifications/notification-queue';
import { Notification } from '../notifications/notification';
import { renderNotification } from '../notifications/render-notification';
import { Section } from '../common/Section';
import { Spinner } from '../common/Spinner';
import { Link } from '../common/Link';
import { isEmailValid, login } from '../helpers';
import { SignUp } from './SignUp';
import { ErrorDisplay } from '../common/ErrorDisplay';
import { Header3 } from '../common/Header3';

export const Login = () => {
  const queue = new NotificationQueue();
  queue.addEventListener('notification', renderNotification);

  const signUpLink = Link("Zarejestruj się", () => {
    const navigateEvent = new CustomEvent('navigate', { detail: SignUp });
    document.body.dispatchEvent(navigateEvent);
  });

  const section = Section();
  const spinner = Spinner();
  const header = Header3('Zaloguj się');
  const validationEmailDisplay = ErrorDisplay();
  const emailInput = Input('email', 'email', 'E-mail');
  const passwordInput = Input('password', 'password', 'Hasło');

  emailInput.required = true;
  passwordInput.required = true;

  const signInButton = Button('Zaloguj', () => {
    handleSignInRequest();
  });

  const validateEmail = () => {
    const emailInputValue = emailInput.querySelector('input').value;
    const emailIsValid = isEmailValid(emailInputValue);

    validationEmailDisplay.innerText = emailIsValid ? '' : 'E-mail jest niepoprawny';

    return emailIsValid;
  }

  const handleSignInRequest = async () => {
    const credentials = {
      email: emailInput.querySelector('input').value,
      password: passwordInput.querySelector('input').value,
    };

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

    section.innerHTML = '';
    section.append(spinner);

    const response = await requestSignIn(credentials);

    if (response.status === 401) {
      queue.add(new Notification('Niepoprawne dane logowania!', 'error'));
      await new Promise(r => setTimeout(r, 2000));
      window.location.reload();
    }

    if (response.status === 200) {
      login('fake-token');
      window.location.reload();
    } else {
      queue.add(new Notification('Podane dane logowania są niepoprawne!', 'error'));
    }
  }

  const requestSignIn = async (credentials) => {
    return await fetch(`${API_ROOT}/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify(credentials)
    });
  }

  emailInput.addEventListener('input', validateEmail);

  section.append(
    header,
    emailInput,
    validationEmailDisplay,
    passwordInput,
    signInButton,
    signUpLink
  );

  section.style.margin = '0 auto';
  section.style.textAlign = 'center';
  section.style.marginTop = '3rem';

  return section;
}
