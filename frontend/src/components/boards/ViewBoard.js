import { Button, Carousel } from 'react-bootstrap'
import * as boardStyle from './styles/board.module.scss';
import { FaPhone } from 'react-icons/fa'


export function ViewBoard(props) {    
    var imagesCarousel = '';
    imagesCarousel = props.board.images.map((img) => <Carousel.Item>
        <div className="d-flex justify-content-center">
            <img className={boardStyle.imageSize} src={img.url} alt="surfboard" />
        </div>
    </Carousel.Item>)
    const CreateDate = (date) => date.replaceAll('-', '/').split('T')[0].split('/').reverse().join('/')
    return (
        <>
            <Carousel>
                {imagesCarousel}
            </Carousel>
            <div className={boardStyle.mainTitle}>
                {props.board.title}
                <span className={boardStyle.price}> ${props.board.price}</span>
            </div >
            <div className={boardStyle.secondTitle}>
                {props.board.brand} · {props.board.length} ft · {props.board.volume} ltr · {props.board.year}
                <span className={boardStyle.dateTitle}></span>
            </div>
            <div className={boardStyle.description}>{props.board.description}</div>
            <div className={boardStyle.dateTitle}>uploaded at {CreateDate(props.board.createdAt)}</div>
            <div className={boardStyle.interested}>Interested? <Button size="sm" variant="outline-dark"><FaPhone /></Button></div>
        </>
    )
}