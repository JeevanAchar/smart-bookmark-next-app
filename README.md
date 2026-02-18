# Smart Bookmark 🔖

**Smart BookMark** is a modern web application that allows users to securely save, search, and manage their bookmarks with real-time synchronization across multiple tabs.

🔗 **Live App:**
https://smart-bookmark-app-xi-six.vercel.app/

---

## ✨ Features

* **Google Authentication**
  Secure signup and login powered by Google OAuth.

* **Add Bookmarks Easily**
  Save bookmarks with:

  * Title
  * URL

* **Powerful Search**
  Quickly find bookmarks by searching:

  * Title
  * URL

* **Real-time Sync Across Tabs**
  Concurrent updates are reflected instantly across multiple open tabs using **Supabase Realtime (WebSockets)**.

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

Built with ❤️ using **Next.js + Supabase**.
