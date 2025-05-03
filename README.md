# Apple Worm 2.0 – Lab 3+1

W ramach laboratorium 3+1 przygotowano aplikację "Apple Worm 2.0 – Library", która umożliwia przeglądanie, dodawanie, edytowanie oraz usuwanie książek. Projekt został wykonany przy użyciu React oraz Firebase (Authentication + Firestore + Hosting).

## Hosting

Aplikacja została wyhostowana przy użyciu **Firebase Hosting**, z wykorzystaniem **własnej poczty e-mail** jako konta Google do konfiguracji projektu. Strona jest publicznie dostępna pod adresem:

🔗 **https://piw-lab3-project.web.app/**

## Funkcjonalności zgodne z wymaganiami Lab 3+1

- 3.0 – Dane o wszystkich książkach są pobierane z bazy danych Firestore.
  Użytkownik zalogowany kontem Google ma przycisk "MOJE", który umożliwia filtrowanie książek dodanych przez siebie.
- 4.0 – Użytkownik może dodać, edytować lub usunąć książki, których jest właścicielem.
- 4.5 – W trakcie edytowania książki nie dochodzi do pełnego ponownego renderowania strony.

## Użyte technologie

- React + Vite
- React Router
- Firebase Authentication (Google Sign-In)
- Cloud Firestore (baza danych książek)
- Firebase Hosting
