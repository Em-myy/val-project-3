import { useState } from "react";
import "./App.css";
import axios from "axios";
import confetti from "canvas-confetti";

const TextArray: string[] = [
  "Please na, my lawful wedded... 💍",
  "We already signed the papers, no escape! 🔒",
  "Remember 'For Better For Worse'? 📜",
  "Oya stop playing, food is ready 🍲",
  "I will report you to our Pastor oo! ⛪",
  "Is it because I didn't buy bread? 🍞",
  "You want to divorce? In this economy? 😂",
  "Think about the children (future or present)! 👶",
  "I will call your Mummy now now! 📞",
  "God is watching this wickedness 👀",
  "No Valentine? No 'other room' tonight 🛌",
  "I will change the Netflix password 📺",
  "Don't let the devil use you, Sweetheart 👿",
  "You signed the contract, Madam! 📝",
  "I will break your head with love oo 🔨",
  "Okay, take my full salary then 💰",
  "Are you seeing someone else in your dream? 🤨",
  "Just say Yes let us go and sleep 😴",
  "Till death do us part, remember? 💀",
  "You are stuck with me forever! ❤️",
];

const TextColors: string[] = [
  "text-red-500",
  "text-pink-600",
  "text-purple-600",
  "text-rose-600",
  "text-orange-600",
];

const AngryEmojis: string[] = [
  "🧸💢",
  "🧸💨",
  "🧸🔪",
  "🧸💔",
  "🧸😭",
  "🧸🚑",
  "🧸😤",
  "🧸🔥",
  "🧸⚡",
  "🧸😡",
  "🧸🤬",
  "🧸👿",
  "🧸🧱",
  "🧸🩹",
  "🧸🥊",
  "🧸🧨",
  "🧸😾",
  "🧸💣",
  "🧸🗯️",
  "🧸🪓",
];

const createShuffle = (array: string[]) => {
  const newDeck = [...array];

  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }

  return newDeck;
};

const successSound = new Audio("/cheer.mp3");

function App() {
  const [msg, setMsg] = useState<string>("");
  const [msgColor, setMsgColor] = useState<string>("text-gray-700");
  const [list, setList] = useState<string[]>(() => createShuffle(TextArray));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [bearEmoji, setBearEmoji] = useState<string>("🧸");
  const [bearAnim, setBearAnim] = useState<string>("teddy-wiggle");

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRejection = () => {
    const item = list[currentIndex];
    setMsg(item);

    const randomColor =
      TextColors[Math.floor(Math.random() * TextColors.length)];
    setMsgColor(randomColor);

    const randomAngry =
      AngryEmojis[Math.floor(Math.random() * AngryEmojis.length)];
    setBearEmoji(randomAngry);
    setBearAnim("teddy-angry");

    const nextIndex = currentIndex + 1;

    if (nextIndex > list.length - 1) {
      setList(createShuffle(TextArray));
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleAccept = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    successSound.currentTime = 0;
    successSound
      .play()
      .catch((err) => console.log("Audio blocked by browser:", err));

    confetti({
      particleCount: 200, // Number of confetti pieces
      spread: 90, // How wide it shoots
      origin: { y: 0.6 }, // Starts slightly below the middle of the screen
      zIndex: 9999,
      colors: ["#ff0000", "#ff69b4", "#ff1493", "#ffffff"], // Valentine colors!
    });

    setButtonDisable(true);

    setMsg("Forever & Always, My Love! ❤️💍");
    setMsgColor("text-red-500");

    setBearEmoji("🧸👩‍❤️‍💋‍👨🧸");
    setBearAnim("teddy-celebrate");

    try {
      await axios.post(`${API_URL}/api/accepted`, {
        date: new Date(),
      });
    } catch (error) {
      console.error("Backend failed, but we still celebrate!", error);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-pink-200 via-red-100 to-pink-300 p-4">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full text-center border-4 border-white transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleAccept} className="flex flex-col items-center">
            <div className="mb-4 h-24 flex items-center justify-center">
              <span
                key={bearEmoji} // Forces React to restart the animation if emoji changes
                className={`text-7xl md:text-8xl block ${bearAnim}`} // Applies the animation class
              >
                {bearEmoji} {/* Renders the actual emoji string */}
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl font-extrabold text-rose-600 drop-shadow-sm mb-2">
                Will You Be My Val? 🌹
              </h1>
              <p className="text-gray-500 font-medium">
                I promise I'm nice and I'm gentle...
              </p>
            </div>

            <div className="flex gap-6 w-full justify-center mb-8">
              <button
                type="submit"
                disabled={buttonDisable}
                className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-lg shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex-1 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none disabled:transform-none"
              >
                {buttonDisable ? "YAY! 💖" : "YES 😍"}
              </button>

              <button
                type="button"
                onClick={handleRejection}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-full text-lg shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex-1 cursor-pointer"
              >
                NO 😢
              </button>
            </div>
          </form>

          <div className="h-24 flex items-center justify-center">
            {msg && (
              <h1
                key={msg}
                className={`text-2xl font-black ${msgColor} animate-bounce transition-all duration-300`}
              >
                {msg}
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
