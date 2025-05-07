import { use } from "react";
import { UserAuthComponent } from "@/components/context/user";
import { LiffContext } from "@/components/context/liff";
import { UserAuthContext } from "@/components/context/user";


export default function Home() {
  const { decodeResult } = use(LiffContext)
  const { userInfo } = use(UserAuthContext)
  return (
    <>
      <UserAuthComponent>
        <div className="flex flex-col space-x-4 mx-auto">
          <img
            src={decodeResult?.picture}
            alt="プロフィール画像"
            className="w-36 h-36 rounded-full object-cover"
          />
          <div className="w-full mt-4 max-w-80">
            <h3 className="text-xl font-bold">{decodeResult?.name}</h3>
            {JSON.stringify(userInfo)}
          </div>
        </div>
      </UserAuthComponent>
    </>
  );
}
