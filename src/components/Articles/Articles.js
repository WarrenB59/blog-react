import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllArticles } from '../../redux/articles/articleActions';
import { useState } from 'react';
import Loading from './loader/Loading';
import { useNavigate } from 'react-router-dom';





const Articles = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state) => state.articleReducer.articles);
    const [apiOk, setApiOk] = useState(false);

    useEffect(() => {
        dispatch(getAllArticles()).then(() => {
            setApiOk(true)
        }).catch((er) => {
            console.log(er);
        });
    }, [dispatch])

    const callArticle = (idArticle) => {
        try {
            navigate("/article/" + idArticle)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        apiOk ? (
            <Row>{data.map((article) => (
                <Col key={article.id}>
                    <Card className="articles" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="img/articles/img_articles.png" />
                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                            <Card.Text>
                                {article.content}
                            </Card.Text>
                            <Button variant="primary" onClick={() => callArticle(article.id)}>Lire l'article</Button>
                        </Card.Body>
                    </Card>
                </Col>
        ))} </Row>
        ) : (
            <Loading />
        )
    )
};

export default Articles;