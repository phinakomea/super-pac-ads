'use client'; // if using App Router

export default function SignIn() {
  
  

  return <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                 >
    Sign in with Google
    </button>;
}


// import React from 'react'
// import oauth2Client from '@/utils/google-auth'
// import Link from 'next/link'

// export default function SignIn() {

//      const scope = ['https://www.googleapis.com/youtube/v3']
//      const auth_url = oauth2Client.generateAuthUrl({
//          access_type: 'offline',
//          scope: scope
//      }

//      )

//   return (
   
//         <Link href={auth_url}>
//             <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
//                 Sign In
//             </button>
//         </Link>
   
//   )
// }
