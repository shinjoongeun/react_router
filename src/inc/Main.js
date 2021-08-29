import React, {useEffect, useState} from 'react';
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

function Main() {

  const [info, setInfo]=useState([]); //데이터 가져오기
  const [selelcted, setSelected] = useState('');
  const [modalOn, setModalOn] = useState(false)

  useEffect(()=>{  //초기 데이터 가져오기
    axios.get('http://localhost:4010/product-list')
      .then(response=>setInfo(response.data)) 
      .catch(err=>console.log(err))
  }, []);

  const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
  }))(TableCell);

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

  const handelRemove = (id) => {
    setInfo(info => info.filter(item => item.id !== id));
  }
  const handleEdit = (item) => {
    setModalOn(true);
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
  const handlelCancel = () => {
    setModalOn(false);
  }
  const handleEitSubmit = (item) => {
    console.log(item);
    handleSave(item);
    setModalOn(false);
  }

  const classes = useStyles();

  const ThMenus = ['','번호','상품명','상품코드','쇼핑몰코드','카테고리','브랜드명','권장가','실제판매가','재고수량','작성자','작성일']
  const ShowThMenu = ThMenus.map((ThManu) => <StyledTableCell>{ThManu}</StyledTableCell>)
  
  const TdMenus = ['id','productName','productCode','shoppingMallCode','Category','BrandName','MSRP','price','stock','writer','postingDate']
  const ShowTdMenu = TdMenus.map((TdMenu) => <StyledTableCell key={TdMenus}></StyledTableCell>)    

  return (
    <div>
      <TableContainer component={Paper}>   
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                <StyledTableCell>{ShowThMenu}</StyledTableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow info={info}>
              {info.map(({id,productName,productCode,shoppingMallCode,Category,BrandName,MSRP,price,stock,writer,postingDate}) => (

                  <TableRow key={id+productName+productCode+shoppingMallCode+Category+BrandName+MSRP+price+stock+writer+postingDate}>
                    
                    {/* {
                      <>
                      <StyledTableCell><input type={"checkbox"} /></StyledTableCell>
                      <StyledTableCell>{ShowTdMenu}</StyledTableCell>
                      </>
                    } */}
                    <StyledTableCell><input type={"checkbox"} /></StyledTableCell>
                    <StyledTableCell>{id}</StyledTableCell>
                    <StyledTableCell>{productName}</StyledTableCell>
                    <StyledTableCell>{productCode}</StyledTableCell>
                    <StyledTableCell>{shoppingMallCode}</StyledTableCell>
                    <StyledTableCell>{Category}</StyledTableCell>
                    <StyledTableCell>{BrandName}</StyledTableCell>
                    <StyledTableCell>{MSRP}</StyledTableCell>
                    <StyledTableCell>{price}</StyledTableCell>
                    <StyledTableCell>{stock}</StyledTableCell>
                    <StyledTableCell>{writer}</StyledTableCell>
                    <StyledTableCell>{postingDate}</StyledTableCell>
                    <StyledTableCell><Button onClick={onEdit} className='text-center text-purple-400 cursor-pointer show-modal'>수정<i class="far fa-edit" /></Button></StyledTableCell>
                    <StyledTableCell><Button onclick={onRemove} className='text-center text-purple-400 sursor-pointer'>삭제<i class="far fa-trash-alt" /></Button></StyledTableCell>
                  </TableRow>
                ))
              }
            </TableRow>
          </TableBody>    {/*  handleEdit={handleEdit} */}
        </Table>
      </TableContainer> 
        <Route path="/save" exact={true} component={Save} />
        <Button className={classes.RoutSaveButton} variant="contained" color="info"><Link to='/save'>추가</Link></Button>
    </div>
  );
}

export default Main;