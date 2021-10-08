import { Component } from "react";
import {
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Col,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { LocalForm, Control, Errors } from "react-redux-form";
const required = (val) => val && val.length;
const minLength = (len) => (val) => !val || val.length >= len;
const maxLength = (len) => (val) => !val || val.length <= len;

class FormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.togalModal = this.togalModal.bind(this);
  }

  togalModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmite(values) {
    this.togalModal();
    console.log(values);
    this.props.addCommnts(this.props.dishId, values.select,values.author,values.message)
  }
  render() {
    return (
      <>
        <Nav>
          <NavItem>
            <Button color="outline-secondary" onClick={this.togalModal}>
              <span>
                <FontAwesomeIcon icon={faPencilAlt} /> Submit Comment
              </span>
            </Button>
          </NavItem>
        </Nav>

        <Modal isOpen={this.state.isModalOpen} toggle={this.togalModal}>
          <ModalHeader toggl={this.togalModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmite(values)}>
              <FormGroup>
                <Label htmlFor="select">Rating</Label>

                <Control.select
                  model=".select"
                  type="number"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </FormGroup>
              <FormGroup md={10}>
                <Label htmlFor="author">You Name</Label>
                <Control.text
                  model=".author"
                  className="form-control"
                  placeholder="Your Name"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Min length must be 2",
                    minLength: "Min length must be 2",
                    maxLength: "Max length should be 15",
                  }}
                ></Errors>
              </FormGroup>

              <FormGroup md={10}>
                <Label htmlFor="message">Comment</Label>
                <Control.textarea
                  model=".message"
                  placeholder="type your comments"
                  rows="6"
                  className="form-control"
                ></Control.textarea>
              </FormGroup>
              <Row className="form-group">
                <Col md={10}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default FormComponent;
