import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';

function Save() {

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

const [form, setForm] = useState({
        productName: '' ,
        productCode: '' ,
        shoppingMallCode: '' ,
        Category: '' ,
        BrandName: '' ,
        MSRP: '' ,
        price: '' ,
        stock: '' ,
        writer: '' ,
        postingDate: '' ,
        id: '' 
    });

const saveData = () => {
  axios.post('http://localhost:4010/product-list', form)
};

const handleChange = (e) => { //여기에서 e 는 event object 이며  이벤트 데이터를 포함한다. event object란 Dom 과 관련된 이벤트가 발생하면 그에 대한 관련정보 의 모든것
  const { name, value } = e.target;
  setForm({
      ...form,  //전개 연산자 : 배열 또는 객체를 하나하나 넘기는 용도로 사용 된다
      [name]: value
  })
}; //form 의 onSubmit이벤트를 handleSubmit 함수로 넘기고, 상위의 onSaveData함수에 입력된 form객체를 전달해 준다.

  return(
    <>

            <h1> Save </h1>
                <div>
                    <label htmlfor="productName">상품명   <input type='text' name='productName' value={form.productName} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="productCode">상품코드   <input type='text' name='productCode' value={form.productCode} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="shoppingMallCode">쇼핑몰코드   <input type='text' name='shoppingMallCode' value={form.shoppingMallCode} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="Category">카테고리   <input type='text' name='Category' value={form.Category} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="BrandName">브랜드명   <input type='text' name='BrandName' value={form.BrandName} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="MSRP">권장가   <input type='text' name='MSRP' value={form.MSRP} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="price">실제판매가   <input type='text' name='price' value={form.price} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="stock">재고수량   <input type='text' name='stock' value={form.stock} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="writer">작성자   <input type='text' name='writer' value={form.writer} onChange={handleChange} /></label>
                </div>
                <div>
                    <label htmlfor="postingDate">작성일   <input type='text' name='postingDate' value={form.postingDate} onChange={handleChange} /></label>
                </div>
                <div>

                    <Link to='/main'><Button className={classes.addButton} variant="contained" color="primary" endIcon={<FaPlus>add</FaPlus>} onClick={saveData}>저장</Button></Link>
                </div>
                  <Button className={classes.RoutMainButton} variant="contained" color="secondary"><Link to='/main'>메인</Link></Button>

        </>
  )
}

export default Save;