import React, {useContext, useEffect} from "react";
import { ListGroup, Container, Row, Col, Card } from "react-bootstrap";
import { titleName } from '../../../Contexts/TitleCont';


const Settings = () => {

  // Component States
  const { title, changeTitle } = useContext(titleName);


  // useEffect
  useEffect(() => {
    changeTitle("Settings");
  }, [changeTitle]);


  return (
    <div className="settings mt-5">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col md={4} className="mx-auto">
            <Card className="shadow">
              <Card.Body>
                <h3 className="text-center mb-4">{title}</h3>
                <ListGroup variant="flush">
                  <ListGroup.Item>Account Settings</ListGroup.Item>
                  <ListGroup.Item>Privacy Settings</ListGroup.Item>
                </ListGroup>
                <div className="text-center mt-4">
                  <span className="badge bg-secondary">App Version: Beta</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};



export default Settings;