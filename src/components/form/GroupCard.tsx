export default function GroupCard({ children, title, description }: any) {
    return (
        <>
            <div className="flex justify-center">
                <div className="block rounded-sm shadow-sm bg-white max-w-sm border border-gray-300">
                    <div className="pt-3 px-6 border-b">
                        {title}
                        <p className="text-gray-700 text-xs mb-4">
                        {description}
                        </p>
                    </div>
                    <div className="p-6">
                        { children }
                    </div>
                </div>
            </div>
        </>
    )
}
