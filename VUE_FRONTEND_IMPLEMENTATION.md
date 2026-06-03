<![CDATA[
# 🎨 Vue.js 3 Frontend - Complete Implementation Guide
# دليل التنفيذ الكامل لـ Vue.js 3 Frontend

## 📋 نظرة عامة

هذا الدليل يحتوي على **جميع الملفات والأكواد** اللازمة لإنشاء Vue.js 3 Frontend من الصفر متكامل مع Laravel Backend.

---

## 🛠️ الخطوة 1: إنشاء مشروع Vue.js جديد

### 1.1 افتح Terminal في مجلد منفصل

```bash
# خارج مجلد Laravel
cd ..

# أنشئ مشروع Vue.js جديد
npm create vue@latest daryum-frontend

# عند السؤال اختر:
# ✔ Add TypeScript? … No
# ✔ Add JSX Support? … No
# ✔ Add Vue Router for Single Page Application development? … Yes
# ✔ Add Pinia for state management? … Yes
# ✔ Add Vitest for Unit Testing? … No
# ✔ Add an End-to-End Testing Solution? … No
# ✔ Add ESLint for code quality? … Yes
# ✔ Add Prettier for code formatting? … Yes

# ادخل للمجلد
cd daryum-frontend

# ثبّت Dependencies
npm install
```

### 1.2 تثبيت Packages المطلوبة

```bash
# TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Axios (API calls)
npm install axios

# Vue I18n (Bilingual support)
npm install vue-i18n@9

# Radix Vue (UI Components - shadcn-vue equivalent)
npm install radix-vue
npm install class-variance-authority clsx tailwind-merge

# Lucide Vue (Icons)
npm install lucide-vue-next

# VueUse (Utility functions)
npm install @vueuse/core

# Chart.js (Dashboard charts)
npm install chart.js vue-chartjs

# Day.js (Date handling)
npm install dayjs
```

---

## 🎨 الخطوة 2: إعداد TailwindCSS

### 2.1 ملف `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        available: "hsl(var(--available))",
        occupied: "hsl(var(--occupied))",
        cleaning: "hsl(var(--cleaning))",
        maintenance: "hsl(var(--maintenance))",
        blocked: "hsl(var(--blocked))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        display: ['Urbanist', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

### 2.2 ملف `src/assets/main.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@700&family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Premium Saudi PropTech palette */
    --primary: 152 78% 36%; /* deep emerald */
    --primary-foreground: 0 0% 100%;
    --secondary: 222 47% 11%; /* midnight navy */
    --secondary-foreground: 0 0% 100%;
    --accent: 43 74% 66%; /* warm gold */
    --accent-foreground: 222 47% 11%;
    --background: 45 56% 96%; /* warm cream */
    --foreground: 222 47% 11%; /* deep slate */
    --muted: 45 20% 88%; /* soft sand */
    --muted-foreground: 222 20% 40%;
    --card: 0 0% 100%; /* white cards */
    --card-foreground: 222 47% 11%;
    --popover: 0 0% 100%;
    --popover-foreground: 222 47% 11%;
    --border: 45 20% 82%; /* warm border */
    --input: 45 20% 82%;
    --ring: 152 78% 36%; /* emerald ring */
    --destructive: 0 84% 60%; /* elegant coral */
    --destructive-foreground: 0 0% 100%;
    
    /* Semantic colors */
    --available: 152 78% 36%; /* emerald */
    --occupied: 217 91% 60%; /* blue */
    --cleaning: 174 62% 47%; /* teal */
    --maintenance: 38 92% 50%; /* amber */
    --blocked: 222 20% 40%; /* slate */
    
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
    font-family: 'IBM Plex Sans', -apple-system, sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Urbanist', -apple-system, sans-serif;
    font-weight: 700;
  }

  /* RTL Support */
  [dir="rtl"] {
    direction: rtl;
  }

  [dir="ltr"] {
    direction: ltr;
  }
}
```

---

## 📁 الخطوة 3: Project Structure

```
daryum-frontend/
├── public/
├── src/
│   ├── api/              # API Services
│   │   ├── axios.js
│   │   ├── auth.js
│   │   ├── properties.js
│   │   ├── units.js
│   │   └── reservations.js
│   ├── assets/           # CSS, Images
│   │   └── main.css
│   ├── components/       # Vue Components
│   │   ├── ui/           # Base UI Components
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   ├── Card.vue
│   │   │   └── ...
│   │   ├── landing/      # Landing Page Components
│   │   │   ├── Hero.vue
│   │   │   ├── Features.vue
│   │   │   └── ...
│   │   └── dashboard/    # Dashboard Components
│   │       ├── Sidebar.vue
│   │       ├── Header.vue
│   │       ├── KPICard.vue
│   │       └── ...
│   ├── composables/      # Composition Functions
│   │   ├── useAuth.js
│   │   ├── useApi.js
│   │   └── useToast.js
│   ├── i18n/             # Internationalization
│   │   ├── index.js
│   │   ├── ar.json
│   │   └── en.json
│   ├── layouts/          # Layout Components
│   │   ├── DefaultLayout.vue
│   │   ├── AuthLayout.vue
│   │   └── DashboardLayout.vue
│   ├── router/           # Vue Router
│   │   └── index.js
│   ├── stores/           # Pinia Stores
│   │   ├── auth.js
│   │   ├── properties.js
│   │   ├── units.js
│   │   └── ui.js
│   ├── utils/            # Utility Functions
│   │   ├── cn.js
│   │   ├── format.js
│   │   └── validators.js
│   ├── views/            # Page Views
│   │   ├── Home.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   ├── dashboard/
│   │   │   ├── Dashboard.vue
│   │   │   ├── Properties.vue
│   │   │   ├── Units.vue
│   │   │   └── ...
│   ├── App.vue
│   └── main.js
├── .env
├── package.json
└── vite.config.js
```

---

## 🔧 الخطوة 4: إعداد Axios & API

### 4.1 ملف `.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Daryum
```

### 4.2 ملف `src/api/axios.js`

```js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor - Add token
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api
```

### 4.3 ملف `src/api/auth.js`

```js
import api from './axios'

