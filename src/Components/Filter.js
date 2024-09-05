import { useState } from "react";
import { Container, Col, Row, Button, Collapse, Form } from "react-bootstrap";
import Calendar from "..//Components/Calendar";

const Filter = ({ dates, venues, setVenues, selectedDate, setSelectedDate}) => {
    
    const [openVenue, setOpenVenue] = useState(false)
    const [openDate, setOpenDate] = useState(false)

    const handleCheck = (e) => {
        if (e.target.checked) {
            setVenues([...venues, e.target.value])
        } else {
            setVenues(venues.filter(i => i !== e.target.value))
        }
    }
    
    return (
        <>
        <Container className="d-flex flex-column align-items-center">
            <Row className="mb-2" style={{width:"50vw"}}>
                <Col className="px-0 d-flex justify-content-start gap-2">
                    <Button variant="outline-primary" onClick={() => setOpenDate(!openDate)}>Date</Button>
                    <Button variant="outline-primary" onClick={() => setOpenVenue(!openVenue)} >Venue</Button>
                </Col>
            </Row>
            <Row className="" style={{width:"50vw"}}>
             <Collapse in={openVenue}>
                <Col className="" style={{width:"50%"}}>
                    <Form>
                        <Form.Check id="test" onChange={handleCheck} inline value="Standard Time" label="Standard Time" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="Sounds Good" label="Sounds Good" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="BSMT254" label="BSMT254" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="Bambi's" label="Bambi's" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="Cafeteria" label="Cafeteria" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="The Comfort Zone" label="The Comfort Zone" name="group1" type="checkbox"/>
                        <Form.Check onChange={handleCheck} inline value="Other" label="Other" name="group1" type="checkbox"/>
                    </Form>
                </Col>
             </Collapse>
            </Row>
            <Row>
             <Collapse in={openDate}>
                <Col>
                    <Calendar dates={dates} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </Col>
             </Collapse>
            </Row>
        </Container>
        </>
    )
}

export default Filter;