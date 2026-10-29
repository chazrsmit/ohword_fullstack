# Oh Word

Oh Word is a personal English dictionary: a simple, visual space to collect words, explore their definitions, and revisit them later.

The dictionary is publicly accessible, while adding and deleting words is restricted to authenticated users (aka me). There is no public registration flow.

**Live demo:** [ohword.onrender.com](https://ohword.onrender.com/)

## Features

The application is currently for personal use only. Besides browsing, the following features are restricted to my authenticated account.

- **Browse a personal dictionary:** Explore saved words in alphabetical order without signing in.
- **Explore word details:** Open a word to view its pronunciation, parts of speech, definitions, and dictionary source.
- **Add new words:** Authenticated users can look up and save words using the Free Dictionary API.
- **Store dictionary data:** Word information is saved in the database, so previously added words can be revisited without another API request.
- **Manage the collection:** Authenticated users can add and delete words.
- **Responsive interface:** The layout adapts to desktop and mobile, with different input controls for each screen size.
- **Animated interactions:** Motion animations contribute to the browsing experience.

## How It Works

Oh Word uses Laravel for the backend and React for the frontend, connected through Inertia.js.

1. **Loading the dictionary:** Laravel retrieves the saved words from the database and passes them to the React home page through Inertia.
2. **Browsing words:** React displays the words alphabetically. Selecting a word requests its stored details from Laravel.
3. **Adding words:** Laravel validates the submitted input, checks the word against the Free Dictionary API, rejects duplicate or unrecognized entries, and saves the selected dictionary data.
4. **Deleting words:** Authenticated users can remove words from the collection through a protected Laravel route.
5. **Displaying feedback:** Validation errors and success messages inform users about the result of their actions.

Dictionary requests are handled server-side by Laravel. The application stores selected API data in the database rather than requesting it every time a word is opened.

The current implementation stores the word, phonetics, up to two parts of speech, up to two definitions, and the source URL. It selects data from the first two dictionary entries returned by the API.

## Technology Stack

- **Backend:** PHP 8.3+, Laravel 13, Eloquent ORM
- **Frontend:** React 19, Inertia.js, Vite
- **Styling and interaction:** Custom CSS, Bootstrap 5, (Framer) Motion
- **Database:** MySQL
- **External API:** [Free Dictionary API](https://freedictionaryapi.com/)
- **Deployment:** Docker, Render, Aiven MySQL

## Authentication and Access

The dictionary and word-detail pages are publicly accessible. Adding and deleting words require an authenticated session, and there is no public registration route.

The application separates public browsing from actions that modify the collection, with access restrictions enforced by the backend.

## Deployment

The application is deployed to Render using a multi-stage Docker build. Vite compiles the frontend assets, while the PHP/Apache runtime serves the Laravel application.

The production database is hosted on Aiven MySQL. Database credentials and other environment-specific configuration are supplied through environment variables and deployment secrets rather than being committed to the repository.

## UI/UX design

The design of Oh Word is intentionally minimal, prioritising readability, clarity, and ease of use across devices.

- **Minimal colour palette:** A classic black-and-white palette keeps the interface simple and distraction-free. Royal blue provides a visual accent to indicate interactive states, highlighting selected words and desktop hover interactions.
- **Tactile mobile interactions:** Buttons feature a subtle, inviting squishy feel. Clear prompts invite users to enter a word and submit it.
- **Mobile-first readability:** Generous font sizes and clear typography make words and definitions comfortable to read on smaller screens.
- **Clear and intuitive actions:** An obvious delete button allows authenticated users to remove words from their collection without ambiguity.
- **Dictionary-inspired layout:** The interface takes inspiration from the familiar format of a traditional dictionary, preserving the feeling of browsing a collection of words while making entries easier to read, navigate, and explore digitally.
- **Simplicity and accessibility:** Every element serves a clear purpose. The interface is designed to be straightforward and usable in different contexts, without unnecessary visual clutter. Strong text-to-background contrast is prioritised in line with the Web Content Accessibility Guidelines (WCAG), supporting readability and making content easier to distinguish, with 3 contrast ratios of 20.40:1 (black text), 7.03:1 (blue text) and 14.45:1 (buttons) - tested on coolors.co.

The goal is to create a lightweight, accessible, and intuitive experience: a personal dictionary that feels familiar, works across devices, and can be used with minimal effort.

## Future Improvements

- Develop a mobile application with React Native.
- Explore a more comprehensive dictionary API.