import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import ActionGrade from 'material-ui/lib/svg-icons/action/grade';
import ActionInfo from 'material-ui/lib/svg-icons/action/info';
import ContentInbox from 'material-ui/lib/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/lib/svg-icons/content/drafts';
import ContentSend from 'material-ui/lib/svg-icons/content/send';
import Divider from 'material-ui/lib/divider';

class GameListItemComponent extends React.Component {
  selectGame() {
    this.props.onClick(this.props.game);
  }

  gameOpen() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === null ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameAlreadyJoined() {
    return !this.gameFinished() &&
      this.props.game.winner === null &&
      (this.props.game.playerOne === this.props.currentPlayer ||
      this.props.game.playerTwo === this.props.currentPlayer);
  }

  gameFull() {
    return !this.gameOpen();
  }

  gameFinished() {
    return this.props.game.winner !== null;
  }

  playerOrYou(player) {
    if (player === this.props.currentPlayer) {
      return "You";
    }
    return player;
  }

  theWinner() {
    if (this.gameFinished()) {
      if (this.props.game.winner === "draw") {
        return `Draw between ${this.playerOrYou(this.props.game.playerOne)} and ${this.playerOrYou(this.props.game.playerTwo)}`;
      }
      return `${this.playerOrYou(this.props.game.winner)} won`;
    } else {
      return "Nobody";
    }
  }

  render() {
    return (
    <MobileTearSheet>
      <List>
        Game by {this.props.game.playerOne}

        { this.gameOpen() && !this.gameAlreadyJoined() &&
          <button onClick={this.selectGame.bind(this)}>Join Game</button> }

        { this.gameOpen() && this.gameAlreadyJoined() &&
          <button onClick={this.selectGame.bind(this)}>Resume Game</button> }

        { !this.gameFinished() && this.gameFull() &&
          <span>(Full)</span> }

        { this.gameFinished() &&
          <span>({this.theWinner()})</span> }
      </List>
    </MobileTearSheet>
    );
  }
}

export default GameListItemComponent;
