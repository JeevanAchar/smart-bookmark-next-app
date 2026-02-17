"use client";

import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export type Bookmark = {
  id: string;
  title: string;
  url: string;
  created_at?: string;
  user_id?: string;
};

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  bookmarks: Array<Bookmark>;
  setBookmarks: Dispatch<SetStateAction<Array<Bookmark>>>;
  selectedBookmarkId: string | null;
  setSelectedBookmarkId: Dispatch<SetStateAction<string | null>>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({
  initialUser,
  children,
}: Readonly<{
  initialUser: User | null;
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<User | null>(initialUser);
  const [bookmarks, setBookmarks] = useState<Array<Bookmark>>([]);
  const [selectedBookmarkId, setSelectedBookmarkId] = useState<string | null>(
    null,
  );
  const value = useMemo(
    () => ({
      user,
      setUser,
      bookmarks,
      setBookmarks,
      selectedBookmarkId,
      setSelectedBookmarkId,
    }),
    [user, bookmarks, selectedBookmarkId],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
