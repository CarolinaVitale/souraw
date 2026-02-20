import "./Ribbon.css";

const ScrollingRibbon = () => {
    const items = [
        "WOMEN OWNED",
        "NO ARTIFICIAL FLAVORS",
        "100% SOURDOUGH",
        "100% HANDMADE",
        "CRAFTED WITH INTENTION",
        "SLOW FERMENTED",
        "NATURALLY LEAVENED",
        "GUT - FRIENDLY",
        "REAL INGREDIENTS",
    ];

    return (
        <div className="ribbon">
            <div className="ribbon-inner">
                <div className="ribbon-track">
                    {items.map((item, i) => (
                        <span key={`a-${i}`} className="ribbon-item">
                            ✓ {item}
                        </span>
                    ))}
                </div>

                <div className="ribbon-track" aria-hidden="true">
                    {items.map((item, i) => (
                        <span key={`b-${i}`} className="ribbon-item">
                            ✓ {item}
                        </span>
                    ))}
                </div>

                <div className="ribbon-track" aria-hidden="true">
                    {items.map((item, i) => (
                        <span key={`b-${i}`} className="ribbon-item">
                            ✓ {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ScrollingRibbon;