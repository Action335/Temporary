import Banner from "@/components/Banner";

export default function Home() {
    return (
        <main>
            <Banner />
            <div className="text-center py-10 text-gray-500 text-sm">
                Click the banner to see more photos • Browse restaurants to make a booking
            </div>
        </main>
    );
}
