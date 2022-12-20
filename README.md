# IT SPA

## App setup

**Prerequisites**

```bash
node.js v19+
npm v8+
yarn v1+
```

**Setup**
<br>
While in `/it-spa` directory, install dependencies with npm:

```bash
npm install
```

To launch SPA app, use:

```bash
yarn parcel index.html
```

You should see something like:

```bash
yarn run v1.22.17
$ /.../node_modules/.bin/parcel index.html
Server running at http://localhost:1234
✨ Built in 982ms
```

To launch backend express API, use command:

```bash
node src/api/app.js
```

Then you should see something like:

```bash
Debugger listening on ws://127.0.0.1:49982/5838b01e-c68b-41c5-8c89-7230fb8cd18a
For help, see: https://nodejs.org/en/docs/inspector
Debugger attached.
IT SPA app listening on port 3000
```

## Zależności, źródła:

- HTML, scss, sass
- JavaScript ES6
- Node.js, npm
- tailwind.css
- JQuery, jquerycalendar
- Moment.js
- Bootstrap
- Yarn
- Parcel (bundler)
- Express.js (backend api)
- fs (do zapisu i odczytu z file system)
- cors (by umożliwić wysyłanie POST requests do api z localhost:1234)
- json-server
- https://icons8.com/
- https://www.pexels.com/

## Funkcjonalności

- baza danych: pokoje, zabiegi, użytkownicy
- koszyk: dodawanie, usuwanie
- wybór daty dla rezerwacji pokoju
- zamówienia: podsumowanie kosztów
- użytkownicy: rejestracja (z walidacją), autentykacja

# IT SPA - wytyczne

Projekt polega na napisaniu aplikacji Single Page Application dla ośrodka SPA dedykowanego programistom.

Aplikacja powinna umożliwiać:

- Przeglądanie dostępnych zabiegów
- Dodawanie wybranych zabiegów do koszyka
- Wybór daty przyjazdu i wyjazdu oraz pokoju
- Rejestrację użytkownika (opcjonalnie)
- Logowanie użytkownika (opcjonalnie)
- Podsumowanie składanego zamówienia

## Booking

Stwórz komponent koszyka, który wyświetla podsumowanie zamówienia.
Koszyk powinien też umożliwiać nanoszenie poprawek do zamówienia.
Użytkownik nie może wybrać daty przyjazdu wcześniejszej niż bieżąca.
Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu.

## Rejestracja

Stwórz komponent rejestracji użytkownika z opcjonalnym miernikiem siły hasła.
Rejestracja polega na zapisaniu danych użytkownika (e-mail i hasła) w pliku `database.json`.
Nie powinna być możliwa rejestracja użytkownika o identycznym adresie e-mail.

## Logowanie

Stwórz komponent logowania użytkownika, który opcjonalnie będzie wyświetlał avatar użytkownika.
Logowanie polega na porównaniu podanych przez użytkownika danych (e-mail i hasła) z tymi w pliku `database.json`.

## Pokoje

Bazę przykładowych pokoi w ośrodku IT SPA znajdziesz w pliku `database.json`.
Możesz dowolnie zmienić istniejące pokoje lub dodać swoje własne.

## Zabiegi

Bazę przykładowych zabiegów ośrodka IT SPA znajdziesz w pliku `database.json`.
Możesz dowolnie zmienić istniejące zabiegi lub dodać swoje własne.

## Koszyk

Stwórz komponent koszyka, który po najechaniu myszką będzie wyświetlał dodane pokoje i zabiegi.
Koszyk musi przetrwać przeładowanie strony, dlatego spróbuj wykorzystać ciasteczka (Cookies).

## Technologie

- HTML, Bootstrap
- CSS, Sass, LESS
- JavaScript, jQuery
- Node, Express

Postaraj się korzystać z ECMAScript 6.

Do interakcji z serwerem bazy danych wykorzystaj `fetch`.
Jeśli lubisz eksperymenty, zainstaluj pakiet `axios`.

## Ocena

Zamieść gotowy projekt na swoim GitHubie.

## Przykłady

Strony, którymi możesz się inspirować:

- afrodyta-spa.pl
- bukowypark.pl
- hotelczarnypotok.pl
- hotelniemcza.pl
