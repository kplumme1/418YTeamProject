import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function CreateTopic() {
    return (
        <Container style = {{marginTop: "40px"}}>
            <Row>
                <Col></Col>
                <Col md = {7} style = {{border: "5px solid black", borderRadius: "30px", padding: "20px 20px"}}>
                    <Form>
                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>New Topic Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" />
                            <Form.Text className="text-muted">
                            This is how the name will show up on the forum.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label style = {{fontWeight: "bold"}}>Description</Form.Label>
                            <Form.Control as = "textarea" type="text" placeholder="Description" />
                            <Form.Text className="text-muted">
                            This description will be shown below the name. Use it to explain to users what it will be about!
                            </Form.Text>
                        </Form.Group>
                        <Row>
                            <Col></Col>
                            <Col style = {{textAlign: "center"}}>
                                <Button style = {{padding: "10px 20px", width: "160px"}} variant="primary" type="submit">
                                    Create Topic
                                </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default CreateTopic