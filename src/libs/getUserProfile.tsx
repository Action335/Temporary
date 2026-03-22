export default async function getUserProfile(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/getMe`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error("Failed to get user profile")
    }
    return await response.json()
}
