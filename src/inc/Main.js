import React, {useEffect, useState, useRef} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import Save from './Save.js';
import {Button} from '@material-ui/core';
import Modal from './Modal.js';
import Checkbox from '@material-ui/core/Checkbox';
import Modify from './Modify.js';

function Main() {

  const [info, setInfo]=useState([]); //데이터 가져오기
  const [selected, setSelected] = useState('');
  // const [modalOn, setModalOn] = useState(false);
  const [modifyOn, setModifyOn] = useState('');

  const nextId = useRef(11);

  useEffect(()=>{  //초기 데이터 가져오기
    axios.get('http://localhost:4010/product-list')
      .then(response => setInfo(response.data)) 
      .catch(err => console.log(err))
  }, []);

  const useStyles = makeStyles({  // table의 css 영역
    table: {
        minWidth: 1500, // min-width css 속성은 요소의 최소 너비를 설정한다 -> min-width 는 width 속성의 사용값이 자신의 값 보다 작아지는 것을 방지한다.
        width: "90%",
        marginLeft:"auto",
        marginRight:"auto"
    },
    number: {
        textAlign: "center"
    },
    views: {
        textAlign: "center"
    },
    RoutSaveButton: {
      margin: '10px 100px 10px 0px',
      float: "right"
    }
  });

 const handleSave = (data) => {
   //데이터 수정하기
   if (data.id) { //수정 데이터에는 id 가 존재
    setInfo(
      info.map(row => data.id === row.id ? {
        id: data.id,
        productName: data.productName,
        productCode: data.productCode,
        shoppingMallCode: data.shoppingMallCode,
        Category: data.Category,
        BrandName: data.BrandName,
        MSRP: data.MSRP,
        price: data.price,
        stock: data.stock,
        writer: data.writer,
        postingDate: data.postingDate
      } : row))
    } else {
      setInfo(info => info.concat(
        {
          id: nextId.current,
          productName: data.productName,
          productCode: data.productCode,
          shoppingMallCode: data.shoppingMallCode,
          Category: data.Category,
          BrandName: data.BrandName,
          MSRP: data.MSRP,
          price: data.price,
          stock: data.stock,
          writer: data.writer,
          postingDate: data.postingDate
        }
      ))
      nextId.current += 1;
    }
   }
 

  const handelRemove = (id) => {
    // alert(id);
    setInfo(info => info.filter(item => item.id !== id));

    axios.delete('http://localhost:4010/product-list/'+id)
  }

  const handleEdit = (item) => {
    // setModalOn(true);
    setModifyOn();

    const selectedData = {
      id: item.id,
      productName: item.productName,
      productCode: item.productCode,
      shoppingMallCode: item.shoppingMallCode,
      Category: item.Category,
      BrandName: item.BrandName,
      MSRP: item.MSRP,
      price: item.price,
      stock: item.stock,
      writer: item.writer,
      postingDate: item.postingDate
    };
    console.log(selectedData);
    setSelected(selectedData);
  };

  const handleCancel = () => {
    // setModalOn(true);
    setModifyOn();
  }
  
  const handleEditSubmit = (item) => {
    console.log(item);
    handleSave(item);
    // setModalOn(true);
    setModifyOn();
  }

  const classes = useStyles();

  const ThMenus = ['','번호','상품명','상품코드','쇼핑몰코드','카테고리','브랜드명','권장가','실제판매가','재고수량','작성자','작성일','수정', '삭제']
  const ShowThMenu = ThMenus.map((ThManu) => <TableCell>{ThManu}</TableCell>)
  
  // const TdMenus = ['id','productName','productCode','shoppingMallCode','Category','BrandName','MSRP','price','stock','writer','postingDate']
  // const ShowTdMenu = TdMenus.map((TdMenu) => <TableCell key={TdMenus}></TableCell>)    
  // const [checkedData, setcheckedData] = useState['']
  
  function handleCheckbox(e) {
    const checkedTd = e.target.parentNode.parentNode.parentNode;
    checkedTd.style.backgroundColor = (e.target.checked) ? "blue" : "white";
    
    const checkedTr = checkedTd.parentNode;
    checkedTr.style.backgroundColor = (e.target.checked) ? "#b0d3ad" : " #fff";

    let checkedBoxValue = '';
    if(e.target.checked) {
      checkedBoxValue = e.target.value
    }else {
      checkedBoxValue = '';
    }
    alert(checkedBoxValue);
  }

  return (
    <div>
      <TableContainer component={Paper}>   
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                <TableCell>{ShowThMenu}</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow info={info}>
              {info.map((item) => {

                  return(   // "#b0d3ad"
                     <TableRow value={item.id} hover> 
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" value={item.id} onClick={handleCheckbox} />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.productCode}</TableCell>
                      <TableCell>{item.shoppingMallCode}</TableCell>
                      <TableCell>{item.Category}</TableCell>
                      <TableCell>{item.BrandName}</TableCell>
                      <TableCell>{item.MSRP}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>{item.writer}</TableCell>
                      <TableCell>{item.postingDate}</TableCell>
                      <TableCell>
                        <Link to='/modify'><Button onClick={() => handleEdit(item)} className='text-center text-purple-400 cursor-pointer show-modal'>수정<i class="far fa-edit" /></Button></Link>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handelRemove(item.id)} className='text-center text-purple-400 sursor-pointer'>삭제<i class="far fa-trash-alt" /></Button>
                      </TableCell>
                    </TableRow>
                  )}
                )
              }
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> 
        <Route path="/save" exact={true} component={Save} />
        <Button className={classes.RoutSaveButton} variant="contained" color="info"><Link to='/save'>추가</Link></Button>
      {/* {modalOn && <Modal selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />} */}
      {modifyOn && <Modify selectedData={selected} handleCancel={handleCancel} handleEditSubmit={handleEditSubmit} />}
    
    </div>
  )

}

export default Main;
