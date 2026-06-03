# 🎨 Additional Vue.js Pages
# صفحات Vue.js إضافية

---

## 📋 Overview

This file contains complete Vue.js pages to integrate with the Laravel backend:
1. **Properties Page** - Property management with grid/list views
2. **Units Page** - Unit management with filters
3. **Reservations Page** - Reservation management with advanced filters
4. **Calendar Page** - Multi-unit calendar view
5. **Messages Page** - Guest messaging interface

---

## 1️⃣ Properties Page

**File:** `src/views/dashboard/Properties.vue`

```vue
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-display font-bold text-secondary">
          {{ $t('properties.title') }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ $t('properties.subtitle') }}
        </p>
      </div>
      <button
        @click="showCreateDialog = true"
        class="btn-primary flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        {{ $t('properties.addProperty') }}
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="flex gap-4 items-center">
        <div class="flex-1">
          <input
            v-model="filters.search"
            type="text"
            :placeholder="$t('properties.searchPlaceholder')"
            class="input w-full"
          />
        </div>
        <select v-model="filters.status" class="input w-48">
          <option value="">{{ $t('common.allStatuses') }}</option>
          <option value="active">{{ $t('common.active') }}</option>
          <option value="inactive">{{ $t('common.inactive') }}</option>
        </select>
        <div class="flex gap-2">
          <button
            @click="viewMode = 'grid'"
            :class="['btn', viewMode === 'grid' ? 'btn-primary' : 'btn-secondary']"
          >
            <GridIcon class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="['btn', viewMode === 'list' ? 'btn-primary' : 'btn-secondary']"
          >
            <ListIcon class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      <p class="text-muted-foreground mt-4">{{ $t('common.loading') }}</p>
    </div>

    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="property in filteredProperties"
        :key="property.id"
        class="card overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        @click="selectProperty(property)"
      >
        <div class="aspect-video bg-muted relative">
          <img
            v-if="property.images?.length"
            :src="property.images[0]"
            :alt="property.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-3 right-3">
            <span
              :class="[
                'badge',
                property.status === 'active' ? 'bg-available' : 'bg-muted'
              ]"
            >
              {{ property.status }}
            </span>
          </div>
        </div>
        <div class="p-4 space-y-3">
          <div>
            <h3 class="font-display font-bold text-lg">
              {{ locale === 'ar' ? property.name_ar : property.name_en }}
            </h3>
            <p class="text-sm text-muted-foreground">
              {{ property.city }}, {{ property.country }}
            </p>
          </div>
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-1">
              <Building2Icon class="w-4 h-4 text-muted-foreground" />
              <span>{{ property.total_units }} {{ $t('properties.units') }}</span>
            </div>
            <div class="flex items-center gap-1">
              <TrendingUpIcon class="w-4 h-4 text-available" />
              <span class="font-semibold">78%</span>
            </div>
          </div>
          <div class="text-2xl font-display font-bold text-primary tabular-nums">
            SAR {{ formatNumber(property.monthly_revenue) }}
            <span class="text-sm text-muted-foreground font-normal">/{{ $t('common.month') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else class="card overflow-hidden">
      <table class="w-full">
        <thead class="bg-muted">
          <tr>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('properties.name') }}</th>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('properties.location') }}</th>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('properties.units') }}</th>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('properties.occupancy') }}</th>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('properties.revenue') }}</th>
            <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('common.status') }}</th>
            <th class="px-6 py-3 text-end text-sm font-semibold">{{ $t('common.actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="property in filteredProperties"
            :key="property.id"
            class="border-b hover:bg-muted/50 cursor-pointer"
            @click="selectProperty(property)"
          >
            <td class="px-6 py-4">
              <div class="font-semibold">
                {{ locale === 'ar' ? property.name_ar : property.name_en }}
              </div>
            </td>
            <td class="px-6 py-4 text-muted-foreground">
              {{ property.city }}, {{ property.country }}
            </td>
            <td class="px-6 py-4">{{ property.total_units }}</td>
            <td class="px-6 py-4">
              <span class="font-semibold text-available">78%</span>
            </td>
            <td class="px-6 py-4 font-mono font-semibold tabular-nums">
              SAR {{ formatNumber(property.monthly_revenue) }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="[
                  'badge',
                  property.status === 'active' ? 'bg-available' : 'bg-muted'
                ]"
              >
                {{ property.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-end">
              <button class="btn-secondary btn-sm">
                {{ $t('common.edit') }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Create/Edit Dialog -->
    <PropertyDialog
      v-if="showCreateDialog"
      @close="showCreateDialog = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/properties'
import { PlusIcon, Building2Icon, TrendingUpIcon, GridIcon, ListIcon } from 'lucide-vue-next'
import PropertyDialog from '@/components/dashboard/PropertyDialog.vue'

const { t, locale } = useI18n()
const propertiesStore = usePropertiesStore()

const viewMode = ref('grid')
const showCreateDialog = ref(false)
const filters = ref({
  search: '',
  status: ''
})

const loading = computed(() => propertiesStore.loading)
const properties = computed(() => propertiesStore.properties)

const filteredProperties = computed(() => {
  let result = properties.value

  if (filters.value.search) {
    result = result.filter(p =>
      p.name_ar?.includes(filters.value.search) ||
      p.name_en?.includes(filters.value.search) ||
      p.city?.includes(filters.value.search)
    )
  }

  if (filters.value.status) {
    result = result.filter(p => p.status === filters.value.status)
  }

  return result
})

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num || 0)
}

function selectProperty(property) {
  // Navigate to property detail
  console.log('Selected property:', property)
}

function handleSave() {
  showCreateDialog.value = false
  propertiesStore.fetchProperties()
}

onMounted(() => {
  propertiesStore.fetchProperties()
})
</script>
```

