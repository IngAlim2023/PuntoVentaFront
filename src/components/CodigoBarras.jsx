import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

export function CodigoBarras({ value }) {
  const svgRef = useRef(null); // Usamos useRef para referenciar el SVG donde se renderizará el código de barras

  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, value, {
        format: "CODE128", // Formato del código de barras
        lineColor: "#000", // Color de las líneas
        width: 2, // Ancho de las barras
        height: 50, // Altura de las barras
        displayValue: true, // Muestra el texto debajo del código
      });
    }
  }, [value]); // Se ejecutará cada vez que cambie el valor de `value`

  return (
    <div className="flex items-center justify-center mt-4">
      <svg ref={svgRef}></svg>
    </div>
  );
}
