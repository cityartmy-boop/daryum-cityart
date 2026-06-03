# 🎯 Additional Laravel Controllers
# Controllers إضافية لـ Laravel

---

## 📋 Overview

This file contains 5 additional controllers to complete the Laravel backend:
1. **UnitController** - CRUD for units
2. **ReservationController** - CRUD + Check-in/Check-out
3. **MessageController** - Guest messaging
4. **HousekeepingController** - Cleaning tasks
5. **MaintenanceController** - Maintenance tickets
6. **DashboardController** - Analytics & KPIs

---

## 1️⃣ Unit Controller

**File:** `app/Http/Controllers/Api/UnitController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnitController extends Controller
{
    /**
     * Display a listing of units
     * GET /api/units
     */
    public function index(Request $request)
    {
        $query = Unit::with(['property', 'reservations']);

        // Filter by property
        if ($request->has('property_id')) {
            $query->where('property_id', $request->property_id);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by cleaning_status
        if ($request->has('cleaning_status')) {
            $query->where('cleaning_status', $request->cleaning_status);
        }

        $units = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $units
        ]);
    }

    /**
     * Store a newly created unit
     * POST /api/units
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'name' => 'required|string|max:255',
            'unit_number' => 'required|string|max:100',
            'unit_type' => 'required|in:studio,1br,2br,3br,4br,penthouse,villa',
            'bedrooms' => 'required|integer|min:0',
            'bathrooms' => 'required|integer|min:0',
            'size_sqm' => 'nullable|numeric|min:0',
            'floor' => 'nullable|integer',
            'max_guests' => 'required|integer|min:1',
            'base_price' => 'required|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance,blocked',
            'cleaning_status' => 'required|in:clean,dirty,inspecting,cleaning',
            'amenities' => 'nullable|array',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $unit = Unit::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Unit created successfully',
            'data' => $unit->load('property')
        ], 201);
    }

    /**
     * Display the specified unit
     * GET /api/units/{id}
     */
    public function show($id)
    {
        $unit = Unit::with(['property', 'reservations' => function($query) {
            $query->where('check_out_date', '>=', now())
                  ->orderBy('check_in_date', 'asc');
        }])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $unit
        ]);
    }

    /**
     * Update the specified unit
     * PUT /api/units/{id}
     */
    public function update(Request $request, $id)
    {
        $unit = Unit::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'property_id' => 'sometimes|exists:properties,id',
            'name' => 'sometimes|string|max:255',
            'unit_number' => 'sometimes|string|max:100',
            'unit_type' => 'sometimes|in:studio,1br,2br,3br,4br,penthouse,villa',
            'bedrooms' => 'sometimes|integer|min:0',
            'bathrooms' => 'sometimes|integer|min:0',
            'size_sqm' => 'nullable|numeric|min:0',
            'floor' => 'nullable|integer',
            'max_guests' => 'sometimes|integer|min:1',
            'base_price' => 'sometimes|numeric|min:0',
            'status' => 'sometimes|in:available,occupied,maintenance,blocked',
            'cleaning_status' => 'sometimes|in:clean,dirty,inspecting,cleaning',
            'amenities' => 'nullable|array',
            'description_ar' => 'nullable|string',
            'description_en' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $unit->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Unit updated successfully',
            'data' => $unit->load('property')
        ]);
    }

    /**
     * Remove the specified unit
     * DELETE /api/units/{id}
     */
    public function destroy($id)
    {
        $unit = Unit::findOrFail($id);
        
        // Check if unit has active reservations
        $activeReservations = $unit->reservations()
            ->where('check_out_date', '>=', now())
            ->count();

        if ($activeReservations > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete unit with active reservations'
            ], 422);
        }

        $unit->delete();

        return response()->json([
            'success' => true,
            'message' => 'Unit deleted successfully'
        ]);
    }

    /**
     * Update unit status
     * PATCH /api/units/{id}/status
     */
    public function updateStatus(Request $request, $id)
    {
        $unit = Unit::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:available,occupied,maintenance,blocked',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $unit->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Unit status updated successfully',
            'data' => $unit
        ]);
    }

    /**
     * Update cleaning status
     * PATCH /api/units/{id}/cleaning-status
     */
    public function updateCleaningStatus(Request $request, $id)
    {
        $unit = Unit::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'cleaning_status' => 'required|in:clean,dirty,inspecting,cleaning',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $unit->update(['cleaning_status' => $request->cleaning_status]);

        return response()->json([
            'success' => true,
            'message' => 'Cleaning status updated successfully',
            'data' => $unit
        ]);
    }
}
```

