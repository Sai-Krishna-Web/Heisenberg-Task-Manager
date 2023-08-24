import Link from "next/link";
import { useAuth } from "context/AuthContext";
import { useRouter } from "next/router";

export const Header = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="py-4  border-b-2 border-indigo-900 text-indigo-900 bg-indigo-100 ">
      <header className="container mx-auto flex flex-row items-center justify-between">
        <h1 className="px-4">
          <Link href="/" >
            <a className="font-semibold">HeisenBerg Task Manager</a>
          </Link>
        </h1>

        <ul className="flex flex-row items-center justify-between">
          <li className="px-4 hover:text-[#A8A4FF]">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>

          <li className="px-4 hover:text-[#A8A4FF] border-r-2 border-indigo-900">
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>
          <li className="mx-5 py-1 px-4 text-white bg-[#635FC7] hover:bg-[#A8A4FF] rounded-md">
            {user ? (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await logout();
                    await router.push("/login");
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <a className="text-white">Login</a>
              </Link>
            )}
          </li>
        </ul>
      </header>
    </div>
  );
};
