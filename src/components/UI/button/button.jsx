import React from "react";
import "./button.css";
export default function Button({children,id}) {
    // Referencia a clase con cls
    const cls = `button`;
    return (
        <button type="button" className={cls} id={id}>
            {children}
        </button>
    );
}