import { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "layout";
import { useAuth } from "context/AuthContext";

const Register: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { register } = useAuth();
  const router = useRouter();

  const handleError = (error: any) => {
    if (error.code.includes('email-already-in-use')) {
      setError('User with email already exist, Please login!');
      return;
    }
    if (error.code.includes('weak-password')) {
      setError('Password should be at least 6 characters');
      return;
    }
    setError('Something went wrong, Try again or contact tech team!');
  }

  return (
    <Layout>
      <main className="p-4">
        <div className="container mx-auto max-w-md p-5 shadow-[0_30px_60px_-10px_rgba(6,0,74,0.15)] relative bg-white dark:bg-darkBlue rounded-md">
          <h1 className="text-2xl text-center text-[#635FC7]">Register Your Account</h1>
          <form
            className="w-3/4 max-w-md mt-4 mx-auto"
            onSubmit={async (e) => {
              e.preventDefault();

              try {
                await register(email, password);
                await router.push("/dashboard");
              } catch (error) {
                handleError(error);
              }
            }}
          >
            <div className="mb-4">
              <label htmlFor="email" />
              <input
                className="w-full p-2 border-2 border-indigo-900 rounded-md"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" />
              <input
                className="w-full p-2 border-2 border-indigo-900 rounded-md"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4 flex justify-center">
              <button
                className="py-2 px-6 text-white bg-[#635FC7] hover:bg-[#A8A4FF] rounded-md"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
          {error && <p className=" text-center text-red-500 text-sm">{error}</p>}
        </div>
      </main>
    </Layout>
  );
};

export default Register;
