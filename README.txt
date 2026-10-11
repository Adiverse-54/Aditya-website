# Aditya Raj – Personal Website

## 1. Project Files

* `index.html` – Website structure and content.
* `style.css` – Website design, colors, layout, and responsive styling.
* `script.js` – Dark mode, typing animation, current year, and contact form functionality.
* `Aditya.png` – Your profile photo.

## 2. How to Run

1. Keep all files in the same folder.
2. Make sure your profile image is named `Aditya.png`.
3. Open `index.html` in your browser.

## 3. Contact Form Setup

The contact form uses Supabase to save messages.

1. Create a Supabase project.
2. Create a `contact_messages` table with `name`, `email`, and `message` columns.
3. Configure the Supabase URL and publishable key in `script.js`.
4. Set appropriate Row Level Security (RLS) policies to allow safe message submissions.

Never expose a Supabase secret or service-role key in frontend JavaScript.

## 4. Deployment

You can host this static website using GitHub Pages.

1. Upload all website files to your GitHub repository.
2. Enable GitHub Pages in repository Settings.
3. Open the generated website URL.

## 5. Technologies Used

* HTML5
* CSS3
* JavaScript
* Supabase
* Google Fonts

## 6. Features

* Responsive personal portfolio
* Dark/light mode
* Animated typing text
* About and interests sections
* Contact form
* Dynamic copyright year

Made with ❤️ by Aditya Raj.
