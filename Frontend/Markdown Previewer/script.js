const projectName = 'markdown-previewer';

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
    this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
  }
  
  handleChange(e) {
    this.setState({ markdown: e.target.value });
  }
  
  handleEditorMaximize() {
    this.setState({ editorMaximized: !this.state.editorMaximized });
  }
  
  handlePreviewMaximize() {
    this.setState({ previewMaximized: !this.state.previewMaximized });
  }
  
  render() {
    const classes = this.state.editorMaximized
      ? ['editorWrap maximized', 'previewWrap hide', 'fa fa-compress']
      : this.state.previewMaximized
      ? ['editorWrap hide', 'previewWrap maximized', 'fa fa-compress']
      : ['editorWrap', 'previewWrap', 'fa fa-arrows-alt'];
      
    return (
      <div>
        <div className={classes[0]}>
          <Toolbar icon={classes[2]} onClick={this.handleEditorMaximize} text="Editor" />
          <Editor markdown={this.state.markdown} onChange={this.handleChange} />
        </div>
        <div className="converter" />
        <div className={classes[1]}>
          <Toolbar icon={classes[2]} onClick={this.handlePreviewMaximize} text="Previewer" />
          <Preview markdown={this.state.markdown} />
        </div>
      </div>
    );
  }
}

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <i className="fa fa-free-code-camp" title="no-stack-dub-sack" />
      {props.text}
      <i className={props.icon} onClick={props.onClick} />
    </div>
  );
};

const Editor = (props) => {
  return (
    <textarea
      id="editor"
      onChange={props.onChange}
      value={props.markdown}
    />
  );
};

const Preview = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked(props.markdown, { renderer: renderer })
      }}
      id="preview"
    />
  );
};

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...

### And here's some other cool stuff:

- This is a list item
- This is another list item

Here’s some code, \`<div></div>\`, between 2 backticks.

\`\`\`
let hello = "Hello, World!";
console.log(hello);
\`\`\`

> Blockquotes are handy for doing notes.

![React Logo](https://reactjs.org/logo-og.png)

[Link to freeCodeCamp](https://www.freecodecamp.org)

**This is bold text!**`;

ReactDOM.render(<App />, document.getElementById('app'));
