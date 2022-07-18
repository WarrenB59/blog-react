import React, { useState, useEffect } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constants/urlConstants";
import { getArticleById } from "../../redux/articles/articleActions";
import Loading from "./loader/Loading";



const Article = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.articleReducer.article);
  const [apiOk, setApiOk] = useState(false);
  const newUrl = window.location.href.split("/");
  const lastIndexOfNewUrl = newUrl.lastIndexOf("article");
  const date = new Date(article.createdAt);
  const dateCreated = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  console.log(article.tags);

  useEffect(() => {
    dispatch(getArticleById(newUrl[lastIndexOfNewUrl + 1]))
      .then(() => {
        setApiOk(true);
      })
      .catch((er) => {
        console.log(er);
      });
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return apiOk ? (
    <>
      <Row>
        <Col>
          <Image src={BASE_URL + article.picture} fluid />
        </Col>
      </Row>
      <div className="content">
        <Row>
          <Col>
            <h1>{article.title}</h1>
            <span>Auteur : {article.author.name}</span>
            <br/>
            <span>Créé le {dateCreated}</span>
            <br/>
            <span>Tag(s) : </span>
            {article.tags.map((tag) => (
                <span key={tag.label}>{tag.label}</span>
            ))}
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col>
            <p>{article.content}</p>
          </Col>
        </Row>
        <hr/>
        <h2>Commentaires :</h2>
            {article.comments.map((comment) => (
              <Row key={comment.id}>
                <span >{comment.content}</span>
              </Row>
            ))}    
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Article;
