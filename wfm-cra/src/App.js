import React, { Component } from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import './App.2.css';
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
      this.shuffle(leaderboardOne.slice()), 
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
    const maxLeaderboardsPerPage = Math.min(this.state.leaderboards.length, 6);

    return (
      <div className="app">
        <header>
          <nav>
            <ul>
              <li><a className="title active" href="#">Today</a></li>
              {/*<li><a className="title" href="#">Planner</a></li>*/}
            </ul>
          </nav>
          <div className="toolbar title">
            <i className="icon fas fa-bell"></i>
            <i className="icon fas fa-cog"></i>
          </div>
        </header>
        <main>
          <div className={'all-leaderboards max-' + maxLeaderboardsPerPage}>
            {this.state.leaderboards.map((board, i) => {
              return this.getLeaderboard(i);
            })}
            {/* <div className="leaderboard-spacer"></div> */}
          </div>
        </main>
        <footer>
          <i className="icon schedule-icon far fa-calendar-alt"></i>
          <div className="activity-now-and-next">
            <div className="activity-now activity-calls-color">
              <span className="activity-name"><b>NOW</b>&nbsp;&nbsp;Calls</span>25 minutes remaining
              <div className="activity-progress-bar" style={{width: '80%'}}></div>
            </div>
            <div className="activity-next"><span className="activity-name"><b>NEXT</b>&nbsp;&nbsp;Emails</span>11:00 - 13:00</div>
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

    const chartValues = [2,5,10,7,3,2,4,4,4];
    
    return (
      <div className="leaderboard" key={boardIndex}>
        <div className="lb-chart">
          <Sparklines data={this.shuffle(chartValues.slice())} style={{ margin: '10px' }}>
            <SparklinesLine style={{ strokeWidth: 2, stroke: "#d1192e", fill: "none" }}/>
            {/* <SparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .45, strokeDasharray: '2, 2' }} /> */}
          </Sparklines>
        </div>
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
          case 2:
            return 'icon silver-color fas fa-trophy';
          case 3:
            return 'icon bronze-color fas fa-medal';
          default:
            return (awardIconClasses ? awardIconClasses : '');
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
