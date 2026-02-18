import { JSX } from "react";
import AuthButton from "@/app/components/AuthButton";

export default function LandingPage(): JSX.Element {
  return (
    <main className="flex flex-col gap-18 px-[6vw] pt-10 pb-16 max-[900px]:px-[5vw] max-[900px]:pb-14 max-[600px]:gap-14 max-[600px]:px-[6vw] max-[600px]:pt-8 max-[600px]:pb-12">
      <header className="flex items-center justify-between gap-6 max-[900px]:flex-col max-[900px]:items-start">
        <div className="font-serif text-[1.6rem] tracking-[0.04em]">
          Bookmark Vault
        </div>
        <AuthButton />
      </header>

      <section className="grid items-center gap-10 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        <div className="flex flex-col gap-6">
          <p className="m-0 text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted">
            Your bookmarks, finally tamed
          </p>
          <h1 className="m-0 font-serif text-[clamp(2.5rem,4vw,3.6rem)] leading-[1.1]">
            A calm, searchable home for every URL you care about.
          </h1>
          <p className="m-0 max-w-xl text-[1.1rem] leading-[1.7] text-ink-muted">
            Our mission is to help you remember the web that matters. Save any
            link with a title, keep it organized, and find it in seconds — no
            more lost tabs or mystery bookmarks.
          </p>
          <div className="flex max-w-88 flex-col gap-[0.4rem] rounded-2xl border border-border bg-white/75 px-[1.2rem] py-4 shadow-[0_18px_45px_rgba(18,18,26,0.08)]">
            <span className="font-semibold">Start saving in seconds</span>
            <span className="text-[0.95rem] text-ink-muted">
              Sign in to create your first bookmark.
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-[1.8rem] shadow-[0_30px_60px_rgba(18,18,26,0.12)] max-[600px]:p-[1.4rem]">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-glow/25 px-[0.8rem] py-[0.35rem] text-[0.75rem] font-semibold text-ink">
              Today
            </span>
            <span className="rounded-full bg-[rgba(90,163,217,0.18)] px-[0.8rem] py-[0.35rem] text-[0.75rem] font-semibold text-ink">
              3 links
            </span>
          </div>
          <div>
            <p className="m-0 mb-[0.4rem] text-[1.2rem] font-semibold">
              Design Systems Vault
            </p>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Keep the best references in one place with clear titles and clean
              URLs.
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-start gap-[0.8rem]">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sunset" />
                <div>
                  <p className="m-0 font-semibold">Apple HIG</p>
                  <p className="m-0 text-[0.85rem] text-ink-muted">
                    developer.apple.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[0.8rem]">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sunset" />
                <div>
                  <p className="m-0 font-semibold">Material 3</p>
                  <p className="m-0 text-[0.85rem] text-ink-muted">
                    m3.material.io
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[0.8rem]">
                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-sunset" />
                <div>
                  <p className="m-0 font-semibold">IBM Carbon</p>
                  <p className="m-0 text-[0.85rem] text-ink-muted">
                    carbondesignsystem.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-[0.6rem]">
          <p className="m-0 text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted">
            How it works
          </p>
          <h2 className="m-0 font-serif text-[clamp(2rem,3vw,2.6rem)]">
            Three quick steps to a future-proof library.
          </h2>
        </div>
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          <div className="rounded-[1.2rem] border border-border bg-white/80 p-6 shadow-[0_18px_35px_rgba(18,18,26,0.08)]">
            <p className="m-0 mb-[0.6rem] text-[0.85rem] uppercase tracking-[0.2em] text-ink-muted">
              01
            </p>
            <h3 className="m-0 mb-[0.6rem] text-[1.2rem] font-semibold">
              Add the URL
            </h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Paste any link you want to remember — articles, tools, tutorials,
              or inspiration.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-border bg-white/80 p-6 shadow-[0_18px_35px_rgba(18,18,26,0.08)]">
            <p className="m-0 mb-[0.6rem] text-[0.85rem] uppercase tracking-[0.2em] text-ink-muted">
              02
            </p>
            <h3 className="m-0 mb-[0.6rem] text-[1.2rem] font-semibold">
              Give it a title
            </h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Name it in your own words so it stays meaningful months later.
            </p>
          </div>
          <div className="rounded-[1.2rem] border border-border bg-white/80 p-6 shadow-[0_18px_35px_rgba(18,18,26,0.08)]">
            <p className="m-0 mb-[0.6rem] text-[0.85rem] uppercase tracking-[0.2em] text-ink-muted">
              03
            </p>
            <h3 className="m-0 mb-[0.6rem] text-[1.2rem] font-semibold">
              Find it fast
            </h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Search by title or domain and jump right back in.
            </p>
          </div>
        </div>
      </section>

      <section className="grid items-start gap-8 grid-cols-[minmax(240px,1.1fr)_minmax(240px,1fr)] max-[900px]:grid-cols-1">
        <div className="rounded-[1.6rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,255,255,0.7))] p-8 shadow-[0_24px_50px_rgba(18,18,26,0.1)]">
          <p className="m-0 text-[0.75rem] uppercase tracking-[0.2em] text-ink-muted">
            Mission
          </p>
          <h2 className="m-0 font-serif text-[clamp(2rem,3vw,2.6rem)]">
            Keep your knowledge close, not scattered.
          </h2>
          <p className="m-0 text-[1.05rem] leading-[1.7] text-ink-muted">
            Bookmark Vault exists so that every useful link has a home. Instead
            of dumping URLs into folders you never open, you build a living
            library of resources with clear titles, consistent order, and an
            interface that makes sense at a glance.
          </p>
        </div>
        <div className="grid gap-[1.2rem]">
          <div className="rounded-[1.1rem] border border-border bg-white/85 p-[1.4rem]">
            <h3 className="m-0 mb-[0.4rem] font-semibold">
              Intentional ordering
            </h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Arrange bookmarks in the order you want to revisit them — from
              &ldquo;read next&rdquo; to &ldquo;archive.&rdquo;
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-border bg-white/85 p-[1.4rem]">
            <h3 className="m-0 mb-[0.4rem] font-semibold">Built for recall</h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              Titles, URLs, and quick search keep everything easy to recognize.
            </p>
          </div>
          <div className="rounded-[1.1rem] border border-border bg-white/85 p-[1.4rem]">
            <h3 className="m-0 mb-[0.4rem] font-semibold">One clean space</h3>
            <p className="m-0 leading-[1.6] text-ink-muted">
              No scattered tabs — just the links that matter most.
            </p>
          </div>
        </div>
      </section>

      <footer className="pb-6 text-center">
        <p className="m-0 mb-2 text-[1.2rem] font-semibold">
          Ready to organize the web your way?
        </p>
        <p className="m-0 text-ink-muted">
          Sign in above to start building your bookmark library.
        </p>
      </footer>
    </main>
  );
}
