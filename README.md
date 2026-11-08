# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দৈনিক বাজারদর, দাম বাড়া-কমা এবং বিভিন্ন বাজারের মূল্য তুলনা করার একটি responsive web application। BazarDor API থেকে পণ্যের তথ্য নিয়ে ব্যবহারকারীকে সহজ বাংলায় বাজারের আপডেট দেখায়।

## ✨ Key Features

1. **Live market overview** — দাম বেড়েছে/কমেছে এমন পণ্যের তালিকা এবং infinite price ticker।
2. **Product directory** — ৮টি ক্যাটাগরি ও API-তে থাকা পণ্য responsive card grid-এ দেখা।
3. **Category sorting** — বাংলা UI-তে দাম কম থেকে বেশি বা বেশি থেকে কম; numeric price sorting।
4. **Protected product details** — লগইন করা ব্যবহারকারী বাজারভিত্তিক minimum, maximum, average এবং market table দেখতে পারবেন।
5. **Authentication** — Better Auth দিয়ে email/password, Google এবং GitHub sign-in/sign-up।
6. **Profile management** — নিজের নাম দেখা ও Better Auth `updateUser` দিয়ে আপডেট করা।
7. **Responsive UI** — mobile, tablet ও desktop layout, skeleton loading, toast feedback এবং custom 404 page।

## 🧰 Technologies

- Next.js 15 App Router + React 19
- TypeScript
- Tailwind CSS v4 (custom component styling)
- Better Auth + MongoDB adapter
- MongoDB Atlas
- React Hot Toast
- Lucide React
- BazarDor REST API
