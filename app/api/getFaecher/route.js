import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import FachDatei from "@/models/fachDatei";

export async function POST(req) {
    try {
        const { email } = await req.json(); 
        await connectMongoDB();
        
        const fächer = await FachDatei.find({ email }); 
        
        return NextResponse.json(fächer); 
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Ein Fehler ist beim Abrufen der Fächer aufgetreten" }, { status: 500 });
    }
}
