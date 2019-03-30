import React, { Component } from 'react';
//import logo from './logo.svg';
import instagramLogo from './images/glyph-logo_May2016.png'
import twitterLogo from './images/Twitter_Logo_Blue.png'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      feedData : [],
      currentFilter: "",
      isLoaded : true      
    }
  }  

  componentDidMount(){     
    //console.log("hit didmount")   
    this.getFeedData();    
  } 

  getFeedData = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items)    
        //.then(feedData => this.setState({feedData: [...this.state.feedData, feedData]})    
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
        //.then(feedData => this.setState({feedData: [...this.state.feedData, feedData]})    
        .then(feedData=> this.setState({feedData: feedData})) 
        .then(this.setState({currentFilter : "Twitter"}, function(){console.log(this.state.currentFilter)})) 
        
    }
    catch{
      
    }    
  }

  // filterTweets(){
  //   var tweets = this.state.allData.filter(tweet => tweet.service_name == "Twitter")
  //   console.log(tweets);
  //   this.setState({feedData : tweets})
  // }

  filterManualFeeds = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === "Manual"))    
        //.then(feedData => this.setState({feedData: [...this.state.feedData, feedData]})    
        .then(feedData=> this.setState({feedData: feedData}))  
        .then(this.setState({currentFilter : "Manual"}, function(){console.log(this.state.currentFilter)}))
    }
    catch{
      
    }    
  }

  // filterManualFeeds(){
  //   //this.getFeedData();
  //   var manualFeeds = this.state.feedData.filter(manual => manual.service_name == "Manual")
  //   console.log(manualFeeds);
  //   this.setState({feedData : manualFeeds})
  // }

  filterInstagram = async(req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === "Instagram"))    
        //.then(feedData => this.setState({feedData: [...this.state.feedData, feedData]})    
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
    console.log(this.state.feedData)
    //var currentRecords = this.state.feedData;
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(tweet => tweet.service_name === this.state.currentFilter))    
        .then(moreFeeds => this.setState({feedData: [...this.state.feedData, ...moreFeeds]}, function(){console.log(this.state.feedData)}))        
    }
    catch{
      
    }    
  }

  addDefaultSrc(feedtype, e){  
    var imageFallback = 'https://www.bullring.co.uk/Data/skins/vicinitee-bullring-web-10years/images/logo.png?v=1';
    switch(feedtype) {
      case "":
        imageFallback = 'https://www.bullring.co.uk/Data/skins/vicinitee-bullring-web-10years/images/logo.png?v=1'
        break;
      case "Twitter":
        imageFallback = twitterLogo
        break;
      case "Instagram":
        imageFallback = instagramLogo
        break;
      default:
        imageFallback = 'https://www.bullring.co.uk/Data/skins/vicinitee-bullring-web-10years/images/logo.png?v=1'
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
          <h3>Autumn Fashion Fix</h3>

          <button onClick={() => this.getFeedData()}>All Feeds</button>
          <button onClick={() => this.filterTweets()}>Filter Tweets</button>
          <button onClick={() => this.filterManualFeeds()}>Filter Manual feeds</button>
          <button onClick={() => this.filterInstagram()}>Filter Instagram</button>

          <form onSubmit={this.getFeedData}>
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
          </form>          
        </header>


        <div>
        <div className="imagecontainer">
            
            {this.state.feedData.map((item, index) =>{
              var userName = "",
                bodytext = "",
                imageTag = "",
                tags = "",
                link = ""

              if(item.service_name === "Instagram"){
                bodytext = item.item_data.caption;                

                if(item.item_data.tags.length > 0){
                  tags = <p className="tags">{'#' + item.item_data.tags.join(' #')}</p>
                }

                imageTag = item.item_data.image.medium;
                //imageTag = 'https://scontent-lht6-1.cdninstagram.com/vp/b8bcc77658eadac2016a94c39ed43c90/5D2F8FEF/t51.2885-15/e15/10598470_1480439188872772_1890435781_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com'
              }

              if(item.service_name === "Twitter"){
                userName = item.item_data.user.username;
                bodytext = item.item_data.tweet;
              }

              if(item.service_name === "Manual"){
                bodytext = item.item_data.text;
                imageTag = item.item_data.image_url;
                link = <a href={item.item_data.link} target="_blank">{item.item_data.link_text}</a>
              }

              return(
                <div className="imagecontent" key={index}>
                <h4>Feedtype : {item.service_name}</h4>
                  <h4>{userName}</h4>
                  <img onError={this.addDefaultSrc.bind(this, item.service_name)} src={imageTag} />                  
                  <p dangerouslySetInnerHTML={createMarkup(bodytext)} />
                  {link}
                  {tags}
                  
                </div>                    
              )
            })}                
        </div>
        <button onClick={() => this.getMoreFeeds()}>More</button>
        </div>
      </div>
    );
  }
}

export default App;
