
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function LenisScroll({ children }) {
    return (
        <ReactLenis root options={{ lerp: 0.1 }}>
            {children}
        </ReactLenis>
    );
}
