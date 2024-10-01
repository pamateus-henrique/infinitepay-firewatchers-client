import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800'>
      <main className='text-center space-y-8 p-8'>
        <Image
          src='/logo.svg'
          alt='Your Logo'
          width={120}
          height={120}
          className='mx-auto'
        />
        <h1 className='text-4xl font-bold text-gray-800 dark:text-white'>
          Firewatchers
        </h1>
        <p className='text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto'>
          Cloudwalk homebrew tool to manage incidents!
        </p>
        <div className='flex gap-4 justify-center'>
          <Button variant='default' asChild>
            <a href='/auth/login'>Log In</a>
          </Button>
          <Button variant='outline' asChild>
            <a href='/auth/register'>Register</a>
          </Button>
        </div>
      </main>
      <footer className='mt-16 text-sm text-gray-500 dark:text-gray-400'>
        © Made with &lt;3 at cloudwalk. AI Powered!
      </footer>
    </div>
  );
}
