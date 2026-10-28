import { Head, useForm } from '@inertiajs/react';

export default function Login() {

    const { data, setData, errors, processing, post } = useForm({
        emai: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login');
    }

    return(
        <>
            <Head title="Login | Oh Word" />

            <main className="login-page">
                <form onSubmit={handleSubmit}>
                    {/* email */}
                    <div>
                        <label htmlFor="email">email</label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="username"
                            required
                        />
                        {errors.email && (
                            <p className="error-message">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    {/* password */}
                    <div>
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="current-password"
                            required
                        />

                        {errors.password && (
                            <p className="error-message">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    {/* button */}
                    <button type="submit" disabled={processing}>
                        {processing ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            </main>
        </>
    )
}