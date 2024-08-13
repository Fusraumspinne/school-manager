import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import SeitenSchema from "@/models/seiten"; 

export async function POST(req) {
    try {
        const { id, content } = await req.json();
        await connectMongoDB();

        const updatedSeite = await SeitenSchema.findOneAndUpdate(
            { id: id }, 
            { content: content },
            { upsert: true, new: true } 
        );

        return NextResponse.json({ message: "Seite wurde gespeichert oder aktualisiert", data: updatedSeite }, { status: 201 });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Ein Fehler ist beim Speichern oder Aktualisieren der Seite aufgetreten" }, { status: 500 });
    }
}