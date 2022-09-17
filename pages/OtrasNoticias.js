import Image from 'next/Image'
import Thumb from './assets/square.png'

export default function OtrasNoticias() {
    return (
        <div className="flex justify-around flex-wrap bg-red mb3 mr3 center  ">
            <div className="w5 flex flex-wrap relative mb2 pa2">
                <Image src={Thumb} layout="intrinsic" alt="" />
                <p className="white absolute bg-red bottom-0 pa2 ml2">Lorem ipsum dolor sit amet consectetur </p>
            </div>
        </div>
    )
}
