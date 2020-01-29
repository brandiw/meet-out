import React, { useEffect, useState, FormEvent } from 'react'
import { Redirect } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, FormText, Input, Label, Row } from 'reactstrap';
import { Decoded } from '../App';

interface NewMeetProps {
    user: Decoded | null
}

const NewMeet: React.FC<NewMeetProps> = props => {
    // Assign default state
    // Message displays on page
    let [message, setMessage] = useState('')

    // Form data
    let [activity, setActivity] = useState(' ')
    let [description, setDescription] = useState(' ')
    let [address, setAddress] = useState(' ')
    let [city, setCity] = useState(' ')
    let [state, setUSState] = useState(' ')
    let [zip, setZip] = useState(' ')
    let [date , setDate] = useState(' ')
    let [starttime, setStartTime] = useState(' ')
    let [endtime, setEndTime] = useState(' ')

    useEffect(() => {
        setMessage('')
    }, [activity, description, address, city, state, zip, date, starttime, endtime])

    const createNewMeet = (e: FormEvent) => {
        e.preventDefault()

        // Form data
        let data: object = {
            activity,
            description,
            address,
            city,
            state,
            zip,
            date,
            starttime,
            endtime
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                return(
                    <Redirect to = "/home" />
                )
            } else {
                // Error
                setMessage(`${response.status} ${response.statusText}: ${result.message}`)
            }
            })
            .catch( (err: Error) => console.log(err))
        })
        .catch( (err: Error) => {
            console.log('Error', err)
            setMessage(`Error: ${err.toString()}`)
        })
    
    }

    if (!props.user) {
        return(
            <Redirect to = "/" />
        )
    }

    return (
        <div>
        <Container className="text-left web-body">
            <h2>Create a new event:</h2>
            <br />
            <Form onSubmit={createNewMeet}>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="activityName"><h5>Event Name:</h5></Label>
                            <Input id="activityName" type="text" name="activityName" placeholder="What are we doing?" onChange={(e: FormEvent<HTMLInputElement>) => setActivity(e.currentTarget.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description"><h5>Event Description:</h5></Label>
                            <Input id="description" type="textarea" name="description" placeholder="Details" onChange={(e: FormEvent<HTMLInputElement>) => setDescription(e.currentTarget.value)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="address"><h5>Location Details:</h5></Label>
                            <Input id="address" type="text" name="activityAddress" placeholder="Address" onChange={(e: FormEvent<HTMLInputElement>) => setAddress(e.currentTarget.value)} required />
                        </FormGroup>
                        <FormGroup>
                            <Input id="city" type="text" name="city" placeholder="City" onChange={(e: FormEvent<HTMLInputElement>) => setCity(e.currentTarget.value)} required />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Input id="state" type="text" name="state" placeholder="State" onChange={(e: FormEvent<HTMLInputElement>) => setUSState(e.currentTarget.value)} required />
                                    <FormText>Two-character state code only.</FormText>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Input id="zip" name="zip" type="number" placeholder="Zip Code" onChange={(e: FormEvent<HTMLInputElement>) => setZip(e.currentTarget.value)} required />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                        <Label for="address"><h5>Time Details:</h5></Label>
                        <FormGroup>
                            <Label for="address">Date:</Label>
                            < Input id="date" name="date" type="date" placeholder="Date" onChange={(e: FormEvent<HTMLInputElement>) => setDate(e.currentTarget.value)} required />
                        </FormGroup>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="starttime">Start:</Label>
                                    < Input id="starttime" name="starttime" type="date" placeholder="Start Time" onChange={(e: FormEvent<HTMLInputElement>) => setStartTime(e.currentTarget.value)} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="address">End:</Label>
                                    < Input id="endtime" name="endtime" type="date" placeholder="End Time" onChange={(e: FormEvent<HTMLInputElement>) => setEndTime(e.currentTarget.value)} />
                                </FormGroup> 
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="address"><h5>Privacy Details:</h5></Label>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="private" value="true"/>{' '}
                                    Private
                                </Label>
                                <FormText>This event will only be accessible by invite.</FormText>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" name="private" value="false"/>{' '}
                                    Public
                                </Label>
                                <FormText>This event will be accessible by everyone.</FormText>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>

                <Input type="hidden" value={props.user._id} name="users"/>
                <Input type="hidden" value={props.user._id} name="creator"/>
                <hr />
                <FormText color="danger">{message}</FormText>
                <Button type="submit" color="info" size="lg">Submit!</Button>{' '}
            </Form>
        </Container>
        </div>
    )
}

export default NewMeet