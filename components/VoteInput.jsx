import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'lib/utils/theme'
import FaIcon from 'lib/components/fa_icon'
import decorate from 'lib/utils/decorate'
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'

export class VoteInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    cord: PropTypes.object,
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    light: PropTypes.bool,
    reload: PropTypes.func,
    users_vote: PropTypes.number,
    votes: PropTypes.number,
  }

  static defaultProps = {
    votes: 0,
    users_vote: 0,
    disabled: false,
  }

  componentDidMount() {
    this.users_vote = this.props.users_vote
  }

  componentWillReceiveProps(props) {
    this.users_vote = props.users_vote
  }
  @observable users_vote = 0
  vote(path) {
    const { id, cord } = this.props
    cord.perform(path, { ids: id }).then(() => {
      this.props.reload()
    })
  }
  @computed get votes() { return this.props.votes - this.props.users_vote }
  @computed get total_votes() { return this.votes + this.users_vote }

  handleVote = () => {
    if (this.users_vote === 1) {
      this.users_vote = 0
      this.vote(`unvote`)
    } else {
      this.users_vote = 1
      this.vote(`vote_up`)
    }
  }


  @computed get className() {
    let className = `vote-input`
    if (this.users_vote !== 0) className += ` voted-for`
    if (this.props.className) className += ` ${this.props.className}`
    return className
  }

  render() {
    return (
      <div className={this.className}>

        <a
          title="Vote Up"
          className="vote-up voted-for"
          onClick={this.props.disabled ? null : this.handleVote}
        >
          <FaIcon
            icon="hat-heart"
            color={this.users_vote === 1 ? `orange` : this.props.light ? `white` : `black`}
            hoverColor={this.props.disabled ? this.users_vote === 1 ? `orange` : `#777` : `#777`}
            size={2}
          />
        </a>
        <div className="vote-input__votes">{this.total_votes}</div>
      </div>
    )
  }

}
export default decorate(
  styled`
    width: 20px;
    text-align: center;
    font-weight: 800;
    font-size: 0.8em;
    color: ${t(`lightText`)};
    .vote-up, .vote-down {
      border-bottom: 0;
    }
    img {
      width: 20px;
    }
  }}
  `,
  observer,
  VoteInput
)
