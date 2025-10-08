import React from 'react'
import './styles.css'
import { IoLocationOutline } from "react-icons/io5"
import { LuSofa } from "react-icons/lu"
import { MdOutlineBedroomParent } from "react-icons/md";

interface ItemFavoritosProps {
  image: any;
  name: string;
  address: string;
  rooms: string;
  socialArea: string;
}


export const ItemFavoritos = ({ image, name, address, rooms, socialArea }: ItemFavoritosProps) => {
  return (
    <div className='containerItemFav'>
        <img src={image.src} alt={name} className='imageItemFav' />
        <div className='infoItemFav'>
            <h2 className='nameItemFav'>{name}</h2>
            <p className='addressItemFav info'><IoLocationOutline className='info' /> {address}</p>
            <p className='roomsItemFav info'><MdOutlineBedroomParent className='info' /> Quartos: {rooms}</p>
            <p className='socialAreaItemFav info'><LuSofa className='info'/> Área social: {socialArea}</p>
        </div>
    </div>
  )
}
