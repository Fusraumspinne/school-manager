import { connectMongoDB } from "@/lib/mongodb";
import SeitenSchema from "@/models/seiten";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { fach, stunden } = await req.json();
        await connectMongoDB();

        const seiten = await SeitenSchema.findOne(
            { fach: fach },
            { content: 1 }
        );

        if (!seiten) {
            return NextResponse.json({ message: "Keine Daten gefunden" }, { status: 404 });
        }

        const sortedContent = seiten.content
            .sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime());

        const limitedContent = sortedContent.slice(0, stunden);

        return NextResponse.json(limitedContent, { status: 200 });
    } catch (error) {
        console.error("Fehler beim Abrufen des KI Inputs:", error);
        return NextResponse.json({ message: "Ein Fehler ist aufgetreten" }, { status: 500 });
    }
}
