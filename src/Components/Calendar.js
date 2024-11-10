import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Container, Col, Row, Button } from "react-bootstrap";

const Calendar = ({dates, setSelectedDate}) => {

    const testing = useRef(null)
    const [startDate, setStartDate] = useState(new Date())

    const testing2 = dates.map(i => new Date(Date.parse(i)))
    
    return (
        <>
        <Container>
            <Row className="px-0" style={{width:"50vw"}}>
                <Col className="px-0 w-25 ">
                    <DatePicker calendarClassName="calendar" id="calendar" ref={testing} selected={startDate} onChange={(date) => setStartDate(date)} highlightDates={testing2} inline/>
                    <div>
                        <Button className="me-2" variant="outline-primary" style={{fontWeight:"bold", color:"black"}} onClick={() => setSelectedDate(Date.parse(startDate.toDateString()))}>Filter</Button>
                        <Button variant="outline-primary" style={{fontWeight:"bold", color:"black"}} onClick={() => setSelectedDate("")}>Show All</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Calendar;