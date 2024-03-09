import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        
        const categories = response.data.reduce((acc, product) => {
          if (!acc.includes(product.category)) {
            acc.push(product.category);
          }
          return acc;
        }, []);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <Container>
      <Form.Group className="mt-5 mb-4" controlId="categoryFilter">
        <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Row>
        {filteredProducts.slice(0, 30).map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <div className="card-image-container">
                  <Card.Img src={product.image} className="card-image" />
                </div>
                <div className="card-body">
                <Card.Body>
                  <Card.Title className="card-text">{product.title}</Card.Title>
                  <Card.Text className="card-text">${product.price}</Card.Text>
                </Card.Body>
                </div>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
