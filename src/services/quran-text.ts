// src/services/quran-text.ts

// Dummy data for testing purposes
const dummySurahList = [
    { number: 1, name: "Al-Fatiha", englishName: "The Opening", ayahs: 7 },
    { number: 2, name: "Al-Baqarah", englishName: "The Cow", ayahs: 286 },
    { number: 3, name: "Aal-Imran", englishName: "Family of Imran", ayahs: 200 },
];

const dummyJuzList = [
    { juzNumber: 1, surahName: "Al-Fatiha", startVerse: 1 },
    { juzNumber: 2, surahName: "Al-Baqarah", startVerse: 142 },
    { juzNumber: 3, surahName: "Al-Baqarah", startVerse: 253 },
];

const dummyQuranPage = {
    1: "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    2: "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ",
    3: "ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ",
    4: "مَـٰلِكِ يَوْمِ ٱلدِّينِ",
    5: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
};

// Function to fetch the list of surahs
export const getSurahList = async () => {
    // Replace this with actual API call or data fetching logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummySurahList);
        }, 500); // Simulate API delay
    });
};

// Function to fetch the list of juz
export const getJuzList = async () => {
    // Replace this with actual API call or data fetching logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dummyJuzList);
        }, 500); // Simulate API delay
    });
};

// Function to fetch a specific page of the Quran
export const getPage = async (pageNumber) => {
    // Replace this with actual API call or data fetching logic
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (pageNumber > 0 && pageNumber <= 604) {
                resolve(dummyQuranPage); // Replace with actual page data
            } else {
                reject("Page not found");
            }
        }, 500); // Simulate API delay
    });
};

