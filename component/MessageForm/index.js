import './RichEditor.css';

import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';
import draftToHtml from 'draftjs-to-html';
import { Editor, EditorState, RichUtils, convertToRaw, ContentState } from 'draft-js';

const emptyState = {
  editorState: EditorState.createEmpty(),
  recipientEmail: '',
  recipientEmailDirty: false,
  recipientEmailError: 'Email is required',
  subject: '',
  subjectDirty: false,
  content: '',
  hasContent: false,
  contentDirty: false,
  contentError: 'Content is required',
  submitted: false
};

function MessageForm(props) {
  const {
    profile,
    onComplete
  } = props;

  const [formState, setFormState] = useState(emptyState);

  const validateChange = (name, value) => {
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

  const handleChange = e => {
    let { name, value } = e.target;

    setFormState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.validateChange(name, value),
    });
  }

  const onChange = editorState => {
    setFormState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      hasContent: editorState.getCurrentContent().hasText(),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();

    let { recipientEmailError, hasContent } = this.state;

    if (!recipientEmailError && hasContent) {
      onComplete(formState);
      setFormState(emptyState);
    } else {
      setFormState({
        ...formState,
        submitted: true,
        subjectDirty: true,
        contentDirty: true,
        recipientEmailDirty: true
      });
    }
  }
  
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return true;
    }

    return false;
  }
  
  const toggleBlockType = blockType => {
    onChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  }
  
  const toggleInlineStyle = inlineStyle => {
    onChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  }

  const {
    editorState,
    recipientEmail,
    recipientEmailDirty,
    recipientEmailError,
    subject,
    hasContent,
    contentDirty,
    contentError
  } = formState;

  const editor = useRef(null);

  let className = 'RichEditor-editor';

  var contentState = editorState.getCurrentContent();

  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== 'unstyled') {
      className += ' RichEditor-hidePlaceholder';
    }
  }

  return (
    <form 
      onSubmit={ handleSubmit }
      className='message-form'>
      
      <div>
        {recipientEmailDirty && 
          <p className='alert'>{ recipientEmailError }</p>
        }
        <input
          className={ recipientEmailDirty && recipientEmailError ? 'invalid' : null }
          type='email'
          name='recipientEmail'
          placeholder='recipient email'
          value={ recipientEmail }
          onChange={ handleChange }
        />
      </div>

      <div>
        <input
          type='text'
          name='subject'
          placeholder='message subject'
          value={ subject }
          onChange={ handleChange }
        />
      </div>
      
      {contentDirty && !hasContent &&
        <p className='alert'>{ contentError }</p>
      } 
      
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={ editorState }
          onToggle={ toggleBlockType }
        />
        <InlineStyleControls
          editorState={ editorState }
          onToggle={ toggleInlineStyle }
        />
        <div className={ className } onClick={ focus }>
          <Editor
            blockStyleFn={ getBlockStyle }
            customStyleMap={ styleMap }
            editorState={ editorState }
            handleKeyCommand={ handleKeyCommand }
            onChange={ onChange }
            ref={ ref => this.editor = ref }
            spellCheck={ true }
          />
        </div>
      </div>

      <button className='button' type='submit'>Send Message</button>
    </form>
  )
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
  constructor(props) {
    super(props);

    let { style } = this.props;

    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(style);
    };
  }
  render() {
    let { label } = this.props;
    let className = 'RichEditor-styleButton';

    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <span className={ className } onMouseDown={ this.onToggle }>
        { label }
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={ type.label }
          active={ type.style === blockType }
          label={ type.label }
          onToggle={ props.onToggle }
          style={ type.style }
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={ type.label }
          active={ currentStyle.has(type.style) }
          label={ type.label }
          onToggle={ props.onToggle }
          style={ type.style }
        />
      )}
    </div>
  );
};

export default MessageForm;

