# 🚀 Laravel Backend - Complete Implementation Guide
# دليل التنفيذ الكامل لـ Laravel Backend

## 📋 نظرة عامة

هذا الدليل يحتوي على **جميع الملفات والأكواد** اللازمة لإنشاء Laravel 13 Backend من الصفر.

---

## 🛠️ الخطوة 1: إنشاء مشروع Laravel جديد

### 1.1 افتح Terminal خارج مجلد المشروع الحالي

```bash
# انتقل للمجلد الأب
cd ..

# أنشئ مشروع Laravel جديد
composer create-project laravel/laravel daryum-backend

# ادخل للمجلد
cd daryum-backend
```

### 1.2 تثبيت الـ Packages المطلوبة

```bash
# Laravel Sanctum (Authentication)
composer require laravel/sanctum

# Spatie Laravel Permission (Roles & Permissions)
composer require spatie/laravel-permission

# Laravel Reverb (Real-time)
composer require laravel/reverb

# CORS Support
composer require fruitcake/laravel-cors
```

---

## 🗄️ الخطوة 2: إعداد قاعدة البيانات MySQL

### 2.1 افتح ملف `.env` وعدّل إعدادات Database:

```env
APP_NAME=Daryum
APP_ENV=local
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=daryum
DB_USERNAME=root
DB_PASSWORD=your_password

BROADCAST_DRIVER=reverb
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

### 2.2 أنشئ قاعدة البيانات

```bash
# في MySQL terminal
mysql -u root -p
CREATE DATABASE daryum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

## 📁 الخطوة 3: إنشاء Database Migrations

### 3.1 Migration: Users Table (معدّلة)

**ملف:** `database/migrations/2014_10_12_000000_create_users_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('phone')->nullable();
            $table->enum('role', ['admin', 'property_manager', 'owner', 'accountant', 'housekeeping_supervisor', 'cleaner', 'maintenance_staff'])->default('property_manager');
            $table->string('avatar_url')->nullable();
            $table->string('company_name')->nullable();
            $table->enum('language_preference', ['ar', 'en'])->default('ar');
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_login_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

### 3.2 Migration: Properties Table

**إنشاء Migration:**

```bash
php artisan make:migration create_properties_table
```

**ملف:** `database/migrations/xxxx_create_properties_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->string('address');
            $table->string('address_ar')->nullable();
            $table->string('city');
            $table->string('city_ar')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->default('Saudi Arabia');
            $table->string('postal_code')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('property_type'); // apartment, villa, hotel, resort, etc.
            $table->integer('total_units')->default(0);
            $table->string('cover_image_url')->nullable();
            $table->json('amenities')->nullable();
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active');
            $table->boolean('is_listed')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
