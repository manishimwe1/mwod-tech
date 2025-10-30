import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { handleSignInWithGoogle } from "@/lib/actions/signinActions";

const SignInButton = () => {
  return (
    <div>
      <form action={handleSignInWithGoogle}>
        <Button
          type="submit"
          variant="outline"
          className="h-12 cursor-pointer rounded-xl border-slate-200 hover:bg-slate-50 transition-colors"
        >
          <Image
            src={"/google.svg"}
            className="size-4"
            alt="google logo"
            width={3}
            height={3}
          />
          Signin with Google
        </Button>
      </form>
    </div>
  );
};



export default SignInButton;
