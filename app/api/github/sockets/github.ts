import { NextResponse } from "next/server";

export async function GET(req: NextResponse, res: NextResponse) {
    const products = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: `Product ${index + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        price: Math.floor(Math.random() * 9000) + 1000, // Random price between 1000 and 9999
    }));

    console.log(products);
}
