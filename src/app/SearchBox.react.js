import Component from 'react-pure-render/component';
import font from './styles/Font';
import Icon from './atoms/Icon.react';
import Input from './atoms/Input.react';
import Logo from './atoms/Logo.react';
import MediaQuery from 'react-responsive';
import Radium from 'radium';
import React, {PropTypes as RPT} from 'react';
import ReactDOM from 'react-dom';
import spaces from './styles/Spaces';
import nodesStyles from './styles/Nodes';
import {breakPoints} from './styles/MediaQueries';
import * as colors from './styles/Colors'

@Radium
export default class SearchBox extends Component {

  static propTypes = {
    children: RPT.any,
    nodeOnClick: RPT.func.isRequired,
    searchAtoms: RPT.func.isRequired,
    searchedText: RPT.string,
    selectedAtom: RPT.string,
    toggleSidebar: RPT.func.isRequired,
  }

  render() {
    const {children, searchAtoms, selectedAtom, searchedText, toggleSidebar} = this.props

    return (
      <div style={styles.wrapper}>
        <Logo />
        <MediaQuery maxWidth={breakPoints.large}>
          <Icon
            color={colors.GRAY_BRIGHT}
            kind="chevron-left"
            onClick={toggleSidebar.bind(this)}
            size={14}
            style={styles.closeSidebar}
          />
        </MediaQuery>
        {children &&
          <div style={styles.children}>{children}</div>
        }
        <div style={styles.search.group}>
          <Input
            inheritedStyles={styles.search.input}
            kind="inputSearch"
            onChange={({target: {value}}) => searchAtoms(value)}
            placeholder="Search for components"
            ref="searchbox"
            type="text"
            value={searchedText}
          />
          {this.renderSearchIcon()}
        </div>
        <div
          onClick={this.handleClick.bind(this)}
          style={[
            styles.all,
            nodesStyles.link,
            nodesStyles.link.overview,
            !selectedAtom && nodesStyles.sidebarLinkActive
          ]}
        >
          <Icon
            color={colors.BLUE}
            kind='overview'
            size={14}
            style={styles.overviewIcon}
          />
            All components
        </div>
      </div>
    );
  }

  clearText() {
    const {searchAtoms} = this.props

    searchAtoms('')
    ReactDOM.findDOMNode(this.refs.searchbox).focus()
  }

  handleClick() {
    const {nodeOnClick, toggleSidebar} = this.props;

    nodeOnClick(null)
    toggleSidebar()
  }

  renderSearchIcon() {
    const {searchedText} = this.props

    if (searchedText)
      return (
        <Icon
          color={colors.BLUE}
          kind='close'
          onClick={() => this.clearText('')}
          size={18}
          wrapperStyle={[styles.search.icon, styles.search.clear]}
        />
      )

    return (
      <Icon
        color={colors.BLUE}
        kind='search'
        size={18}
        wrapperStyle={styles.search.icon}
      />
    )
  }
}

const styles = {
  all: {
    marginTop: spaces.small
  },

  overviewIcon: {
    position: 'absolute',
    left: '8px',
    top: '10px'
  },

  search: {
    clear: {
      ':hover': {
        cursor: 'pointer'
      }
    },
    group: {
      paddingTop: '8px',
      position: 'relative'
    },
    input: {
      padding: '10px 35px 10px 10px'
    },
    icon: {
      position: 'absolute',
      top: '19px',
      right: '10px'
    }
  },

  wrapper: {
    flex: '0 0 auto',
    padding: spaces.normal,
    borderBottom: `1px solid ${colors.GRAY_DARKER}`,
    position: 'relative'
  },

  logo: {
    maxWidth: '120px'
  },

  closeSidebar: {
    position: 'absolute',
    top: '30px',
    right: '18px',
    ':hover': {
      cursor: 'pointer'
    }
  },

  children: {
    ...font,
    marginTop: '8px'
  }
}
