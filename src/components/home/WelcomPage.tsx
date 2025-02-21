import pacLogo from "@/assets/icons/pacLogo.png";
import Image from "next/image";

import SignInDrawer from "./SignInDrawer";
import SignUpDrawer from "./SignUpDrawer";

const WelcomPage = () => {
  return (
    <section className="container fixed mx-auto flex h-screen max-w-screen-sm items-center justify-center bg-blue-900">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-4 px-4">
        <Image src={pacLogo} alt="pac logo" width={160} height={160} />
        <h1 className="text-center text-4xl font-bold">
          Welcome to PAC <br /> Kids Church
        </h1>
        <SignInDrawer />
        <SignUpDrawer />
      </div>
    </section>
  );
};

export default WelcomPage;