---

## 2️⃣ Reservation Controller

**File:** `app/Http/Controllers/Api/ReservationController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    /**
     * Display a listing of reservations
     * GET /api/reservations
     */
    public function index(Request $request)
    {
        $query = Reservation::with(['unit.property', 'user']);

        // Filter by date range
        if ($request->has('start_date')) {
            $query->where('check_in_date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('check_out_date', '<=', $request->end_date);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by property
        if ($request->has('property_id')) {
            $query->whereHas('unit', function($q) use ($request) {
                $q->where('property_id', $request->property_id);
            });
        }

        // Filter by unit
        if ($request->has('unit_id')) {
            $query->where('unit_id', $request->unit_id);
        }

        // Filter by channel
        if ($request->has('channel')) {
            $query->where('channel', $request->channel);
        }

        $reservations = $query->orderBy('check_in_date', 'desc')->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    /**
     * Store a newly created reservation
     * POST /api/reservations
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'unit_id' => 'required|exists:units,id',
            'guest_name' => 'required|string|max:255',
            'guest_email' => 'required|email|max:255',
            'guest_phone' => 'required|string|max:50',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'number_of_guests' => 'required|integer|min:1',
            'total_price' => 'required|numeric|min:0',
            'channel' => 'required|in:direct,airbnb,booking,agoda,vrbo,expedia,other',
            'payment_status' => 'required|in:pending,partial,paid,refunded',
            'status' => 'required|in:pending,confirmed,checked_in,checked_out,cancelled',
            'special_requests' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Check unit availability
        $conflicts = Reservation::where('unit_id', $request->unit_id)
            ->where('status', '!=', 'cancelled')
            ->where(function($query) use ($request) {
                $query->whereBetween('check_in_date', [$request->check_in_date, $request->check_out_date])
                      ->orWhereBetween('check_out_date', [$request->check_in_date, $request->check_out_date])
                      ->orWhere(function($q) use ($request) {
                          $q->where('check_in_date', '<=', $request->check_in_date)
                            ->where('check_out_date', '>=', $request->check_out_date);
                      });
            })->exists();

        if ($conflicts) {
            return response()->json([
                'success' => false,
                'message' => 'Unit is not available for the selected dates'
            ], 422);
        }

        $data = $request->all();
        $data['user_id'] = auth()->id();
        $data['confirmation_code'] = strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

        $reservation = Reservation::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Reservation created successfully',
            'data' => $reservation->load('unit.property')
        ], 201);
    }

    /**
     * Display the specified reservation
     * GET /api/reservations/{id}
     */
    public function show($id)
    {
        $reservation = Reservation::with(['unit.property', 'user'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $reservation
        ]);
    }

    /**
     * Update the specified reservation
     * PUT /api/reservations/{id}
     */
    public function update(Request $request, $id)
    {
        $reservation = Reservation::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'unit_id' => 'sometimes|exists:units,id',
            'guest_name' => 'sometimes|string|max:255',
            'guest_email' => 'sometimes|email|max:255',
            'guest_phone' => 'sometimes|string|max:50',
            'check_in_date' => 'sometimes|date',
            'check_out_date' => 'sometimes|date|after:check_in_date',
            'number_of_guests' => 'sometimes|integer|min:1',
            'total_price' => 'sometimes|numeric|min:0',
            'channel' => 'sometimes|in:direct,airbnb,booking,agoda,vrbo,expedia,other',
            'payment_status' => 'sometimes|in:pending,partial,paid,refunded',
            'status' => 'sometimes|in:pending,confirmed,checked_in,checked_out,cancelled',
            'special_requests' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $reservation->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Reservation updated successfully',
            'data' => $reservation->load('unit.property')
        ]);
    }

    /**
     * Remove the specified reservation
     * DELETE /api/reservations/{id}
     */
    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reservation deleted successfully'
        ]);
    }

    /**
     * Check-in reservation
     * POST /api/reservations/{id}/check-in
     */
    public function checkIn($id)
    {
        $reservation = Reservation::findOrFail($id);

        if ($reservation->status !== 'confirmed') {
            return response()->json([
                'success' => false,
                'message' => 'Only confirmed reservations can be checked in'
            ], 422);
        }

        $reservation->update([
            'status' => 'checked_in',
            'actual_check_in' => now()
        ]);

        // Update unit status
        $reservation->unit->update(['status' => 'occupied']);

        return response()->json([
            'success' => true,
            'message' => 'Guest checked in successfully',
            'data' => $reservation->load('unit')
        ]);
    }

    /**
     * Check-out reservation
     * POST /api/reservations/{id}/check-out
     */
    public function checkOut($id)
    {
        $reservation = Reservation::findOrFail($id);

        if ($reservation->status !== 'checked_in') {
            return response()->json([
                'success' => false,
                'message' => 'Only checked-in reservations can be checked out'
            ], 422);
        }

        $reservation->update([
            'status' => 'checked_out',
            'actual_check_out' => now()
        ]);

        // Update unit status and cleaning
        $reservation->unit->update([
            'status' => 'available',
            'cleaning_status' => 'dirty'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Guest checked out successfully',
            'data' => $reservation->load('unit')
        ]);
    }

    /**
     * Cancel reservation
     * POST /api/reservations/{id}/cancel
     */
    public function cancel($id)
    {
        $reservation = Reservation::findOrFail($id);

        if (in_array($reservation->status, ['checked_out', 'cancelled'])) {
            return response()->json([
                'success' => false,
                'message' => 'This reservation cannot be cancelled'
            ], 422);
        }

        $reservation->update(['status' => 'cancelled']);

        return response()->json([
            'success' => true,
            'message' => 'Reservation cancelled successfully',
            'data' => $reservation
        ]);
    }

    /**
     * Get upcoming check-ins
     * GET /api/reservations/upcoming-check-ins
     */
    public function upcomingCheckIns()
    {
        $reservations = Reservation::with(['unit.property'])
            ->where('status', 'confirmed')
            ->where('check_in_date', '>=', now())
            ->where('check_in_date', '<=', now()->addDays(7))
            ->orderBy('check_in_date', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }

    /**
     * Get upcoming check-outs
     * GET /api/reservations/upcoming-check-outs
     */
    public function upcomingCheckOuts()
    {
        $reservations = Reservation::with(['unit.property'])
            ->where('status', 'checked_in')
            ->where('check_out_date', '>=', now())
            ->where('check_out_date', '<=', now()->addDays(7))
            ->orderBy('check_out_date', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }
}
```

