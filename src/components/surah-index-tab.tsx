"use client";

import React, { useState, useEffect } from "react";
import { getAllSurahs } from "@/services/quran-text";

export const SurahIndexTab = () => {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    const fetchSurahs = async () => {
      const surahList = await getAllSurahs();
      setSurahs(surahList);
    };

    fetchSurahs();
  }, []);

  return (
    <div className="p-4 rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Surah Index</h2>
      <ul>
        {surahs.map((surah) => (
          <li key={surah.surahNumber} className="py-2">
            {surah.surahNumber}. {surah.name} ({surah.numberOfVerses} verses)
          </li>
        ))}
      </ul>
    </div>
  );
};
