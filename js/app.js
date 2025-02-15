import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card';
import Headers from './Headers';
import request from './request';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
let routeHistory = null;
function navigateTo(path) {
  if(routeHistory !== null) {
    routeHistory.push(path);
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('init');
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight  - 100,
      data: {},
      player1: '',
      player2: '',
      player1Points: 0,
      player2Points: 0,
      turn: 1,
      p1Turn: true,
      winner:''
    };
    this.Game = this.Game.bind(this);
    this.Index = this.Index.bind(this);
    this.Winners = this.Winners.bind(this);
    this.handlePlayer1Change = this.handlePlayer1Change.bind(this);
    this.handlePlayer2Change = this.handlePlayer2Change.bind(this);
  }

  handleResize(event) {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight - 100
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
    let rows = 0;
    data.game.forEach(category => {
      if (category.questions.length > rows) {
        rows = category.questions.length;
      }
    });
    document.title = data.title;
    let numberOfQuestions = 0;
    data.game.forEach(
      category => (numberOfQuestions += category.questions.length)
    );
    this.setState({
      data: data,
      rows: rows,
      cols: data.game.length,
      questionsRemaining: numberOfQuestions
    });
  }

  handleTurn(isCorrect, points) {
    if (isCorrect) {
      console.log('!p1Turn', !p1Turn)
      if (this.state.p1Turn) {
        console.log('adding to p1')
        this.setState({ player1Points: this.state.player1Points + points });
      } else {
        console.log('adding to p2')
        this.setState({ player2Points: this.state.player2Points + points });
      }
    }
    console.log('turn', this.state.turn);
    const p1Turn = (this.state.turn % 2) === 0;
    const turn = this.state.turn + 1;
    this.setState({ turn, p1Turn, questionsRemaining: this.state.questionsRemaining - 1});
  }

  checkWinner(history) {
    return () => {
    if (this.state.questionsRemaining === 0) {
      this.state.finished = true;
      if (this.state.player1Points > this.state.player2Points) {
        this.setState({winner: this.state.player1})
      }else if (this.state.player1Points < this.state.player2Points) {
        this.setState({winner: this.state.player2})
      } else {
        this.setState({winner: 'No Winner'})

      }
      alert(this.state.winner )
      //history.push('/winner/');
    }}
  }

  Game(history) {
    const labels = this.state.data;
    let headerHeight = this.state.windowWidth > 640 ? 55 : 25,
      cardWidth = this.state.windowWidth / this.state.cols,
      cardHeight = (this.state.windowHeight - headerHeight) / this.state.rows,
      cards = [];
    if (this.state.data.game) {
      this.state.data.game.forEach((category, categoryIndex) => {
        let left = categoryIndex * cardWidth;
        category.questions.forEach((question, questionIndex) => {
          cards.push(
            <Card
              left={left}
              top={questionIndex * cardHeight + headerHeight}
              height={cardHeight}
              width={cardWidth}
              question={question}
              key={categoryIndex + '-' + questionIndex}
              handleTurn={this.handleTurn.bind(this)}
              checkWinner={this.checkWinner(history).bind(this)}

            />
          );
        });
      });
    }

    const playerStyle = {
      width: this.state.windowWidth / 3
    }

    return (
      <div>
        <div className="headers">
          <span style={playerStyle} className="header player">
            {`${this.state.player1} |  `}
            <span className="total-points">{`${this.state.player1Points} ${labels.points}`}</span>
          </span>
          <span style={playerStyle} className="header player">
            {`${this.state.player2} |  `}
            <span className="total-points">{`${this.state.player2Points} ${labels.points}`}</span>
          </span>
          <span style={playerStyle} className="header player">{`${
            this.state.p1Turn ? this.state.player1 : this.state.player2
            } ${labels.turn}`}</span>
        </div>
        <Headers data={this.state.data.game} headerWidth={cardWidth} />
        {cards}
      </div>
    );
  }

  handlePlayer1Change(event) {
    this.setState({ player1: event.target.value });
  }

  handlePlayer2Change(event) {
    this.setState({ player2: event.target.value });
  }

  Index() {

    console.log('Index!');
    const labels = this.state.data;
    return (
      <div className="bg">
      <div className="row d-flex justify-content-center content text-center">
        <div className="col-md-6">
          <main role="main" className="inner cover">
            <h1 className="cover-heading" style={{textShadow: "-1px 0 black, 0 3px black, 1px 0 black, 0 -1px black"}}>{labels.title}</h1>
            <p className="lead" style={{textShadow: "-1px 0 black, 0 3px black, 1px 0 black, 0 -1px black"}}>{labels.description}</p>
            <div className="the-input input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  {labels.player1}
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.player1}
                onChange={this.handlePlayer1Change}
              />
            </div>
            <div className="the-input input-group input-group-lg">
              <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-lg">
                  {labels.player2}
                </span>
              </div>
              <input
                type="text"
                className="form-control"
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
                value={this.state.player2}
                onChange={this.handlePlayer2Change}
              />
            </div>
            <p className="lead">
              <Link className="btn btn-lg btn-secondary" to="/game/">
                {labels.button}
              </Link>
            </p>
          </main>
        </div>
      </div></div>
    );
  }

  Players() {
    return 'Players';
  }

  Winners() {
    const labels = this.state.data;
    return (<div className="row d-flex justify-content-center content text-center">
      <div className="col-md-6">
        <main role="main" className="inner cover" style={{paddingTop: "100px"}}>
          <h1 className="cover-heading">{this.state.winner} {labels.winnerMessage}</h1>
          <p className="lead">
            <Link className="btn btn-lg btn-secondary" to="/index/">
              {labels.restartButton}
            </Link>
          </p>
        </main>
      </div>
      <div className="col-md-6">
        <main role="main" className="inner cover">
          <img src="../assets/img/alex.jpeg" style={{width: "70%"}}/>
        </main>
      </div>
    </div>)
  }
  /*
    // Traditional XHR implementation. Getting questions from data.json using XHR. Will run into cross origin issues in some browsers
    // if loading index.html from the local file system (using the file:// protocol) -->
    componentDidMount() {
    console.log('AAAA');
        window.addEventListener('resize', this.handleResize.bind(this));
        request({url: "data.json"}).then(result => {
            console.log('AABBBA');

            let data = JSON.parse(result),
                rows = 0;
            data.forEach(category => {
                if (category.questions.length > rows) {
                    rows = category.questions.length;
                }
            });
            this.setState({data: data, rows: rows, cols: data.length});
        });
    }
    */

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  render() {
    console.log('render', Router, process.env.PUBLIC_URL);
    return (
      <Router basename="react-trivia">
        <div>
          <Route path="/index.html" exact component={this.Index} />
          <Route path="/players/" component={this.Players} />
          <Route path="/game/" render={({ history}) => (
           this.Game(history)
          )} />
          <Route path="/winners/" component={this.Winners} />
        </div>
      </Router>
    );
  }
}
console.log('b4 render');
ReactDOM.render(<App />, document.getElementById('app'));
console.log('after render');
