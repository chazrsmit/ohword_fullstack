import "../../css/nav.css";
import { router } from '@inertiajs/react'

export default function NavMobile() {

    return (
        <nav>
            <p id="nav-title" onClick={() => router.get('/')}>Oh Word.</p>
        </nav>
    )
}