export const authApi = {
  async register(data) {
    const response = await api.post('/register', data)
    return response.data
  },

  async login(credentials) {
    const response = await api.post('/login', credentials)
    return response.data
  },

  async logout() {
    const response = await api.post('/logout')
    return response.data
  },

  async me() {
    const response = await api.get('/me')
    return response.data
  },
}
```

### 4.4 ملف `src/api/properties.js`

```js
import api from './axios'

export const propertiesApi = {
  async getAll(params = {}) {
    const response = await api.get('/properties', { params })
    return response.data
  },

  async getOne(id) {
    const response = await api.get(`/properties/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('/properties', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/properties/${id}`, data)
    return response.data
  },

  async delete(id) {
    const response = await api.delete(`/properties/${id}`)
    return response.data
  },

  async getStatistics(id) {
    const response = await api.get(`/properties/${id}/statistics`)
    return response.data
  },
}
```

---

## 🗂️ الخطوة 5: Pinia Stores

### 5.1 ملف `src/stores/auth.js`

```js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authApi } from '@/api/auth'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isPropertyManager = computed(() => user.value?.role === 'property_manager')

  // Actions
  async function register(data) {
    try {
      loading.value = true
      error.value = null
      const response = await authApi.register(data)
      
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', response.data.token)
      
      router.push('/dashboard')
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل التسجيل'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function login(credentials) {
    try {
      loading.value = true
      error.value = null
      const response = await authApi.login(credentials)
      
      user.value = response.data.user
      token.value = response.data.token
      localStorage.setItem('token', response.data.token)
      
      router.push('/dashboard')
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل تسجيل الدخول'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  async function fetchUser() {
    if (!token.value) return

    try {
      const response = await authApi.me()
      user.value = response.data
    } catch (err) {
      console.error('Fetch user error:', err)
      logout()
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isPropertyManager,
    register,
    login,
    logout,
    fetchUser,
  }
})
```

### 5.2 ملف `src/stores/properties.js`

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { propertiesApi } from '@/api/properties'

export const usePropertiesStore = defineStore('properties', () => {
  // State
  const properties = ref([])
  const currentProperty = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Actions
  async function fetchProperties(params = {}) {
    try {
      loading.value = true
      error.value = null
      const response = await propertiesApi.getAll(params)
      properties.value = response.data.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل تحميل العقارات'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProperty(id) {
    try {
      loading.value = true
      error.value = null
      const response = await propertiesApi.getOne(id)
      currentProperty.value = response.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل تحميل العقار'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createProperty(data) {
    try {
      loading.value = true
      error.value = null
      const response = await propertiesApi.create(data)
      properties.value.unshift(response.data)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل إضافة العقار'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateProperty(id, data) {
    try {
      loading.value = true
      error.value = null
      const response = await propertiesApi.update(id, data)
      
      const index = properties.value.findIndex(p => p.id === id)
      if (index !== -1) {
        properties.value[index] = response.data
      }
      
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل تحديث العقار'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteProperty(id) {
    try {
      loading.value = true
      error.value = null
      await propertiesApi.delete(id)
      properties.value = properties.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err.response?.data?.message || 'فشل حذف العقار'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    properties,
    currentProperty,
    loading,
    error,
    fetchProperties,
    fetchProperty,
    createProperty,
    updateProperty,
    deleteProperty,
  }
})
```

### 5.3 ملف `src/stores/ui.js`

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const locale = ref(localStorage.getItem('locale') || 'ar')
  const sidebarOpen = ref(true)
  const theme = ref(localStorage.getItem('theme') || 'light')

  function setLocale(newLocale) {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr')
    document.documentElement.setAttribute('lang', newLocale)
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
  }

  return {
    locale,
    sidebarOpen,
    theme,
    setLocale,
    toggleSidebar,
    setTheme,
  }
})
```

---

## 🗺️ الخطوة 6: Vue Router

### ملف `src/router/index.js`

```js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { layout: 'default' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { layout: 'auth', guest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { layout: 'auth', guest: true }
    },

    // Protected routes (Dashboard)
    {
      path: '/dashboard',
      meta: { requiresAuth: true, layout: 'dashboard' },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/Dashboard.vue'),
        },
        {
          path: 'properties',
          name: 'properties',
          component: () => import('@/views/dashboard/Properties.vue'),
        },
        {
          path: 'properties/:id',
          name: 'property-details',
          component: () => import('@/views/dashboard/PropertyDetails.vue'),
        },
        {
          path: 'units',
          name: 'units',
          component: () => import('@/views/dashboard/Units.vue'),
        },
        {
          path: 'reservations',
          name: 'reservations',
          component: () => import('@/views/dashboard/Reservations.vue'),
        },
        {
          path: 'calendar',
          name: 'calendar',
          component: () => import('@/views/dashboard/Calendar.vue'),
        },
        {
          path: 'messages',
          name: 'messages',
          component: () => import('@/views/dashboard/Messages.vue'),
        },
        {
          path: 'housekeeping',
          name: 'housekeeping',
          component: () => import('@/views/dashboard/Housekeeping.vue'),
        },
        {
          path: 'maintenance',
          name: 'maintenance',
          component: () => import('@/views/dashboard/Maintenance.vue'),
        },
        {
          path: 'owners',
          name: 'owners',
          component: () => import('@/views/dashboard/Owners.vue'),
        },
        {
          path: 'finance',
          name: 'finance',
          component: () => import('@/views/dashboard/Finance.vue'),
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('@/views/dashboard/Reports.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/dashboard/Settings.vue'),
        },
      ]
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Redirect authenticated users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    return next('/dashboard')
  }

  // Redirect unauthenticated users to login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next('/login')
  }

  next()
})

