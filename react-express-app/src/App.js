import React, {useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import './App.css';

const App = () => {
  const [data, setData] = useState({data: null})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/express_data")

        if (!res.ok) {
          throw Error(res.message)
        }

        const resData = await res.json()
        setData({ data: resData.prices });

        console.log(resData);
      } catch(err) {
        console.log(err);
      };
    }
    fetchData()
  }, [])

  const formatDates = (start, end) => {
    const startdatetime = new Date(start);
    const enddatetime = new Date(end);
    const startdatestr = `${startdatetime.getDate()}.${startdatetime.getMonth() + 1}.${startdatetime.getFullYear()}`;
    const starttimestr = `${startdatetime.getHours()}:${startdatetime.getMinutes() < 10 ? '0' : ''}${startdatetime.getMinutes()}`;
    const endtimestr = `${enddatetime.getHours()}:${enddatetime.getMinutes() < 10 ? '0' : ''}${enddatetime.getMinutes()}`;
    return `${startdatestr} ${starttimestr}-${endtimestr}`;
  }

  return (
    <>    
      <Container style={{width:'30%'}} data-bs-theme="dark">
      <h1>Hourly Electricity Prices</h1>
      <Row>
      <Col>
      <Table striped bordered >
        <thead>
          <tr>
            <th>Date</th>
            <th>Price</th>
          </tr>
        </thead>
        {data.data ? (
          <tbody >
            {data.data.map((item, index) => (
              <tr key={index}>
                <td style={{width:'60%'}}>{formatDates(item.startDate, item.endDate)}</td>
                <td style={{width:'40%'}}>{item.price}</td>
              </tr>
            ))}
          </tbody>
        ): <p>Data not loaded...</p>}
      </Table>
      </Col>
      </Row>
      </Container>
    </>
);
}

export default App;