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

  const [info, setInfo]=useState([]);

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

  const classes = useStyles();

  const ThMenus = ['','번호','상품명','상품코드','쇼핑몰코드','카테고리','브랜드명','권장가','실제판매가','재고수량','작성자','작성일']
  const ShowThMenu = ThMenus.map((ThManu) => <StyledTableCell>{ThManu}</StyledTableCell>)
  
  const TdMenus = ['id','productName','productCode','shoppingMallCode','Category','BrandName','MSRP','price','stock','writer','postingDate']
  const ShowTdMenu = TdMenus.map((TdMenu) => <StyledTableCell key={TdMenu.toString()} value={TdMenu}></StyledTableCell>)    

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
              {
                info.map((item) => {
                  
                  return (
                    <TableRow>
                      <StyledTableCell><input type={"checkbox"} /></StyledTableCell>
                      <StyledTableCell>{item.id}</StyledTableCell>
                      <StyledTableCell>{item.productName}</StyledTableCell>
                      <StyledTableCell>{item.productCode}</StyledTableCell>
                      <StyledTableCell>{item.shoppingMallCode}</StyledTableCell>
                      <StyledTableCell>{item.Category}</StyledTableCell>
                      <StyledTableCell>{item.BrandName}</StyledTableCell>
                      <StyledTableCell>{item.MSRP}</StyledTableCell>
                      <StyledTableCell>{item.price}</StyledTableCell>
                      <StyledTableCell>{item.stock}</StyledTableCell>
                      <StyledTableCell>{item.writer}</StyledTableCell>
                      <StyledTableCell>{item.postingDate}</StyledTableCell>
                      {/* {
                      <StyledTableCell>{item.ShowTdMenu}</StyledTableCell>
                      } */}
                      
                    </TableRow>
                  )
                })
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