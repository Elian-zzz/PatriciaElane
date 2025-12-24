import React from "react";
import "./paragraph.css";
export default function Paragraph({children,cls,id}){
    return (
<p className={cls} id={id}>
{children}
</p>
);}