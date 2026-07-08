"use client";

import { client } from "@/lib/client";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

const ANIMALS = ["Lion", "Tiger", "Bear", "Wolf", "Fox"];

//This is how to persist the username in local storage so that it can be retrieved later
const STORAGE_KEY ="chat_username";

const generateUsername = () => {
  const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `anonymous-${word}-${nanoid(5)}`;
}

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter(); //built-in Next.js hook to navigate to a different page/urls

  //Only runs when we render the page
  useEffect(() => {
    const main = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUsername(stored);
          return;
        }
        const generated = generateUsername();
        localStorage.setItem(STORAGE_KEY, generated);
        setUsername(generated);
      } catch {
        // localStorage unavailable — fall back to in-memory only
        setUsername(generateUsername());
      }
    };

    main()
  }, [])
  
  const { mutate : createRoom } = useMutation({
    mutationFn: async () => {
      const res = await client.room.create.post()
      if (res.error) throw res.error

      if (res.status === 200) {
        router.push(`/room/${res.data?.roomId}`)
      }
    }
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-green-500">
            Realtime Chat
          </h1>
          <p className ="text-zinc-500 text-sm">
            A private self-destructing chatroom
          </p>
        </div>
        <div className="border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md">
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center text-zinc-500">
                Your Identity
              </label>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-950 border border-zinc-800 p-3 text-sm text-zinc-400 font-mono">
                  {username}
                </div>
              </div>
            </div>

            <button 
              className="w-full bg-zinc-100 text-black p-3 text-sm font-bold hover:bg-zinc-50 hover:text-black transition-colors mt-2 cursor-pointer disabled:opacity-50"
              onClick={() => createRoom()}
            >
              CREATE SECURE ROOM
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