```

### 3.3 Migration: Units Table

```bash
php artisan make:migration create_units_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('units', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('property_id');
            $table->uuid('owner_id')->nullable();
            $table->string('unit_number');
            $table->string('unit_name')->nullable();
            $table->string('unit_name_ar')->nullable();
            $table->string('unit_type'); // studio, 1br, 2br, villa, etc.
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->decimal('size_sqm', 8, 2)->nullable();
            $table->integer('max_guests')->default(2);
            $table->decimal('base_price', 10, 2)->default(0);
            $table->string('currency', 3)->default('SAR');
            $table->enum('status', ['available', 'occupied', 'cleaning', 'maintenance', 'blocked'])->default('available');
            $table->string('floor_number')->nullable();
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->text('cleaning_notes')->nullable();
            $table->text('maintenance_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('property_id')->references('id')->on('properties')->onDelete('cascade');
            $table->foreign('owner_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['property_id', 'status']);
            $table->unique(['property_id', 'unit_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
```

### 3.4 Migration: Reservations Table

```bash
php artisan make:migration create_reservations_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('unit_id');
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone');
            $table->integer('guest_count')->default(1);
            $table->date('check_in_date');
            $table->date('check_out_date');
            $table->integer('nights');
            $table->decimal('price_per_night', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('cleaning_fee', 10, 2)->default(0);
            $table->decimal('service_fee', 10, 2)->default(0);
            $table->decimal('vat_amount', 10, 2)->default(0);
            $table->string('currency', 3)->default('SAR');
            $table->enum('booking_source', ['airbnb', 'booking_com', 'agoda', 'vrbo', 'direct', 'other'])->default('direct');
            $table->string('booking_reference')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['unpaid', 'partial', 'paid', 'refunded'])->default('unpaid');
            $table->text('special_requests')->nullable();
            $table->text('internal_notes')->nullable();
            $table->timestamp('checked_in_at')->nullable();
            $table->timestamp('checked_out_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('unit_id')->references('id')->on('units')->onDelete('cascade');
            $table->index(['unit_id', 'check_in_date', 'check_out_date']);
            $table->index(['status', 'booking_source']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
```

### 3.5 Migration: Messages Table

```bash
php artisan make:migration create_messages_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('reservation_id')->nullable();
            $table->uuid('user_id')->nullable();
            $table->string('guest_name');
            $table->string('guest_email');
            $table->string('guest_phone')->nullable();
            $table->string('channel'); // airbnb, booking_com, whatsapp, email, direct
            $table->enum('direction', ['incoming', 'outgoing']);
            $table->text('message_content');
            $table->boolean('is_read')->default(false);
            $table->boolean('requires_action')->default(false);
            $table->text('ai_suggested_reply')->nullable();
            $table->timestamp('read_at')->nullable();
            $table->timestamp('replied_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('reservation_id')->references('id')->on('reservations')->onDelete('set null');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->index(['channel', 'is_read']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
```

### 3.6 Migration: Housekeeping Tasks Table

```bash
php artisan make:migration create_housekeeping_tasks_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('housekeeping_tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('unit_id');
            $table->uuid('reservation_id')->nullable();
            $table->uuid('assigned_to')->nullable();
            $table->enum('task_type', ['checkout_cleaning', 'checkin_preparation', 'turnover', 'deep_cleaning', 'inspection'])->default('checkout_cleaning');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['pending', 'assigned', 'in_progress', 'completed', 'verified'])->default('pending');
            $table->date('scheduled_date');
            $table->time('scheduled_time')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('estimated_duration_minutes')->nullable();
            $table->json('checklist')->nullable();
            $table->json('before_photos')->nullable();
            $table->json('after_photos')->nullable();
            $table->text('notes')->nullable();
            $table->text('issues_found')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('unit_id')->references('id')->on('units')->onDelete('cascade');
            $table->foreign('reservation_id')->references('id')->on('reservations')->onDelete('set null');
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
            $table->index(['status', 'scheduled_date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('housekeeping_tasks');
    }
};
```

### 3.7 Migration: Maintenance Tickets Table

```bash
php artisan make:migration create_maintenance_tickets_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('maintenance_tickets', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('unit_id');
            $table->uuid('reported_by');
            $table->uuid('assigned_to')->nullable();
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'cosmetic', 'other'])->default('other');
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->enum('status', ['open', 'assigned', 'in_progress', 'pending_parts', 'completed', 'closed'])->default('open');
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->decimal('actual_cost', 10, 2)->nullable();
            $table->string('currency', 3)->default('SAR');
            $table->timestamp('due_date')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->json('photos')->nullable();
            $table->text('resolution_notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('unit_id')->references('id')->on('units')->onDelete('cascade');
            $table->foreign('reported_by')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
            $table->index(['status', 'priority']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_tickets');
    }
};
```

### 3.8 تشغيل جميع Migrations

```bash
php artisan migrate
```

---

## 🔐 الخطوة 4: إعداد Laravel Sanctum

### 4.1 نشر ملفات Sanctum

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### 4.2 تعديل ملف `config/sanctum.php`

```php
<?php

return [
    'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:3000,127.0.0.1,127.0.0.1:8000,::1')),
    'guard' => ['web'],
    'expiration' => null,
    'middleware' => [
        'verify_csrf_token' => App\Http\Middleware\VerifyCsrfToken::class,
        'encrypt_cookies' => App\Http\Middleware\EncryptCookies::class,
    ],
];
```

### 4.3 تعديل User Model

**ملف:** `app/Models/User.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUuids, SoftDeletes;

    protected $fillable = [
        'full_name',
        'email',
        'password',
        'phone',
        'role',
        'avatar_url',
        'company_name',
        'language_preference',
        'is_active',
        'last_login_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
        'is_active' => 'boolean',
        'password' => 'hashed',
    ];

    // Relationships
    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function ownedUnits()
    {
        return $this->hasMany(Unit::class, 'owner_id');
    }

    public function housekeepingTasks()
    {
        return $this->hasMany(HousekeepingTask::class, 'assigned_to');
    }

    public function maintenanceTickets()
    {
        return $this->hasMany(MaintenanceTicket::class, 'assigned_to');
    }

    // Helper methods
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isPropertyManager()
    {
        return $this->role === 'property_manager';
    }

    public function isOwner()
    {
        return $this->role === 'owner';
    }
}
```

---

## 📦 الخطوة 5: إنشاء Models

### 5.1 Property Model

```bash
php artisan make:model Property
```

**ملف:** `app/Models/Property.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Property extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'name_ar',
        'description',
        'description_ar',
        'address',
        'address_ar',
        'city',
        'city_ar',
        'state',
        'country',
        'postal_code',
        'latitude',
        'longitude',
        'property_type',
        'total_units',
        'cover_image_url',
        'amenities',
        'status',
        'is_listed',
    ];

    protected $casts = [
        'amenities' => 'array',
        'is_listed' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    // Computed attributes
    public function getAvailableUnitsCountAttribute()
    {
        return $this->units()->where('status', 'available')->count();
    }

    public function getOccupancyRateAttribute()
    {
        if ($this->total_units === 0) return 0;
        $occupied = $this->units()->where('status', 'occupied')->count();
        return round(($occupied / $this->total_units) * 100, 2);
    }
}
```

### 5.2 Unit Model

```bash
php artisan make:model Unit
```

**ملف:** `app/Models/Unit.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'property_id',
        'owner_id',
        'unit_number',
        'unit_name',
        'unit_name_ar',
        'unit_type',
        'bedrooms',
        'bathrooms',
        'size_sqm',
        'max_guests',
        'base_price',
        'currency',
        'status',
        'floor_number',
        'amenities',
        'images',
        'cleaning_notes',
        'maintenance_notes',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'base_price' => 'decimal:2',
        'size_sqm' => 'decimal:2',
    ];

    // Relationships
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function housekeepingTasks()
    {
        return $this->hasMany(HousekeepingTask::class);
    }

    public function maintenanceTickets()
    {
        return $this->hasMany(MaintenanceTicket::class);
    }

    // Helper methods
    public function getCurrentReservation()
    {
        return $this->reservations()
            ->where('status', 'checked_in')
            ->whereDate('check_in_date', '<=', now())
            ->whereDate('check_out_date', '>=', now())
            ->first();
    }
}
```

### 5.3 Reservation Model

```bash
php artisan make:model Reservation
```

**ملف:** `app/Models/Reservation.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Reservation extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $fillable = [
        'unit_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'guest_count',
        'check_in_date',
        'check_out_date',
        'nights',
        'price_per_night',
        'total_amount',
        'cleaning_fee',
        'service_fee',
        'vat_amount',
        'currency',
        'booking_source',
        'booking_reference',
        'status',
        'payment_status',
        'special_requests',
        'internal_notes',
        'checked_in_at',
        'checked_out_at',
    ];

    protected $casts = [
        'check_in_date' => 'date',
        'check_out_date' => 'date',
        'price_per_night' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'cleaning_fee' => 'decimal:2',
        'service_fee' => 'decimal:2',
        'vat_amount' => 'decimal:2',
        'checked_in_at' => 'datetime',
        'checked_out_at' => 'datetime',
    ];

    // Relationships
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function housekeepingTasks()
    {
        return $this->hasMany(HousekeepingTask::class);
    }

    // Computed attributes
    public function getTotalDaysAttribute()
    {
        return $this->check_in_date->diffInDays($this->check_out_date);
    }

    public function getIsActiveAttribute()
    {
        return in_array($this->status, ['confirmed', 'checked_in']);
    }

    // Helper methods
    public function checkIn()
    {
        $this->update([
            'status' => 'checked_in',
            'checked_in_at' => now(),
        ]);
    }

    public function checkOut()
    {
        $this->update([
            'status' => 'checked_out',
            'checked_out_at' => now(),
        ]);
    }
}
```

### 5.4 Message, HousekeepingTask, MaintenanceTicket Models

```bash
php artisan make:model Message
php artisan make:model HousekeepingTask
php artisan make:model MaintenanceTicket
```

**اتبع نفس النمط للـ Models الأخرى...**

---

## 🎯 الخطوة 6: إنشاء Controllers

### 6.1 Auth Controller

```bash
php artisan make:controller Api/AuthController
```

**ملف:** `app/Http/Controllers/Api/AuthController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'role' => 'nullable|in:admin,property_manager,owner,accountant,housekeeping_supervisor,cleaner,maintenance_staff',
            'company_name' => 'nullable|string|max:255',
            'language_preference' => 'nullable|in:ar,en',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role' => $request->role ?? 'property_manager',
            'company_name' => $request->company_name,
            'language_preference' => $request->language_preference ?? 'ar',
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم إنشاء الحساب بنجاح',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ], 201);
    }

    /**
     * Login user
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['بيانات الدخول غير صحيحة'],
            ]);
        }

        if (!$user->is_active) {
            throw ValidationException::withMessages([
                'email' => ['حسابك غير مفعّل. يرجى التواصل مع الإدارة'],
            ]);
        }

        // Update last login
        $user->update(['last_login_at' => now()]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'data' => [
                'user' => $user,
                'token' => $token,
            ],
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الخروج بنجاح',
        ]);
    }

    /**
     * Get authenticated user
     */
    public function me(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    }
}
```

### 6.2 Property Controller

```bash
php artisan make:controller Api/PropertyController --resource
```

**ملف:** `app/Http/Controllers/Api/PropertyController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    /**
     * Display a listing of properties
     */
    public function index(Request $request)
    {
        $query = Property::with(['user', 'units']);

        // Filter by user (if not admin)
        if (!$request->user()->isAdmin()) {
            $query->where('user_id', $request->user()->id);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort
        $sortField = $request->get('sort_by', 'created_at');
        $sortDirection = $request->get('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        $properties = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $properties,
        ]);
    }

    /**
     * Store a newly created property
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'address' => 'required|string',
            'address_ar' => 'nullable|string',
            'city' => 'required|string',
            'city_ar' => 'nullable|string',
            'state' => 'nullable|string',
            'country' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'property_type' => 'required|string',
            'total_units' => 'nullable|integer|min:0',
            'cover_image_url' => 'nullable|url',
            'amenities' => 'nullable|array',
            'status' => 'nullable|in:active,inactive,maintenance',
            'is_listed' => 'nullable|boolean',
        ]);

        $validated['user_id'] = $request->user()->id;

        $property = Property::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم إضافة العقار بنجاح',
            'data' => $property->load(['user', 'units']),
        ], 201);
    }

    /**
     * Display the specified property
     */
    public function show(Request $request, string $id)
    {
        $property = Property::with(['user', 'units.reservations'])
            ->findOrFail($id);

        // Authorization check
        if (!$request->user()->isAdmin() && $property->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بالوصول لهذا العقار',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $property,
        ]);
    }

    /**
     * Update the specified property
     */
    public function update(Request $request, string $id)
    {
        $property = Property::findOrFail($id);

        // Authorization check
        if (!$request->user()->isAdmin() && $property->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بتعديل هذا العقار',
            ], 403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'description_ar' => 'nullable|string',
            'address' => 'sometimes|string',
            'address_ar' => 'nullable|string',
            'city' => 'sometimes|string',
            'city_ar' => 'nullable|string',
            'state' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'property_type' => 'sometimes|string',
            'total_units' => 'nullable|integer|min:0',
            'cover_image_url' => 'nullable|url',
            'amenities' => 'nullable|array',
            'status' => 'sometimes|in:active,inactive,maintenance',
            'is_listed' => 'nullable|boolean',
        ]);

        $property->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'تم تحديث العقار بنجاح',
            'data' => $property->fresh(['user', 'units']),
        ]);
    }

    /**
     * Remove the specified property
     */
    public function destroy(Request $request, string $id)
    {
        $property = Property::findOrFail($id);

        // Authorization check
        if (!$request->user()->isAdmin() && $property->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بحذف هذا العقار',
            ], 403);
        }

        $property->delete();

        return response()->json([
            'success' => true,
            'message' => 'تم حذف العقار بنجاح',
        ]);
    }

    /**
     * Get property statistics
     */
    public function statistics(Request $request, string $id)
    {
        $property = Property::with(['units.reservations'])
            ->findOrFail($id);

        // Authorization check
        if (!$request->user()->isAdmin() && $property->user_id !== $request->user()->id) {
            return response()->json([
                'success' => false,
                'message' => 'غير مصرح لك بالوصول لهذا العقار',
            ], 403);
        }

        $stats = [
            'total_units' => $property->units->count(),
            'available_units' => $property->units->where('status', 'available')->count(),
            'occupied_units' => $property->units->where('status', 'occupied')->count(),
            'cleaning_units' => $property->units->where('status', 'cleaning')->count(),
            'maintenance_units' => $property->units->where('status', 'maintenance')->count(),
            'occupancy_rate' => $property->occupancy_rate,
            'total_reservations' => $property->units->sum(function ($unit) {
                return $unit->reservations->count();
            }),
            'active_reservations' => $property->units->sum(function ($unit) {
                return $unit->reservations->where('status', 'checked_in')->count();
            }),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }
}
```

---

## 🛣️ الخطوة 7: إعداد API Routes

**ملف:** `routes/api.php`

```php
<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Properties
    Route::apiResource('properties', PropertyController::class);
    Route::get('properties/{id}/statistics', [PropertyController::class, 'statistics']);

    // TODO: Add more routes
    // Units
    // Reservations
    // Messages
    // Housekeeping
    // Maintenance
    // etc.
});
```

---

## 🔧 الخطوة 8: إعداد CORS

**ملف:** `config/cors.php`

```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:3000'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 🚀 الخطوة 9: تشغيل Laravel Server

