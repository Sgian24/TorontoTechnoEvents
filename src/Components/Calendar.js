import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Container, Col, Row, Button } from "react-bootstrap";

const Calendar = ({dates, selectedDate, setSelectedDate}) => {

    const testing = useRef(null)
    const [startDate, setStartDate] = useState(new Date())

    const testing2 = dates.map(i => new Date(Date.parse(i)))

    console.log("testing",testing2);
    
    return (
        <>
        <Container>
            <Row className="px-0" style={{width:"50vw"}}>
                <Col className="px-0 w-25 ">
                    <DatePicker id="calendar" ref={testing} selected={startDate} onChange={(date) => setStartDate(date)} highlightDates={testing2} inline/>
                    <div>
                        <Button className="mt-2 me-2 w-25" variant="outline-primary" onClick={() => setSelectedDate(Date.parse(startDate.toDateString()))}>Filter</Button>
                        <Button className="mt-2 w-25" variant="outline-primary" onClick={() => setSelectedDate("")}>Show All</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Calendar;