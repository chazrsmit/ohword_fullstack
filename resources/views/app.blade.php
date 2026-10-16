
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {{-- @viteReactRefresh enables React Fast Refresh during development. --}}
    @viteReactRefresh
    {{-- @vite(...) loads your React entry point through Vite. --}}
    @vite(['resources/js/app.jsx','resources/css/app.css'])
    {{-- @inertiaHead allows Inertia pages to manage document metadata, such as their titles. --}}
    @inertiaHead

</head>
<body>
    
    {{-- @inertia provides the root element into which the React app is mounted. --}}
    @inertia

</body>
</html>
