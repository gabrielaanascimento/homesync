import React from 'react'
import './styles.css'
import { ItemFavoritos } from '../ItemFavoritos'
import imgCasa from '../../img/casa.jpg'

export const Favoritos = () => {
  return (
    <div className='containerFavoritos'>
        <ItemFavoritos 
         image={imgCasa}
         name={"Duplex Premium em Alphaville"}
         address={"Alphaville - Região nobre"}
         rooms={"3(sendo 2 suítes)"}
         socialArea={"Sala ampla (2 ambientes)"}
         />
        <ItemFavoritos 
         image={imgCasa}
         name={"Duplex Premium em Alphaville"}
         address={"Alphaville - Região nobre"}
         rooms={"3(sendo 2 suítes)"}
         socialArea={"Sala ampla (2 ambientes)"}
         />
    </div>
  )
}
