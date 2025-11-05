import React from 'react'
import oauth2Client from '@/utils/route'
import { cookies } from 'next/headers'
import { google } from 'googleapis'
import { Result } from 'postcss'



export default async function Dashboard() {

  const cookieStore = cookies()
  const acessToken = cookieStore.get('google_access_token')?.value

  oauth2Client.setCredentials({access_token: acessToken})

  let files;

  const youtube = google.content('v2.1')

  try {
    const result = await youtube.files.list({
      auth: oauth2Client,
      pageSize: 15,
      fields: 'nextPageToken'});
      
      files = Result.data.files
    }  

  
  catch (error) {
    return (
      <div>Failed to fetch file</div>
    )
  }

  return (
    <div>Dashboard</div>
  )
}

*******************************

import { google } from 'googleapis';


 const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

export default oauth2Client


***************************


// import { google } from 'googleapis';
// import { NextResponse } from 'next/server';


// export async function GET() {
//   try {
//     // Log to verify env vars are loaded
//     console.log('Client ID exists:', !!process.env.GOOGLE_CLIENT_ID);
//     console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI);

//     const oauth2Client = new google.auth.OAuth2(
//       process.env.GOOGLE_CLIENT_ID,
//       process.env.GOOGLE_CLIENT_SECRET,
//       process.env.GOOGLE_REDIRECT_URI
//     );

//     const authUrl = oauth2Client.generateAuthUrl({
//       access_type: 'offline',
//       scope: ['https://www.googleapis.com/auth/youtube.readonly'],
//       prompt: 'consent', // Force consent screen to get refresh token
//     });

//     console.log('Generated auth URL:', authUrl);

//     return NextResponse.json({ authUrl });
//   } catch (error) {
//     console.error('Auth error:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate auth URL' },
//       { status: 500 }
//     );
//   }
// }

import oauth2Client from '@/utils/route';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';



export async function GET(request: NextRequest) {
 

  // Your auth logic here
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.force-ssl',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtube.channel-memberships.creator'
    ],
  });

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.json({
        error: 'Google OAuth Error ' + error
    })
  }

  if (!code) {
    return NextResponse.json({
        error: 'Authorization Code Not Found'
    })
  }

  try {
    const {tokens} = await oauth2Client.getToken(code)
    cookies().set({
      name: 'google_access_token',
        value: 'token_access_token',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    })

    return NextResponse.redirect(new URL('/', request.url))
  } catch (error) {
    error: 'Google OAuth failed to exchange code ' + error
  }

  return 
    NextResponse.json({ authUrl });


}

