import { useEffect, useRef, useState } from "react";

/* Returns [ref, inView]. inView turns true the first time the element
   enters the viewport and never goes back, so entrance animations run once. */
export default function useInViewOnce({ rootMargin = "0px 0px -12% 0px", threshold = 0 } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;

        if (typeof IntersectionObserver === "undefined") {
            setInView(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin, threshold]);

    return [ref, inView];
}
