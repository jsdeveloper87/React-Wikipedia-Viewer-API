document.addEventListener("keydown", keyDownTextField, false);

function keyDownTextField(e) {
var keyCode = e.keyCode;
  if(keyCode==13) {
    document.getElementById('searchBtn').click(); 
  }
}

class Viewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: ''
    };
    //Bind functions here
    this.handleSearch = this.handleSearch.bind(this);
  }
  //Functions here
  handleSearch(searchTerm) {
    searchTerm = document.getElementById('search').value;
    let node = document.getElementById('results');
    while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
}
        $.ajax({
            type: 'GET',
            url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + searchTerm,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: (data) => {
                this.setState({ results: data });
                for (let i = 0; i < data[1].length; i++) {
                  document.getElementById('results').innerHTML += "<div id='result'><div class='btn-primary'><a href="+data[3][i]+" target='blank'><h2>" + data[1][i]+ "</h2>" + "<p>" + data[2][i] + "</p></a></div></div>";
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }
  
  
  render() {
    return (
      <div>
        <h1 id="title">React Wikipedia Viewer API</h1>
        <input id="search" placeholder="Search Wikipedia"></input>
        <button id="searchBtn" onClick={this.handleSearch}>Search</button>
        <ul id="results"></ul>
        </div>
    );
  }
}

ReactDOM.render(<Viewer />, document.getElementById("app"));
