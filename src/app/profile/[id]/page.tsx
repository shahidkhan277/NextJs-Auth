export default function ProfilePage({params}: any) {
    return (
        <div className="flex flex-col gap-4 items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl text-blue-500 py-2 font-bold">Profile ID</h1>
        <hr />
        <h2 className="text-xl font-semibold">User Profile {params.id}</h2>
        </div>

    );
}