```bash
# تأكد من أن MySQL يعمل
# تأكد من تشغيل Migrations
php artisan migrate

# شغّل Laravel server
php artisan serve

# أو استخدم port محدد
php artisan serve --port=8000
```

**Laravel API جاهز الآن على:**
```
http://localhost:8000/api
```

---

## 🧪 الخطوة 10: اختبار API

### Test Registration

```bash
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "full_name": "أحمد محمد",
    "email": "ahmed@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "+966501234567",
    "role": "property_manager",
    "company_name": "شركة العقارات المتميزة",
    "language_preference": "ar"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "email": "ahmed@example.com",
    "password": "password123"
  }'
```

**النتيجة:** ستحصل على `token` - احفظه للاستخدام في الطلبات القادمة.

### Test Get Properties

```bash
curl -X GET http://localhost:8000/api/properties \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Create Property

```bash
curl -X POST http://localhost:8000/api/properties \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "برج الريان السكني",
    "name_ar": "برج الريان السكني",
    "description": "برج سكني فاخر في قلب الرياض",
    "description_ar": "برج سكني فاخر في قلب الرياض",
    "address": "طريق الملك فهد، الرياض",
    "address_ar": "طريق الملك فهد، الرياض",
    "city": "Riyadh",
    "city_ar": "الرياض",
    "country": "Saudi Arabia",
    "property_type": "apartment_building",
    "total_units": 24,
    "status": "active",
    "amenities": ["parking", "gym", "pool", "security"]
  }'
