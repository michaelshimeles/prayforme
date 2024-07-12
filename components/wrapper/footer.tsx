import Link from 'next/link';

export default function Footer() {


    return (
        <footer className="w-full bg-[#F9F9F9] py-4 mt-8 text-center text-sm text-muted-foreground">
            <Link href="https://instagram.com/foolishforjesus" target='_blank' className="hover:underline" prefetch={false}>
                built by foolishforjesus
            </Link>
        </footer>


    )
}
