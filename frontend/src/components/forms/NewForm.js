import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import * as boardStyle from './styles/modal.module.scss';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector, connect } from 'react-redux';
import { createNewBoardThunk } from '../../features/board/boardSlice'
import { useHistory } from 'react-router-dom'

function NewForm(props) {
    const [files, setFiles] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.user.user._id);
    const getFormData = (object) =>
        Object.keys(object).reduce((formData, key) => {
            formData.append(key, object[key]);
            return formData;
        }, new FormData());

    const onSubmit = data => {
        setIsSubmitting(true);
        const formFields = getFormData(data);
        for (let i = 0; i < files.length; i++) {
            formFields.append('images', files[i]);
        }
        formFields.append('seller', user);
        dispatch(createNewBoardThunk(formFields));
    }
    const handleFiles = (e) => {
        setFiles(e.target.files);
    }

    useEffect(() => {
        if (props.board.status === 'new board created') {
            history.push("/");
        }
    }, [props.board.status])
    return (
        <Modal show={true}>
            <Modal.Body className={boardStyle.modalStyle}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="align-items-center">
                        <Col xs={12}>
                            <Form.Control type="text" size="sm" placeholder="title" {...register("title", { required: true })} />
                            {errors.title && <p>required</p>}
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={5}>
                            <Form.Control
                                as="select"
                                size="sm"
                                onChange={(e) => e.target.value}
                                {...register("boardType", { required: true })}>
                                <option>Choose board type</option>
                                <option value="Shortboard">Shortboard</option>
                                <option value="Longboard">Longboard</option>
                                <option value="Funboard">Funboard</option>
                                <option value="Softboard">Softboard</option>
                                <option value="Bodyboard">Bodyboard</option>
                            </Form.Control>
                        </Col>
                        <Col xs={12} md={7}>
                            <Form.Control type="text" size="sm" placeholder="Brand" {...register("brand", { required: true })} />
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={4}>
                            <Form.Control type="number" size="sm" placeholder="Length in ft" {...register("length", { required: true })} />
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control type="text" size="sm" placeholder="Volume" {...register("volume", { required: true })} />
                        </Col>
                        <Col xs={12} md={4}>
                            <Form.Control type="text" size="sm" placeholder="Year" {...register("year", { required: true })} />
                        </Col>
                    </Row>
                    <Row className="align-items-center mt-3">
                        <Col xs={12} md={7}>
                            <Form.Control type="text" size="sm" placeholder="Seller's name" name="name" {...register("name", { required: true })} />
                        </Col>
                        <Col xs={12} md={5}>
                            <Form.Control type="phone" size="sm" placeholder="Seller's phone number" {...register("phone", { required: true })} />
                        </Col>
                    </Row>
                    <Col xs={12} className="mt-3">
                        <Form.Control as="textarea" rows={2} size="sm" placeholder="Description..." {...register("description", { required: true })} />
                    </Col>
                    <Row className="align-items-center mt-3">
                        <Form.Control type="file" multiple name="images" onChange={handleFiles} required />
                    </Row>
                    <Button variant="primary" type="submit" className={boardStyle.saveButton} disabled={isSubmitting}>Save</Button>
                </Form>
            </Modal.Body >
        </Modal >
    )
}
const mapStateToProps = (state) => {
    return {
        board: state.board
    }
}
export default connect(mapStateToProps)(NewForm);