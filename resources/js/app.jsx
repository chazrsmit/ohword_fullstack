import '../css/app.css';
import 'bootstrap';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import LenisScroll from './Components/LenisScroll';

//createInertiaApp() initializes the Inertia application
createInertiaApp({
    resolve: (name) =>
        //resolvePageComponent() finds the React component Laravel asks for
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            //import.meta.glob() automatically discovers your page files
            import.meta.glob('./Pages/**/*.jsx')
        ),

    setup({ el, App, props }) {
        //createRoot() mounts React inside the HTML element provided by Inertia
        createRoot(el).render(<App {...props} />);
    },
});
