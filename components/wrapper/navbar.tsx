import { MountainIcon } from "lucide-react"
import Link from 'next/link'

export default function NavBar() {


    return (
        <header className="w-full rounded-full bg-white shadow-lg px-6 py-3 flex items-center justify-between">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
                🙏
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="https://instagram.com/foolishforjesus" target="_blank" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Instagram
                </Link>
            </nav>
        </header>

    )
}
