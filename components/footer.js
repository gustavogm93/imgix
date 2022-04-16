import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="footer relative height-8 mt-200">
      <div className="flex justify-start w-60 ml-5" id="copyright">
        <p>© 2022 Imgix, Inc.</p>
      </div>

      <div className="flex justify-end space-x-4" id="policy">
        <p>·Privacidad</p>
        <p>·Términos</p>
        <p>·Mapa del sitio</p>
      </div>
    </div>
  );
}
