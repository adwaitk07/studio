# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 94.1%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 262 52% 58%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 174 100% 29%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 262 52% 58%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 262 52% 58%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 174 100% 29%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 262 52% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 256 256'%3E%3Cpath fill='currentColor' d='M216 40v16H84.31l-6.22-8.3a.93.93 0 0 0-.16-.17L76.31 46h131.94A7.77 7.77 0 0 1 216 40ZM166.69 104h49.38v16H92.31l-9.37-12.49a.93.93 0 0 0-.16-.17L76.31 98h90.38ZM76.31 154h72.38l67.31.05V170h-51.31l-12.5-16.66a.93.93 0 0 0-.16-.17l-1.62-1.51H76.31ZM178.69 210H40v-16h44.31l6.22 8.3a.93.93 0 0 0 .16.17l1.62 1.53h119.94a7.77 7.77 0 0 0-7.75-8.2Z'%3E%3C/path%3E%3C/svg%3E"), auto;
  }
}
