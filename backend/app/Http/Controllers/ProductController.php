<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    // Mendapatkan semua produk
    public function index()
    {
        return Product::all();
    }

    // Menambahkan produk baru
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:150',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);
    
        $product = Product::create($validatedData);

        return response()->json($product, 201);
    }

    // Mengupdate produk
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'product_name' => 'required|string|max:150',
            'category' => 'required|string|max:100',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
        ]);
        
        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return response()->json($product);
    }

    // Menghapus produk
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }
}

