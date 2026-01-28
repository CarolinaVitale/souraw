import { useEffect, useState } from "react";

export function useDollarRate() {
    const [rate, setRate] = useState(null);
    const [source, setSource] = useState("");

    useEffect(() => {
        async function fetchRate() {
            try {
                const res = await fetch("https://ve.dolarapi.com/v1/dolares");
                const data = await res.json();

                console.log("Respuesta API:", data);

                // Busca directamente la fuente oficial
                const oficial = data.find((e) => e.fuente === "oficial");

                if (oficial) {
                    setRate(oficial.promedio);
                    setSource(oficial.nombre); // "Oficial"
                } else {
                    console.error("⚠️ No encontré la tasa oficial en la respuesta");
                }
            } catch (err) {
                console.error("Error obteniendo tasa de DolarApi:", err);
            }
        }

        fetchRate();
    }, []);

    return { rate, source };
}