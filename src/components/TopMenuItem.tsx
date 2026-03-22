import Link from 'next/link'

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
    return (
        <Link href={pageRef}>
            <div className='flex items-center h-full px-4 text-sky-600 text-sm font-medium hover:text-sky-800 transition-colors'>
                {title}
            </div>
        </Link>
    )
}
