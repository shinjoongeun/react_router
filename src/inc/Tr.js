import React from 'react';
import Td from './Td';

const Tr = ({info, handleRemove, handleEdit}) => {
    return(
        <tbody>
            {
                info.map(item => {//map 을 이용하여 id 갯수만큼 Td.js 컴포넌트를 반복해서 불러오소 info 로 넘긴다
                    return (
                        <Td key={item.id} item={item} handleRemove={handleRemove} handleEdit={handleEdit} />
                    )
                })
            }
        </tbody>
    );
};

export default Tr;