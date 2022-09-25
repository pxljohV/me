import Image from 'next/image'
import Link from 'next/link'
import Logo from '../assets/me-6.png'
export default function Nav() {
    return (
        <div>
            <nav className="bg-white w-100">

                <div className="flex flex-wrap justify-between ph4">
                    <div className="logo-container mw5 flex flex-wrap justify-around" id="logo">
                        <Link href="/">
                            <a><Image id="logo" src={Logo} layout="intrinsic" alt="foto" /></a>
                        </Link>
                    </div>
                    <div>
                        <h2 className="black">Something</h2>
                    </div>
                </div>
            </nav>
        </div>
    )
}
