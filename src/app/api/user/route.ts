import { getPayload } from 'payload';
import { NextRequest, NextResponse } from 'next/server';
import config from '@/payload.config';
import { User } from '@/payload-types'; // Import the correct User type

export async function GET(req: NextRequest) {
  try {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });

    const headers = req.headers;
    const { docs } = await payload.find({ // Access the docs array
      collection: 'users',
      where: {
        id: {
          exists: true,
        },
      },
      depth: 1,
      limit: 1,
      req: {
        headers,
      },
    });

    if (!docs.length) {
      return NextResponse.json(null); // Return null if no user is found
    }

    return NextResponse.json(docs[0] as User); // Access the first user from the docs array
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
