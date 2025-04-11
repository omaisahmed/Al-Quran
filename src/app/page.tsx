"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Bookmarks, Settings, List, Search } from "lucide-react";
import { QuranReader } from "@/components/quran-reader";
import { BookmarksTab } from "@/components/bookmarks-tab";
import { SettingsTab } from "@/components/settings-tab";
import { JuzIndexTab } from "@/components/juz-index-tab";
import { SurahIndexTab } from "@/components/surah-index-tab";
import { GoToPageTab } from "@/components/go-to-page-tab";
import { Splash } from "@/components/splash";

const SplashScreenComponent = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <Splash /> : null;
};

export default function Home() {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SplashScreenComponent />
      {!showSplash && (
        <div className="flex flex-col h-screen">
          <Tabs defaultActiveKey="resume" className="flex flex-col flex-1">
            <TabsList className="justify-center bg-secondary">
              <TabsTrigger value="resume" aria-label="Resume Reading">
                <Home className="mr-2 h-4 w-4" />
                Resume
              </TabsTrigger>
              <TabsTrigger value="juzIndex" aria-label="Juz Index">
                <List className="mr-2 h-4 w-4" />
                Juz Index
              </TabsTrigger>
              <TabsTrigger value="surahIndex" aria-label="Surah Index">
                <List className="mr-2 h-4 w-4" />
                Surah Index
              </TabsTrigger>
              <TabsTrigger value="goToPage" aria-label="Go To Page">
                <Search className="mr-2 h-4 w-4" />
                Go To Page
              </TabsTrigger>
              <TabsTrigger value="bookmarks" aria-label="Bookmarks">
                <Bookmarks className="mr-2 h-4 w-4" />
                Bookmarks
              </TabsTrigger>
              <TabsTrigger value="settings" aria-label="Settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-auto p-4">
              <TabsContent value="resume" className="outline-none">
                <QuranReader />
              </TabsContent>
              <TabsContent value="juzIndex" className="outline-none">
                <JuzIndexTab />
              </TabsContent>
              <TabsContent value="surahIndex" className="outline-none">
                <SurahIndexTab />
              </TabsContent>
              <TabsContent value="goToPage" className="outline-none">
                <GoToPageTab />
              </TabsContent>
              <TabsContent value="bookmarks" className="outline-none">
                <BookmarksTab />
              </TabsContent>
              <TabsContent value="settings" className="outline-none">
                <SettingsTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}
    </>
  );
}