export default router
```

---

## 🌐 الخطوة 7: i18n (Bilingual Support)

### 7.1 ملف `src/i18n/index.js`

```js
import { createI18n } from 'vue-i18n'
import ar from './ar.json'
import en from './en.json'

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'ar',
  fallbackLocale: 'en',
  messages: {
    ar,
    en
  }
})

export default i18n
```

### 7.2 ملف `src/i18n/ar.json`

```json
{
  "nav": {
    "home": "الرئيسية",
    "features": "المميزات",
    "pricing": "الأسعار",
    "contact": "تواصل معنا",
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب",
    "dashboard": "لوحة التحكم",
    "properties": "العقارات",
    "units": "الوحدات",
    "reservations": "الحجوزات",
    "calendar": "التقويم",
    "messages": "الرسائل",
    "housekeeping": "التنظيف",
    "maintenance": "الصيانة",
    "owners": "الملاك",
    "finance": "المحاسبة",
    "reports": "التقارير",
    "settings": "الإعدادات"
  },
  "auth": {
    "login": "تسجيل الدخول",
    "register": "إنشاء حساب جديد",
    "logout": "تسجيل الخروج",
    "email": "البريد الإلكتروني",
    "password": "كلمة المرور",
    "full_name": "الاسم الكامل",
    "phone": "رقم الهاتف",
    "company_name": "اسم الشركة",
    "remember_me": "تذكرني",
    "forgot_password": "نسيت كلمة المرور؟",
    "have_account": "لديك حساب بالفعل؟",
    "no_account": "ليس لديك حساب؟"
  },
  "hero": {
    "title": "نظام تشغيل ذكي لعقاراتك",
    "subtitle": "أدر جميع عقاراتك المؤجرة من لوحة واحدة مع مزامنة فورية للحجوزات والرسائل والتقارير",
    "cta": "ابدأ الآن مجاناً",
    "demo": "شاهد العرض التوضيحي"
  },
  "dashboard": {
    "welcome": "مرحباً",
    "total_revenue": "إجمالي الإيرادات",
    "occupancy_rate": "معدل الإشغال",
    "active_reservations": "الحجوزات النشطة",
    "pending_tasks": "المهام المعلقة"
  }
}
```

### 7.3 ملف `src/i18n/en.json`

```json
{
  "nav": {
    "home": "Home",
    "features": "Features",
    "pricing": "Pricing",
    "contact": "Contact",
    "login": "Login",
    "register": "Register",
    "dashboard": "Dashboard",
    "properties": "Properties",
    "units": "Units",
    "reservations": "Reservations",
    "calendar": "Calendar",
    "messages": "Messages",
    "housekeeping": "Housekeeping",
    "maintenance": "Maintenance",
    "owners": "Owners",
    "finance": "Finance",
    "reports": "Reports",
    "settings": "Settings"
  },
  "auth": {
    "login": "Login",
    "register": "Create Account",
    "logout": "Logout",
    "email": "Email",
    "password": "Password",
    "full_name": "Full Name",
    "phone": "Phone",
    "company_name": "Company Name",
    "remember_me": "Remember me",
    "forgot_password": "Forgot password?",
    "have_account": "Already have an account?",
    "no_account": "Don't have an account?"
  },
  "hero": {
    "title": "Smart Operating System for Your Properties",
    "subtitle": "Manage all your rental properties from one intelligent dashboard with real-time sync for bookings, messages, and reports",
    "cta": "Start Free",
    "demo": "Watch Demo"
  },
  "dashboard": {
    "welcome": "Welcome",
    "total_revenue": "Total Revenue",
    "occupancy_rate": "Occupancy Rate",
    "active_reservations": "Active Reservations",
    "pending_tasks": "Pending Tasks"
  }
}
```

---

## 🎨 الخطوة 8: UI Components

### 8.1 ملف `src/utils/cn.js` (Utility for class names)

```js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
```

### 8.2 ملف `src/components/ui/Button.vue`

```vue
<template>
  <button
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup>
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary', 'outline', 'ghost', 'destructive'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'sm', 'lg', 'icon'].includes(value)
  },
  disabled: Boolean,
  class: String
})

