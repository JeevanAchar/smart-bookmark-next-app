"use client";

import {
  JSX,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { Bookmark, useUser } from "@/app/context/UserContext";
import { Constants } from "@/app/constant/index";
import { formatSavedDate, getHostname } from "@/app/utils/CommonUtils";

type BookmarkInput = {
  title: string;
  url: string;
};

export default function DashBoard(): JSX.Element {
  const supabase = createClient();
  const {
    user,
    setUser,
    bookmarks,
    setBookmarks,
    selectedBookmarkId,
    setSelectedBookmarkId,
  } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<BookmarkInput>({ title: "", url: "" });
  const [note, setNote] = useState<string | null>(null);
  const realtimeActiveRef = useRef(false);
  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);
  const realtimeStartRef = useRef(false);
  const realtimeCleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const setFormFromBookmark = (bookmark: Bookmark | null) => {
    if (bookmark) {
      setForm({ title: bookmark.title, url: bookmark.url });
    } else {
      setForm({ title: "", url: "" });
    }
  };

  const selectedBookmark = useMemo(
    () =>
      bookmarks.find((bookmark) => bookmark.id === selectedBookmarkId) ?? null,
    [bookmarks, selectedBookmarkId],
  );

  useEffect(() => {
    setFormFromBookmark(selectedBookmark);
  }, [selectedBookmark]);

  useEffect(() => {
    let active = true;

    const loadBookmarks = async () => {
      if (!user) {
        setBookmarks([]);
        setSelectedBookmarkId(null);
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .select("id,title,url,created_at,user_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!active) return;

      if (error) {
        setNote(Constants.CommonConstant.COULD_NOT_LOAD_ERROR_MESSAGE);
        setBookmarks([]);
        setSelectedBookmarkId(null);
      } else {
        const nextBookmarks = (data ?? []) as Array<Bookmark>;
        const nextSelected = nextBookmarks[0] ?? null;
        setBookmarks(nextBookmarks);
        setSelectedBookmarkId(nextSelected?.id ?? null);
      }
      setIsLoading(false);
    };

    loadBookmarks();

    return () => {
      active = false;
    };
  }, [supabase, user, setBookmarks, setSelectedBookmarkId]);

  useEffect(() => {
    if (!user) return;

    if (realtimeCleanupTimerRef.current) {
      clearTimeout(realtimeCleanupTimerRef.current);
      realtimeCleanupTimerRef.current = null;
    }

    realtimeActiveRef.current = true;

    const startChannel = (accessToken: string | null) => {
      if (
        !realtimeActiveRef.current ||
        realtimeStartRef.current ||
        !accessToken
      ) {
        return;
      }
      realtimeStartRef.current = true;
      supabase.realtime.setAuth(accessToken);
      realtimeChannelRef.current = supabase
        .channel(`bookmarks:user:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (payload: any) => {
            const next = payload.new as Bookmark;
            setBookmarks((current) => {
              if (current.some((bookmark) => bookmark.id === next.id)) {
                return current;
              }
              return [next, ...current];
            });
            setSelectedBookmarkId((current) => (current ? current : next.id));
          },
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (payload: any) => {
            const next = payload.new as Bookmark;
            setBookmarks((current) =>
              current.map((bookmark) =>
                bookmark.id === next.id ? next : bookmark,
              ),
            );
          },
        )
        .on(
          "postgres_changes",
          {
            event: "DELETE",
            schema: "public",
            table: "bookmarks",
          },
          (payload: any) => {
            const prev = payload.old as Bookmark;
            let remaining: Bookmark[] = [];
            setBookmarks((current) => {
              remaining = current.filter((bookmark) => bookmark.id !== prev.id);
              return remaining;
            });
            setSelectedBookmarkId((current) =>
              current !== prev.id ? current : (remaining[0]?.id ?? null),
            );
          },
        )
        .subscribe();
    };

    const { data: authSubscription } = supabase.auth.onAuthStateChange(
      (_event: any, session: any) => {
        startChannel(session?.access_token ?? null);
      },
    );

    const initRealtime = async () => {
      const { data } = await supabase.auth.getSession();
      let session = data.session ?? null;

      if (!session) {
        const refreshed = await supabase.auth.refreshSession();
        session = refreshed.data.session ?? null;
      }

      startChannel(session?.access_token ?? null);
    };

    initRealtime();

    return () => {
      realtimeActiveRef.current = false;
      authSubscription.subscription.unsubscribe();

      realtimeCleanupTimerRef.current = setTimeout(() => {
        if (!realtimeActiveRef.current && realtimeChannelRef.current) {
          supabase.removeChannel(realtimeChannelRef.current);
          realtimeChannelRef.current = null;
          realtimeStartRef.current = false;
        }
      }, 0);
    };
  }, [supabase, user, setBookmarks, setSelectedBookmarkId]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    globalThis.location.reload();
  };

  const handleCopy = async () => {
    if (!selectedBookmark) return;

    try {
      await navigator.clipboard.writeText(selectedBookmark.url);
      setNote(Constants.CommonConstant.COPIED_TO_CLIPBOARD_MESSAGE);
    } catch {
      setNote(Constants.CommonConstant.COPIED_TO_CLIPBOARD_FAILED_MESSAGE);
    }
  };

  const handleSelect = (bookmarkId: string) => {
    setSelectedBookmarkId(bookmarkId);
  };

  const handleNewBookmark = () => {
    setSelectedBookmarkId(null);
  };

  const handleSave = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) return;

    setIsSaving(true);
    setNote(null);

    if (!form.title.trim() || !form.url.trim()) {
      setNote(Constants.CommonConstant.REUQIRED_FIELDS_ERROR_MESSAGE);
      setIsSaving(false);
      return;
    }

    if (selectedBookmark) {
      const { data, error } = await supabase
        .from("bookmarks")
        .update({ title: form.title.trim(), url: form.url.trim() })
        .eq("id", selectedBookmark.id)
        .eq("user_id", user.id)
        .select("id,title,url,created_at,user_id")
        .maybeSingle();

      if (error || !data) {
        setNote(
          Constants.CommonConstant.UNABLE_TO_UPDATE_BOOKMARK_ERROR_MESSAGE,
        );
      } else {
        setBookmarks(
          bookmarks.map((bookmark) =>
            bookmark.id === data.id ? (data as Bookmark) : bookmark,
          ),
        );
        setNote(Constants.CommonConstant.UPDATED_BOOKMARK_SUCCESS_MESSAGE);
      }
    } else {
      const { data, error } = await supabase
        .from("bookmarks")
        .insert({
          title: form.title.trim(),
          url: form.url.trim(),
          user_id: user.id,
        })
        .select("id,title,url,created_at,user_id")
        .single();

      if (error || !data) {
        setNote(
          Constants.CommonConstant.UNABLE_TO_UPDATE_BOOKMARK_ERROR_MESSAGE,
        );
      } else {
        setBookmarks([data as Bookmark, ...bookmarks]);
        setSelectedBookmarkId(data.id);
        setNote(Constants.CommonConstant.ADDED_BOOKMARK_SUCCESS_MESSAGE);
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!selectedBookmark) return;
    setIsSaving(true);
    setNote(null);

    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", selectedBookmark.id);

    if (error) {
      setNote(Constants.CommonConstant.UNABLE_TO_DELETE_BOOKMARK_ERROR_MESSAGE);
      setIsSaving(false);
      return;
    }

    const remaining = bookmarks.filter(
      (bookmark) => bookmark.id !== selectedBookmark.id,
    );

    setBookmarks(remaining);
    const nextSelected = remaining[0] ?? null;
    setSelectedBookmarkId(nextSelected?.id ?? null);
    setIsSaving(false);
  };

  useEffect(() => {
    if (!note) return;

    const noteTimeout = setTimeout(() => {
      setNote(null);
    }, 3000);

    return () => {
      clearTimeout(noteTimeout);
    };
  }, [note]);

  // If the user is not logged in, return an empty fragment
  if (!user) {
    return <></>;
  }

  return (
    <main className="grid min-h-screen grid-cols-[minmax(220px,280px)_1fr] max-[900px]:grid-cols-1">
      <aside className="flex flex-col gap-6 border-r border-border bg-white/80 px-[1.6rem] py-8 max-[900px]:border-b max-[900px]:border-r-0">
        <div className="font-serif text-[1.4rem]">Bookmark Vault</div>
        <div className="flex items-center gap-[0.8rem] rounded-2xl border border-[rgba(90,163,217,0.3)] bg-[rgba(90,163,217,0.12)] px-[0.9rem] py-[0.8rem]">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[rgba(18,18,26,0.9)] text-white font-semibold">
            {user.email?.slice(0, 1).toUpperCase() ?? "U"}
          </div>
          <div>
            <p className="m-0 text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted">
              Signed in
            </p>
            <p className="m-0 text-[0.95rem] font-semibold break-all">
              {user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="m-0 font-semibold">Your bookmarks</p>
          <button
            className="rounded-full border border-[rgba(18,18,26,0.15)] bg-transparent px-[1.1rem] py-[0.55rem] font-semibold text-ink"
            onClick={handleNewBookmark}
          >
            + New
          </button>
        </div>
        {isLoading ? (
          <p className="m-0 text-[0.95rem] leading-[1.6] text-ink-muted">
            Loading your library…
          </p>
        ) : bookmarks.length === 0 ? (
          <div className="text-[0.95rem] leading-[1.6] text-ink-muted">
            <p className="m-0">No bookmarks yet.</p>
            <span className="mt-[0.4rem] block">
              Add your first bookmark to get started.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-[0.6rem]">
            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                className={`flex cursor-pointer flex-col gap-[0.2rem] rounded-[0.9rem] border px-[0.9rem] py-3 text-left transition-[border-color,background] duration-200 ${
                  bookmark.id === selectedBookmarkId
                    ? "border-[rgba(90,163,217,0.4)] bg-[rgba(90,163,217,0.16)]"
                    : "border-transparent bg-[rgba(18,18,26,0.04)] hover:border-[rgba(18,18,26,0.2)]"
                }`}
                onClick={() => handleSelect(bookmark.id)}
              >
                <span className="font-semibold">{bookmark.title}</span>
                <span className="text-[0.85rem] text-ink-muted">
                  {getHostname(bookmark.url)}
                </span>
              </button>
            ))}
          </div>
        )}
      </aside>

      <section className="flex flex-col gap-10 px-[3.5vw] pt-10 pb-12">
        <div className="flex items-center justify-between gap-8 max-[900px]:flex-col max-[900px]:items-start">
          <div>
            <p className="m-0 mb-2 text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted">
              Workspace
            </p>
            <h1 className="m-0 font-serif text-[clamp(1.8rem,3vw,2.4rem)]">
              {selectedBookmark ? "Bookmark details" : "Add a new bookmark"}
            </h1>
          </div>
          <div className="flex items-center gap-[0.8rem] max-[900px]:w-full max-[900px]:flex-wrap max-[900px]:justify-start">
            <button
              className="rounded-full bg-[#111111] px-[1.1rem] py-[0.55rem] font-semibold text-white"
              onClick={handleNewBookmark}
            >
              Add bookmark
            </button>
            <button
              className="rounded-full border border-[rgba(18,18,26,0.4)] bg-transparent px-[1.1rem] py-[0.55rem] font-semibold text-ink"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-border bg-white/85 p-8 shadow-[0_30px_60px_rgba(18,18,26,0.08)]">
          {note && (
            <p className="mb-4 rounded-[0.8rem] bg-glow/20 px-4 py-[0.6rem] text-ink">
              {note}
            </p>
          )}
          <form className="flex flex-col gap-[1.2rem]" onSubmit={handleSave}>
            <div className="flex items-start justify-between gap-4 border-b border-border pb-[0.6rem]">
              <div>
                <p className="m-0 mb-[0.3rem] text-[0.7rem] uppercase tracking-[0.2em] text-ink-muted">
                  {selectedBookmark ? "Selected bookmark" : "New bookmark"}
                </p>
                <h2 className="m-0 font-serif text-[1.4rem]">
                  {selectedBookmark
                    ? selectedBookmark.title
                    : "Create a fresh link"}
                </h2>
              </div>
              {selectedBookmark ? (
                <div className="text-right text-[0.85rem] text-ink-muted">
                  <span>Last saved</span>
                  <strong className="mt-[0.3rem] block text-ink">
                    {formatSavedDate(selectedBookmark.created_at)}
                  </strong>
                </div>
              ) : null}
            </div>
            <label className="flex flex-col gap-2 font-semibold">
              <span>Title</span>
              <input
                className="rounded-[0.8rem] border border-[rgba(18,18,26,0.2)] bg-white px-[0.9rem] py-[0.7rem] text-[1rem] text-ink"
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
                placeholder="Give it a friendly name"
                required
              />
            </label>
            <label className="flex flex-col gap-2 font-semibold">
              <span>URL</span>
              <div className="flex items-center gap-[0.8rem] max-[900px]:flex-col max-[900px]:items-stretch">
                <input
                  className="w-full rounded-[0.8rem] border border-[rgba(18,18,26,0.2)] bg-white px-[0.9rem] py-[0.7rem] text-[1rem] text-ink"
                  value={form.url}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      url: event.target.value,
                    }))
                  }
                  placeholder="https://example.com"
                  required
                />
                {selectedBookmark ? (
                  <button
                    type="button"
                    className="rounded-full border border-[rgba(18,18,26,0.15)] bg-transparent px-[1.1rem] py-[0.55rem] font-semibold text-ink"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                ) : null}
              </div>
            </label>
            <div className="flex gap-[0.8rem] max-[900px]:flex-col max-[900px]:items-stretch">
              <button
                className="rounded-full bg-[#111111] px-[1.1rem] py-[0.55rem] font-semibold text-white disabled:opacity-70"
                type="submit"
                disabled={isSaving}
              >
                {selectedBookmark ? "Save changes" : "Add bookmark"}
              </button>
              {selectedBookmark ? (
                <button
                  type="button"
                  className="rounded-full border 
                  border-[rgba(234,67,53,0.5)] bg-[rgba(234,67,53,0.12)] 
                  px-[1.1rem] py-[0.55rem] font-semibold text-[#a61c10]"
                  onClick={handleDelete}
                  disabled={isSaving}
                >
                  Delete
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