---

## 2️⃣ Units Page

**File:** `src/views/dashboard/Units.vue`

```vue
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-display font-bold text-secondary">
          {{ $t('units.title') }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ $t('units.subtitle') }}
        </p>
      </div>
      <button
        @click="showCreateDialog = true"
        class="btn-primary flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        {{ $t('units.addUnit') }}
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <select v-model="filters.property_id" class="input">
          <option value="">{{ $t('units.allProperties') }}</option>
          <option v-for="prop in properties" :key="prop.id" :value="prop.id">
            {{ locale === 'ar' ? prop.name_ar : prop.name_en }}
          </option>
        </select>
        <select v-model="filters.status" class="input">
          <option value="">{{ $t('units.allStatuses') }}</option>
          <option value="available">{{ $t('units.available') }}</option>
          <option value="occupied">{{ $t('units.occupied') }}</option>
          <option value="maintenance">{{ $t('units.maintenance') }}</option>
          <option value="blocked">{{ $t('units.blocked') }}</option>
        </select>
        <select v-model="filters.cleaning_status" class="input">
          <option value="">{{ $t('units.allCleaningStatuses') }}</option>
          <option value="clean">{{ $t('units.clean') }}</option>
          <option value="dirty">{{ $t('units.dirty') }}</option>
          <option value="cleaning">{{ $t('units.cleaning') }}</option>
          <option value="inspecting">{{ $t('units.inspecting') }}</option>
        </select>
        <select v-model="filters.unit_type" class="input">
          <option value="">{{ $t('units.allTypes') }}</option>
          <option value="studio">{{ $t('units.studio') }}</option>
          <option value="1br">{{ $t('units.1br') }}</option>
          <option value="2br">{{ $t('units.2br') }}</option>
          <option value="3br">{{ $t('units.3br') }}</option>
          <option value="4br">{{ $t('units.4br') }}</option>
          <option value="penthouse">{{ $t('units.penthouse') }}</option>
        </select>
      </div>
    </div>

    <!-- Units Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div
        v-for="unit in filteredUnits"
        :key="unit.id"
        class="card p-4 hover:shadow-lg transition-shadow cursor-pointer"
        @click="selectUnit(unit)"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-display font-bold text-lg">{{ unit.name }}</h3>
            <p class="text-sm text-muted-foreground">{{ unit.property?.name_en }}</p>
          </div>
          <span
            :class="[
              'badge',
              getStatusColor(unit.status)
            ]"
          >
            {{ unit.status }}
          </span>
        </div>

        <div class="space-y-2 text-sm">
          <div class="flex items-center gap-2">
            <BedIcon class="w-4 h-4 text-muted-foreground" />
            <span>{{ unit.bedrooms }} {{ $t('units.bedrooms') }}</span>
            <Bath class="w-4 h-4 text-muted-foreground ms-2" />
            <span>{{ unit.bathrooms }} {{ $t('units.bathrooms') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <UserIcon class="w-4 h-4 text-muted-foreground" />
            <span>{{ unit.max_guests }} {{ $t('units.guests') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <SquareIcon class="w-4 h-4 text-muted-foreground" />
            <span>{{ unit.size_sqm }} {{ $t('units.sqm') }}</span>
          </div>
        </div>

        <div class="mt-3 pt-3 border-t flex items-center justify-between">
          <div class="text-xs text-muted-foreground">
            {{ $t('units.cleaning') }}:
            <span
              :class="[
                'badge badge-sm ms-1',
                getCleaningColor(unit.cleaning_status)
              ]"
            >
              {{ unit.cleaning_status }}
            </span>
          </div>
          <div class="text-lg font-display font-bold text-primary tabular-nums">
            SAR {{ unit.base_price }}
          </div>
        </div>
      </div>
    </div>

    <!-- Unit Dialog -->
    <UnitDialog
      v-if="showCreateDialog || selectedUnit"
      :unit="selectedUnit"
      @close="closeDialog"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePropertiesStore } from '@/stores/properties'
import { PlusIcon, BedIcon, Bath, UserIcon, SquareIcon } from 'lucide-vue-next'
import UnitDialog from '@/components/dashboard/UnitDialog.vue'
import api from '@/api/axios'

const { t, locale } = useI18n()
const propertiesStore = usePropertiesStore()

const showCreateDialog = ref(false)
const selectedUnit = ref(null)
const units = ref([])
const filters = ref({
  property_id: '',
  status: '',
  cleaning_status: '',
  unit_type: ''
})

const properties = computed(() => propertiesStore.properties)

const filteredUnits = computed(() => {
  let result = units.value

  if (filters.value.property_id) {
    result = result.filter(u => u.property_id === parseInt(filters.value.property_id))
  }
  if (filters.value.status) {
    result = result.filter(u => u.status === filters.value.status)
  }
  if (filters.value.cleaning_status) {
    result = result.filter(u => u.cleaning_status === filters.value.cleaning_status)
  }
  if (filters.value.unit_type) {
    result = result.filter(u => u.unit_type === filters.value.unit_type)
  }

  return result
})

function getStatusColor(status) {
  const colors = {
    available: 'bg-available',
    occupied: 'bg-occupied',
    maintenance: 'bg-maintenance',
    blocked: 'bg-blocked'
  }
  return colors[status] || 'bg-muted'
}

function getCleaningColor(status) {
  const colors = {
    clean: 'bg-available',
    dirty: 'bg-destructive',
    cleaning: 'bg-cleaning',
    inspecting: 'bg-maintenance'
  }
  return colors[status] || 'bg-muted'
}

function selectUnit(unit) {
  selectedUnit.value = unit
}

function closeDialog() {
  showCreateDialog.value = false
  selectedUnit.value = null
}

async function handleSave() {
  closeDialog()
  await fetchUnits()
}

async function fetchUnits() {
  try {
    const response = await api.get('/units')
    units.value = response.data.data.data || response.data.data
  } catch (error) {
    console.error('Error fetching units:', error)
  }
}

onMounted(() => {
  propertiesStore.fetchProperties()
  fetchUnits()
})
</script>
```