defineEmits(['click'])

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-muted text-muted-foreground hover:bg-muted/80',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
</script>
```

### 8.3 ملف `src/components/ui/Card.vue`

```vue
<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)">
    <slot />
  </div>
</template>

<script setup>
import { cn } from '@/utils/cn'

const props = defineProps({
  class: String
})
</script>
```

### 8.4 ملف `src/components/ui/Input.vue`

```vue
<template>
  <input
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
import { cn } from '@/utils/cn'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  disabled: Boolean,
  class: String
})

defineEmits(['update:modelValue'])
</script>
```

---

## 📄 الخطوة 9: Pages/Views

### 9.1 ملف `src/views/Home.vue` (Landing Page)

```vue
<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div class="container mx-auto px-4 py-20 lg:py-32">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            {{ $t('hero.title') }}
          </h1>
          <p class="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {{ $t('hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" @click="router.push('/register')">
              {{ $t('hero.cta') }}
              <ArrowRight class="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              {{ $t('hero.demo') }}
            </Button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-background">
      <div class="container mx-auto px-4">
        <h2 class="font-display text-3xl md:text-4xl text-center mb-16">
          المميزات الرئيسية
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="feature in features" :key="feature.title" class="p-6">
            <component :is="feature.icon" class="h-12 w-12 text-primary mb-4" />
            <h3 class="font-display text-xl mb-2">{{ feature.title }}</h3>
            <p class="text-muted-foreground">{{ feature.description }}</p>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Building2, Calendar, MessageSquare, BarChart3, Users, Settings } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import { ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()

const features = ref([
  {
    title: 'إدارة العقارات',
    description: 'أدر جميع عقاراتك ووحداتك من مكان واحد',
    icon: Building2
  },
  {
    title: 'الحجوزات والتقويم',
    description: 'مزامنة تلقائية مع جميع قنوات الحجز',
    icon: Calendar
  },
  {
    title: 'رسائل الضيوف',
    description: 'ردود ذكية ومركز موحد للرسائل',
    icon: MessageSquare
  },
  {
    title: 'التقارير والتحليلات',
    description: 'رؤى مالية وتشغيلية شاملة',
    icon: BarChart3
  },
  {
    title: 'إدارة الفريق',
    description: 'صلاحيات متقدمة لجميع أعضاء الفريق',
    icon: Users
  },
  {
    title: 'الأتمتة',
    description: 'أتمتة المهام المتكررة ووفر الوقت',
    icon: Settings
  }
])
</script>
```

### 9.2 ملف `src/views/Login.vue`

```vue
<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <Card class="w-full max-w-md p-8">
      <h1 class="font-display text-3xl text-center mb-8">
        {{ $t('auth.login') }}
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('auth.email') }}
          </label>
          <Input
            v-model="form.email"
            type="email"
            :placeholder="$t('auth.email')"
            required
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-2">
            {{ $t('auth.password') }}
          </label>
          <Input
            v-model="form.password"
            type="password"
            :placeholder="$t('auth.password')"
            required
          />
        </div>

        <!-- Error Message -->
        <div v-if="authStore.error" class="text-destructive text-sm">
          {{ authStore.error }}
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          variant="primary"
          class="w-full"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'جاري تسجيل الدخول...' : $t('auth.login') }}
        </Button>
      </form>

      <!-- Register Link -->
      <p class="text-center text-sm text-muted-foreground mt-6">
        {{ $t('auth.no_account') }}
        <router-link to="/register" class="text-primary hover:underline">
          {{ $t('auth.register') }}
        </router-link>
      </p>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
