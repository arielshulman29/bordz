import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { getUserGoogleThunk } from '../../features/user/userSlice';
import { Container, Col, Card, Row } from 'react-bootstrap';
import * as loginStyles from './login.module.scss'


export function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const responseFailureGoogle = (response) => {
        console.log(response);
    }
    return (
        <Container className={loginStyles.containerStyle}>
            <Row>
                <Col xs={{ span: 4, offset: 4 }}>
                    <Card className={loginStyles.cardStyle}>
                        <Card.Body className={loginStyles.cardBodyStyle}>
                            <Card.Title>Log in</Card.Title>
                            <div className={loginStyles.cardStyle}>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                    buttonText="Login"
                                    onSuccess={(response) => {
                                        dispatch(getUserGoogleThunk(response))
                                        history.push("/");
                                    }}
                                    onFailure={responseFailureGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                                </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>)
}