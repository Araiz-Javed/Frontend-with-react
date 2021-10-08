import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import FormComponent from "./FormComponent";
import { Loading } from "./LoadingComponent";

function changeDateFormate(date) {
  let temp = date.split("T");
  temp = temp[0].split("-");

  if (temp[1] === "01") temp[1] = "Jan";
  else if (temp[1] === "02") temp[1] = "Feb";
  else if (temp[1] === "03") temp[1] = "Mar";
  else if (temp[1] === "04") temp[1] = "Apr";
  else if (temp[1] === "=05") temp[1] = "May";
  else if (temp[1] === "06") temp[1] = "June";
  else if (temp[1] === "07") temp[1] = "July";
  else if (temp[1] === "08") temp[1] = "Aug";
  else if (temp[1] === "09") temp[1] = "Sep";
  else if (temp[1] === "10") temp[1] = "Oct";
  else if (temp[1] === "11") temp[1] = "Nov";
  else if (temp[1] === "12") temp[1] = "Dec";

  const _temp = [];
  let i;

  for (i = 0; i < temp.length - 1; ++i)
    if (i === 0) _temp[i] = temp[i + 1] + " ";
    else _temp[i] = temp[i + 1] + ",";

  _temp[i] = temp[0];

  return _temp;
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText> {dish.description} </CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    return comments.map((comment) => {
      return (
        <div>
          <ul className="list-unstyled">
            <li>{comment.comment}</li>
            <br />
            <li>
              -- {comment.author} ,{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
            </li>
          </ul>
        </div>
      );
    });
  } else {
    return <div></div>;
  }
}

const Dishdetail = (props) => {
  const dish = props;
  console.log("called", dish);
    if (props.isLoading) {
      return(
          <div className="container">
              <div className="row">            
                  <Loading />
              </div>
          </div>
      );
  }
  else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if (dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/Menu">menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div class="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4 style={{ fontFamily: "sans-serif" }}>Comments</h4>
            <RenderComments comments={props.comments} />
            <FormComponent dishId={props.dish.id} addCommnts={props.addComment} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Dishdetail;