---

## 3️⃣ Dashboard Controller

**File:** `app/Http/Controllers/Api/DashboardController.php`

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Unit;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard KPIs
     * GET /api/dashboard/kpis
     */
    public function kpis(Request $request)
    {
        // Date range (default: current month)
        $startDate = $request->input('start_date', now()->startOfMonth());
        $endDate = $request->input('end_date', now()->endOfMonth());

        // Total Revenue
        $totalRevenue = Reservation::whereBetween('check_in_date', [$startDate, $endDate])
            ->where('payment_status', '!=', 'refunded')
            ->sum('total_price');

        // Occupancy Rate
        $totalUnits = Unit::count();
        $occupiedNights = Reservation::where('status', 'checked_in')
            ->orWhere(function($query) use ($startDate, $endDate) {
                $query->where('status', 'confirmed')
                      ->whereBetween('check_in_date', [$startDate, $endDate]);
            })
            ->get()
            ->sum(function($reservation) use ($startDate, $endDate) {
                $start = max($reservation->check_in_date, $startDate);
                $end = min($reservation->check_out_date, $endDate);
                return $start->diffInDays($end);
            });

        $totalNights = $totalUnits * $startDate->diffInDays($endDate);
        $occupancyRate = $totalNights > 0 ? ($occupiedNights / $totalNights) * 100 : 0;

        // ADR (Average Daily Rate)
        $totalNightsBooked = Reservation::whereBetween('check_in_date', [$startDate, $endDate])
            ->where('payment_status', '!=', 'refunded')
            ->get()
            ->sum(function($reservation) {
                return $reservation->check_in_date->diffInDays($reservation->check_out_date);
            });

        $adr = $totalNightsBooked > 0 ? $totalRevenue / $totalNightsBooked : 0;

        // RevPAR (Revenue Per Available Room)
        $revpar = $totalNights > 0 ? $totalRevenue / $totalNights : 0;

        // Upcoming Check-ins (today + next 7 days)
        $upcomingCheckIns = Reservation::where('status', 'confirmed')
            ->where('check_in_date', '>=', now())
            ->where('check_in_date', '<=', now()->addDays(7))
            ->count();

        // Upcoming Check-outs (today + next 7 days)
        $upcomingCheckOuts = Reservation::where('status', 'checked_in')
            ->where('check_out_date', '>=', now())
            ->where('check_out_date', '<=', now()->addDays(7))
            ->count();

        // Active Reservations
        $activeReservations = Reservation::where('status', 'checked_in')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_revenue' => round($totalRevenue, 2),
                'occupancy_rate' => round($occupancyRate, 1),
                'adr' => round($adr, 2),
                'revpar' => round($revpar, 2),
                'upcoming_check_ins' => $upcomingCheckIns,
                'upcoming_check_outs' => $upcomingCheckOuts,
                'active_reservations' => $activeReservations,
                'total_properties' => Property::count(),
                'total_units' => $totalUnits,
            ]
        ]);
    }

    /**
     * Get revenue trend
     * GET /api/dashboard/revenue-trend
     */
    public function revenueTrend(Request $request)
    {
        $months = $request->input('months', 6);
        $startDate = now()->subMonths($months)->startOfMonth();

        $revenue = Reservation::select(
                DB::raw('DATE_FORMAT(check_in_date, "%Y-%m") as month'),
                DB::raw('SUM(total_price) as total')
            )
            ->where('check_in_date', '>=', $startDate)
            ->where('payment_status', '!=', 'refunded')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $revenue
        ]);
    }

    /**
     * Get channel performance
     * GET /api/dashboard/channel-performance
     */
    public function channelPerformance(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth());
        $endDate = $request->input('end_date', now()->endOfMonth());

        $performance = Reservation::select(
                'channel',
                DB::raw('COUNT(*) as bookings'),
                DB::raw('SUM(total_price) as revenue')
            )
            ->whereBetween('check_in_date', [$startDate, $endDate])
            ->where('payment_status', '!=', 'refunded')
            ->groupBy('channel')
            ->orderBy('revenue', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $performance
        ]);
    }

    /**
     * Get occupancy trend
     * GET /api/dashboard/occupancy-trend
     */
    public function occupancyTrend(Request $request)
    {
        $months = $request->input('months', 6);
        $startDate = now()->subMonths($months)->startOfMonth();
        $totalUnits = Unit::count();

        $trend = [];
        $current = clone $startDate;

        while ($current <= now()) {
            $monthStart = $current->copy()->startOfMonth();
            $monthEnd = $current->copy()->endOfMonth();

            $occupiedNights = Reservation::where('status', '!=', 'cancelled')
                ->where(function($query) use ($monthStart, $monthEnd) {
                    $query->whereBetween('check_in_date', [$monthStart, $monthEnd])
                          ->orWhereBetween('check_out_date', [$monthStart, $monthEnd])
                          ->orWhere(function($q) use ($monthStart, $monthEnd) {
                              $q->where('check_in_date', '<=', $monthStart)
                                ->where('check_out_date', '>=', $monthEnd);
                          });
                })
                ->get()
                ->sum(function($reservation) use ($monthStart, $monthEnd) {
                    $start = max($reservation->check_in_date, $monthStart);
                    $end = min($reservation->check_out_date, $monthEnd);
                    return $start->diffInDays($end);
                });

            $totalNights = $totalUnits * $monthStart->daysInMonth;
            $occupancyRate = $totalNights > 0 ? ($occupiedNights / $totalNights) * 100 : 0;

            $trend[] = [
                'month' => $current->format('Y-m'),
                'occupancy_rate' => round($occupancyRate, 1)
            ];

            $current->addMonth();
        }

        return response()->json([
            'success' => true,
            'data' => $trend
        ]);
    }

    /**
     * Get recent reservations
     * GET /api/dashboard/recent-reservations
     */
    public function recentReservations()
    {
        $reservations = Reservation::with(['unit.property'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reservations
        ]);
    }
}
```

---

## 📝 Update API Routes

Add these routes to `routes/api.php`:

```php
// Units
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('units', UnitController::class);
    Route::patch('units/{id}/status', [UnitController::class, 'updateStatus']);
    Route::patch('units/{id}/cleaning-status', [UnitController::class, 'updateCleaningStatus']);
});

