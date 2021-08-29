import React,{ useState } from 'react';

const Modal = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);
    console.log(selectedData); //클릭된 데이터 가져오는게 확인됨
    const onCancel = () => {
        handleCancel();
    }

    const onEditChange = (e) => {
        setEdited({
            ...edited,
            [e.target.name] : e.target.value
        })
    }

    const onSubmitEdit  = (e) => {
        e.preventDefault();
        handleEditSubmit(edited);
    }

    return (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-70">
            <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
                <div className="border-b px-4 py-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg">상품 정보 수정하기</h3>
                <i className="fas fa-times curcor-pointer" onClick={onCancel}></i>
                </div>
                <form onSubmit={onSubmitEdit}>
                    <div class="p-3">

                        <div>ID: {edited.id}</div>
                        <div>상품명: <input className='border-2 boeder-grey-100' type='text' name='productName' value={edited.productName} onChange={onEditChange} /></div>
                        <div>상품코드: <input className='border-2 boeder-grey-100' type='text' name='productCode' value={edited.productCode} onChange={onEditChange} /></div>
                        <div>쇼핑몰코드: <input className='border-2 boeder-grey-100' type='text' name='shoppingMallCode' value={edited.shoppingMallCode} onChange={onEditChange} /></div>
                        <div>카테고리: <input className='border-2 boeder-grey-100' type='text' name='Category' value={edited.Category} onChange={onEditChange} /></div>
                        <div>브랜드명: <input className='border-2 boeder-grey-100' type='text' name='BrandName' value={edited.BrandName} onChange={onEditChange} /></div>
                        <div>권장가: <input className='border-2 boeder-grey-100' type='text' name='MSRP' value={edited.MSRP} onChange={onEditChange} /></div>
                        <div>실제판매가: <input className='border-2 boeder-grey-100' type='text' name='price' value={edited.price} onChange={onEditChange} /></div>
                        <div>재고수량: <input className='border-2 boeder-grey-100' type='text' name='stock' value={edited.stock} onChange={onEditChange} /></div>
                        <div>작성자: <input className='border-2 boeder-grey-100' type='text' name='writer' value={edited.writer} onChange={onEditChange} /></div>
                        <div>작성일: <input className='border-2 boeder-grey-100' type='text' name='postingDate' value={edited.postingDate} onChange={onEditChange} /></div>
                        
                    </div>
                    <div className="flex justify-end items-center w-100 border-t p-3">
                        <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal" onClick={onCancel}>취소</button>
                        <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white">수정</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;