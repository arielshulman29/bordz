import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';
import * as boardStyle from './styles/board.module.scss';
import { EditForm } from '../forms/EditForm'
import { Link } from 'react-router-dom'

export function BoardModal(props) {
    const imagesCarousel = props.board.images.map((board, index) => <Carousel.Item>
        <div class="d-flex justify-content-center">
            <img className={boardStyle.imageSize} src={props.board.images[index].url} alt="surfboard" />
        </div>
    </Carousel.Item>);
    return (
        <>
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
                    <Link to={() => `/edit/${props.board._id}`}>edit</Link>
                </Modal.Body>
            </Modal>
        </>
    )
}