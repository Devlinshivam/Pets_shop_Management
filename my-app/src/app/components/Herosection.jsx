import React from 'react';
import Image from 'next/image';
import { TypewriterEffectSmoothDemo } from './Type';

function Herosection() {
  return (
    <main className="flex  items-center justify-between">
       <div className="z-10 py-4 ">
       <TypewriterEffectSmoothDemo/>
       </div>
        <div className=" -z-5 opacity-25 relative w-11/12 max-h-11/12">
          <Image src="/S.png" alt="background image" className="w-full" width={1000} height={1000} />
        </div>
        
    </main>
  );
}

export default Herosection;
