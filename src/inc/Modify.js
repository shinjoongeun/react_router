import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';

const Modify = ({ selectedData, handleCancel, handleEditSubmit }) => {
    const [edited, setEdited] = useState(selectedData);
    console.log(selectedData); //클릭된 데이터 가져오는게 확인됨
    
const useStyles = makeStyles((theme) =>({
    addButton: {
        margin: '10px 100px 10px 0px',
        float: "right"
    },
    RoutMainButton: {
        margin: '10px 0px 10px 100px',
        float: "left"
    }
}))

const classes = useStyles();

    const onEditChange = (e) => {
            setEdited({
                ...edited,
                [e.target.name] : e.target.value
            })
        }

    const dataEdit = (e) =>{
        axios.put('http://localhost:4010/product-list/'+ selectedData.id ,{
            productName: edited.productName,
            productCode: edited.productCode,
            shoppingMallCode: edited.shoppingMallCode,
            Category: edited.Category,
            BrandName: edited.BrandName,
            MSRP: edited.MSRP,
            price: edited.price,
            stock: edited.stock,
            writer: edited.writer,
            postingDate: edited.postingDate
        })
        handleCancel();
        handleEditSubmit(edited);
    }

  return(
    <>

            <h1> 수정 </h1>
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
                <div>

                    <Link to='/main'><Button className={classes.addButton} variant="contained" color="primary" endIcon={<FaPlus>add</FaPlus>} onClick={dataEdit}>수정</Button></Link>
                </div>
                  <Button className={classes.RoutMainButton} variant="contained" color="secondary"><Link to='/main'>취소</Link></Button>

        </>
  )
}

export default Modify;