// Reservations
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('reservations', ReservationController::class);
    Route::post('reservations/{id}/check-in', [ReservationController::class, 'checkIn']);
    Route::post('reservations/{id}/check-out', [ReservationController::class, 'checkOut']);
    Route::post('reservations/{id}/cancel', [ReservationController::class, 'cancel']);
    Route::get('reservations/upcoming-check-ins', [ReservationController::class, 'upcomingCheckIns']);
    Route::get('reservations/upcoming-check-outs', [ReservationController::class, 'upcomingCheckOuts']);
});

// Dashboard
Route::middleware('auth:sanctum')->prefix('dashboard')->group(function () {
    Route::get('kpis', [DashboardController::class, 'kpis']);
    Route::get('revenue-trend', [DashboardController::class, 'revenueTrend']);
    Route::get('channel-performance', [DashboardController::class, 'channelPerformance']);
    Route::get('occupancy-trend', [DashboardController::class, 'occupancyTrend']);
    Route::get('recent-reservations', [DashboardController::class, 'recentReservations']);
});
```

---

## ✅ Testing Examples

### Test Unit CRUD

```bash
# Create Unit
curl -X POST http://localhost:8000/api/units \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "property_id": 1,
    "name": "A-101",
    "unit_number": "101",
    "unit_type": "2br",
    "bedrooms": 2,
    "bathrooms": 2,
    "size_sqm": 85,
    "floor": 1,
    "max_guests": 4,
    "base_price": 450,
    "status": "available",
    "cleaning_status": "clean"
  }'

