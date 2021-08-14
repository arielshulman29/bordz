import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import * as boardStyle from './styles/board.module.scss';

export function ViewBoardModal(props) {
    const imagesCarousel = props.board.images.map((board, index) => <Carousel.Item>
        <img className={boardStyle.imageSize} src={props.board.images[index].url} alt="surfboard" />
    </Carousel.Item>);
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header>
                <Modal.Title>{props.board.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {imagesCarousel}
                </Carousel>
                <div className={boardStyle.price}>${props.board.price}</div>
                <div>{props.board.description}</div>
            </Modal.Body>
        </Modal>
    )
}