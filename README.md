This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Document Generator With Templates

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This project is a web application built with **Next.js**, **React**, and **Tailwind CSS** that allows users to generate documents from customizable templates.

The application automatically detects input fields inside a document by using **double curly braces `{{ }}`** as placeholders. It then generates a dynamic form so the user can fill in the values and export the final document.

---

## ✨ Features

- 📄 **Dynamic templates**: automatically detects variables inside `{{braces}}`.
- 📝 **Auto-generated forms** based on the template content.
- ⚡ **Client-side processing**: files are never stored on any server.
- 🔒 **Privacy-first**: documents are processed only in the user’s browser.
- 🎨 **Modern and responsive styles** powered by **Tailwind CSS**.
- 🌐 Built with **Next.js** and **React**.

---

## 🚀 How to Use

1. Upload a document containing placeholders wrapped in double curly braces `{{ }}`.  
   Example:

```markdown
I, {{name}}, with ID number {{id}}, hereby declare the following...
```

2. The app will detect the fields (`name`, `id`) and generate a form.
3. Fill in the form with your desired values.
4. Download the final document with the replaced content.

---

## 📂 Project Structure

```
.
├── pages/ # Main application routes
├── components/ # Reusable UI components
├── public/ # Static assets
├── styles/ # Global styles with Tailwind
└── README.md # This file
```

---

## 🛠️ Requirements

- Node.js >= 18
- npm or yarn

---

## ▶️ Installation & Local Development

```bash
# Clone the repository
git clone https://github.com/username/repository.git

# Navigate to the project directory
cd repository

# Install dependencies
npm install

# Run in development mode
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

- Name: Alexis Isidoro Bolaños Avalos
- Contact: [LinkedIn](https://linkedin.com/in/alexisiba) / [GitHub](https://github.com/alexisiba) / contacto@alexisiba.com
