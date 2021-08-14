import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Board } from './Board';
import { Container, Col, Row } from 'react-bootstrap';
import { getAllBoardsThunk } from '../../features/board/boardSlice'

function Boards(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllBoardsThunk())
    }, [dispatch])
    var allBoards = '';
    if (typeof props.boards != "undefined") {
        allBoards = props.boards.map((board, index) => <Col key={index}>
            <Board key={board._id} board={board} />
        </Col>
        )
    }

    return (
        <Container>
            <Row>
                {!props.boards ? '' : allBoards}
            </Row>
        </Container>
    )
}
const mapStateToProps = (state) => {
    return {
        boards: state.board.boards
    }
}
export default connect(mapStateToProps)(Boards);

