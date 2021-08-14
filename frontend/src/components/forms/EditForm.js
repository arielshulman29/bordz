import React from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import * as boardStyle from './styles/modal.module.scss';
import { useForm } from "react-hook-form";

export function EditForm(props) {
    var imagesArray = [];
    if (typeof props.board.images !== 'undefined') { imagesArray = props.board.images.map((image) => image) }
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data)
    return (
        <Modal show={true}>
            <Modal.Body className={boardStyle.modalStyle}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="align-items-center">
                        <Col xs={12}>
                            <Form.Control type="text" defaultValue={props.board.title || ''} size="sm" placeholder="title" {...register("title", { required: true })} />
                            {errors.title && <p>required</p>}
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={5}>
                            <Form.Control
                                as="select"
                                size="sm"
                                onChange={(e) => e.target.value}
                                defaultValue={props.board.boardType || 'Board type'}
                                {...register("boardType", { required: true })}>
                                <option value="Shortboard">Shortboard</option>
                                <option value="Longboard">Longboard</option>
                                <option value="Funboard">Funboard</option>
                                <option value="Softboard">Softboard</option>
                                <option value="Bodyboard">Bodyboard</option>
                            </Form.Control>
                        </Col>
                        <Col xs={12} md={7}>
                            <Form.Control type="text" defaultValue={props.board.brand || ''} size="sm" placeholder="brand" {...register("brand", { required: true })} />
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={4}>
                            <Form.Control type="text" defaultValue={props.board.length || ''} size="sm" placeholder="length" {...register("length", { required: true })} />
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control type="text" defaultValue={props.board.volume || ''} size="sm" placeholder="volume" {...register("volume", { required: true })} />
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control type="text" defaultValue={props.board.year || ''} size="sm" placeholder="year" {...register("year", { required: true })} />
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={4}>
                            <Form.Control type="text" defaultValue={props.board.phone || ''} size="sm" placeholder="phone number" {...register("phone", { required: true })} />
                        </Col>
                    </Row>
                    <Col xs={12} className="mt-3">
                        <Form.Control as="textarea" rows={3} defaultValue={props.board.description || ''} size="sm" {...register("description", { required: true })} />
                    </Col>
                    <Row className="align-items-center mt-3">
                        <Form.Control type="file" multiple {...register("images[]")} />
                    </Row>
                    {!imagesArray ? '' :
                        <>
                            <p className="mt-2 mb-0">Choose images to remove</p>
                            <Row className="mt-3">{imagesArray.map((image, index) => <Col xs={4} sm={3} md={2} key={index}><Form.Check type="checkbox" value={image.url} {...register("deleteImages[]")} /><img className={boardStyle.imageThumb} src={image.url} /></Col>)
                            }</Row >
                        </>}
                    <Button variant="primary" type="submit" className={boardStyle.saveButton}>Save</Button>
                </Form>
            </Modal.Body >
        </Modal >
    )
}