import React from 'react'
import './styles.css'
import { IoMdSearch } from "react-icons/io";

export const Filter = () => {
  return (
    <div className='containerFilter'>
        <div className='filter'>
            <div className='filterTitle'>
                <span>Localização:</span>
                <p>Qualquer Lugar</p>
            </div>
            <div className="linha-vertical"></div>
            <div className='filterTitle'>
                <span>Preço:</span>
                <p>Todos</p>
            </div>
            <div className="linha-vertical"></div>
            <span className='line'></span>
            <div className='filterTitle'>
                <span>Outros Filtros:</span>
                <p>Todos</p>
            </div>
            <div className="linha-vertical"></div>
            <div className='button'>
                <button className='filterButton'><IoMdSearch color='white' fontSize={40}/></button>
            </div>
        </div>
    </div>
  )
}