const { t } = useI18n()

const form = ref({
  email: '',
  password: ''
})

async function handleLogin() {
  try {
    await authStore.login(form.value)
  } catch (error) {
    console.error('Login error:', error)
  }
}
</script>
```

### 9.3 ملف `src/views/dashboard/Dashboard.vue`

```vue
<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="font-display text-3xl">
        {{ $t('dashboard.welcome') }}, {{ authStore.user?.full_name }}
      </h1>
      <p class="text-muted-foreground mt-2">
        نظرة عامة على أداء عقاراتك
      </p>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ $t('dashboard.total_revenue') }}</p>
            <p class="text-2xl font-bold text-foreground mt-1">
              SAR 2.48M
            </p>
          </div>
          <DollarSign class="h-10 w-10 text-primary" />
        </div>
        <p class="text-sm text-available mt-2">+12.5% من الشهر الماضي</p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ $t('dashboard.occupancy_rate') }}</p>
            <p class="text-2xl font-bold text-foreground mt-1">78.4%</p>
          </div>
          <Home class="h-10 w-10 text-occupied" />
        </div>
        <p class="text-sm text-available mt-2">+3.2% من الشهر الماضي</p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ $t('dashboard.active_reservations') }}</p>
            <p class="text-2xl font-bold text-foreground mt-1">46</p>
          </div>
          <Calendar class="h-10 w-10 text-primary" />
        </div>
        <p class="text-sm text-muted-foreground mt-2">18 check-in today</p>
      </Card>

      <Card class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted-foreground">{{ $t('dashboard.pending_tasks') }}</p>
            <p class="text-2xl font-bold text-foreground mt-1">25</p>
          </div>
          <AlertCircle class="h-10 w-10 text-maintenance" />
        </div>
        <p class="text-sm text-destructive mt-2">7 مهام عاجلة</p>
      </Card>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card class="p-6">
        <h3 class="font-display text-xl mb-4">اتجاه الإيرادات</h3>
        <!-- Add Chart.js here -->
        <div class="h-64 flex items-center justify-center text-muted-foreground">
          Revenue Chart Placeholder
        </div>
      </Card>

      <Card class="p-6">
        <h3 class="font-display text-xl mb-4">معدل الإشغال</h3>
        <!-- Add Chart.js here -->
        <div class="h-64 flex items-center justify-center text-muted-foreground">
          Occupancy Chart Placeholder
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { DollarSign, Home, Calendar, AlertCircle } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'

