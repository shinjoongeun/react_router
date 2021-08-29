import React from 'react';

const Tr = ({info}) => {
    return(
        <>
            {
                info.map(item => {//map 을 이용하여 id 갯수만큼 Td.js 컴포넌트를 반복해서 불러오소 info 로 넘긴다
                    return (
                        <tr>
                            <td><input type={"checkbox"} /></td>
                            <td>{item.id}</td>
                            <td>{item.productName}</td>
                            <td>{item.productCode}</td>
                            <td>{item.shoppingMallCode}</td>
                            <td>{item.Category}</td>
                            <td>{item.BrandName}</td>
                            <td>{item.MSRP}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{item.writer}</td>
                            <td>{item.postingDate}</td>
                            <td>{item.LastModifier}</td>
                            <td>{item.ModifiedDate}</td>
                            <td>{item.views}</td>
                        </tr>
                    )
                })
            }
        </>
    );
};

export default Tr;