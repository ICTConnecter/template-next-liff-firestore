import { NextResponse } from 'next/server';
import { PostReqType } from './types';
import { db } from '@/utils/firebase/initializeApp';
import { addDoc, collection } from 'firebase/firestore';

export async function POST(request: Request) {
  const user: PostReqType = await request.json()
  const docSnap = await addDoc(collection(db, "user"), user)
  try {
    return NextResponse.json({ id: docSnap.id })
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 })
  }
}