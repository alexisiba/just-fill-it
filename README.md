This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Document Template Filler

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

This project is a web application built with **Next.js**, **React**, and **Tailwind CSS** that allows users to generate documents from customizable templates.

It leverages:

- **Zustand** as a lightweight state management solution.
- **Formik + Yup** to dynamically generate and validate forms.
- **Docxtemplater** to process Word documents and replace placeholders with user-provided values.

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
├── public/                     # Static assets
├── src/
│    └── app/
│         ├── _components/      # Reusable global UI components
│         ├── _store/           # Application state managment
│         ├── (landing_page)/   # Main application route
│         ├── api/
│         │    └── convert/     # Api to convert docx to pdf
│         ├── utils/            # Shared functions and utilities
│         └── ...               # Other source files
└── README.md                   # This file
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

📊 Google Analytics (opcional)

Este proyecto soporta integración con Google Analytics 4 usando @next/third-parties
.

👉 Importante:

La integración solo se activa si defines una variable de entorno.

Si clonas este repositorio, no se enviarán datos de uso por defecto.

Configuración

Crea un archivo .env.local en la raíz del proyecto.

Agrega tu ID de medición de Google Analytics (formato G-XXXXXXXXXX):

```bash
GA_ID=G-XXXXXXXXXX
```

Al ejecutar o desplegar la aplicación, si esta variable está definida, Google Analytics se habilitará automáticamente.

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👤 Author

- Name: Alexis Isidoro Bolaños Avalos
- Contact: [LinkedIn](https://linkedin.com/in/alexisiba) / [GitHub](https://github.com/alexisiba) / contacto@alexisiba.com
