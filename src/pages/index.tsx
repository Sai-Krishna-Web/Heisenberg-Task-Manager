import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <main className="p-4 gap-5">
        <div className="container mx-auto flex flex-col">
          <div className="flex gap-[1.5rem]  w-full justify-between">
            <h1 className="text-2xl text-center">Heisenberg Task Manager</h1>
            <Link href="https://github.com/Sai-Krishna-Web/Heisenberg-Task-Manager">
              <Image
                src="/icons/github-mark.svg"
                width={32}
                height={32}
                alt="remove todo"
                className="hover:cursor-pointer hover:opacity-70 group-hover:block "
              />
            </Link>
          </div>
          <h4 >A task manager application made with <a href="https://nextjs.org/" >Next</a>, <a href="https://firebase.google.com/" >Firebase</a> and <a href="https://tailwindcss.com/" >Tailwind</a></h4>
        </div>
        <div className="my-5 flex">
          <div className="mx-5 py-1 px-4 text-white bg-[#635FC7] hover:bg-[#A8A4FF] rounded-md">
            <Link href="https://heisenberg-task-manager.vercel.app/">
              <a className="text-white">Demo</a>
            </Link>
          </div>
          <div className="mx-5 py-1 px-4 text-white bg-[#635FC7] hover:bg-[#A8A4FF] rounded-md">
            <Link href="https://github.com/Sai-Krishna-Web/Heisenberg-Task-Manager">
              <a className="text-white">Repository</a>
            </Link>
          </div>
        </div>
        <p>This is a <a href="https://nextjs.org/">Next.js</a> project bootstrapped with <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app"><code>create-next-app</code></a>.</p>
        <h2 id="before-getting-started">Before Getting Started</h2>
        <h1 id="learn-more" className="font-semibold mt-5">Learn More</h1>
        <p>To learn more about Next.js, take a look at the following resources:</p>
        <ul>
          <li><a href="https://nextjs.org/docs">Next.js Documentation</a> - learn about Next.js features and API.</li>
          <li><a href="https://nextjs.org/learn">Learn Next.js</a> - an interactive Next.js tutorial.</li>
        </ul>
        <p>You can check out <a href="https://github.com/vercel/next.js/">the Next.js GitHub repository</a> - your feedback and contributions are welcome!</p>
        <h1 id="deploy-on-vercel" className="font-semibold mt-5">Deploy on Vercel</h1>
        <p>The easiest way to deploy your Next.js app is to use the <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme">Vercel Platform</a> from the creators of Next.js.</p>
        <p>Check out our <a href="https://nextjs.org/docs/deployment">Next.js deployment documentation</a> for more details.</p>

      </main>
    </Layout>
  );
};

export default Home;
