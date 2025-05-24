<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      Product::create([
            'name' => 'iPhone 15 Pro Max 256GB',
            'description' => 'Màu Titan Tự Nhiên, hiệu năng đỉnh cao, camera đột phá.',
            'price' => 33490000.00
        ]);

        Product::create([
            'name' => 'Samsung Galaxy S24 Ultra 12GB/256GB',
            'description' => 'Trải nghiệm AI Phone, bút S Pen tích hợp, camera zoom ấn tượng.',
            'price' => 28990000.00
        ]);

        Product::create([
            'name' => 'Laptop MacBook Air M3 13 inch',
            'description' => 'Chip M3 mạnh mẽ, thiết kế mỏng nhẹ, thời lượng pin cả ngày.',
            'price' => 27500000.00
        ]);

        Product::create([
            'name' => 'Tai nghe Sony WH-1000XM5',
            'description' => 'Chống ồn chủ động hàng đầu, chất âm tuyệt hảo, thiết kế thoải mái.',
            'price' => 7490000.00
        ]);

        Product::create([
            'name' => 'Đồng hồ Apple Watch Series 9 GPS 41mm',
            'description' => 'Viền nhôm, dây thể thao, theo dõi sức khỏe toàn diện.',
            'price' => 9890000.00
        ]);
    }
}
