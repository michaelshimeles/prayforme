import Link from 'next/link';

export default function Footer() {


    return (
        <footer className="w-full bg-[#F9F9F9] py-4 mt-8 text-center text-sm text-muted-foreground">
            <div>
                built by
                {" "}
                <Link href="https://instagram.com/foolishforjesus" target='_blank' className="hover:underline" prefetch={false}>
                    <span className='font-semibold'>foolishforjesus</span>
                </Link>
                {" "}
                & your brother in Christ
                {" "}
                <Link href="https://x.com/rasmickyy" target='_blank' className="hover:underline" prefetch={false}>
                    <span className='font-semibold'>mike</span>
                </Link>
            </div>
        </footer >


    )
}
