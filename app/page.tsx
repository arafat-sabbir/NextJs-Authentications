import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";

const Home = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        {user ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <div className="flex flex-col items-center">
              <Image
                src={user?.image as string}
                alt={user?.name as string}
                height={100}
                width={100}
                className="rounded-full"
              />
              <p className="text-2xl font-bold mt-4">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
              <button
                type="submit"
                className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Sign Out
              </button>
            </div>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <div className="flex flex-col items-center">
              <p className="text-2xl font-bold">Sign in with Google</p>
              <button
                type="submit"
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Signin
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Home;
