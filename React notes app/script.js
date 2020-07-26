var my_notes = [];

var Note = React.createClass({
  displayName: "Note",
  render: function() {
    var styles = {
      background: this.props.color
    };

    return React.createElement(
      "div",
      { className: "note", style: styles },
      this.props.children,
      React.createElement(
        "span",
        { className: "delete_note", onClick: this.props.onDelete },
        " X "
      )
    );
  }
});

var NoteEditor = React.createClass({
  displayName: "NoteEditor",
  getInitialState: function() {
    return {
      text: ""
    };
  },
  handleTextChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },
  handleAddNote: function() {
    var newNote = {
      text: this.state.text,
      id: Date(),
      color: this.state.color
    };

    this.props.onNoteAdd(newNote);
    this.setState({ text: "" });
  },
  handleColorChange: function(event){
    this.setState({color:event.target.value})
  },

  render() {
    return React.createElement(
      "div",
      { className: "noteEditor" },
      React.createElement("textarea", {
        placeholder: "Enter Note",
        rows: 5,
        className: "textarea",
        onChange: this.handleTextChange,
        value: this.state.text
        
      }),

      React.createElement(
        "button",
        { className: "add_btn", onClick: this.handleAddNote },
        "Add"
      ),

      React.createElement("select", { className: "color_picker", onChange: this.handleColorChange, },
      React.createElement("option", {value:"", id: ""}, "Select Color"),
      React.createElement("option", {value: "rgb(75,230,121)", id: "color1" }, "Yellow"),
      React.createElement("option", {value: "rgb(0, 235, 137)", id: "color2" }, "Green"),
      React.createElement("option", {value: "rgb(129, 197, 240)", id: "color3" }, "Blue"),
      React.createElement("option", {value: "rgb(236,126,126)", id: "color4" }, "Red")
      ),   
    );
  }
});

var NotesGrid = React.createClass({
  displayName: "NotesGrid",
  componentDidMount: function() {
    var grid = this.refs.notes;
    this.msnry = new Masonry(grid, {
      itemSelector: ".note",
      columnWidth: 20,
      gutter: 10
    });
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems(), this.msnry.layout();
    }
  },
  render: function() {
    var onNoteDelete = this.props.onNoteDelete;
    return React.createElement(
      "div",
      { className: "notesGrid", ref: "notes" },

      this.props.notes.map(function(note) {
        return React.createElement(
          Note,
          {
            key: note.id,
            color: note.color,
            onDelete: onNoteDelete.bind(null, note)
          },
          " ",
          note.text,
          " "
        );
      })
    );
  }
});

var NotesApp = React.createClass({
  displayName: "NotesApp",
  getInitialState: function() {
    return {
      notes: my_notes
    };
  },
  componentDidMount: function() {
    var localDate = JSON.parse(localStorage.getItem("notes"));
    if (localDate) {
      this.setState({ notes: localDate });
    }
  },
  componentDidUpdate: function() {
    this._updateLocalStorage();
  },
  handleDeleteNote: function(note) {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function(note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  },
  handleAddNote: function(newNote) {
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({
      notes: newNotes
    });
  },
  _updateLocalStorage: function() {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem("notes", notes);
  },
  render: function() {
    return React.createElement(
      "div",
      { className: "notesApp" },
      "Lab4 Problem-1",

      React.createElement(NoteEditor, { onNoteAdd: this.handleAddNote }),
      React.createElement(NotesGrid, {
        notes: this.state.notes,
        onNoteDelete: this.handleDeleteNote
      })
    );
  }
});

ReactDOM.render(
  React.createElement(NotesApp, null),
  document.getElementById("content")
);
