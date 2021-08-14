import React from 'react';
import { useSelector } from 'react-redux';
import { EditForm } from '../forms/EditForm'
import { useParams } from 'react-router-dom'

export function EditModal() {
    const { id } = useParams();
    const boards = useSelector(state => state.board.boards);
    var board = {}
    if (typeof boards !== 'undefined') {
        board = boards.find(b => b._id === id);
    }
    return (<EditForm board={board} />)
}