import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import FachDatei from "@/models/fachDatei";

export async function POST(req) {
    try {
        const { fächer } = await req.json();
        await connectMongoDB();

        for (const fach of fächer) {
            await FachDatei.findOneAndUpdate(
                { email: fach.email, fach: fach.fach }, 
                { $set: { themen: fach.themen } },
                { upsert: true, new: true } 
            );
        }

        return NextResponse.json({ message: "Fächer wurden gespeichert" }, { status: 201 });
    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Ein Fehler ist beim Speichern der Fächer aufgetreten" }, { status: 500 });
    }
}
