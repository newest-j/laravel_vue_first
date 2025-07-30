<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Trainee;
use App\Models\TrainingCenter;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class TrainingCenterController extends Controller
{

    public function index()
    {
        try {
            // Return all trainees with pagination
            $trainees = Trainee::with('training_center')->latest()->paginate(10);
            return response()->json($trainees, 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = Auth::user();
            $trainee = Trainee::with('training_center')->findOrFail($id);

            // Allow viewing all trainees (removed ownership restriction)
            // If you want to restrict to user's own trainee, uncomment the next lines:
            // if ($trainee->user_id !== $user->id) {
            //     return response()->json(['success' => false, 'message' => 'Unauthorized access'], 403);
            // }

            return response()->json(['success' => true, 'data' => $trainee], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            
            // Check if user already has trainee data
            if ($user->trainee) {
                return response()->json(['success' => false, 'message' => 'User already has trainee profile'], 400);
            }

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'skill' => 'required|integer|min:0|max:100',
                'bio' => 'required|string|min:20|max:1000',
                'training_center_id' => 'required|exists:training_centers,id',
            ]);

            $validatedData['user_id'] = $user->id;
            $trainee = Trainee::create($validatedData);
            
            return response()->json(['success' => true, 'data' => $trainee->load('training_center')], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            $trainee = Trainee::findOrFail($id);

            // Check if user owns this trainee data
            if ($trainee->user_id !== $user->id) {
                return response()->json(['success' => false, 'message' => 'Unauthorized access'], 403);
            }

            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'skill' => 'required|integer|min:0|max:100',
                'bio' => 'required|string|min:20|max:1000',
                'training_center_id' => 'required|exists:training_centers,id',
            ]);

            $trainee->update($validatedData);

            return response()->json(['success' => true, 'message' => 'Trainee updated successfully.', 'data' => $trainee->load('training_center')], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update trainee: ' . $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $trainee = Trainee::findOrFail($id);

            // Check if user owns this trainee data
            if ($trainee->user_id !== $user->id) {
                return response()->json(['success' => false, 'message' => 'Unauthorized access'], 403);
            }

            $trainee->delete();
            return response()->json(['success' => true, 'message' => 'Trainee deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete trainee: ' . $e->getMessage()
            ], 500);
        }
    }
    
    public function listTrainingCenters()
    {
        return TrainingCenter::all();
    }
}
