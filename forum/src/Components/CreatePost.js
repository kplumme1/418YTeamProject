import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Editor } from "@tinymce/tinymce-react";

    function CreatePost() {
        return (
            <Container style={{ marginTop: "40px" }}>
                <Row>
                    <Col></Col>
                    <Col md={7} style={{ border: "5px solid black", borderRadius: "30px", padding: "20px 20px" }}>
                        <Form>
                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>New Post Name</Form.Label>
                                <Form.Control type="text" placeholder="Name" />
                                <Form.Text className="text-muted">
                                    What will your post be about?.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ fontWeight: "bold" }}>Post Body</Form.Label>
                                <Editor
                                    apiKey = "ryef7c7iynamh7xxtkti6mskmx80xg2t3qy2xqtiqmwxf2d5"
                                    init={{
                                        height: 300,
                                        menubar: false
                                    }}
                                />
                            </Form.Group>
                            <Row>
                                <Col></Col>
                                <Col style={{ textAlign: "center" }}>
                                    <Button style={{ padding: "10px 20px", width: "160px" }} variant="primary" type="button" href="/posts/add">
                                        Create Post
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

export default CreatePost