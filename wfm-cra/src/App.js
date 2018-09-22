import React, { Component } from 'react';
import './App.css';
import '../node_modules/normalize.css/normalize.css'

class App extends Component {
  constructor(props) {
    super(props);
  
    const leaderboardOne = [
      {
        name: "Beth Smith",
        activity: "Training"
      },
      {
        name: "Joe Bloggs",
        activity: "Web Chat"
      },
      {
        name: "Bob Roberts",
        activity: "Idle"
      },
      {
        name: "Tom Thumb",
        awardIconClasses: "icon green-color fas fa-certificate",
        activity: "Training"
      },
      {
        name: "Jenny Jones",
        activity: "Idle"
      },
      {
        name: "Clara Clark",
        activity: "Idle"
      },
      {
        name: "Ben Benson",
        activity: "Idle"
      },
      {
        name: "Abby Apple",
        activity: "Idle"
      }
    ];

    const leaderboards = [
      leaderboardOne, 
      this.shuffle(leaderboardOne.slice()),
      this.shuffle(leaderboardOne.slice())
    ];

    const personalLBEntries = [
      {
        3: {
          name: "You",
          activity: "Calls",
          tip: "Nice work! Reduce your call handling time to jump another place",
          highlighted: true
        }
      },
      {
        1: {
          name: "You",
          activity: "Calls",
          tip: "Nice work! Reduce your call handling time to jump another place",
          highlighted: true
        }
      },
      {
        4: {
          name: "You",
          activity: "Calls",
          tip: "Nice work! Reduce your call handling time to jump another place",
          highlighted: true
        }
      }
    ];

    personalLBEntries.forEach((board, boardIndex) => {
      Object.keys(board).forEach(position => {
        leaderboards[boardIndex].splice(position - 1, 0, board[position]);
      });
    });

    this.state = {
      leaderboards
    };

    // this.getLeaderboard = this.getLeaderboard.bind(this);
  }
  
  render() {
    const maxLeaderboardsPerPage = Math.min(this.state.leaderboards.length, 5);

    return (
      <div className="app">
        <header>
          <nav>
            <ul>
              <li><a className="title" href="#">Today</a></li>
            </ul>
          </nav>
        </header>
        <main>
          <div className={'all-leaderboards max-' + maxLeaderboardsPerPage}>
            {this.state.leaderboards.map((board, i) => {
              return this.getLeaderboard(i);
            })}
          </div>
        </main>
        <footer>
          <i className="icon schedule-icon far fa-calendar-alt"></i>
          <div className="activity-now-and-next">
            <div className="activity-now activity-calls-color" style={{width: '80%'}}><span className="activity-name">Calls</span>25 minutes remaining</div>
            <div className="activity-next"><span className="activity-name">Emails</span>11:00 - 13:00</div>
          </div>
        </footer>
      </div>
    );
  }

  getLeaderboard(boardIndex) {
    const boardTitles = [
      'Adherance',
      'Talk Time',
      'Handling Time'
    ];
    
    return (
      <div className="leaderboard" key={boardIndex}>
        <div className="lb-chart">Chart</div>
        <h2 className="lb-title">{boardTitles[boardIndex]}</h2>
        <div className="lb-list">
          {this.getLeaderboardEntries(boardIndex)}
        </div>
      </div>
    );
  }

  getLeaderboardEntries(boardIndex) {
    return this.state.leaderboards[boardIndex].map((entry, index) => {
      const position = index + 1;
      const lbEntryClass = 'lb-entry' + (entry.highlighted ? ' highlighted' : '');
      const lbAwardClass = ((position, awardIconClasses) => {
        switch(position) {
          case 1:
            return 'icon gold-color fas fa-trophy';
            break;
          case 2:
            return 'icon silver-color fas fa-trophy';
            break;
          case 3:
            return 'icon bronze-color fas fa-medal';
            break;
          default:
            return (awardIconClasses ? awardIconClasses : '');
            break;
        }
      })(position, entry.awardIconClasses);

      return (
        <div className={lbEntryClass} key={position}>
          <div className="lb-position">{position}</div>
          <div className="lb-award">
            <i className={lbAwardClass}></i>
          </div>
          <div className="lb-details">
            <div className="lb-name">{entry.name}</div>
            <div className="lb-activity">{entry.activity}</div>
            {entry.tip ? <div className="lb-tip">{entry.tip}</div> : null}
          </div>
        </div>
      );
    });
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}

export default App;