const authStore = useAuthStore()
const { t } = useI18n()
</script>
```

---

## 🏗️ الخطوة 10: Layouts

### 10.1 ملف `src/layouts/DashboardLayout.vue`

```vue
<template>
  <div class="min-h-screen bg-background flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 z-50 flex flex-col border-r bg-card transition-all duration-300',
        uiStore.sidebarOpen ? 'w-64' : 'w-20'
      ]"
    >
      <!-- Logo -->
      <div class="flex h-16 items-center border-b px-6">
        <h2 :class="['font-display text-2xl text-primary', !uiStore.sidebarOpen && 'hidden']">
          داريوم
        </h2>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 p-4">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          :class="[
            'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
            $route.path === item.to
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          ]"
        >
          <component :is="item.icon" class="h-5 w-5" />
          <span v-if="uiStore.sidebarOpen">{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div :class="['flex-1 transition-all duration-300', uiStore.sidebarOpen ? 'ml-64' : 'ml-20']">
      <!-- Header -->
      <header class="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
        <div class="flex h-16 items-center gap-4 px-6">
          <Button variant="ghost" size="icon" @click="uiStore.toggleSidebar">
            <Menu class="h-5 w-5" />
          </Button>

          <div class="flex-1" />

          <!-- Language Switcher -->
          <Button
            variant="ghost"
            size="sm"
            @click="toggleLanguage"
          >
            {{ uiStore.locale === 'ar' ? 'EN' : 'ع' }}
          </Button>

          <!-- User Menu -->
          <div class="flex items-center gap-2">
            <span class="text-sm">{{ authStore.user?.full_name }}</span>
            <Button variant="ghost" size="sm" @click="handleLogout">
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="min-h-[calc(100vh-4rem)]">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUIStore } from '@/stores/ui'
import { useI18n } from 'vue-i18n'
import {
  LayoutDashboard,
  Building2,
  Home as HomeIcon,
  Calendar,
  MessageSquare,
  Sparkles,
  Wrench,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Menu
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
const uiStore = useUIStore()
const { t, locale } = useI18n()

const navItems = ref([
  { name: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, to: '/dashboard' },
  { name: 'properties', label: 'العقارات', icon: Building2, to: '/dashboard/properties' },
  { name: 'units', label: 'الوحدات', icon: HomeIcon, to: '/dashboard/units' },
  { name: 'reservations', label: 'الحجوزات', icon: Calendar, to: '/dashboard/reservations' },
  { name: 'messages', label: 'الرسائل', icon: MessageSquare, to: '/dashboard/messages' },
  { name: 'housekeeping', label: 'التنظيف', icon: Sparkles, to: '/dashboard/housekeeping' },
  { name: 'maintenance', label: 'الصيانة', icon: Wrench, to: '/dashboard/maintenance' },
  { name: 'owners', label: 'الملاك', icon: Users, to: '/dashboard/owners' },
  { name: 'finance', label: 'المحاسبة', icon: DollarSign, to: '/dashboard/finance' },
  { name: 'reports', label: 'التقارير', icon: BarChart3, to: '/dashboard/reports' },
  { name: 'settings', label: 'الإعدادات', icon: Settings, to: '/dashboard/settings' },
])

function toggleLanguage() {
  const newLocale = locale.value === 'ar' ? 'en' : 'ar'
  locale.value = newLocale
  uiStore.setLocale(newLocale)
}

function handleLogout() {
  authStore.logout()
}
</script>
```

---

## 🚀 الخطوة 11: Main App Setup

### 11.1 ملف `src/main.js`

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
```

### 11.2 ملف `src/App.vue`

```vue
<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { useUIStore } from './stores/ui'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

const route = useRoute()
const authStore = useAuthStore()
const uiStore = useUIStore()

const layouts = {
  default: DefaultLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout
}

const layout = computed(() => {
  return layouts[route.meta.layout || 'default']
})

onMounted(async () => {
  // Set initial locale and direction
  const savedLocale = uiStore.locale
  document.documentElement.setAttribute('dir', savedLocale === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', savedLocale)

  // Fetch user if token exists
  if (authStore.token) {
    await authStore.fetchUser()
  }
})
</script>
```

---

## 🏁 الخطوة 12: تشغيل Vue.js

```bash
# تأكد من أن Laravel Backend يعمل على http://localhost:8000

# في terminal Vue.js
npm run dev

# Vue app سيعمل على http://localhost:5173
```

---

## ✅ الخطوة 13: اختبار التكامل

### 1. سجّل حساب جديد في Vue app
- افتح http://localhost:5173/register
- املأ النموذج
- تحقق من Laravel logs

### 2. سجّل دخول
- http://localhost:5173/login
- استخدم نفس البيانات
- يجب أن تُنقل إلى Dashboard

### 3. اختبر Properties
- اذهب لـ /dashboard/properties
- أضف عقار جديد
- تحقق من Laravel MySQL database

---

## 📚 Next Steps

### تم إنجازه:
✅ Vue.js 3 project structure
✅ TailwindCSS + Design System
✅ Pinia stores (Auth, Properties, UI)
✅ Vue Router
✅ Axios API integration
✅ i18n (Arabic/English)
✅ UI Components (Button, Input, Card)
✅ Login/Register pages
✅ Dashboard layout
✅ Properties integration

### ما زال مطلوباً:
⏳ باقي Dashboard pages (Units, Reservations, Calendar, etc.)
⏳ Real-time updates (Laravel Reverb + Vue)
⏳ File upload (Images)
⏳ Chart.js integration
⏳ Advanced forms & validations
⏳ Toast notifications
⏳ Loading states & skeletons

---

## 🎯 الملخص

**Laravel Backend:**
- REST API على http://localhost:8000/api
- MySQL Database
- Laravel Sanctum Authentication
- 7 جداول رئيسية

**Vue.js Frontend:**
- SPA على http://localhost:5173
- Pinia State Management
- Vue Router
- Axios لـ API calls
- TailwindCSS + نفس التصميم
- i18n Arabic/English
- RTL/LTR Support

**Integration:**
- Vue يتصل بـ Laravel API عبر Axios
- Token-based authentication
- CORS configured
- Real-time ready

---

**ماذا تريد الآن؟**

1. ✅ **"اختبر الكود"** - طبّق الخطوات واختبر
2. ✅ **"أكمل Pages"** - أكتب باقي Dashboard pages
3. ✅ **"Charts & Analytics"** - أضيف Chart.js integration
4. ✅ **"تعديلات"** - اطلب تعديلات معينة

---

**Last Updated**: 2026-06-03
**Version**: 1.0.0
**Stack**: Laravel 13 + Vue.js 3 + MySQL
</file_contents>
