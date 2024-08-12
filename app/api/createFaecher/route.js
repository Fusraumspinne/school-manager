import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import FachDatei from "@/models/fachDatei";

export async function POST(req) {
    try {
        const { fächer } = await req.json();
        await connectMongoDB();

        for (const fach of fächer) {
            // Update the existing document or create a new one
            await FachDatei.findOneAndUpdate(
                { email: fach.email, fach: fach.fach }, // Filter by email and fach
                { $set: { themen: fach.themen } }, // Update the themen
                { upsert: true, new: true } // Create if it doesn't exist
            );
        }

        return NextResponse.json({ message: "Fächer wurden gespeichert" }, { status: 201 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ message: "Ein Fehler ist beim Speichern der Fächer aufgetreten" }, { status: 500 });
    }
}
