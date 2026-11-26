import React from "react";
import "../../styles/journal.css";
import useInViewOnce from "../../hooks/useInViewOnce";

/* Pink highlighter behind a word. It draws itself left to right once,
   when the word itself is well inside the screen (not when its block starts
   to enter), so the stroke is always seen being drawn. */
export default function JournalMarker({ children }) {
    const [ref, inView] = useInViewOnce({ rootMargin: "0px 0px -20% 0px" });

    return (
        <span ref={ref} className={`journal-marker ${inView ? "is-drawn" : ""}`}>
            {children}
        </span>
    );
}