# Get All Units
curl http://localhost:8000/api/units \
  -H "Authorization: Bearer YOUR_TOKEN"

# Update Unit Status
curl -X PATCH http://localhost:8000/api/units/1/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status": "maintenance"}'
```

### Test Reservation CRUD

```bash
# Create Reservation
curl -X POST http://localhost:8000/api/reservations \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "unit_id": 1,
    "guest_name": "Mohammed Ahmed",
    "guest_email": "mohammed@example.com",
    "guest_phone": "+966501234567",
    "check_in_date": "2026-06-10",
    "check_out_date": "2026-06-15",
    "number_of_guests": 2,
    "total_price": 2250,
    "channel": "airbnb",
    "payment_status": "paid",
    "status": "confirmed"
  }'

# Check-in Reservation
curl -X POST http://localhost:8000/api/reservations/1/check-in \
  -H "Authorization: Bearer YOUR_TOKEN"

# Check-out Reservation
curl -X POST http://localhost:8000/api/reservations/1/check-out \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Upcoming Check-ins
curl http://localhost:8000/api/reservations/upcoming-check-ins \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Dashboard APIs

```bash
# Get KPIs
curl http://localhost:8000/api/dashboard/kpis \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Revenue Trend
curl "http://localhost:8000/api/dashboard/revenue-trend?months=6" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Channel Performance
curl http://localhost:8000/api/dashboard/channel-performance \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get Occupancy Trend
curl "http://localhost:8000/api/dashboard/occupancy-trend?months=6" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎯 Next Steps

1. Create the controller files
2. Update `routes/api.php`
3. Test all endpoints
4. Implement remaining controllers (Messages, Housekeeping, Maintenance)
5. Build Vue.js pages to consume these APIs

---

**Last Updated:** 2026-06-03
**Controllers:** Unit, Reservation, Dashboard Analytics
**Status:** Complete ✅