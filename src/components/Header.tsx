'use client';

import Link from 'next/link';
import Navlinks from './Navlinks';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
              &Lambda;SP&Lambda;CT
            </Link>
            <Navlinks />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
              Sign In
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200">
              Get API Access
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}




// import Navlinks from "./Navlinks";

// export default function Header() {


//   return (
//     <header className="bg-white shadow-sm border-b">
//       <Navlinks /> 
//     </header>
//   );
// }