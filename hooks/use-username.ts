import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

export const useUsername = () => {


    const ANIMALS = ["Lion", "Tiger", "Bear", "Wolf", "Fox"];
    
    //This is how to persist the username in local storage so that it can be retrieved later
    const STORAGE_KEY ="chat_username";
    
    const generateUsername = () => {
      const word = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
      return `anonymous-${word}-${nanoid(5)}`;
    }


    const [username, setUsername] = useState("");

    
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
    
    return { username };
}