```

---

## 📚 الخطوة 11: Next Steps

### تم إنشاء:
✅ Laravel backend structure
✅ Database schema (7 tables)
✅ Models with relationships
✅ Authentication (Sanctum)
✅ Property CRUD API
✅ API testing examples

### ما زال مطلوباً:
⏳ Unit Controller
⏳ Reservation Controller
⏳ Message Controller
⏳ Housekeeping Controller
⏳ Maintenance Controller
⏳ Dashboard Analytics
⏳ File Upload (Images)
⏳ Real-time (Laravel Reverb)
⏳ Role-based permissions

---

## 📝 ملاحظات مهمة

1. **UUIDs**: استخدمنا UUID بدلاً من integer IDs للأمان
2. **Soft Deletes**: جميع الجداول تدعم الحذف الناعم
3. **Timestamps**: تتبع تلقائي لـ created_at و updated_at
4. **Relationships**: علاقات كاملة بين Models
5. **Authorization**: التحقق من صلاحيات المستخدم في Controllers
6. **Validation**: التحقق من البيانات قبل الحفظ
7. **Arabic Support**: دعم كامل للعربية في الـ responses

---

## 🎯 الخطوة التالية

**أخبرني:**
1. ✅ "تابع مع Vue.js Frontend" - سأكتب دليل Vue.js الآن
2. ✅ "أكمل باقي Controllers" - سأكمل Unit, Reservation, etc.
3. ✅ "اختبر الكود أولاً" - اختبر Laravel وأخبرني بالنتيجة

**ماذا تريد الآن؟** 🚀

---

**Last Updated**: 2026-06-03
**Version**: 1.0.0
**Author**: Softgen AI Agent