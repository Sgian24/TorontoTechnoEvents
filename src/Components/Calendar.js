import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { Container, Col, Row, Button } from "react-bootstrap";

const Calendar = ({dates, setSelectedDate}) => {

    const calendarRef = useRef(null)
    const [startDate, setStartDate] = useState(new Date())

    const highlightedDates = dates.map(i => new Date(Date.parse(i)))
    
    return (
        <>
        <Container>
            <Row className="calendar-row px-0">
                <Col className="px-0 w-25 ">
                    <DatePicker calendarClassName="calendar" id="calendar" ref={calendarRef} selected={startDate} onChange={(date) => setStartDate(date)} highlightDates={highlightedDates} inline/>
                    <div>
                        <Button className="calendar-buttons me-2 fw-bold" variant="outline-primary" onClick={() => setSelectedDate(Date.parse(startDate.toDateString()))}>Filter</Button>
                        <Button className="calendar-buttons fw-bold" variant="outline-primary" onClick={() => setSelectedDate("")}>Show All</Button>
                    </div>
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Calendar;