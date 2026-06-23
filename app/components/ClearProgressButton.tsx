"use client";
import {useRouter} from "next/navigation";

  export default function ClearProgressButton() {
    const router = useRouter();
    return (
      <button 
        onClick={async () => {
        if(!confirm("Clear all our study progess? This can't be undone.")) return;
        await fetch("/api/results", { method: "DELETE" });
        router.refresh();
      }}
        className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
    >
        Reset results
      </button>
    );
  }

