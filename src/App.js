import React, { Component } from 'react';
import instagramLogo from './images/glyph-logo_May2016.png'
import twitterLogo from './images/Twitter_Logo_Blue.png'
import bullringLogo from './images/bullringlogo.png'
import afftag from './images/afftag.png'
import instagramtag from './images/instagramtag.png'
import twittertag from './images/twittertag.png'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feedData : [],
      currentFilter: "",
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"}),
      isLoaded : true      
    }
  }  

  componentDidMount(){  
    this.getFeedData();    
  } 

  getFeedData = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items)
        .then(feedData=> this.setState({feedData: feedData}))  
        .then(this.setState({currentFilter : ""}, function(){console.log(this.state.currentFilter)}))
    }
    catch{
      
    }    
  }

  filterTweets = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === "Twitter"))    
        .then(feedData=> this.setState({feedData: feedData})) 
        .then(this.setState({currentFilter : "Twitter"}, function(){console.log(this.state.currentFilter)})) 
        
    }
    catch{
      
    }    
  }

  filterManualFeeds = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === "Manual"))  
        .then(feedData=> this.setState({feedData: feedData}))  
        .then(this.setState({currentFilter : "Manual"}, function(){console.log(this.state.currentFilter)}))
    }
    catch{
      
    }    
  }

  filterInstagram = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === "Instagram"))  
        .then(feedData=> this.setState({feedData: feedData}))  
        .then(this.setState({currentFilter : "Instagram"}, function(){console.log(this.state.currentFilter)}))
    }
    catch{
      
    }    
  }

  // filterInstagram(){
  //   //this.getFeedData();
  //   var insta = this.state.feedData.filter(insta => insta.service_name == "Instagram")
  //   console.log(insta);
  //   this.setState({feedData : insta})
  // }

  getMoreFeeds = async(req, res) => {    
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => this.state.currentFilter !== "" ? resitems.items.filter(tweet => tweet.service_name === this.state.currentFilter) : resitems.items)    
        .then(moreFeeds => this.setState({feedData: [...this.state.feedData, ...moreFeeds]}, function(){console.log(this.state.feedData)}))        
    }
    catch{
      
    }    
  }

  addDefaultSrc(feedtype, e){  
    var imageFallback = bullringLogo;
    switch(feedtype) {
      case "":
        imageFallback = bullringLogo
        break;
      case "Twitter":
        imageFallback = twitterLogo
        break;
      case "Instagram":
        imageFallback = instagramLogo
        break;
      default:
        imageFallback = bullringLogo
    }

    e.target.src = imageFallback    
  }

  render() {
    function createMarkup(markup) {
      return {__html: markup};
    }

    return (
      <div className="App">
        <header className="App-header">
        <div className="mainmenu">
          <h3>Autumn Fashion Fix</h3>

        <div className="filters">
          <button onClick={() => this.getFeedData()} className={this.state.currentFilter === "" ? "active": ""}>All Feeds</button>
          <button onClick={() => this.filterTweets()} className={this.state.currentFilter === "Twitter" ? "active": ""}>Tweets</button>
          <button onClick={() => this.filterManualFeeds()} className={this.state.currentFilter === "Manual" ? "active": ""}>Manual feeds</button>
          <button onClick={() => this.filterInstagram()} className={this.state.currentFilter === "Instagram" ? "active": ""}>Instagram</button>

          {/* <form onSubmit={this.getFeedData}>
            <label>
              <input type="radio" value="" checked={this.state.currentFilter === ""} onChange={this.getFeedData}/>
              All
            </label>
            <label>
              <input type="radio" value="Twitter" checked={this.state.currentFilter === "Twitter"} onChange={this.filterTweets}/>
              Twitter
            </label>
            <label>
              <input type="radio" value="Manual" checked={this.state.currentFilter === "Manual"} onChange={this.filterManualFeeds}/>
              Manual
            </label>
            <label>
              <input type="radio" value="Instagram" checked={this.state.currentFilter === "Instagram"} onChange={this.filterInstagram}/>
              Instagram
            </label>            
          </form> */}
          </div>  
          </div>        
        </header>


        <div>
        <div className="imagecontainer">
            <div className="socialwall">
            
            {this.state.feedData.map((item, index) =>{
              var userName = "",
                bodytext = "",
                imageTag = "",
                tagicon = "",
                tags = "",
                link = ""

              if(item.service_name === "Instagram"){
                bodytext = item.item_data.caption;  
                tagicon = <img src={instagramtag} className="tagicon"/>;              

                if(item.item_data.tags.length > 0){
                  tags = <p className="tags">{'#' + item.item_data.tags.join(' #')}</p>
                }

                imageTag = item.item_data.image.medium;
                //imageTag = 'https://scontent-lht6-1.cdninstagram.com/vp/b8bcc77658eadac2016a94c39ed43c90/5D2F8FEF/t51.2885-15/e15/10598470_1480439188872772_1890435781_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com'
              }

              if(item.service_name === "Twitter"){
                userName = <h4>{item.item_data.user.username}</h4>;
                bodytext = item.item_data.tweet;
                tagicon = <img src={twittertag} className="tagicon"/>;
                //bodytext = item.item_data.tweet.replace(/(^|\s)(#[a-z\d-]+)/ig, "$1<a href='https://twitter.com/hashtag/$2?src=hash' class='hash_tag'>$2</a>"); 
              }

              if(item.service_name === "Manual"){
                bodytext = item.item_data.text;
                imageTag = item.item_data.image_url;
                tagicon = <img src={afftag} className="tagicon"/>;
                link = <a href={item.item_data.link} target="_blank">{item.item_data.link_text}</a>
              }

              return(
                <div className="tile" key={index}>
                  <div className="tilecontainer">                  
                    {tagicon}
                    <div className="tilecontent">                 
                      <div className="imageblock">
                        <img onError={this.addDefaultSrc.bind(this, item.service_name)} src={imageTag} />  
                      </div> 
                      {userName}               
                      <p dangerouslySetInnerHTML={createMarkup(bodytext)} />
                      {link}
                      {tags}
                      <p className="timestamp">Updated : {this.state.timestamp}</p>
                    </div>
                  </div>              
                </div>                    
              )
            })}                
        </div>
        <button onClick={() => this.getMoreFeeds()}>More</button>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
