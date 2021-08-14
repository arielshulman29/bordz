import React from 'react';
import { ViewBoard } from '../components/boards/ViewBoard';
import NavBar from '../components/navbar/navbar';
import Boards from '../components/boards/Boards';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router';

export function View() {
    const history = useHistory();
    const { id } = useParams();
    const boards = useSelector(state => state.board.boards);
    var board = {};
    if (typeof boards !== 'undefined') {
        board = boards.find(b => b._id === id);
    }
    else {
        history.push("/notfound");
    }
    return (
        <>
            <NavBar />
            {typeof boards !== 'undefined' ?
                (<Container>
                    <Row>
                        <Col xs={12} md={6} className="text-left">
                            <ViewBoard board={board} />
                        </Col>
                        <Col md={6}>
                            <Boards />
                        </Col>
                    </Row>
                </Container>)
                : <div>loading</div>
            }
        </>
    )
}