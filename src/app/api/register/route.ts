import { NextResponse } from 'next/server';
import { PostReqType } from './types';
import { db } from '@/utils/firebase/initializeApp';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { decodeIdToken } from '@/utils/line/decodeIdToken';
import { User } from '@/types/firestore/User';

export async function POST(request: Request) {

  console.log("登録リクエストを受け付けました")

  // tokenの検証
  const header = request.headers
  const idToken = header.get("Authorization")?.split(":")[1]
  console.log("idToken:" + idToken)
  if (!idToken) {
    return NextResponse.json({ error: "Authorization header is required" }, { status: 401 })
  }
  const decodeResult = await decodeIdToken(idToken)
  console.log("decodeResult:" + JSON.stringify(decodeResult))

  // ReqBodyの取得
  const reqBody: PostReqType = await request.json()
  console.log("reqBody:" + JSON.stringify(reqBody))

  // 登録済みのデータかどうかの確認
  const duplicateCheckSnap = await getDoc(doc(db, "users", decodeResult.sub))
  if (duplicateCheckSnap.exists()) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }
  console.log("duplicateCheckSnap:" + JSON.stringify(duplicateCheckSnap.exists()))

  // 登録用データの成形
  const date = new Date().getTime()
  const user: User = {
    lineId: decodeResult.sub,
    createAt: date,
    updateAt: date,
    like: reqBody.like
  }

  // データの追加 
  try {
    const docSnap = await addDoc(collection(db, "users"), user)
    console.log("docSnap:" + JSON.stringify(docSnap))
    return NextResponse.json({}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: JSON.stringify(error) }, { status: 500 })
  }
}