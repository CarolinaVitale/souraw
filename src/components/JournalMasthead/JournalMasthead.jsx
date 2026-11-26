import React from "react";
import "../../styles/journal.css";
import useInViewOnce from "../../hooks/useInViewOnce";

/* Magazine masthead: thick rule above, thin rule below, three small labels.
   The rules draw in from the left once, the first time the masthead scrolls into view. */
export default function JournalMasthead({ left, center, right, className = "" }) {
    const [ref, inView] = useInViewOnce({ rootMargin: "0px 0px -8% 0px" });

    return (
        <header
            ref={ref}
            className={["journal-masthead", "journal-masthead--animated", inView && "is-inview", className]
                .filter(Boolean)
                .join(" ")}
        >
            <span>{left}</span>
            <span>{center}</span>
            <span>{right}</span>
        </header>
    );
}
