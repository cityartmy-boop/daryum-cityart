# 🏗️ Laravel Backend Implementation Guide

This document contains all the code you need to build the Laravel 13 backend.

---

## 📝 Step 1: Install Laravel & Dependencies

```bash
# Create Laravel project
composer create-project laravel/laravel daryum-backend
cd daryum-backend

# Install required packages
composer require laravel/sanctum
composer require spatie/laravel-permission
composer require spatie/laravel-query-builder

# Publish configurations
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
```

---

## 🗄️ Step 2: Configure Database

**config/database.php** (Already configured, just verify MySQL settings)

**.env**
```env
APP_NAME="Daryum"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=daryum
DB_USERNAME=root
DB_PASSWORD=

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173

# CORS
FRONTEND_URL=http://localhost:5173
```

---

## 🔧 Step 3: Configure CORS

**config/cors.php**
```php
<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## 🗂️ Step 4: Create Database Migrations

### **Migration: Users Table**
```bash
php artisan make:migration create_users_table
```

**database/migrations/xxxx_create_users_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'property_manager', 'owner', 'accountant', 'cleaner', 'maintenance'])
                  ->default('property_manager');
            $table->string('locale', 5)->default('ar');
            $table->string('avatar_url', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
            
            $table->index('email');
            $table->index('role');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
```

### **Migration: Properties Table**
```bash
php artisan make:migration create_properties_table
```

**database/migrations/xxxx_create_properties_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('name');
            $table->string('name_ar')->nullable();
            $table->text('description')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('address');
            $table->string('city', 100);
            $table->string('country', 100)->default('Saudi Arabia');
            $table->enum('property_type', ['apartment', 'villa', 'hotel', 'resort', 'compound']);
            $table->integer('total_units')->default(0);
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index('status');
            $table->index('city');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
```

### **Migration: Units Table**
```bash
php artisan make:migration create_units_table
```

**database/migrations/xxxx_create_units_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->string('unit_number', 50);
            $table->string('unit_name')->nullable();
            $table->string('unit_name_ar')->nullable();
            $table->integer('floor_number')->nullable();
            $table->enum('unit_type', ['studio', '1br', '2br', '3br', '4br', 'penthouse', 'suite']);
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->decimal('area_sqm', 10, 2)->nullable();
            $table->integer('max_guests')->default(2);
            $table->decimal('base_price', 10, 2);
            $table->string('currency', 3)->default('SAR');
            $table->json('amenities')->nullable();
            $table->json('images')->nullable();
            $table->enum('status', ['available', 'occupied', 'cleaning', 'maintenance', 'blocked'])->default('available');
            $table->foreignId('owner_id')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index('property_id');
            $table->index('status');
            $table->unique(['property_id', 'unit_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('units');
    }
};
```

### **Migration: Reservations Table**
```bash
php artisan make:migration create_reservations_table
```

**database/migrations/xxxx_create_reservations_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('unit_id')->constrained()->onDelete('cascade');
            $table->string('guest_name');
            $table->string('guest_email')->nullable();
            $table->string('guest_phone', 20)->nullable();
            $table->string('guest_country', 100)->nullable();
            $table->date('check_in');
            $table->date('check_out');
            $table->integer('nights');
            $table->integer('adults')->default(1);
            $table->integer('children')->default(0);
            $table->decimal('total_price', 10, 2);
            $table->string('currency', 3)->default('SAR');
            $table->enum('channel', ['direct', 'airbnb', 'booking.com', 'agoda', 'vrbo', 'other'])->default('direct');
            $table->string('channel_reference')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'])->default('confirmed');
            $table->enum('payment_status', ['pending', 'partial', 'paid', 'refunded'])->default('pending');
            $table->text('special_requests')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->index('unit_id');
            $table->index(['check_in', 'check_out']);
            $table->index('status');
            $table->index('channel');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
