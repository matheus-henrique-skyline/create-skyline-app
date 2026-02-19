import React from "react";
import Image from "next/image";
const PlantasPage: React.FC = () => {
  return (
    <div className="row-span-24 col-span-19 relative w-full h-full">
      <Image src="/skyline.png" alt="Skyline" fill className="object-cover" />
    </div>
  );
};

export default PlantasPage;
