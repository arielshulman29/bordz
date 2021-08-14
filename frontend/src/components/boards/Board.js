import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import * as boardStyle from './styles/boards.module.scss';
import { BoardModal } from './BoardModal'

export function Board(props) {
  var imgsrc = '';
  if (typeof props.board != "undefined") {
    imgsrc = `${props.board.images[0].url}`
  }
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  return (
    <>
      <Card className={boardStyle.cardStyle} onClick={handleShow}>
        <Card.Img className={boardStyle.imageSize} variant="top" src={imgsrc} />
        <Card.Body>
          <span className="text-nowrap">
            <Card.Title className={boardStyle.cardTitle}>{props.board.title}</Card.Title>
          </span>
          <Card.Text>
            {props.board.description}
          </Card.Text>
        </Card.Body>
      </Card>
      <BoardModal show={show} board={props.board} handleClose={handleHide} />
    </>
  );
}
