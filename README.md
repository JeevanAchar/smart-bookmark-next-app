# Smart Bookmark 🔖

**Smart BookMark** is a modern web application that allows users to securely save, search, and manage their bookmarks with real-time synchronization across multiple tabs.

🔗 **Live App:**
https://smart-bookmark-app-xi-six.vercel.app/

---

# 👤 About Me

Hi, I'm Jeevan, a Full Stack Developer with around 3 years of experience building scalable applications.

In my current role, I actively integrate AI-assisted development into my workflow. I use tools like ChatGPT to understand unfamiliar modules and accelerate development, but I always review, test, and validate the generated solutions to ensure they are secure, production-ready, and maintainable.

This project reflects my ability to combine strong engineering fundamentals with responsible AI usage.


---

# ✨ Features
##  🔐 Google Authentication

Secure signup and login powered by Google OAuth only (no email/password).

➕ Add Bookmarks Easily

Save bookmarks with:

Title

URL

## 🔎 Powerful Search

Quickly find bookmarks by searching:

Title

URL

# # 🔄 Real-time Sync Across Tabs

Concurrent updates are reflected instantly across multiple open tabs using Supabase Realtime (WebSockets).

## 🗑️ Delete Bookmarks

Users can delete their own bookmarks securely.

##  🔒 User Data Privacy

Bookmarks are private to each user using Supabase Row Level Security (RLS).

---

## 🏗️ Tech Stack

* **Frontend:** Next.js
* **Backend / Database:** Supabase
* **Authentication:** Google OAuth via Supabase Auth
* **Deployment:** Vercel

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/smart-bookmark.git
cd smart-bookmark
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the development server

```bash
npm run dev
```

App will be available at:

```
http://localhost:3000
```

---

# 🧠 Challenges Faced & How I Solved Them
1️⃣ Configuring Row Level Security (RLS)

Challenge:
I did not have prior hands-on experience with Supabase, and configuring Row Level Security policies initially caused database queries to fail.

Solution:
I carefully studied Supabase documentation and created policies tied to the authenticated user's ID.
Each bookmark record is linked to auth.uid(), ensuring users can only access their own data.

2️⃣ Implementing Real-Time Updates

Challenge:
Understanding how Supabase Realtime subscriptions work and how to correctly update the UI without refreshing. 

Solution:
I used Supabase channel subscriptions to listen to insert and delete events on the bookmarks table.
When changes occur, the UI updates instantly, allowing synchronization across multiple tabs.

3️⃣ Learning New Modules Efficiently

Challenge:
Certain Supabase concepts and configurations were new to me.

Solution:
I used ChatGPT as a learning assistant to understand unfamiliar modules and patterns.
However, I reviewed, tested, and validated all implementations myself to ensure reliability and production safety.

---



## 📌 Use Case

Smart Bookmark helps users:

* Store useful links in a single secure place
* Access bookmarks from anywhere
* Instantly sync changes across browser tabs
* Quickly search through saved resources

Ideal for **developers, students, and researchers** who frequently collect useful web links.

---

## 🔮 Future Improvements

* Bookmark categories/tags
* Dark mode support
* Mobile app version

---

## 👨‍💻 Author

Jeevan
Full Stack Developer (3+ years experience)

Built with ❤️ using **Next.js + Supabase**.