```

### **Migration: Messages Table**
```bash
php artisan make:migration create_messages_table
```

**database/migrations/xxxx_create_messages_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('reservation_id')->nullable()->constrained()->onDelete('cascade');
            $table->enum('sender_type', ['guest', 'host', 'system']);
            $table->string('sender_name')->nullable();
            $table->enum('recipient_type', ['guest', 'host']);
            $table->text('message');
            $table->enum('channel', ['platform', 'email', 'whatsapp', 'airbnb', 'booking.com'])->default('platform');
            $table->enum('status', ['sent', 'delivered', 'read'])->default('sent');
            $table->timestamp('read_at')->nullable();
            $table->timestamps();
            
            $table->index('reservation_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
```

### **Migration: Housekeeping Tasks Table**
```bash
php artisan make:migration create_housekeeping_tasks_table
```

**database/migrations/xxxx_create_housekeeping_tasks_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('unit_id')->constrained()->onDelete('cascade');
            $table->foreignId('reservation_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('task_type', ['checkout_cleaning', 'checkin_prep', 'deep_clean', 'inspection', 'maintenance_clean']);
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['pending', 'assigned', 'in_progress', 'completed', 'verified'])->default('pending');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->date('scheduled_date');
            $table->time('scheduled_time')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->json('checklist')->nullable();
            $table->text('notes')->nullable();
            $table->json('before_photos')->nullable();
            $table->json('after_photos')->nullable();
            $table->timestamps();
            
            $table->index('unit_id');
            $table->index('status');
            $table->index('assigned_to');
            $table->index('scheduled_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('housekeeping_tasks');
    }
};
```

### **Migration: Maintenance Tickets Table**
```bash
php artisan make:migration create_maintenance_tickets_table
```

**database/migrations/xxxx_create_maintenance_tickets_table.php**
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
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('unit_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['plumbing', 'electrical', 'hvac', 'appliance', 'furniture', 'general']);
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['open', 'assigned', 'in_progress', 'on_hold', 'completed', 'closed'])->default('open');
            $table->foreignId('assigned_to')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('reported_by')->nullable()->constrained('users')->onDelete('set null');
            $table->decimal('estimated_cost', 10, 2)->nullable();
            $table->decimal('actual_cost', 10, 2)->nullable();
            $table->date('scheduled_date')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->text('notes')->nullable();
            $table->json('attachments')->nullable();
            $table->timestamps();
            
            $table->index('unit_id');
            $table->index('status');
            $table->index('assigned_to');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('maintenance_tickets');
    }
};
```

---

## 🏃 Step 5: Run Migrations

```bash
# Create database
mysql -u root -p
CREATE DATABASE daryum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# Run migrations
php artisan migrate

# If you need to reset
php artisan migrate:fresh
```

---

## 📦 Step 6: Create Models

### **User Model**
```bash
php artisan make:model User
```

**app/Models/User.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'uuid',
        'full_name',
        'email',
        'phone',
        'password',
        'role',
        'locale',
        'avatar_url',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    // Relationships
    public function properties()
    {
        return $this->hasMany(Property::class, 'created_by');
    }

    public function ownedUnits()
    {
        return $this->hasMany(Unit::class, 'owner_id');
    }
}
```

### **Property Model**
```bash
php artisan make:model Property
```

**app/Models/Property.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'name',
        'name_ar',
        'description',
        'description_ar',
        'address',
        'city',
        'country',
        'property_type',
        'total_units',
        'amenities',
        'images',
        'status',
        'created_by',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'total_units' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }
}
```

### **Unit Model**
```bash
php artisan make:model Unit
```

**app/Models/Unit.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'property_id',
        'unit_number',
        'unit_name',
        'unit_name_ar',
        'floor_number',
        'unit_type',
        'bedrooms',
        'bathrooms',
        'area_sqm',
        'max_guests',
        'base_price',
        'currency',
        'amenities',
        'images',
        'status',
        'owner_id',
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'max_guests' => 'integer',
        'floor_number' => 'integer',
        'base_price' => 'decimal:2',
        'area_sqm' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

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
}
```

### **Reservation Model**
```bash
php artisan make:model Reservation
```

**app/Models/Reservation.php**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'uuid',
        'unit_id',
        'guest_name',
        'guest_email',
        'guest_phone',
        'guest_country',
        'check_in',
        'check_out',
        'nights',
        'adults',
        'children',
        'total_price',
        'currency',
        'channel',
        'channel_reference',
        'status',
        'payment_status',
        'special_requests',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'nights' => 'integer',
        'adults' => 'integer',
        'children' => 'integer',
        'total_price' => 'decimal:2',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid();
            }
        });
    }

    // Relationships
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
```

