import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

export default class Generate extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row md={5}>
                    <Col sm={4}>
                        <h3>Signal Generation</h3>
                    </Col>
                    <Col sm={8}>
                        <h3>Settings</h3>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <h4>Signal Type</h4>
                        <Row>
                            <Col sm={6}>
                                <Form>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Check
                                            type={'radio'}
                                            label={'Random Gaussian White Noise Signal'}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Check
                                                type={'radio'}
                                                label={'Impulse Signal'}
                                            />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Check
                                                type={'radio'}
                                                label={'Sinusoidal Wave'}
                                            />
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}