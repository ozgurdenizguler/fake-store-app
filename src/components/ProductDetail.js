import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ProductDetail.css";
import { API_URL } from "../apiConfig";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} style={{ color: "#ffc107" }} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon icon={faStar} key={i} style={{ color: "#e4e5e9" }} />
        );
      }
    }
    return stars;
  };

  return (
    <Container className="product-detail-container mt-5">
      {product && (
        <Row>
          <Col md={6}>
            <Card>
              <Card.Img
                variant="top"
                src={product.image}
                className="product-detail-image"
              />
            </Card>
          </Col>
          <Col md={6} className="product-detail-info">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>
              Ratings: {renderStars(product.rating.rate)} (
              {product.rating.count} reviews)
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetail;
