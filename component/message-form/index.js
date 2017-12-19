import './RichEditor.css';

import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import {connect} from 'react-redux';
import {Editor, EditorState, RichUtils, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as util from '../../lib/util.js';

let emptyState = {
  recipientEmail: '',
  recipientEmailDirty: false,
  recipientEmailError: 'Email is required',
  subject: '',
  hasSubject: false,
  subjectDirty: false,
  content: '',
  hasContent: false,
  contentDirty: false,
  contentError: 'Content is required',
  submitted: false,
};

class MessageForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // jshint ignore:start
      ...emptyState,
      // jshint ignore:end
      editorState: EditorState.createEmpty(),
      senderEmail: this.props.clientProfile.email,
      senderFirstName: this.props.clientProfile.firstName,
      senderLastName: this.props.clientProfile.lastName,
      clientProfile: this.props.clientProfile,
    };
    
    // jshint ignore:start
    this.emptyState = {...this.state};
    // jshint ignore:end
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateChange = this.validateChange.bind(this);
    
    this.onTab = this._onTab.bind(this);
    this.focus = () => this.editor.focus();
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
  }

  validateChange(name, value) {
    switch (name) {
      case 'recipientEmail':
        if (!validator.isEmail(value)) {
          return  'Please provide a valid email.';
        }
        return null;
      default:
        return null;
    }
  }
  
  handleChange(e) {
    let {name, value} = e.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.validateChange(name, value),
    });
  }

  onChange(editorState) {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      hasContent: editorState.getCurrentContent().hasText(),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    let {recipientEmailError, hasContent} = this.state;
    if (!recipientEmailError && hasContent) {
      this.props.onComplete(this.state);
      this.setState(this.emptyState);
    } else {
      this.setState({
        recipientEmailDirty: true,
        subjectDirty: true,
        contentDirty: true,
        submitted: true,
      });
    }
  }
  
  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  
  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }
  
  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }
  
  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const {editorState} = this.state;
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    return (
      <form 
        onSubmit={this.handleSubmit}
        className='message-form'>
        
        <div>
          {util.renderIf(this.state.recipientEmailDirty, 
            <p className='alert'>{this.state.recipientEmailError}</p>)}
          <input
            className={util.renderIf(
              this.state.recipientEmailDirty && this.state.recipientEmailError, 'invalid')}
            name='recipientEmail'
            placeholder='recipient email'
            type='email'
            value={this.state.recipientEmail}
            onChange={this.handleChange}
          />
        </div>

        <div>
          <input
            name='subject'
            placeholder='message subject'
            type='text'
            value={this.state.subject}
            onChange={this.handleChange}
          />
        </div>
        
        {util.renderIf(this.state.contentDirty && !this.state.hasContent, 
          <p className='alert'>{this.state.contentError}</p>)} 
        
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              ref={(ref) => this.editor = ref}
              spellCheck={true}
            />
          </div>
        </div>

        <button className='button' type='submit'>Send Message</button>
      </form>
    )
  }
}

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote';
    default: return null;
  }
}
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
];
const BlockStyleControls = (props) => {
  const {editorState} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();
  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};
var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];
const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      )}
    </div>
  );
};


let mapStateToProps = (state) => ({
  clientProfile: state.clientProfile,
});

export default connect(mapStateToProps)(MessageForm);
