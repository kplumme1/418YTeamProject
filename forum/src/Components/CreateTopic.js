import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

function CreateTopic() {

    // getCookie function from stack overflow
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    if (getCookie("token")) {
        console.log("Current token: " + getCookie("token"));
        console.log("Username: " + getCookie("username"));
        console.log("Role: "+ getCookie("role"));
    }

    if(getCookie("role") != "admin") {
        window.location.href = "/nopermissions";
    }

    else {

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
}

export default CreateTopic