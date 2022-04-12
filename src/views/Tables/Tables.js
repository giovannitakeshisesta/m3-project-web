import React from 'react';

const Tables = () => {
    return (
        <div>
            <div className='fccc'>
                <h1>Tables </h1>
                <p>aqui pondrè botones o plantillas de salas</p>
                <h5>click en la mesa</h5>
                <ul>
                    <li>se abre la mesa, </li>
                    <li>introducir Num comensales</li>
                    <li>se abre el menu 
                        <ul>
                            <li>filtro alergenos</li>
                        </ul>
                    </li>
                    <li>se toma la comanda, x cada plato
                        <ul>
                            <li>descripcion producto</li>
                            <li>precio</li>
                            <li>remanencia stock.....</li>
                            <li>boton añade mensaje</li>
                            <li>boton urgent!</li>
                            <li>orden de salida</li>
                        </ul>
                    </li>
                    <li>se envia un mensaje de marchar segundos</li>
                    <li>en un segundo momento se pueden añadir platos</li>
                    <li> cuenta 
                        <ul>
                            <li>cuenta/Npersonas</li>
                            <li>cuenta x separado....</li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Tables;
