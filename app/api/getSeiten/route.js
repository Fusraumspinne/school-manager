import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import SeitenSchema from "@/models/seiten";

export async function POST(req) {
    try {
        const { id } = await req.json();
        await connectMongoDB();

        const seiten = await SeitenSchema.findOne({ id });

        return NextResponse.json(seiten); 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Seiten aufgetreten" }, { status: 500 });
    }
}
