import { MountainIcon } from "lucide-react"
import Link from 'next/link'

export default function NavBar() {


    return (
        <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90%] rounded-full bg-white shadow-lg px-4 py-3 flex items-center justify-between">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
                <MountainIcon className="size-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Features
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Pricing
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    About
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
                    Contact
                </Link>
            </nav>
        </header>

    )
}
