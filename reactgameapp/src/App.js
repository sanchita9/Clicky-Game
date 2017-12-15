import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Header';



class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends:[],
    score:0,
    friendCount: 12,
    gameStatus: 'begin',
    resetButtonDisplay:false,
  };

  componentWillMount(){
    console.log("will mount can't do anything here.");
  }
  // before anything renders, download friends from the radomuser.api
  componentDidMount(){
    axios
    .get("https://randomuser.me/api/", {params:{results: this.state.friendCount}})
      .then(
        // res => console.log(res.data.results);
        res => this.setState({friends:res.data.results})
      )
      .catch(err => console.log(err));   
      console.log("did mount ajax loaded");
  }
  
  // after the score has been updated, check to see if game has been won which happens 
  // when score = total possible friends
  componentDidUpdate(){
    console.log("did update, game checked if player won")
    if (this.state.score === this.state.friendCount && this.state.gameStatus === 'active'){
      alert("You won!! All friends guessed only once!");
      this.endGame();
    }
  }
  componentWillUpdate(){
      console.log("will update");
      if (this.state.gameStatus === 'begin'){         
        this.state.friends.forEach(element => {
          element.id = element.login.md5;
          element.status = 'active';
          element.font = '';
        });
        console.log(this.state.friends);      
        this.setState({gameStatus:'active'});
      } 
  }
  // function sets the state of the friend chosen to be "disabled" and randomizes the original friends array
  setDisabledCreateRandomOrder = id => {
     // refer to the current array of friends as a "nonRamdom" array, 
     const nonRandomFriends = this.state.friends;
     
     // find index of friend to be disabled, set friend to disabled
     const disabledIndex =  nonRandomFriends.findIndex(x => x.id===id);
     nonRandomFriends[disabledIndex].status='disabled';
     nonRandomFriends[disabledIndex].font='fa fa-check fa-2x';
    this.randomizeFriends(nonRandomFriends);
  }

  // function takes in friends and returns them in a random order
  randomizeFriends = (nonRandomFriends) =>{
    // create a new random array of friends by randomly splicing the nonRandom array and pushing into new random array
    const randomFriends = [];
    for (let i = this.state.friendCount; i > 0; i--) {
      let index = Math.floor(Math.random()*i);
      randomFriends.push(nonRandomFriends[index]);
      nonRandomFriends.splice(index, 1);;
    }

    // setstate of friends to new Random array
      this.setState({friends:randomFriends});    
  }

  // function "ends" game by setting the gameStatus to "gameOver"
  endGame = () => {
    if (this.state.gameStatus === "active"){
        this.setState({gameStatus:"gameOver"});
        this.setState({opacity:.6});
        this.setState({resetButtonDisplay:true});
        alert("Game Over");
    }
  }

  // set the state of the friend as "disabled" if CHOSEN (they shouldn't be picked anymore)
  // otherwise the default is "active" and it's okay to pick them
  handleSetFriendState = (id) => {
    // refer to the current array of friends as a "nonRamdom" array, 
    const myFriends = this.state.friends;
    
    // find index of friend to be disabled, if not disabled, update score and set friend to disabled
    const targetIndex =  myFriends.findIndex(x => x.id===id);
    if (myFriends[targetIndex].status==="active" && this.state.gameStatus !== "gameOver"){
      this.setState({score:this.state.score+1});
      this.setDisabledCreateRandomOrder(id);
    } else {
      // set the font of user to show incorrect choice
      // find index of inccorect friend, copy friends into edittable array to edit it 
      // and write back to friend state then end the game
      const disableIncorrectdIndex =  this.state.friends.findIndex(x => x.id===id);
      let editArray = this.state.friends;
      editArray[disableIncorrectdIndex].font = 'fa  fa-user-times fa-2x text-danger';
      this.setState({friends:editArray});
      this.endGame();
    }
};

  handleResetGame = () => {
    // reset all friends to active
      this.state.friends.forEach(element => {
        element.status = 'active';
        element.font = '';
      });
    // reset score
    this.setState({score:0});
    
    //randomize friends
    this.randomizeFriends(this.state.friends);

    // set game to active
    this.setState({gameStatus:'active'});
  }
  // Map over this.state.friends and render a FriendCard component for each friend object
  
  render() {
    console.log("render");
    // if the game is over, set the status of friend card
    let opacity = 0;
    let viewable = 'non-viewable'
    let onClick = this.handleSetFriendState
    if (this.state.gameStatus === "gameOver"){
      opacity = .5;
      viewable = 'viewable';
      onClick = '';
    }

    let display = "block"
    if (this.state.resetButtonDisplay===false){
      display = "none";
    }

    return (
      <div>
        <Jumbotron
          title="Clicky with Friends"
          instructions="click on a friend once to score a point. Click any friend twice and game ends."
          score={this.state.score}
          friendCount={this.state.friendCount} />       
        <Wrapper>
          <Row>
            <Col size="lg-12">
                {
                  this.state.friends.map(friend => (
                  <FriendCard
                    onClick={onClick}
                    id={friend.login.md5}
                    key={friend.login.md5}
                    name= {friend.name.first}
                    image={friend.picture.large}
                    opacity={opacity}
                    gameStatus = {this.state.gameStatus}
                    status = {friend.status}
                    font = {friend.font}
                    viewable = {viewable}
                  />
                ))
               }
            </Col>
          </Row>
          <Row>
            <Col size="lg-12">
                <ResetButton
                  className = 'btn mt-4'
                  btnDisplay={display}
                  onClick={this.handleResetGame}
                  type="danger"> 
                  Reset Game
                </ResetButton>
            </Col>
          </Row>
        </Wrapper>
      </div>
    );
  }
}

export default App;