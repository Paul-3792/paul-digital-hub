# Paul Digital Hub — Website

A clean, modern, responsive business website built with pure HTML, CSS, and JavaScript.
No frameworks. No build tools. Just open the file and it works.

---

## 📁 Folder Structure

```
paul-digital-hub/
├── index.html          ← The full website (all sections in one file)
├── css/
│   ├── style.css       ← All layout, colors, and component styles
│   └── animations.css  ← Scroll animations and keyframes
├── js/
│   └── main.js         ← All interactivity (navbar, form, animations)
├── images/             ← Put your photos here (profile pic, project screenshots)
└── README.md           ← This guide
```

---

## 🚀 How to Open in Your Browser

1. Double-click `index.html`
2. It opens in your default browser — done!

For the best experience, use a local server (optional but recommended):
- Install VS Code → install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"
- This auto-refreshes the browser whenever you save a file

---

## ✏️ How to Edit Content

### Change Your WhatsApp Number
Search for `234XXXXXXXXXX` in `index.html` and replace ALL instances with your real number.
Example: If your number is 08012345678 → use 2348012345678 (country code 234, no leading 0)

### Change Text
Open `index.html` in VS Code (or Notepad) and find the section you want.
Each section is clearly labeled with a comment like `<!-- HERO -->`, `<!-- ABOUT -->`, etc.

### Change Colors
Open `css/style.css`. At the very top, find `:root { ... }`.
Change `--accent: #e8622a;` to any color you like. Example: `--accent: #3498db;` for blue.

### Add a Real Profile Photo
1. Put your photo in the `images/` folder as `profile.jpg`
2. In `index.html`, find the `.profile-avatar` div and replace it with:
   `<img src="images/profile.jpg" alt="Opara Paul" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`

---

## 📧 Making the Contact Form Actually Send Emails

By default, the form shows a success message but doesn't send anything.
To receive real emails, use one of these free services:

### Option 1: Formspree (Easiest — 5 minutes)
1. Go to https://formspree.io and create a free account
2. Create a new form — you get a URL like: `https://formspree.io/f/abcdefgh`
3. In `index.html`, change the form opening tag to:
   `<form id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">`
4. Remove `novalidate` and `e.preventDefault()` in main.js

### Option 2: Web3Forms (Also free)
1. Go to https://web3forms.com
2. Enter your email to get an access key
3. Add a hidden input inside your form:
   `<input type="hidden" name="access_key" value="YOUR_KEY_HERE">`
4. Change form action to: `https://api.web3forms.com/submit`

---

## 🌍 How to Host Online (Free)

### Option 1: Netlify (Recommended — Easiest)
1. Go to https://netlify.com → Sign up (free)
2. Drag and drop your entire `paul-digital-hub` folder onto the Netlify dashboard
3. Your site goes live instantly at a URL like: `https://random-name.netlify.app`
4. To set a custom domain later: Site Settings → Domain Management

### Option 2: GitHub Pages (Free)
1. Create a free account at https://github.com
2. Create a new repository called `paul-digital-hub`
3. Upload all your files (index.html, css/, js/ folders)
4. Go to Settings → Pages → Source: "Deploy from branch" → Branch: main → Save
5. Your site will be live at: `https://YOUR_USERNAME.github.io/paul-digital-hub`

### Option 3: Vercel (Free)
1. Go to https://vercel.com → Sign up with GitHub
2. Import your GitHub repository
3. Click Deploy — your site is live in seconds

---

## 📱 WhatsApp Button

The floating WhatsApp button is in `index.html` near the bottom (search for `whatsapp-float`).
Replace `234XXXXXXXXXX` with your real Nigerian number.

Format: 234 + your number without the leading 0
Example: 0812 345 6789 → 2348123456789

Full URL example: `https://wa.me/2348123456789`

---

## 🧩 Adding More Projects

To add a new project to the Projects section:
1. Copy one of the existing `.project-card` blocks in `index.html`
2. Paste it inside `.projects-grid`
3. Change the emoji, title, description, and tags
4. Change `.p1` / `.p2` etc to a new gradient class, or add your own in style.css

---

## 🎨 Changing the Color Theme

Find `:root` in `css/style.css` and change these variables:
- `--accent` → Your brand color (currently orange: #e8622a)
- `--navy` → Page background (currently dark navy)
- `--card-bg` → Card background color

---

Built with ❤️ in Abuja, Nigeria · Paul Digital Hub · 2025
