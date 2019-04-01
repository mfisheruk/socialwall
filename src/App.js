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
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: "numeric", minute: "numeric"})            
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
        .then(dateorder => dateorder.sort((a,b) => new Date(a.item_published).getTime() - new Date(b.item_published).getTime()))
        .then(feedData=> this.setState({feedData: feedData}))  
        .then(this.setState({currentFilter : ""}))
    }
    catch{
      
    }    
  }

  filterItems = async(filter, req, res) => {
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => resitems.items.filter(filtereditem => filtereditem.service_name === filter)) 
        .then(dateorder => dateorder.sort((a,b) => new Date(a.item_published).getTime() - new Date(b.item_published).getTime()))   
        .then(feedData=> this.setState({feedData: feedData})) 
        .then(this.setState({currentFilter : filter}))         
    }
    catch{
      
    }    
  }

  getMoreFeeds = async(req, res) => { 
    try{
      await fetch('http://private-cc77e-aff.apiary-mock.com/posts')
        .then(res => res.json())
        .then(resitems => this.state.currentFilter !== "" ? resitems.items.filter(tweet => tweet.service_name === this.state.currentFilter) : resitems.items) 
        .then(combine =>  [...this.state.feedData, ...combine])
        .then(dateorder => dateorder.sort((a,b) => new Date(a.item_published).getTime() - new Date(b.item_published).getTime()))   
        .then(moreFeeds => this.setState({feedData: moreFeeds}))        
    }
    catch{
      
    }    
  }

  addDefaultSrc(feedtype, e){     
    switch(feedtype) {
      case "":
        e.target.src = bullringLogo
        break;
      case "Twitter":
        e.target.src = twitterLogo
        break;
      case "Instagram":
        e.target.src = instagramLogo
        break;
      case "Manual":
        e.target.src = bullringLogo
        break;
      default:
        e.target.src = bullringLogo
    }        
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
              <button onClick={() => this.filterItems("Manual")} className={this.state.currentFilter === "Manual" ? "active": ""}>Manual Feeds</button>
              <button onClick={() => this.filterItems("Twitter")} className={this.state.currentFilter === "Twitter" ? "active": ""}>Twitter</button>          
              <button onClick={() => this.filterItems("Instagram")} className={this.state.currentFilter === "Instagram" ? "active": ""}>Instagram</button>          
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
                srcset = "",
                tagicon = "",
                tags = "",
                link = ""

              if(item.service_name === "Instagram"){
                bodytext = item.item_data.caption;  
                tagicon = <img src={instagramtag} className="tagicon" alt={`${item.service_name} icon graphic`}/>;              

                if(item.item_data.tags.length > 0){                                       
                  for(var i = 0; i < item.item_data.tags.length; i++){
                    tags += (`<a href="https://www.instagram.com/explore/tags/${item.item_data.tags[i]}/" target="_blank">#${item.item_data.tags[i]}</a> `)
                  }                           
                }

                imageTag = item.item_data.image.medium;
                //imageTag = 'https://scontent-lht6-1.cdninstagram.com/vp/b8bcc77658eadac2016a94c39ed43c90/5D2F8FEF/t51.2885-15/e15/10598470_1480439188872772_1890435781_n.jpg?_nc_ht=scontent-lht6-1.cdninstagram.com'

                srcset= `${item.item_data.image.thumb} 640w, ${item.item_data.image.medium} 750w, ${item.item_data.image.large} 1080w`;                
              }

              if(item.service_name === "Twitter"){
                userName = <h4>{item.item_data.user.username}</h4>;               

                bodytext = item.item_data.tweet.replace(/([@#])([a-z\d_]+)/ig, function(_, marker, tag) {
                  if (marker === "@")
                    return `<a href="https://www.twitter.com/${tag}" target="_blank">@${tag}</a>`;
                  return `<a href="https://twitter.com/hashtag/${tag}?src=hash" target="_blank">#${tag}</a>`;
                });

                tagicon = <img src={twittertag} className="tagicon" alt={`${item.service_name} icon graphic`}/>;                 
              }

              if(item.service_name === "Manual"){
                bodytext = item.item_data.text;
                imageTag = item.item_data.image_url;
                tagicon = <img src={afftag} className="tagicon" alt={`${item.service_name} icon graphic`}/>;
                link = <p className="bodytext"><a href={item.item_data.link}  target="_blank">{item.item_data.link_text}</a></p>
              }

              return(
                <div className="tile" key={index}>
                  <div className="tilecontainer">                  
                    {tagicon}
                    <div className="tilecontent">                 
                      <div className="imageblock">
                        <img onError={this.addDefaultSrc.bind(this, item.service_name)} src={imageTag} alt="Image related to post"/>  
                        {/* <img onError={this.addDefaultSrc.bind(this, item.service_name)} src={imageTag} srcset={srcset}/>  */}
                      </div> 
                      {userName}               
                      <p className="bodytext" dangerouslySetInnerHTML={createMarkup(bodytext)} />
                      {link}
                      {tags.length > 0 ? <p className="tags" dangerouslySetInnerHTML={createMarkup(tags)} /> : ""}
                      
                      <p className="timestamp">Updated : {this.state.timestamp}</p>
                      
                    </div>
                  </div>              
                </div>                    
              )
            })}                
        </div>
        <button className="more" onClick={() => this.getMoreFeeds()}>More</button>
        </div>
        </div>
      </div>
    );
  }
}

export default App;