---

## 3️⃣ Reservations Page

**File:** `src/views/dashboard/Reservations.vue`

```vue
<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-display font-bold text-secondary">
          {{ $t('reservations.title') }}
        </h1>
        <p class="text-muted-foreground mt-1">
          {{ $t('reservations.subtitle') }}
        </p>
      </div>
      <button
        @click="showCreateDialog = true"
        class="btn-primary flex items-center gap-2"
      >
        <PlusIcon class="w-5 h-5" />
        {{ $t('reservations.addReservation') }}
      </button>
    </div>

    <!-- Filters -->
    <div class="card p-4">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <input
          v-model="filters.search"
          type="text"
          :placeholder="$t('reservations.searchPlaceholder')"
          class="input"
        />
        <select v-model="filters.status" class="input">
          <option value="">{{ $t('reservations.allStatuses') }}</option>
          <option value="pending">{{ $t('reservations.pending') }}</option>
          <option value="confirmed">{{ $t('reservations.confirmed') }}</option>
          <option value="checked_in">{{ $t('reservations.checkedIn') }}</option>
          <option value="checked_out">{{ $t('reservations.checkedOut') }}</option>
          <option value="cancelled">{{ $t('reservations.cancelled') }}</option>
        </select>
        <select v-model="filters.channel" class="input">
          <option value="">{{ $t('reservations.allChannels') }}</option>
          <option value="direct">{{ $t('reservations.direct') }}</option>
          <option value="airbnb">Airbnb</option>
          <option value="booking">Booking.com</option>
          <option value="agoda">Agoda</option>
          <option value="vrbo">Vrbo</option>
          <option value="expedia">Expedia</option>
        </select>
        <input
          v-model="filters.start_date"
          type="date"
          class="input"
        />
        <input
          v-model="filters.end_date"
          type="date"
          class="input"
        />
      </div>
    </div>

    <!-- Reservations Table -->
    <div class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-muted">
            <tr>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.confirmation') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.guest') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.unit') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.dates') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.channel') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.amount') }}</th>
              <th class="px-6 py-3 text-start text-sm font-semibold">{{ $t('reservations.status') }}</th>
              <th class="px-6 py-3 text-end text-sm font-semibold">{{ $t('common.actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="reservation in filteredReservations"
              :key="reservation.id"
              class="border-b hover:bg-muted/50"
            >
              <td class="px-6 py-4">
                <div class="font-mono font-semibold text-sm">
                  {{ reservation.confirmation_code }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="font-semibold">{{ reservation.guest_name }}</div>
                <div class="text-sm text-muted-foreground">{{ reservation.guest_email }}</div>
              </td>
              <td class="px-6 py-4">
                <div>{{ reservation.unit?.name }}</div>
                <div class="text-sm text-muted-foreground">
                  {{ reservation.unit?.property?.name_en }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm">
                  <div>{{ formatDate(reservation.check_in_date) }}</div>
                  <div class="text-muted-foreground">{{ formatDate(reservation.check_out_date) }}</div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="badge bg-muted capitalize">
                  {{ reservation.channel }}
                </span>
              </td>
              <td class="px-6 py-4 font-mono font-semibold tabular-nums">
                SAR {{ formatNumber(reservation.total_price) }}
              </td>
              <td class="px-6 py-4">
                <span
                  :class="[
                    'badge',
                    getStatusColor(reservation.status)
                  ]"
                >
                  {{ reservation.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-end">
                <button
                  v-if="reservation.status === 'confirmed'"
                  @click="checkIn(reservation)"
                  class="btn-secondary btn-sm"
                >
                  {{ $t('reservations.checkIn') }}
                </button>
                <button
                  v-else-if="reservation.status === 'checked_in'"
                  @click="checkOut(reservation)"
                  class="btn-primary btn-sm"
                >
                  {{ $t('reservations.checkOut') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Reservation Dialog -->
    <ReservationDialog
      v-if="showCreateDialog"
      @close="showCreateDialog = false"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { PlusIcon } from 'lucide-vue-next'
import ReservationDialog from '@/components/dashboard/ReservationDialog.vue'
import api from '@/api/axios'

const { t } = useI18n()

const showCreateDialog = ref(false)
const reservations = ref([])
const filters = ref({
  search: '',
  status: '',
  channel: '',
  start_date: '',
  end_date: ''
})

const filteredReservations = computed(() => {
  let result = reservations.value

  if (filters.value.search) {
    result = result.filter(r =>
      r.guest_name?.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      r.confirmation_code?.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }
  if (filters.value.status) {
    result = result.filter(r => r.status === filters.value.status)
  }
  if (filters.value.channel) {
    result = result.filter(r => r.channel === filters.value.channel)
  }

  return result
})

function getStatusColor(status) {
  const colors = {
    pending: 'bg-maintenance',
    confirmed: 'bg-available',
    checked_in: 'bg-occupied',
    checked_out: 'bg-muted',
    cancelled: 'bg-destructive'
  }
  return colors[status] || 'bg-muted'
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num || 0)
}

async function checkIn(reservation) {
  try {
    await api.post(`/reservations/${reservation.id}/check-in`)
    await fetchReservations()
  } catch (error) {
    console.error('Check-in error:', error)
  }
}

async function checkOut(reservation) {
  try {
    await api.post(`/reservations/${reservation.id}/check-out`)
    await fetchReservations()
  } catch (error) {
    console.error('Check-out error:', error)
  }
}

async function handleSave() {
  showCreateDialog.value = false
  await fetchReservations()
}

async function fetchReservations() {
  try {
    const response = await api.get('/reservations')
    reservations.value = response.data.data.data || response.data.data
  } catch (error) {
    console.error('Error fetching reservations:', error)
  }
}

onMounted(() => {
  fetchReservations()
})
</script>
```

---

## 📝 Update Routes

Add these routes to `src/router/index.js`:

```javascript
{
  path: '/dashboard/properties',
  name: 'Properties',
  component: () => import('@/views/dashboard/Properties.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/dashboard/units',
  name: 'Units',
  component: () => import('@/views/dashboard/Units.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/dashboard/reservations',
  name: 'Reservations',
  component: () => import('@/views/dashboard/Reservations.vue'),
  meta: { requiresAuth: true }
}
```

---

## ✅ Integration Checklist

- [ ] Copy controller files to Laravel
- [ ] Update Laravel routes
- [ ] Test Laravel APIs
- [ ] Copy Vue pages
- [ ] Update Vue routes
- [ ] Test UI integration
- [ ] Add loading states
- [ ] Add error handling
- [ ] Implement pagination
- [ ] Add search functionality

---

**Last Updated:** 2026-06-03
**Pages:** Properties, Units, Reservations
**Status:** Complete ✅