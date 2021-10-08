import React, { Component } from "react";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import HomeComponent from "./HomeComponent";
import About from "./AboutComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment,fetchDishes } from "../redux/actionCreater";
import {actions} from 'react-redux-form'

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes:()=>{dispatch(fetchDishes())},
    resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
});

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
    Comment: state.comments,
  };
};
class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectedDish: null,
    // };
    // this.props.fetchDishes();
  }

  // onDishSelect(dishId) {
  //   this.setState({ selectedDish: dishId });
  // }

  componentDidMount(){
    this.props.fetchDishes();
    console.log("1111111111",this.props.dishes.dishes);
  }

  render() {
    const HomePage = () => {
      console.log("adsadsad",this.props.dishes.dishes);
      return (
        <HomeComponent
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotions={
            this.props.promotions.filter((promo) => promo.featured)[0]
          }
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <Dishdetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.Comment.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    const aboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/Aboutus" component={aboutPage} />
          <Route
            exact
            path="/Menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/Menu/:dishId" component={DishWithId} />
          <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
          <Redirect to="/home" component={HomePage} />
          <Redirect to="/Aboutus" component={aboutPage} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
