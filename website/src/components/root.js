/* global GibberishAES */

import React from 'react';
import PropTypes from 'prop-types';
import {withRadiumStarter, Input, TextArea, Button} from 'radium-starter';

@withRadiumStarter
export class Root extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
    styles: PropTypes.object.isRequired
  };

  state = {
    input: '',
    password: ''
  };

  encrypt() {
    let result = GibberishAES.enc(this.state.input, this.state.password);
    result = result.replace(/\n/g, '');
    this.setState({input: result});
  }

  decrypt() {
    const result = GibberishAES.dec(this.state.input, this.state.password);
    this.setState({input: result});
  }

  render() {
    const {theme: t, styles: s} = this.props;

    return (
      <div
        style={{
          padding: '13px 20px',
          [`@media (max-width: ${t.smallBreakpoint})`]: {
            padding: '10px'
          }
        }}
      >
        <h3 style={{color: t.primaryColor, marginTop: 0, marginBottom: 0}}>aes256.org</h3>
        <h5
          style={{
            ...s.subheading,
            marginTop: 0,
            marginBottom: '3rem',
            [`@media (max-width: ${t.smallBreakpoint})`]: {
              marginBottom: '1rem'
            }
          }}
        >
          Offline AES 256 encryption
        </h5>
        <div
          style={{
            width: '600px',
            margin: '0 auto',
            [`@media (max-width: ${t.smallBreakpoint})`]: {
              width: '300px'
            }
          }}
        >
          <div style={{marginBottom: '1rem'}}>
            <TextArea
              onChange={e => {
                this.setState({input: e.target.value});
              }}
              value={this.state.input}
              placeholder="Input"
              spellCheck="false"
              rsLarge
              autoFocus
              style={{width: '100%', height: '320px'}}
            />
          </div>
          <div style={{marginBottom: '1.4rem'}}>
            <Input
              type="password"
              onChange={e => {
                this.setState({password: e.target.value});
              }}
              value={this.state.password}
              placeholder="Password"
              rsLarge
              style={{width: '100%'}}
            />
          </div>
          <div>
            <Button
              onClick={() => this.encrypt()}
              disabled={!(this.state.input && this.state.password)}
              rsPrimary
              rsLarge
            >
              Encrypt
            </Button>
            <span style={{marginLeft: '.75rem', marginRight: '.75rem'}}>or</span>
            <Button
              onClick={() => this.decrypt()}
              disabled={!(this.state.input && this.state.password)}
              rsAccent
              rsLarge
            >
              Decrypt
            </Button>
          </div>
        </div>
        <div style={{marginTop: '3.5rem', textAlign: 'center'}}>
          <a href="https://github.com/mvila/aes256.org">
            <img
              src="/images/github-mark-dark-mode-v1.immutable.svg"
              alt="GitHub repository"
              style={{
                width: '32.579px',
                height: '31.775px'
              }}
            />
          </a>
        </div>
      </div>
    );
  }
}

export default Root;
