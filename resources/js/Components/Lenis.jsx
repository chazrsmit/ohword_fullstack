
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export default function SmoothScroll({ children }) {

    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    )
}