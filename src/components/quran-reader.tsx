"use client";

import React, { useState, useEffect } from "react";
import { getVerse } from "@/services/quran-text";

export const QuranReader = () => {
  const [verseText, setVerseText] = useState("Loading...");

  useEffect(() => {
    const fetchVerse = async () => {
      const verse = await getVerse(1, 1); // Fetch Surah 1, Verse 1 as default
      setVerseText(verse.text);
    };

    fetchVerse();
  }, []);

  return (
    <div className="p-4 rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Surah Al-Fatiha (1:1)</h2>
      <p className="text-gray-700">{verseText}</p>
    </div>
  );
};
