"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};

export default page;