---

## 🎮 Step 7: Create Controllers

### **Auth Controller**
```bash
php artisan make:controller Auth/AuthController
```

**app/Http/Controllers/Auth/AuthController.php**
```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'nullable|in:admin,property_manager,owner,accountant,cleaner,maintenance',
        ]);

        $user = User::create([
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'property_manager',
            'locale' => $request->locale ?? 'ar',
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['البيانات المدخلة غير صحيحة'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'تم تسجيل الخروج بنجاح',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
```

### **Property Controller**
```bash
php artisan make:controller PropertyController --resource
```

**app/Http/Controllers/PropertyController.php**
```php
<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $query = Property::with(['creator', 'units']);

        // Filters
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('city')) {
            $query->where('city', $request->city);
        }

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                  ->orWhere('name_ar', 'like', "%{$request->search}%");
            });
        }

        $properties = $query->paginate($request->per_page ?? 15);

        return response()->json($properties);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'property_type' => 'required|in:apartment,villa,hotel,resort,compound',
            'status' => 'nullable|in:active,inactive,maintenance',
        ]);

        $property = Property::create(array_merge(
            $request->all(),
            ['created_by' => $request->user()->id]
        ));

        return response()->json($property->load('creator'), 201);
    }

    public function show(Property $property)
    {
        return response()->json($property->load(['creator', 'units']));
    }

    public function update(Request $request, Property $property)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'address' => 'sometimes|required|string',
            'city' => 'sometimes|required|string|max:100',
            'property_type' => 'sometimes|required|in:apartment,villa,hotel,resort,compound',
            'status' => 'nullable|in:active,inactive,maintenance',
        ]);

        $property->update($request->all());

        return response()->json($property->load('creator'));
    }

    public function destroy(Property $property)
    {
        $property->delete();

        return response()->json([
            'message' => 'تم حذف العقار بنجاح',
        ]);
    }
}
```

---

## 🛣️ Step 8: API Routes

**routes/api.php**
```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\ReservationController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Properties
    Route::apiResource('properties', PropertyController::class);
    
    // Units
    Route::apiResource('units', UnitController::class);
    
    // Reservations
    Route::apiResource('reservations', ReservationController::class);
    Route::post('reservations/{reservation}/checkin', [ReservationController::class, 'checkin']);
    Route::post('reservations/{reservation}/checkout', [ReservationController::class, 'checkout']);
    
    // Messages
    Route::apiResource('messages', MessageController::class);
    Route::put('messages/{message}/read', [MessageController::class, 'markAsRead']);
    
    // Housekeeping
    Route::apiResource('housekeeping', HousekeepingController::class);
    Route::post('housekeeping/{task}/complete', [HousekeepingController::class, 'complete']);
    
    // Maintenance
    Route::apiResource('maintenance', MaintenanceController::class);
    Route::post('maintenance/{ticket}/close', [MaintenanceController::class, 'close']);
    
    // Dashboard
    Route::get('dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('dashboard/charts', [DashboardController::class, 'charts']);
});
```

---

## 🔐 Step 9: Configure Sanctum

**app/Http/Kernel.php** - Add to `$middlewareGroups['api']`:
```php
\Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
```

**config/sanctum.php** - Update:
```php
'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,localhost:5173,127.0.0.1,127.0.0.1:5173')),
```

---

## ▶️ Step 10: Run Laravel

```bash
# Generate application key
php artisan key:generate

# Start server
php artisan serve

# Laravel API running at: http://localhost:8000
```

---

## ✅ Test Your API

```bash
# Test registration
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"أحمد محمد","email":"ahmed@example.com","password":"password","password_confirmation":"password"}'

# Test login
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ahmed@example.com","password":"password"}'

# Test protected route (use token from login response)
curl -X GET http://localhost:8000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

**Next**: Vue.js Frontend Implementation (coming in next file)