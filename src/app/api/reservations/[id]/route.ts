import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }
    const { id } = await params
    const body = await req.json()
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }
    const { id } = await params
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session.user.token}`,
        },
    })
    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}
