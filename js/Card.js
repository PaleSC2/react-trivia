import React from 'react';
import * as audio from './audio';

const Front = (question = '', options = [], onClick) => (
  <div>
    <p>{question}</p>
    <ol>
      {options.map((option, i) => (
        <li
          key={i}
          data-option={i}
          onClick={() => onClick(i)}
          style={{ cursor: 'pointer' }}
        >
          {option}
        </li>
      ))}
    </ol>
  </div>
);

class CardText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        index: -1
    };
  }

    onOptionClick(i) {
        this.setState({index: i})
        this.props.handleTurn(i === this.props.answer, this.props.points)
    }

  render() {
    return this.props.isQuestion
      ? Front(this.props.question, this.props.options, this.onOptionClick.bind(this))
      : <p style={{color: this.state.index === this.props.answer ? 'green' : 'red'}}>{this.props.options[this.props.answer]}</p>;
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'points', completed: false };

  }

  clickHandler(event) {
    if (this.state.view === 'points') {
      audio.play('flip');
      setTimeout(() => {
      }, 1800);
      this.setState({ view: 'question', flipping: true });
    } else if (this.state.view === 'question') {
      this.setState({ view: 'answer' });
    } else {
      audio.play('flipBack');
      this.setState({ view: 'points', completed: true, flipping: true });
      this.props.checkWinner()
    }
  }

  getLabelBack() {
    const question = `<p>${this.props.question.question}</p>`;
    const options = `<ul>${(this.props.question.options &&
      this.props.question.options
        .map(
          (option, i) =>
            `<button>
          ${i + 1}. ${option}
        </button>`
        )
        .join('')) ||
      ''}`;
    return {
      __html:
        this.state.view === 'question'
          ? question + options
          : this.props.question.answer
    };
  }

  transitionEndHandler(event) {
    if (event.propertyName === 'width') {
      this.setState({ flipping: false });
    }
  }

  render() {
    let style = {
        width: this.props.width + 'px',
        height: this.props.height + 'px',
        transform:
          'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)',
        WebkitTransform:
          'translate3d(' + this.props.left + 'px,' + this.props.top + 'px,0)'
      },
      front = this.state.completed ? (
        <img src="../assets/img/von_humboldt.png" />
      ) : (
        <span className="points">{this.props.question.points}</span>
      ),
      className = 'flipper';

    if (this.state.view !== 'points') {
      className = className + ' flipped';
    }
    if (this.state.flipping) {
      className = className + ' flipping';
    }
    return (
      <div
        style={style}
        className={className}
        onClick={e => console.log(this.state.completed) || this.state.completed? e.preventDefault : this.clickHandler.bind(this)()}
        onTransitionEnd={this.transitionEndHandler.bind(this)}
      >
        <div className="card">
            test:{this.state.test}
          <div className="front">{front}</div>
          <div className="back">
            <CardText
              isQuestion={this.state.view === 'question'}
              question={this.props.question.question}
              answer={this.props.question.answer}
              points={this.props.question.points ||0}
              options={this.props.question.options || []}
              handleTurn={this.props.handleTurn}
            />
            <img src="../assets/img/von_humboldt.png" />
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
